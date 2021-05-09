import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";
import "./Welcome.scss";

function Welcome() {
    return (
        <>
            <div className="header">
                <div className="background">
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                    <div className="cube"></div>
                </div>
            </div>
            <div className="hero-container"> {/* sliding */}
                <div className="container container-position-fix">
                    <div className="row margin-welcome">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="hero-text">
                                <h1 className="welcome-title">
                                    Bem vindo ao{" "}
                                    {/* <strong className="title">MathGames</strong> */}
                                </h1>
                                <p className="popout">
                                    <span>M</span>
                                    <span>A</span>
                                    <span>T</span>
                                    <span>H</span>
                                    <span>G</span>
                                    <span>A</span>
                                    <span>M</span>
                                    <span>E</span>
                                    <span>S</span>
                                    <span>!</span>
                                </p>
                                <div className="description">
                                    <p>
                                        Sejam muito bem-vindos à plataforma
                                        MathGames. Aqui podem encontrar vários
                                        jogos matemáticos para jogarem e se
                                        divertirem. Podem jogar
                                        competitivamente, criar torneios, jogar
                                        com amigos entre outras coisas.
                                        Esperemos que se divirtam!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-0 col-sm-0">
                            <div className="welcome-img">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/header_img.png"
                                    }
                                    alt="logo"
                                />
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-left">
                                    {/* <a className="play-now">JOGAR AGORA!</a>
									<Link to="/gamesDashboard">JOGAR AGORA!</Link> */}
                                    {/* <div className="wrapper">
										<a className="cta" href="#">
											<span>JOGAR AGORA!</span>
											
										</a>
									</div> */}
                                    <div id="container">
                                        <Link to="/gamesDashboard">
                                            <button className="learn-more slide-up-btn">
                                                <span
                                                    className="circle"
                                                    aria-hidden="true"
                                                >
                                                    <span className="icon arrow"></span>
                                                </span>
                                                <span className="button-text">
                                                    JOGAR AGORA!
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                    {/* 
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
									*/}
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
            {/* <div className="overlay"></div> */}
        </>
    );
}

export default Welcome;
