import React from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";


var game_id = 0;
var game_mode = "1vs1";
var ai_diff = "medium";


function Game() {
    let history = useHistory()
    var params = history.location.state

    if (params !== undefined) {
        game_id = parseInt(params.game_id);
        game_mode = params.game_mode;
        ai_diff = params.ai_diff
    }
    console.log("tou aqui")
    console.log(ai_diff)
    console.log(game_mode)
    

    if ( game_id === 0 ) {
        return (
            <div>
                <RastrosEngine game_mode={game_mode} ai_diff={ai_diff}></RastrosEngine>
            </div>
        );
    }
    if ( game_id === 1 ) {
        return (
            <div>
                <GatosCaesEngine game_mode={game_mode} ai_diff={ai_diff}></GatosCaesEngine>
            </div>
        );
    }

    
   
    
    
}



export default Game;