import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
    const [menuOption, setMenuOption] = useState("Geral");

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

        geral_e.style.backgroundColor = "black";
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
        password_e.style.backgroundColor = "black";
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
        rank_e.style.backgroundColor = "black";
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
        last_games_e.style.backgroundColor = "black";
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
        preferencias_e.style.backgroundColor = "black";
    }

    return (
        <div className="hero-container">
            <div className="row container border">
                <div className="col-lg-3 side">
                    <button
                        className="side-button"
                        type="button"
                        onClick={geral}
                        id="Geral"
                        style={{backgroundColor: "black"}}
                    >
                        Geral
                    </button>
                    <button
                        className="side-button"
                        type="button"
                        onClick={password}
                        id="Password"
                    >
                        Password
                    </button>
                    <button
                        className="side-button"
                        type="button"
                        onClick={rank}
                        id="Rank"
                    >
                        Rank
                    </button>
                    <button
                        className="side-button"
                        type="button"
                        onClick={last_games}
                        id="Last_Games"
                    >
                        Ultimos Jogos
                    </button>
                    <button
                        className="side-button push-down"
                        type="button"
                        onClick={preferencias}
                        id="Preferencias"
                    >
                        Preferencias
                    </button>
                </div>
                {menuOption === "Geral" && (
                    <div className="col-lg-9 no-margins">
                        <div className="container profile">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/user-profile.png"
                                }
                                alt="profile image"
                            />
                            <div className="input-field_profile">
                                <input type="text" value="Username" readOnly />
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
