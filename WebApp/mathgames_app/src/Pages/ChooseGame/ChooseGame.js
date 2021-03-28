import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGame() {
    return (
        <div className="hero-container">
            <div className="header">
                <h1>Escolhe um jogo!</h1>
            </div>

            <div className="container display-games">
                <div className="row">
                    <div className="col">
                        <figure>
                            <Link
                                to={{
                                    pathname: "mode",
                                    aboutProps: { game: "rastros" },
                                }}
                            >
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseGame;
