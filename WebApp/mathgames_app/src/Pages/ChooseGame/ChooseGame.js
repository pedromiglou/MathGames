import React, { useState } from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js";
//import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./ChooseGame.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGame() {
	const [filterOption, setfilterOption] = useState("RecommendedGames");

	// var allGames_e;
	// var recommended_e;
	// var mostPlayed_e;

	function allGames() {
		setfilterOption("AllGames");

		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "underline";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = ""; */
	}

	function recommendedGames() {
		setfilterOption("RecommendedGames");

		
		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "underline";
        mostPlayed_e.style.textDecoration = ""; */
	}

	function mostPlayedGames() {
		setfilterOption("MostPlayedGames");

		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = "underline"; */
	}

	return (
		<div className="choose-game-container" id="choose_game_container">
			<div className="row options">
				<div className="col-lg-12 col-md-12 col-sm-12" id="filter_options">
					<div className="row top-bar no-margin">
						<div className="col-lg-3 col-md-3 col-sm-3">
							<h1>Jogos</h1>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 top-button">
							<button
								id="allGames"
								onClick={allGames}
								className={
									filterOption === "AllGames"
										? "box actived-btn"
										: "box up"
								}
							>
								Todos os jogos
							</button>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 top-button">
							<button
								id="recommendedGames"
								onClick={recommendedGames}
								className={
									filterOption === "RecommendedGames"
										? "box actived-btn"
										: "box up"
								}
							>
								Recomendados
							</button>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3 top-button">
							<button
								id="mostPlayedGames"
								onClick={mostPlayedGames}
								className={
									filterOption === "MostPlayedGames"
										? "box actived-btn"
										: "box up"
								}
							>
								Mais Jogados
							</button>
						</div>
					</div>
				</div>

				{/* <div className="col-lg-3 no-padding lvl-info">
					<div className="row no-margin">
						<div className="col-lg-2">
							<p>99</p>
						</div>
						<div className="col-lg-8">
							<div className="progress">
								<div
									className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
									role="progressbar"
									aria-valuenow="75"
									aria-valuemin="0"
									aria-valuemax="100"
									style={progress}
								></div>
							</div>
						</div>
						<div className="col-lg-2">
							<p>100</p>
						</div>
					</div>
				</div>  */}
			</div>
			<hr className="division-menu-games"></hr>
			<div className="games-list">
				{/* TODO: Passar props para filtrar pedido de jogos `a api */}
				{filterOption === "AllGames" && <GamesList />}
				{filterOption === "RecommendedGames" && <GamesList />}
				{filterOption === "MostPlayedGames" && (
					 <GamesList />
				)}
			</div>
		</div>
	);
}

export default ChooseGame;
