import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { games_info } from "../data/GamesInfo";

import "./GamesList.css";

function GamesList() {
	const [title, setTitle] = useState(false);
	const titleState = () => setTitle(!title);

	var history = useHistory();

	function changeCard(e, game) {
		var x2 = document.getElementById(game.id + "_Card");
		x2.style.boxShadow = "10px 5px 5px grey";

		var x = document.getElementById(game.id);
		x.style.opacity = "0.5";

		game.hoover = true;
		titleState();
	}

	function replaceCard(e, game) {
		var x2 = document.getElementById(game.id + "_Card");
		x2.style.boxShadow = "";

		var x = document.getElementById(game.id);
		x.style.opacity = "1";

		game.hoover = false;
		titleState();
	}

	function enterGame(value) {
		value["hoover"] = false;
		history.push(value["path"]);
	}

	const showTitle = (game) => {
		if (game.hoover) {
			return (
				<>
					<div className="row above-img">
						<div className="col-lg-9 col-sm-9 button_playnow">
							{/* <button className="play-button"> Jogar! </button> */}
							<button className="learn-more circle">
								<span className="circle" aria-hidden="true">
									<span className="icon arrow"></span>
								</span>
								<span
									className="button-text"
									style={{
										color: "white",
										marginLeft: "5px",
										fontFamily: "Bubblegum Sans",
									}}
								>
									Jogar Agora
								</span>
							</button>
						</div>
						<div className="col-lg-3 col-sm-3 game_age">
							<p> +{game.age} </p>
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<>
			<div className="display-games">
				{Object.entries(games_info).map(([key, value]) => (
					<Card
						key={key}
						id={key + "_Card"}
						className="button-fix"
						onClick={() => enterGame(value)}
					>
						<div
							onMouseEnter={(e) => changeCard(e, value)}
							onMouseLeave={(e) => replaceCard(e, value)}
						>
							<img
								src={value["img"]}
								alt="Info"
								className="card-img"
								id={key}
							/>
							<h2 className="game-title">{value["title"]}</h2>

							{showTitle(value)}
						</div>
					</Card>
				))}
			</div>
		</>
	);
}

export default GamesList;
