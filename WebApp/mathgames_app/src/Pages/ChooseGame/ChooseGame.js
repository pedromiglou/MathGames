import { React, useState } from "react";
import GamesList from "../../Components/GamesList.js";

import "./ChooseGame.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGameMode() {
    const [filterOption, setfilterOption] = useState("AllGames");

    var allGames_e;
    var recommended_e;
    var mostPlayed_e;

    function allGames() {
        setfilterOption("AllGames")
        
        allGames_e = document.getElementById("allGames");
        recommended_e = document.getElementById("recommendedGames");
        mostPlayed_e = document.getElementById("mostPlayedGames");

        allGames_e.style.textDecoration = "underline";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = "";
    }

    function recommendedGames() {
        setfilterOption("RecommendedGames")

        allGames_e = document.getElementById("allGames");
        recommended_e = document.getElementById("recommendedGames");
        mostPlayed_e = document.getElementById("mostPlayedGames");

        allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "underline";
        mostPlayed_e.style.textDecoration = "";
    }

    function mostPlayedGames() {
        setfilterOption("MostPlayedGames")

        allGames_e = document.getElementById("allGames");
        recommended_e = document.getElementById("recommendedGames");
        mostPlayed_e = document.getElementById("mostPlayedGames");

        allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = "underline";
    }


	return (
		<div className="container" id="choose_game_container">
			<div className="row no-margin">
				<div className="col-lg-9" id="filter_options">
					<div className="row top-bar no-margin">
						<div className="col-lg-4">
							<button id="allGames" style={{textDecoration: "underline"}} onClick={allGames}>Todos os jogos</button>
						</div>
						<div className="col-lg-4">
							<button id="recommendedGames" onClick={recommendedGames}>Recomendados</button>
						</div>
						<div className="col-lg-4">
							<button id="mostPlayedGames" onClick={mostPlayedGames}>Mais Jogados</button>
						</div>
					</div>
				</div>
				<div className="col-lg-3 no-padding lvl-info">
					<p> Level 3 </p>
				</div>
			</div>
			<div className="games-list">
                {/* TODO: Passar props para filtrar pedido de jogos `a api */}
                {filterOption === "AllGames" && (
				    <GamesList />
                )}
                {filterOption === "RecommendedGames" && (
				    <GamesList />
                )}
                {filterOption === "MostPlayedGames" && (
				    // <GamesList />
                    <h1>ola</h1>
                )}

			</div>
		</div>
	);
}

export default ChooseGameMode;
