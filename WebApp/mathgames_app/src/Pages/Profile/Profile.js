import { React, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
    const [menuOption, setMenuOption] = useState("Geral");

    function geral() {
        setMenuOption("Geral");

        //e.target.style.backg
    }
    function password() {
        setMenuOption("Password");
    }
    function rank() {
        setMenuOption("Rank");
    }

    return (
        <div className="hero-container">
            <div className="row container border">
                <div className="col-lg-3 side">
                    <button
                        className="side-button"
                        type="button"
                        onClick={geral}
                    >
                        Geral
                    </button>
                    <button
                        className="side-button"
                        type="button"
                        onClick={password}
                    >
                        Password
                    </button>
                    <button
                        className="side-button"
                        type="button"
                        onClick={rank}
                    >
                        Rank
                    </button>
                    <button className="side-button" type="button">
                        Ultimos Jogos
                    </button>
                    <button className="side-button push-down" type="button">
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
            </div>
        </div>
    );
};

export default Profile;
