import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./GamePage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { games_info } from "../../data/GamesInfo";

//vamos ter de arranjar uma maneira de verificar o jogo guardado no useState para quando clicar no jogar ir para o jogo certo
function GamePage() {
    //De alguma maneira verificar se estiver vazio
    const [gameMode, setGameMode] = useState("");
    //Depois aqui podemos meter conforme as preferencias no perfil
    const [AIdif, setAIdif] = useState("");

    const dif_options = [
        { label: "easy", value: "easy" },
        { label: "medium", value: "medium" },
        { label: "hard", value: "hard" },
    ];

    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    const game_info = games_info[id];

    function changeMode(val) {
        setGameMode(val);
        if (val === "AI") {
            showDif();
        } else {
            hideDif();
        }
    }

    function changeDif(e) {
        var dif = e.target.value;
        setAIdif(dif);
    }

    function showDif() {
        var x = document.getElementById("sel_dif");
        x.style.display = "block";
    }

    function hideDif() {
        var x = document.getElementById("sel_dif");
        x.style.display = "none";
    }

    let history = useHistory();

    return (
        <>
            <div className="container choose-game-mode-container">
                <div className="row">
                    <div className="col-lg-4 game-details">
                        <h1> Yote </h1>
                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                "/images/mathGames.png"
                                            }
                                            alt="Info"
                                            className="rank-img"
                                        />
                        <p className="game-details-p">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                        <div className="col-lg-12 game-caracteristics">
                            <p> Caracteristicas </p>
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                    role="progressbar"
                                    aria-valuenow="75"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: "50%" }}
                                >
                                    <span>Dificuldade</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 player-info-and-modes">
                        <div className="col-lg-12 player-rank">
                            <div className="row">
                                <div className="col-lg-6 set-padding centered">
                                    <div>
                                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                "/images/mathGames.png"
                                            }
                                            alt="Info"
                                            className="rank-img"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 no-padding center-progress-bar">
                                    <p>Nivel</p>
                                    <div className="row no-margin">
                                        <div className="col-lg-2 lvl-left">
                                            <p>99</p>
                                        </div>
                                        <div className="col-lg-8 center-progress-bar">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                                    role="progressbar"
                                                    aria-valuenow="75"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: "70%" }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 lvl-right">
                                            <p>100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 border">
                            <div className="row">
                                <div className="col-lg-6 centered set-padding">
                                    <Card className="mode-card">
                                        <Route>
                                            <Link to={"game"}>
                                                <div>
                                                    <img
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            "/images/mathGames.png"
                                                        }
                                                        alt="Info"
                                                        className="game-mode-card"
                                                    />
                                                    <span className="above-type-img">
                                                        Competitivo
                                                    </span>
                                                </div>
                                            </Link>
                                        </Route>
                                    </Card>
                                </div>
                                <div className="col-lg-6 centered set-padding">
                                    <Card className="mode-card">
                                        <Route>
                                            <Link to={"game"}>
                                                <div>
                                                    <img
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            "/images/mathGames.png"
                                                        }
                                                        alt="Info"
                                                        className="game-mode-card"
                                                    />
                                                    <span className="above-type-img">
                                                        1vs1
                                                    </span>
                                                </div>
                                            </Link>
                                        </Route>
                                    </Card>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 centered set-padding">
                                    <Card className="mode-card">
                                        <Route>
                                            <Link to={"game"}>
                                                <div>
                                                    <img
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            "/images/mathGames.png"
                                                        }
                                                        alt="Info"
                                                        className="game-mode-card"
                                                    />
                                                    <span className="above-type-img">
                                                        Convidar Amigo
                                                    </span>
                                                </div>
                                            </Link>
                                        </Route>
                                    </Card>
                                </div>
                                <div className="col-lg-6 centered set-padding">
                                    <Card className="mode-card">
                                        <Route>
                                            <Link to={"game"}>
                                                <div>
                                                    <img
                                                        src={
                                                            process.env
                                                                .PUBLIC_URL +
                                                            "/images/mathGames.png"
                                                        }
                                                        alt="Info"
                                                        className="game-mode-card"
                                                    />
                                                    <span className="above-type-img">
                                                        1vs1
                                                    </span>
                                                </div>
                                            </Link>
                                        </Route>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePage;
