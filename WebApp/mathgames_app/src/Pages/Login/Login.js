import { React, useState } from "react";
import { FaBeer } from "react-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

/* const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container"); */

// sign_up_btn.addEventListener("click", () => {
// 	container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
// container.classList.remove("sign-up-mode");
// });

function Login() {
	const [signIn, setSignIn] = useState(true);

	function toggle_sign_up() {
		setSignIn(!signIn);

		if (signIn === true) {
			console.log("if");

			var toggle_side = document.getElementById("toggle_side");
			var toggle_side_width = toggle_side.clientWidth;

			var signup_id = document.getElementById("signup_id");
			var signup_id_width = signup_id.clientWidth;

			var signin_id = document.getElementById("signin_id");
			signin_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
			signup_id.style.transform = `translate(-${toggle_side_width}px, 0px)`;
			signup_id.style.zIndex = "0";

			toggle_side.style.transform = `translate(${signup_id_width}px, 0px)`;
		} else {
			console.log("else");
			var toggle_side = document.getElementById("toggle_side");
			toggle_side.style.transform = `translate(0px, 0px)`;

			var signin_id = document.getElementById("signin_id");
			signin_id.style.transform = `translate(0px, 0px)`;

			var signup_id = document.getElementById("signup_id");
			signup_id.style.transform = `translate(0px, 0px)`;
			signup_id.style.zIndex = "-1";
		}
	}

	return (
		<div className="container">
			<div className="forms-container">
				<div
					id="signin_id"
					className={signIn ? "signin" : "signin"}
					style={{ zIndex: "1px" }}
				>
					<form action="#" className="sign-in-form">
						<h2 className="title">Sign in</h2>
						<div className="input-field">
							<i className="fas fa-user"></i>
							<input type="text" placeholder="Username" />
						</div>
						<div className="input-field">
							<i className="fas fa-lock"></i>
							<input type="password" placeholder="Password" />
						</div>
						<input
							type="submit"
							value="Login"
							className="btn solid"
						/>
					</form>
				</div>

				<div id="signup_id" className="signup">
					<form action="#" className="sign-in-form">
						<h2 className="title">Sign up</h2>
						<div className="input-field">
							<i className="fas fa-user"></i>
							<input type="text" placeholder="Username" />
						</div>
						<div className="input-field">
							<i className="fas fa-user"></i>
							<input type="email" placeholder="Email" />
						</div>
						<div className="input-field">
							<i className="fas fa-lock"></i>
							<input type="password" placeholder="Password" />
						</div>
						<input
							type="submit"
							value="Login"
							className="btn solid"
						/>
					</form>
				</div>

				<div className="signin-side" id="toggle_side">
					<button
						className="btn transparent"
						onClick={toggle_sign_up}
					>
						{signIn ? "Registe-se" : "Iniciar Sessao" }
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
