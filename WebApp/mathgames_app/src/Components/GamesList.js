import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { games_info } from "../data/GamesInfo";
import UserService from "../Services/user.service";

import "./GamesList.css";

const GamesList = ({filter}) => {

	const [gamesToShow, setGamesToShow] = useState(games_info);

	var history = useHistory();

	function changeCard(e, game) {
		var div_img = document.getElementById(game.id + "div-img");
		var div_descr = document.getElementById(game.id + "div-description");

		div_img.style.display = "none";
		div_descr.style.display = "flex";
	}

	function replaceCard(e, game) {
		var div_img = document.getElementById(game.id + "div-img");
		var div_descr = document.getElementById(game.id + "div-description");
		
		div_img.style.display = "flex";
		div_descr.style.display = "none";
	}

	function enterGame(value) {
		if (value["toBeDone"]) {
			alert("Jogo em desenvolvimento ! Ainda não está disponivel para jogar")
		} else {
			value["hoover"] = false;
			history.push(value["path"]);
		}
	}

	async function getGamesOrderByMostPlayed() {
		var estatisticas = await UserService.getMatchesStatisticsByGame();
		
		if (estatisticas) {

			var new_games_info = []
			var games_not_done_yet = []
			var games_by_order = []

			for (let i = 0; i < Object.keys(games_info).length; i++){
				if (games_info[i].toBeDone === false) {
					new_games_info.push(games_info[i])
				} else if (games_info[i].toBeDone) {
					games_not_done_yet.push(games_info[i])
				}
			}

			for (let game of estatisticas.matches) {
				for (let jogo of new_games_info) {
					if (game.id === jogo.id) {
						games_by_order.push(jogo)
					}
				}
			}

			games_by_order = games_by_order.concat(games_not_done_yet)
			setGamesToShow(games_by_order)
		}
	}

    useEffect(() => {
		var filtro = filter
		if (filtro === "MostPlayedGames") {
			getGamesOrderByMostPlayed();
		}
	}, [filter]);


    return (
		<>
			<div className="display-games">
				{Object.entries(gamesToShow).map(([key, value]) => (			
						<div className={value["toBeDone"] ? "card game-dashboard-disabled" : "card game-dashboard"} key={key} id={key + "_Card"} onMouseEnter={(e) => changeCard(e, value)} onMouseLeave={(e) => replaceCard(e, value)} onClick={() => enterGame(value)} >
							<div className="animation">
								<div className="title-section">
									<h3 className="title-gameDashboard">{value["title"]}</h3>
									<h3 className="faixa-gameDashboard">+{value["age"]}</h3>
								</div>

								<hr className="hr-gameDashboard"></hr>

								<div id={key + "div-img"} className="image" style={{display: "flex"}}>
									{value["toBeDone"] ? <div className="card-img disabled"><i className="working-icon">{value["icon"]}</i></div>
									: <img
									src={value["img"]}
									alt="Info"
									className="card-img"
									id={key}
									/>
									}
									
								</div>

								<div id={key + "div-description"} className="div-game-description" style={{display: "none"}}>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<p className="game-descritpion">{value["description"]}</p>
								</div>

								{value["toBeDone"] ? <h4> Em desenvolvimento ...</h4>
								: <h4> Clica para jogar !</h4>
								}
								
							</div>
						</div>
				))}
			</div>
		</>
	);
}

/*
function GamesList() {
	var history = useHistory();

	function changeCard(e, game) {
		var div_img = document.getElementById(game.id + "div-img");
		var div_descr = document.getElementById(game.id + "div-description");

		div_img.style.display = "none";
		div_descr.style.display = "flex";
	}

	function replaceCard(e, game) {
		var div_img = document.getElementById(game.id + "div-img");
		var div_descr = document.getElementById(game.id + "div-description");
		
		div_img.style.display = "flex";
		div_descr.style.display = "none";
	}

	function enterGame(value) {
		if (value["toBeDone"]) {
			alert("Jogo em desenvolvimento ! Ainda não está disponivel para jogar")
		} else {
			value["hoover"] = false;
			history.push(value["path"]);
		}
	}


	return (
		<>
			<div className="display-games">
				{Object.entries(games_info).map(([key, value]) => (			
						<div className={value["toBeDone"] ? "card game-dashboard-disabled" : "card game-dashboard"} key={key} id={key + "_Card"} onMouseEnter={(e) => changeCard(e, value)} onMouseLeave={(e) => replaceCard(e, value)} onClick={() => enterGame(value)} >
							<div className="animation">
								<div className="title-section">
									<h3 className="title-gameDashboard">{value["title"]}</h3>
									<h3 className="faixa-gameDashboard">+{value["age"]}</h3>
								</div>

								<hr className="hr-gameDashboard"></hr>

								<div id={key + "div-img"} className="image" style={{display: "flex"}}>
									{value["toBeDone"] ? <div className="card-img disabled"><i className="working-icon">{value["icon"]}</i></div>
									: <img
									src={value["img"]}
									alt="Info"
									className="card-img"
									id={key}
									/>
									}
									
								</div>

								<div id={key + "div-description"} className="div-game-description" style={{display: "none"}}>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<p className="game-descritpion">{value["description"]}</p>
								</div>

								{value["toBeDone"] ? <h4> Em desenvolvimento ...</h4>
								: <h4> Clica para jogar !</h4>
								}
								
							</div>
						</div>
				))}
			</div>
		</>
	);
}
*/
export default GamesList;
