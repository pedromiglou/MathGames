import React from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js"

import "./ChooseGame.css"
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGameMode() {
    return (
        <div className="games-list">
            <h1> Escolhe um Jogo !</h1>
            <GamesList />
        </div>
    );
}

export default ChooseGameMode;
