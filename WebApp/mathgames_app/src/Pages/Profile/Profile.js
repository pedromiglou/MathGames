import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
	const [menuOption, setMenuOption] = useState("Geral");

	const lastgames_test = [
		{
			id: 1,
			date: "19/01/2020",
			game: "Yote",
			result: "Vitoria",
			exp: "1000",
		},
		{
			id: 2,
			date: "20/05/2020",
			game: "Rastros",
			result: "Derrota",
			exp: "500",
		},
		{
			id: 3,
			date: "20/05/2020",
			game: "Yote",
			result: "Derrota",
			exp: "50",
		},
		{
			id: 4,
			date: "20/05/2021",
			game: "Rastros",
			result: "Vitoria",
			exp: "500",
		},
		{
			id: 5,
			date: "1/05/2020",
			game: "Rastros",
			result: "Derrota",
			exp: "500",
		},
	];

	var geral_e;
	var password_e;
	var rank_e;
	var last_games_e;
	var preferencias_e;

	function geral() {
		setMenuOption("Geral");

		geral_e = document.getElementById("Geral");
		password_e = document.getElementById("Password");
		rank_e = document.getElementById("Rank");
		last_games_e = document.getElementById("Last_Games");
		preferencias_e = document.getElementById("Preferencias");

		geral_e.style.backgroundColor = "#7158e2";
		password_e.style.backgroundColor = "rgb(63, 63, 63)";
		rank_e.style.backgroundColor = "rgb(63, 63, 63)";
		last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
		preferencias_e.style.backgroundColor = "rgb(63, 63, 63)";
	}
	function password() {
		setMenuOption("Password");

		geral_e = document.getElementById("Geral");
		password_e = document.getElementById("Password");
		rank_e = document.getElementById("Rank");
		last_games_e = document.getElementById("Last_Games");
		preferencias_e = document.getElementById("Preferencias");

		geral_e.style.backgroundColor = "rgb(63, 63, 63)";
		password_e.style.backgroundColor = "#7158e2";
		rank_e.style.backgroundColor = "rgb(63, 63, 63)";
		last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
		preferencias_e.style.backgroundColor = "rgb(63, 63, 63)";
	}
	function rank() {
		setMenuOption("Rank");

		geral_e = document.getElementById("Geral");
		password_e = document.getElementById("Password");
		rank_e = document.getElementById("Rank");
		last_games_e = document.getElementById("Last_Games");
		preferencias_e = document.getElementById("Preferencias");

		geral_e.style.backgroundColor = "rgb(63, 63, 63)";
		password_e.style.backgroundColor = "rgb(63, 63, 63)";
		rank_e.style.backgroundColor = "#7158e2";
		last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
		preferencias_e.style.backgroundColor = "rgb(63, 63, 63)";
	}
	function last_games() {
		setMenuOption("lastgames");

		geral_e = document.getElementById("Geral");
		password_e = document.getElementById("Password");
		rank_e = document.getElementById("Rank");
		last_games_e = document.getElementById("Last_Games");
		preferencias_e = document.getElementById("Preferencias");

		geral_e.style.backgroundColor = "rgb(63, 63, 63)";
		password_e.style.backgroundColor = "rgb(63, 63, 63)";
		rank_e.style.backgroundColor = "rgb(63, 63, 63)";
		last_games_e.style.backgroundColor = "#7158e2";
		preferencias_e.style.backgroundColor = "rgb(63, 63, 63)";
	}
	function preferencias() {
		setMenuOption("Preferencias");

		geral_e = document.getElementById("Geral");
		password_e = document.getElementById("Password");
		rank_e = document.getElementById("Rank");
		last_games_e = document.getElementById("Last_Games");
		preferencias_e = document.getElementById("Preferencias");

		geral_e.style.backgroundColor = "rgb(63, 63, 63)";
		password_e.style.backgroundColor = "rgb(63, 63, 63)";
		rank_e.style.backgroundColor = "rgb(63, 63, 63)";
		last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
		preferencias_e.style.backgroundColor = "#7158e2";
	}

	return (
		<div className="hero-container">
			<div className="row profile-border profile-container">
				<div className="col-lg-3 side">
					<button
						className="side-button box foo"
						type="button"
						onClick={geral}
						id="Geral"
						style={{ backgroundColor: "#7158e2", color: "white" }}
					>
						Geral
					</button>
					<button
						className="side-button box foo"
						type="button"
						onClick={password}
						id="Password"
					>
						Password
					</button>
					<button
						className="side-button box foo"
						type="button"
						onClick={rank}
						id="Rank"
					>
						Rank
					</button>
					<button
						className="side-button box foo"
						type="button"
						onClick={last_games}
						id="Last_Games"
					>
						Ultimos Jogos
					</button>
					<button
						// className="side-button box foo push "'
						className="side-button box-down foo push-down "
						type="button"
						onClick={preferencias}
						id="Preferencias"
					>
						Preferencias
					</button>
				</div>
				{menuOption === "Geral" && (
					<div className="col-lg-9 no-margins ">
						<div className="container profile container-hidden">
							<img
								src={
									process.env.PUBLIC_URL +
									"/images/user-profile.png"
								}
								alt="profile_image"
							/>
							<div className="inputs">
								<div className="input-field_profile">
									<input
										type="text"
										value="Username"
										readOnly
									/>
								</div>
								<div className="input-field_profile">
									<input type="text" value="Email" readOnly />
								</div>
								<div className="input-field_profile">
									<input type="text" value="Nivel" readOnly />
								</div>
								<div className="input-field_profile">
									<input type="text" value="Rank" readOnly />
								</div>
							</div>
						</div>
					</div>
				)}

				{menuOption === "Password" && (
					<div className="col-lg-9 no-margins">
						<div className="container profile">
							<div className="input-field_profile">
								<input type="text" value="Password" readOnly />
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Password Nova"
									readOnly
								/>
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Confirmar Password Nova"
									readOnly
								/>
							</div>
						</div>
					</div>
				)}

				{menuOption === "Rank" && (
					<div className="col-lg-9 no-margins">
						<div className="container profile">
							<div className="input-field_profile">
								<input type="text" value="Password" readOnly />
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Password Nova"
									readOnly
								/>
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Confirmar Password Nova"
									readOnly
								/>
							</div>
						</div>
					</div>
				)}

				{menuOption === "lastgames" && (
					<div className="col-lg-9 no-margins">
						<div className="last_games_container">
							<ul className="responsive-table">
								<li className="table-header">
									<div className="col col-2">Data</div>
									<div className="col col-2">Jogo</div>
									<div className="col col-2">Resultado</div>
									<div className="col col-2">Exp. Ganha</div>
									<div className="col col-2">Detalhes</div>
								</li>
								{Object.entries(lastgames_test).map(
									([key, value]) => (
										<li
											className={
												value["result"] === "Vitoria"
													? "won table-row history-box foo-history-win"
													: "lost table-row history-box foo-history-lose"
											}
											key={key}
										>
											<div className="col col-2">
												{value["date"]}
											</div>
											<div className="col col-2">
												{value["game"]}
											</div>
											<div className="col col-2">
												{value["result"]}
											</div>
											<div className="col col-2">
												+{value["exp"]}
											</div>
											<div className="col col-2">
												<button
													className={
														value["result"] ===
														"Vitoria"
															? "won-button table-row"
															: "lost-button table-row"
													}
												>
													Detalhes
												</button>
											</div>
										</li>
									)
								)}
							</ul>
						</div>
					</div>
				)}

				{menuOption === "Preferencias" && (
					<div className="col-lg-9 no-margins">
						<div className="container profile">
							<div className="input-field_profile">
								<input type="text" value="Password" readOnly />
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Password Nova"
									readOnly
								/>
							</div>
							<div className="input-field_profile">
								<input
									type="text"
									value="Confirmar Password Nova"
									readOnly
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
