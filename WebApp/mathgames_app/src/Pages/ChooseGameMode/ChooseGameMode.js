import React from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js"

import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGameMode() {
    return (
        <>
            <h1>Game mode</h1>
            <GamesList />
        </>
    );
}

export default ChooseGameMode;
