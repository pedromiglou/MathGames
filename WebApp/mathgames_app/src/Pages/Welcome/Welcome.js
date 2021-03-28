import React from "react";
import { Button } from "../../Components/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";

function Welcome() {
    return (
        <div className="hero-container">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="carousel-caption">
                            <h1>
                                Bem vindo ao{" "}
                                <strong className="">MathGames</strong>
                            </h1>
                            <p style={{ marginTop: "50px" }}>
                                Sejam muito bem-vindos à plataforma MathGames.
                                Aqui podem encontrar vários jogos matemáticos
                                para jogarem e se divertirem. Podem jogar
                                competitivamente, criar torneios, jogar com
                                amigos entre outras coisas. Esperemos que se
                                divirtam!
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div
                            className=""
                            style={{
                                paddingTop: "85px",
                                maxWidth: "100%",
                                height: "auto",
                            }}
                        >
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
                        <div className="row mobile">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div id="container">
                                    <div className="hero-btns">
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
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mobile_buttons">
                                <div className="row">
                                    <p> outras fotos aqui</p>
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
