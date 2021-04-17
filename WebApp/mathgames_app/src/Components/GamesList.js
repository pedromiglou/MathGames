import { React, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import { games_info } from "../data/GamesInfo";

import "./GamesList.css";

function GamesList() {
	const [title, setTitle] = useState(false);
	const titleState = () => setTitle(!title);

	function changeCard(e, game) {
		var x2 = document.getElementById(game.id + "_Card");
		x2.style.boxShadow = "10px 5px 5px grey";

		var x = document.getElementById(game.id);
		x.style.opacity = "0.5";
		/*x.style.width = "350px";
		x.style.height = "350px";
		x.style.backgroundColor = "aquat"; */

		game.hoover = true;
		titleState();
	}

	function replaceCard(e, game) {
		var x2 = document.getElementById(game.id + "_Card");
		x2.style.boxShadow = "";

		var x = document.getElementById(game.id);
		x.style.opacity = "1";
		/*x.style.margin = "0px";
		x.style.width = "300px";
		x.style.height = "300px";
		x.style.backgroundColor = "white"; */

		game.hoover = false;
		titleState();
	}

	const showTitle = (game) => {
		if (game.hoover) {
			return (
				<>
					<h2 className="game-title">{game.title}</h2>
					<div className="row">
						<div className="col-lg-9 button_playnow">
							{/* <button className="play-button"> Jogar! </button> */}
							<button
								className="learn-more circle"
								id="playnow_btn"
							>
								<span className="circle" aria-hidden="true">
									<span className="icon arrow"></span>
								</span>
								<span className="button-text">Jogar Agora</span>
							</button>
						</div>
						<div className="col-lg-3">
							<p className="game_age"> +{game.age} </p>
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
					<Card key={key} id={key + "_Card"} className="teste">
						<Route>
							<Link to={value["path"]}>
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
									{showTitle(value)}
								</div>
							</Link>
						</Route>
					</Card>
				))}
			</div>
		</>
	);
}

export default GamesList;
