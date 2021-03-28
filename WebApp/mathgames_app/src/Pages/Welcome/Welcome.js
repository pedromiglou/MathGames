import React from "react";
import { Button } from "../../Components/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";

function Welcome() {
	return (
		<div className="hero-container">
			<div className="container container-position-fix">
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
						<div className="hero-text">
							<h1>
								Bem vindo ao{" "}
								<strong className="title">MathGames</strong>
							</h1>
							<p>
								Sejam muito bem-vindos à plataforma MathGames.
								Aqui podem encontrar vários jogos matemáticos
								para jogarem e se divertirem. Podem jogar
								competitivamente, criar torneios, jogar com
								amigos entre outras coisas. Esperemos que se
								divirtam!
							</p>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-0 col-sm-0">
						<div className="img">
							<figure>
								<img
									src={
										process.env.PUBLIC_URL +
										"/images/mathGames.png"
									}
									alt="logo"
								/>
							</figure>
						</div>
					</div>
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
						<div className="row">
							<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-left">
								<Button
									className="btns"
									buttonStyle="btn--primary"
									buttonSize="btn--large"
									address="/choose"
									routing="Link"
								>
									JOGAR AGORA!{" "}
									<i className="far fa-play-circle" />
								</Button>
							</div>
							<div className="half container col-xl-6 col-lg-6 col-md-8 col-sm-12">
								<div className="row">
									<div className="half container align-right">
										<figure>
											<img
												className="mobile-icons"
												src={
													process.env.PUBLIC_URL +
													"/images/android.png"
												}
												alt="android"
											/>
										</figure>
									</div>
									<div className="half container">
										<figure>
											<img
												className="mobile-icons"
												src={
													process.env.PUBLIC_URL +
													"/images/ios.png"
												}
												alt="ios"
											/>
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Welcome;
