import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./GamePage.css";
import { games_info } from "../../data/GamesInfo";
import socket from "../../index"
import AuthService from "../../Services/auth.service"

//vamos ter de arranjar uma maneira de verificar o jogo guardado no useState para quando clicar no jogar ir para o jogo certo
function GamePage() {
	let history = useHistory();

	//De alguma maneira verificar se estiver vazio
	const [gameMode, setGameMode] = useState("");
	//Depois aqui podemos meter conforme as preferencias no perfil
	const [AIdif, setAIdif] = useState("");

	var isSomeoneLogged = false;
	var resultado = AuthService.getCurrentUser();
	if (resultado !== null) {
		isSomeoneLogged = true;
	}

	const dif_options = [
		{ label: "easy", value: "easy" },
		{ label: "medium", value: "medium" },
		{ label: "hard", value: "hard" },
	];

	const params = new URLSearchParams(window.location.search);
	let id = params.get("id");
	const game_info = games_info[id];

	function changeMode(val) {
		setGameMode(val);
		if (val === "AI") {
			showDif();
		} else {
			hideDif();
		}
	}

	function changeDif(e) {
		var dif = e.target.value;
		setAIdif(dif);
	}

	function showDif() {
		var x = document.getElementById("sel_dif");
		x.style.display = "block";
		setAIdif("easy");
	}

	function hideDif() {
		var x = document.getElementById("sel_dif");
		x.style.display = "none";
	}
	
	function find_match() {
		if ((gameMode === "Amigo") && !isSomeoneLogged) {
			socket.emit("friendbylink", sessionStorage.getItem("user_id"))

			socket.on("link_sent", (msg) => {
				history.push({
					pathname: "/game/?id="+msg['match_id'], 
					state: {
						game_id: id,
						game_mode: gameMode,
						ai_diff: AIdif,
					  } 
				})
			})
		} else if (gameMode !== "Online") {
			history.push({
				pathname: "/game", 
				state: {
					game_id: id,
					game_mode: gameMode,
					ai_diff: AIdif,
					}  
				})
		} else {
			socket.emit("user_id", sessionStorage.getItem("user_id"))

			socket.on("match_found", (msg) => {
				console.log("Match found!");
				sessionStorage.setItem('match_id', msg['match_id']);
				sessionStorage.setItem('starter', msg['starter']);
				history.push(
					{
					pathname: "/game", 
					state: {
						game_id: id,
						game_mode: gameMode,
						ai_diff: AIdif,
						}  
					})
			})
		}
	}
	return (
		<>
			<div className="container choose-game-mode-container">
				<div className="row">
					<div className="col-lg-4 game-details">
						<h1> {game_info["title"]} </h1>
						<img
							src={
								process.env.PUBLIC_URL + "/images/mathGames.png"
							}
							alt="Info"
							className="rank-img"
						/>
						<p className="game-details-p">
							{game_info["description"]}
						</p>
						<div className="col-lg-12 game-caracteristics">
							<p> Caracteristicas </p>
							<div className="progress">
								<div
									className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
									role="progressbar"
									aria-valuenow="75"
									aria-valuemin="0"
									aria-valuemax="100"
									style={{ width: "50%" }}
								>
									<span>Dificuldade</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-8 player-info-and-modes">
						<div className="col-lg-12 player-rank">
							<div className="row">
								<div className="col-lg-6 set-padding centered">
									<div>
										<img
											src={
												process.env.PUBLIC_URL +
												"/images/mathGames.png"
											}
											alt="Info"
											className="rank-img"
										/>
									</div>
								</div>
								<div className="col-lg-6 no-padding center-progress-bar">
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
								</div>
							</div>
						</div>
						<div className="col-lg-12 border">
							<div className="row">
								<div className="col-lg-6 centered set-padding">
									<Card className="mode-card" onClick={() => changeMode("Online")}>
										<div>
											<img
												src={
													process.env
														.PUBLIC_URL +
													"/images/mathGames.png"
												}
												alt="Info"
												className="game-mode-card"
											/>
											<span className="above-type-img">
												Competitivo
											</span>
										</div>
									</Card>
								</div>
								<div className="col-lg-6 centered set-padding">
									<Card className="mode-card" onClick={() => changeMode("1vs1")}>
										<div>
											<img
												src={
													process.env
														.PUBLIC_URL +
													"/images/mathGames.png"
												}
												alt="Info"
												className="game-mode-card"
											/>
											<span className="above-type-img">
												1vs1
											</span>
										</div>
									</Card>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 centered set-padding">
									<Card className="mode-card" onClick={() => changeMode("Amigo")}>
										<div>
											<img
												src={
													process.env
														.PUBLIC_URL +
													"/images/mathGames.png"
												}
												alt="Info"
												className="game-mode-card"
											/>
											<span className="above-type-img">
												Convidar Amigo
											</span>
										</div>
									</Card>
								</div>
								<div className="col-lg-6 centered set-padding">
									<Card className="mode-card" onClick={() => changeMode("AI")}>
										<div>
											<img
												src={
													process.env
														.PUBLIC_URL +
													"/images/mathGames.png"
												}
												alt="Info"
												className="game-mode-card"
											/>
											<span className="above-type-img">
												Contra Computador
											</span>
										</div>
									</Card>
								</div>
							</div>
						</div>
						<select id="sel_dif" onChange={(e) => changeDif(e)} style={{display: "none"}}>
                                {dif_options.map((option) => (
                                    <option key={option.label} value={option.value}>{option.label}</option>
                                ))}
                            </select>
						<button onClick={() => find_match()}>Jogar</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default GamePage;
