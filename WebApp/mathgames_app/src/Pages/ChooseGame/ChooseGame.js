import React, { useState } from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js";
//import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./ChooseGame.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGame() {
	const [filterOption, setfilterOption] = useState("RecommendedGames");

	function allGames() {
		setfilterOption("AllGames");

	}

	function recommendedGames() {
		setfilterOption("RecommendedGames");
	}

	function mostPlayedGames() {
		setfilterOption("MostPlayedGames");
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

			</div>
			<hr className="division-menu-games"></hr>
			<div className="games-list">
				{filterOption === "AllGames" && <GamesList filter={"AllGames"} />}
				{filterOption === "RecommendedGames" && <GamesList filter={"RecommendedGames"} />}
				{filterOption === "MostPlayedGames" && <GamesList  filter={"MostPlayedGames"} />}
			</div>
		</div>
	);
}

export default ChooseGame;
