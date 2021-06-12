import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./GamePage.css";
import { games_info } from "../../data/GamesInfo";
import socket from "../../index"
import AuthService from '../../Services/auth.service';
import userService from '../../Services/user.service';

import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {IconContext} from 'react-icons';
import { ranks_info } from '../../data/ranksInfo';

import { useDispatch } from 'react-redux';
import { addMatch } from '../../store/modules/matches/actions';

import { RulesTooltip } from '../../Components/RulesTooltip';

//vamos ter de arranjar uma maneira de verificar o jogo guardado no useState para quando clicar no jogar ir para o jogo certo
function GamePage() {
	// Clear listeners
	socket.off("match_found");

	var user = AuthService.getCurrentUser();
	const dispatch = useDispatch();

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

	const [gerarLinkMode, setGerarLinkMode] = useState(false);
	const [inviteFriendMode, setInviteFriendMode] = useState(false);

	const url = new URLSearchParams(window.location.search);
	let game_id = url.get("id");
	const game_info = games_info[game_id];
	var friend_match = useRef(null);
	let new_match_id = url.get("mid");
	let tournament_id = url.get("tid");

	let history = useHistory()

	var id_outro_jogador;
	if (localStorage.getItem("jogoporinvite")) {
		//Código executado pelo jogador que convida outro por amizade para jogar
		localStorage.removeItem("jogoporinvite")
		id_outro_jogador = localStorage.getItem("outrojogador")
		localStorage.removeItem("outrojogador")

		socket.emit("generate_invite", {"user_id": AuthService.getCurrentUserId(), "outro_id": id_outro_jogador, "game_id": game_id})

		socket.once("invite_link", (msg) => {
			let new_match_id = msg['match_id'];
			
			if ( new_match_id === null ) {
				alert("Criaste um link recentemente, espera mais um pouco até criares um novo.")
				return;
			}
			
			friend_match.current = new_match_id;
			setInviteFriendMode(true);
		})

		socket.once("friend_joined", (msg) => {
			console.log("Friend just joined!");
			var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
			dispatch( addMatch(match) );
			history.push({
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: "amigo",
					match: match
				} 
			})
		})
		
	} 
	else if (localStorage.getItem("entreijogoporinvite")) {
		//Código executado pelo jogador que aceita o convite de jogo por amizade
		localStorage.removeItem("entreijogoporinvite")

		id_outro_jogador = localStorage.getItem("outrojogador")
		localStorage.removeItem("outrojogador")

		socket.once("match_found", (msg) => {
			console.log("Joined a game through invite!");
			var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
			dispatch( addMatch(match) );
			history.push({
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: "amigo",
					ai_diff: AIdiff,
					match: match
				} 
			})
		})

		socket.emit("entered_invite", {"user_id": AuthService.getCurrentUserId(), "outro_id": id_outro_jogador, "match_id": new_match_id, "game_id": game_id})
		
	} else if (tournament_id !== null) {
		
		//Tournament section
		socket.once("match_found", (msg) => {
			var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
			dispatch( addMatch(match) );
			history.push({
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: "online",
					ai_diff: AIdiff,
					match: match
				} 
			})
		})

		socket.emit("tournament_enteredmatch", {"user_id": AuthService.getCurrentUserId(), "match_id": new_match_id, "tournament_id": tournament_id})

	} else if ( new_match_id !== null ) {

		//Código executado pelo jogador que entra por link no jogo
		socket.once("match_found", (msg) => {
			console.log("Joined a game through link!");
			var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
			dispatch( addMatch(match) );
			history.push({
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: "amigo",
					ai_diff: AIdiff,
					match: match
				} 
			})
		})

		socket.emit("entered_link", {"user_id": AuthService.getCurrentUserId(), "match_id": new_match_id, "game_id": game_id})
	} 

	var userRank = 0
	var userRankValue = 0;
	if (user !== null) {
		if (game_id === "0") {
			userRankValue = user.userRanksData.rastros
		} else if (game_id === "1") {
			userRankValue = user.userRanksData.gatos_e_caes
		}

		userRank = userService.convert_user_rank(userRankValue);
	}


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

		for (let i = 0; i < cards.length; i++)
			if (cards[i].id !== val)
				cards[i].classList.add("not-active")
		
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

	function copy() {
        var link = document.getElementById("link");
        
        link.select();
        link.setSelectionRange(0, 99999); /* For mobile devices */

        document.execCommand("copy");

        /* Alert the copied text */
        alert("O link foi copiado!");
    }
	
	function find_match() {
		// Clear listeners in case user presses Find Match button multiple times
		socket.off("invite_link");
		socket.off("friend_joined");
		socket.off("match_found");

		if (gameMode === "amigo") {
			socket.emit("generate_link", {"user_id": AuthService.getCurrentUserId()})

			socket.once("invite_link", (msg) => {
				let new_match_id = msg['match_id'];
				
				if ( new_match_id === null ) {
					alert("Criaste um link recentemente, espera mais um pouco até criares um novo.")
					return;
				}
				
				friend_match.current = new_match_id;
				setGerarLinkMode(true);
			})

			socket.once("match_found", (msg) => {
				console.log("Friend just joined!");
				var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
				dispatch( addMatch(match) );
				history.push({
					pathname: "/game/?g="+game_id, 
					state: {
						game_id: game_id,
						game_mode: gameMode,
						ai_diff: AIdiff,
						match: match
					} 
				})
			})
		} else if (gameMode === "online") {
			socket.emit("user_id", {"user_id": AuthService.getCurrentUserId(), "game_id": game_id})

			socket.once("match_found", (msg) => {
				console.log("Match found!");
				var match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
				dispatch( addMatch(match) );
				history.push({
					pathname: "/game/?g="+game_id, 
					state: {
						game_id: game_id,
						game_mode: gameMode,
						ai_diff: AIdiff,
						match: match
					}  
				})
			})
		} else {
			let curr_username = AuthService.getCurrentUsername();
			var username1 = gameMode==="ai" ? curr_username : name1;
			var username2 = gameMode==="ai" ? "AI " + AIdiff + " difficulty" : name2;

			history.push({
				pathname: "/game/?g="+game_id, 
				state: {
					game_id: game_id,
					game_mode: gameMode,
					ai_diff: AIdiff,
					match: { match_id: 0, player1: username1, player2: username2 }
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

	if ( gerarLinkMode ) {
		return (
			<div className="col-lg-12 link-geral-position">
				<IconContext.Provider  value={{color: 'white'}}>
					<div className="link-card">
						<h2>Copia o link para convidar alguém!</h2>
						<hr className="link-hr"></hr>
						<div className="bottom-link row">
							<input readOnly={true} className="link" id="link" value={"http://localhost:3000/gamePage?id="+game_id+"&mid="+friend_match.current}></input>
							<div className="div-link-button">
								<button id="button-copy" className="button-copy" onClick={() => copy()}><i className="copy-icon"><FaIcons.FaCopy/></i></button>
							</div>
						</div>
					</div>
				</IconContext.Provider>
			</div>
		)
	} else if (inviteFriendMode) {
		return (
			<div className="col-lg-12 link-geral-position">
				<IconContext.Provider  value={{color: 'white'}}>
					<div className="link-card">
						<h2>À espera do teu amigo...!</h2>
						<hr className="link-hr"></hr>
					</div>
				</IconContext.Provider>
			</div>
		)
	}
	else
		return (
			<>
				<div className="container choose-game-mode-container">
				<div className="row">
					<div className="col-lg-4 game-details orange left">
						<div className="row">
							<div className="col-10">
								<h1 className="game-Name"> {game_info["title"]} </h1>
							</div>
							<div className="col-2 d-flex justify-content-end">
								<RulesTooltip rules={game_info['rules']} website={game_info['website']}></RulesTooltip>
							</div>
						</div> 
						<div className="image">
							<img
							src={game_info["img"]}
							alt="Imagem de Jogo"
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
									<span>{game_info["dificulty_label"]}</span>
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
										
									{ (userRank-1) >= 0 &&	
										<>
										<img
											src={
												process.env.PUBLIC_URL +
												ranks_info[userRank-1].image
											}
											alt="Rank"
											className="a-n-rank-img"
										/>

										<h4>{ranks_info[userRank-1].name}</h4>
										</>
									}
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
												ranks_info[userRank].image
											}
											alt="Rank Anterior"
											className="rank-img"
										/>
										<h4>{ranks_info[userRank].name}</h4>
									</div>
								</div>
								<div className="col-lg-1 updo-icon centered">
									<FaIcons.FaAngleDoubleUp/>
									{/* <h6>seguinte</h6> */}
								</div>
								<div className="col-lg-3 ant-next centered">
								
							
									<div className="a-n-div">
									{ (userRank+1) <= 12 &&	
										<>
										<img
											src={
												process.env.PUBLIC_URL +
												ranks_info[userRank+1].image
											}
											alt="Rank Seguinte"
											className="a-n-rank-img"
										/>
										<h4>{ranks_info[userRank+1].name}</h4>
										</>
									}
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