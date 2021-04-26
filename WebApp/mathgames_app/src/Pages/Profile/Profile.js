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
    var inventario_e;
    var last_games_e;

    function geral() {
        setMenuOption("Geral");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "#7158e2";
        inventario_e.style.backgroundColor = "rgb(63, 63, 63)";
        last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
    }
    function inventario() {
        setMenuOption("Inventario");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "rgb(63, 63, 63)";
        inventario_e.style.backgroundColor = "#7158e2";
        last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
    }
    function last_games() {
        setMenuOption("lastgames");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "rgb(63, 63, 63)";
        inventario_e.style.backgroundColor = "rgb(63, 63, 63)";
        last_games_e.style.backgroundColor = "#7158e2";
    }

    return (
        <div className="hero-container">
            <div className="header">
                <div className="background">
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                </div>
            </div>
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
                        className="side-button-2 box foo"
                        type="button"
                        onClick={inventario}
                        id="Inventario"
                    >
                        Inventario
                    </button>
                    <button
                        className="side-button-3 box foo"
                        type="button"
                        onClick={last_games}
                        id="Last_Games"
                    >
                        Ultimos Jogos
                    </button>
                </div>
                {menuOption === "Geral" && (
                    <div className="col-lg-9 no-margins profile ">
                        <div className="container row container-hidden top-profile">
                            <div className="col-lg-8 row">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/user-profile.png"
                                    }
                                    alt="profile_image"
                                />
                                <div className="account-name">
                                    <h1>Nome</h1>
                                </div>
                            </div>
                            <div className="col-lg-4 profile-level">
                                <p className="lvl"> Nivel </p>
                                <div className="lvl-style row">
                                    <div className="col-lg-2">
                                        <p>1</p>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="progress">
                                            <div
                                                className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                                role="progressbar"
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: "50%" }}
                                            >
                                                {/* <span>Dificuldade</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <p>2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="solid" />
                        <div className="row profile-games">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                alt="game_image"
                            />
                            <div className="game-name">
                                <p>Jogo</p>
                            </div>
                        </div>
                        <hr class="solid solid-pos" />
                        <div className="row profile-games">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                alt="game_image"
                            />
                            <div className="game-name">
                                <p>Jogo</p>
                            </div>
                        </div>
                        <hr class="solid solid-pos" />
                        <div className="row profile-games">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                alt="game_image"
                            />
                            <div className="game-name">
                                <p>Jogo</p>
                            </div>
                        </div>
                    </div>
                )}

                {menuOption === "Inventario" && (
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
            </div>
        </div>
    );
};

export default Profile;
