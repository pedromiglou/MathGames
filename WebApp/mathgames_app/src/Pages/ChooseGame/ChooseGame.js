import React, {useState} from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js"
//import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./ChooseGame.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGameMode() {
	const [filterOption, setfilterOption] = useState("RecommendedGames");

	var allGames_e;
	var recommended_e;
	var mostPlayed_e;

	function allGames() {
		setfilterOption("AllGames");

		allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "underline";
		recommended_e.style.textDecoration = "";
		mostPlayed_e.style.textDecoration = "";
	}

	function recommendedGames() {
		setfilterOption("RecommendedGames");

		allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
		recommended_e.style.textDecoration = "underline";
		mostPlayed_e.style.textDecoration = "";
	}

	function mostPlayedGames() {
		setfilterOption("MostPlayedGames");

		allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
		recommended_e.style.textDecoration = "";
		mostPlayed_e.style.textDecoration = "underline";
	}

	return (
		<div className="choose-game-container" id="choose_game_container">
			<div className="row no-margin centering">
				<div className="col-lg-8" id="filter_options">
					<div className="row top-bar no-margin">
						<div className="col-lg-4 top-button">
							<button
								id="allGames"
								onClick={allGames}
                                //class="box foo"
                                class={filterOption === "AllGames" ? "box foo actived-btn" : "box foo" }
							>
								Todos os jogos
							</button>
						</div>
						<div className="col-lg-4 top-button">
							<button
								id="recommendedGames"
                                style={{ textDecoration: "underline" }}
								onClick={recommendedGames}
                                //class="box foo testexd"
                                class={filterOption === "RecommendedGames" ? "box foo actived-btn" : "box foo" }
							>
								Recomendados
							</button>
						</div>
						<div className="col-lg-4 top-button">
							<button
								id="mostPlayedGames"
								onClick={mostPlayedGames}
                                //class="box foo"
                                class={filterOption === "MostPlayedGames" ? "box foo actived-btn" : "box foo" }
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
				</div> */}
			</div>
			<div className="games-list">
				{/* TODO: Passar props para filtrar pedido de jogos `a api */}
				{filterOption === "AllGames" && <GamesList />}
				{filterOption === "RecommendedGames" && <GamesList />}
				{filterOption === "MostPlayedGames" && (
					// <GamesList />
					<h1>ola</h1>
				)}
			</div>
		</div>
	);
}

export default ChooseGameMode;
