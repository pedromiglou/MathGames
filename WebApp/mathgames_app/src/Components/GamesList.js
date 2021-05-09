import { React} from "react";
import { useHistory } from "react-router-dom";
import { games_info } from "../data/GamesInfo";

import "./GamesList.css";

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
		value["hoover"] = false;
		history.push(value["path"]);
	}


	return (
		<>
			<div className="display-games">
				{Object.entries(games_info).map(([key, value]) => (					
						<div className="card game-dashboard" key={key} id={key + "_Card"} onMouseEnter={(e) => changeCard(e, value)} onMouseLeave={(e) => replaceCard(e, value)} onClick={() => enterGame(value)} >
							<div className="animation">
								<div className="title-section">
									<h3 className="title-gameDashboard">{value["title"]}</h3>
									<h3 className="faixa-gameDashboard">+{value["age"]}</h3>
								</div>

								<hr className="hr-gameDashboard"></hr>

								<div id={key + "div-img"} className="image" style={{display: "flex"}}>
									<img
									src={value["img"]}
									alt="Info"
									className="card-img"
									id={key}
									/>
								</div>

								<div id={key + "div-description"} className="div-game-description" style={{display: "none"}}>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<p className="game-descritpion">{value["description"]}</p>
								</div>
								<h4>Clica para jogar !</h4>
							</div>
						</div>
				))}
			</div>
		</>
	);
}

export default GamesList;
