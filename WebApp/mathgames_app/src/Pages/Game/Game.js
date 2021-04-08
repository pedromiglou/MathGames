import React from "react";

// import { Link } from "react-router-dom";

import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/RastrosEngine";
import RastrosAIEngine from "../../Components/RastrosAIEngine";


function Game() {
    return (

        <div >
            <RastrosEngine tipo="Off"></RastrosEngine>
        </div>
    );
}

export default Game;
