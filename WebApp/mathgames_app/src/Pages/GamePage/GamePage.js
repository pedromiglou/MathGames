import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./GamePage.css";
import { games_info } from "../../data/GamesInfo";
import socket from "../../index"
import AuthService from '../../Services/auth.service';

import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {IconContext} from 'react-icons';


//vamos ter de arranjar uma maneira de verificar o jogo guardado no useState para quando clicar no jogar ir para o jogo certo
function GamePage() {
	var history = useHistory();
	var user = AuthService.getCurrentUser();


	const dif_options = [
		{ label: "fácil", value: "easy" },
		{ label: "médio", value: "medium" },
		{ label: "dificil", value: "hard" },
	];

	//De alguma maneira verificar se estiver vazio
	const [gameMode, setGameMode] = useState("");
	//Depois aqui podemos meter conforme as preferencias no perfil
	const [AIdiff, setAIdiff] = useState("");

	const [name1, setName1] = useState("");
	const [name2, setName2] = useState("");

	const [canPlay, setCanPlay] = useState(false);

	const params = new URLSearchParams(window.location.search);
	let game_id = params.get("id");
	const game_info = games_info[game_id];

	function changeMode(val) {
		var card_comp = document.getElementById("online");
		var card_off = document.getElementById("offline");
		var card_friend = document.getElementById("amigo");
		var card_ai = document.getElementById("ai");

		const cards = [card_comp, card_off, card_friend, card_ai];

		for (let i = 0; i < cards.length; i++){
			if (cards[i].classList.contains("active")){
				cards[i].classList.remove("active")
			}
			if (cards[i].classList.contains("not-active")){
				cards[i].classList.remove("not-active")
			}		
		}

		if (val === 'online'){
			card_comp.classList.add("active");
			setCanPlay(true);
		} else if (val === 'offline'){
			card_off.classList.add("active");
			setCanPlay(false);
		} else if (val === 'amigo'){
			card_friend.classList.add("active");
			setCanPlay(true);
		} else if (val === 'ai'){
			card_ai.classList.add("active");
			setCanPlay(true);
		}

		for (let i = 0; i < cards.length; i++){
			if (cards[i].id !== val){
				cards[i].classList.add("not-active")
			}
		}
		
		
		setGameMode(val);
		if (val === "ai") {
			showDif();
			hideDivNames();
		} 
		else if(val === "offline"){
			showDivNames();
			hideDif();
		}else {
			hideDif();
			hideDivNames();
		}
	}

	function changeDif(e) {
		var dif = e.target.value;
		setAIdiff(dif);
	}

	function showDif() {
		var x = document.getElementById("sel_dif");
		x.style.display = "block";
		setAIdiff("easy");
	}

	function hideDif() {
		var x = document.getElementById("sel_dif");
		x.style.display = "none";
	}

	function showDivNames() {
		var x = document.getElementById("choose_names");
		x.style.display = "block";
		setAIdiff("easy");
	}

	function hideDivNames() {
		var x = document.getElementById("choose_names");
		x.style.display = "none";
	}
	
	function find_match() {
		if (gameMode === "amigo") {
			if (user === null)
				socket.emit("friendbylink", {"user_id": sessionStorage.getItem("user_id"), "game_id": game_id})
			else
				socket.emit("friendbylink", {"user_id": String(user.id), "game_id": game_id})

			socket.on("link_sent", (msg) => {
				history.push({
					pathname: "/game/?g="+game_id+"&id="+msg['match_id'], 
					state: {
						game_id: game_id,
						game_mode: gameMode,
						ai_diff: AIdiff,
						player: user !== null ? user.username : "Guest_" + sessionStorage.getItem("user_id"),
						opponent: msg['opponent']
					  } 
				})
			})
		} else if (gameMode === "online") {
			if (user === null)
				socket.emit("user_id", {"user_id": sessionStorage.getItem("user_id"), "game_id": game_id})
			else
				socket.emit("user_id", {"user_id": String(user.id), "game_id": game_id})

			socket.on("match_found", (msg) => {
				console.log("Match found!");
				sessionStorage.setItem('match_id', msg['match_id']);
				sessionStorage.setItem('starter', msg['starter']);
				history.push(
					{
					pathname: "/game/?g="+game_id, 
					state: {
						game_id: game_id,
						game_mode: gameMode,
						ai_diff: AIdiff,
						player: user !== null ? user.username : "Guest_" + sessionStorage.getItem("user_id"),
						opponent: msg['opponent']
						}  
					})
			})
		} else {
			history.push(
				{
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: gameMode,
					ai_diff: AIdiff,
					player: gameMode==="ai" ? user !== null ? user.username : "Guest_" + sessionStorage.getItem("user_id") : name1,
					opponent: gameMode==="ai" ? "AI " + AIdiff + " difficulty" : name2,
					}  
				})
		}
	}

	useEffect(() => {
		var button = document.getElementById("button-play");

		if (canPlay){
			button.disabled = false;
			button.classList.add("active");
			if (button.classList.contains("disabled")){
				button.classList.remove("disabled");
			}
		} else {
			button.disabled = true;
			button.classList.add("disabled");
			if (button.classList.contains("active")){
				button.classList.remove("active")
			}
		}
	}, [canPlay]);
	
	useEffect(() => {
		function checkNames(){
			return (name1 !== "" && name2 !== "")
		}
		
		var res = checkNames();
		if (res) {
			setCanPlay(true);
		} else {
			setCanPlay(false);
		}

	}, [name1,name2]);

	return (
		<>
			<div className="container choose-game-mode-container">
				<div className="row">
					<div className="col-lg-4 game-details orange left">
						<h1 className="game-Name"> {game_info["title"]} </h1>
						<div className="image">
							<img
							src={game_info["img"]}
							alt="Info"
							className="game-image"
							/>	
						</div>

						<p className="game-details-p">
							{game_info["description"]}
						</p>
						<hr className="descr-div-caract"></hr>
						<div className="col-lg-12 game-caracteristics">
							<h2 className="caract-gamemode"> Caracteristicas </h2>
							
							<h4>Dificuldade</h4>
							<div className="progress caract">
								<div
									className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
									role="progressbar"
									aria-valuenow="75"
									aria-valuemin="0"
									aria-valuemax="100"
									style={{ width: game_info["dificulty"]+"%" }}
								>
									<span>fácil</span>
								</div>
							</div>
							<h4>Idade: +{ game_info["age"] } </h4>
							{/* <div className="progress caract">
								<div
									className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
									role="progressbar"
									aria-valuenow="75"
									aria-valuemin="0"
									aria-valuemax="100"
									style={{ width: "50%" }}
								>
									<span>Idade</span>
								</div>
							</div> */}
						</div>
					</div>
					<div className="col-lg-8 player-info-and-modes">
						<div className="col-lg-12 player-rank container-hidden orange top-right">
							<h2 className="rank-gamemode">Rank</h2>
							<div className="col-lg-12 ranks-section">
								<div className="col-lg-3 ant-next centered">
									<div className="a-n-div">
										<img
											src={
												process.env.PUBLIC_URL +
												"/images/prata.png"
											}
											alt="Info"
											className="a-n-rank-img"
										/>
										<h4>Prata</h4>
									</div>
								</div>
								<div className="col-lg-1 updo-icon centered">
									<FaIcons.FaAngleDoubleDown/>
									{/* <h6>anterior</h6> */}
								</div>
								<div className="col-lg-3 centered">
									<div>
										<img
											src={
												process.env.PUBLIC_URL +
												"/images/platina.png"
											}
											alt="Info"
											className="rank-img"
										/>
										<h4>Platina</h4>
									</div>
								</div>
								<div className="col-lg-1 updo-icon centered">
									<FaIcons.FaAngleDoubleUp/>
									{/* <h6>seguinte</h6> */}
								</div>
								<div className="col-lg-3 ant-next centered">
									
									<div className="a-n-div">
										<img
											src={
												process.env.PUBLIC_URL +
												"/images/diamond.png"
											}
											alt="Info"
											className="a-n-rank-img"
										/>
										<h4>Diamante</h4>
									</div>
								</div>
							</div>	
							
							{/* <div className="col-lg-6 no-padding center-progress-bar">
								<p>Nivel</p>
								<div className="row no-margin">
									<div className="col-lg-2 lvl-left">
										<p>99</p>
									</div>
									<div className="col-lg-8 center-progress-bar">
										<div className="progress">
											<div
												className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
												role="progressbar"
												aria-valuenow="75"
												aria-valuemin="0"
												aria-valuemax="100"
												style={{ width: "70%" }}
											></div>
										</div>
									</div>
									<div className="col-lg-2 lvl-right">
										<p>100</p>
									</div>
								</div>
							</div>	 */}
						</div>

						<div className="col-lg-12 game-mode orange bottom-right">
							<IconContext.Provider  value={{color: 'white'}}>
								<h2 className="title-gamemode">Escolhe modo de jogo</h2>
								<div className="row">
									<div className="col-lg-6 centered set-padding">
								
										<Card id="online" className="mode-card" onClick={() => changeMode("online")}>
											<div>
											
												<i className="mode-icon"><RiIcons.RiSwordFill/></i>
											
												<h2>
													Competitivo
												</h2>
											</div>
										</Card>
									</div>

									<div className="col-lg-6 centered set-padding">
										<Card id="offline" className="mode-card" onClick={() => changeMode("offline")}>
											<div>
												
												<i className="mode-icon"><FaIcons.FaUserFriends/></i>
												
												<h2>
													No mesmo computador
												</h2>
												
											</div>
										</Card>
										<div id="choose_names" className="choose_names" onChange={(e) => changeDif(e)} style={{display: "none"}}>
											<input placeholder="nome jogador 1" className="name" onChange={(e) => setName1(e.target.value)} ></input>
											<input placeholder="nome jogador 2" className="name" onChange={(e) => setName2(e.target.value)}></input>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-6 centered set-padding">
										<Card id="amigo" className="mode-card" onClick={() => changeMode("amigo")}>
											<div>
												<i className="mode-icon"><FiIcons.FiLink/></i>
												
												<h2>
													Gerar link de convite
												</h2>
												
											</div>
										</Card>
									</div>
									<div className="col-lg-6 centered set-padding">
										<Card id="ai" className="mode-card" onClick={() => changeMode("ai")}>
											<div>
												<i className="mode-icon"><FaIcons.FaRobot/></i>
												
												<h2>
													Contra o computador
												</h2>
											</div>
										</Card>
										{/* fazer isto com divs para ficar igual á parte de cima */}
										<select id="sel_dif" className="select-dif" onChange={(e) => changeDif(e)} style={{display: "none"}}>
											{dif_options.map((option) => (
												<option key={option.label} value={option.value}>{option.label}</option>
											))}
										</select>
									</div>
								</div>
								<div className="div-button">
									<button id="button-play" className="button-play disabled" onClick={() => find_match()}>Jogar</button>
								</div>
							
							</IconContext.Provider>
						</div>
						
					</div>
				</div>
			</div>
		</>
	);
}

export default GamePage;