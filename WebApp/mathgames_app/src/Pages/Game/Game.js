import React, {useState, useEffect} from "react";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";


function Game() {



    var game = "rastros";
    var game_mode = "AI";

    if ( game === "rastros" )
        return (
            <div>           
                <RastrosEngine game_type={game_mode}></RastrosEngine>
            </div>
        );
    if ( game === "gatoscaes" )
        return (
            <div>
                <GatosCaesEngine game_type={game_mode}></GatosCaesEngine>
            </div>
        );
}

export default Game;