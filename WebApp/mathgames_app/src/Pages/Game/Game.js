import React from "react";

// import { Link } from "react-router-dom";

import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/RastrosEngine";

function Game() {
    return (

        <div >
            <RastrosEngine></RastrosEngine>
        </div>
    );
}

export default Game;
