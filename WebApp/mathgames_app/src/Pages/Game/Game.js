import React from "react";

// import { Link } from "react-router-dom";

import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/RastrosEngine";
import GatosCaesEngine from "../../Components/GatosCaesEngine";

function Game() {
    return (

        <div >
            <GatosCaesEngine tipo="Off"></GatosCaesEngine>
        </div>
    );
}

export default Game;
