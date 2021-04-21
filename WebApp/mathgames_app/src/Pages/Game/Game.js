import React from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";


function Game()  {
    /* */
    let history = useHistory()
    var params = history.location.state

    var game_id = parseInt(params.game_id);
    var game_mode = params.game_mode;
    var ai_diff = params.ai_diff
    /* */
    
    /*  // To test, uncomment these lines and comment the block above
    var game_id = 0;
    var game_mode = "offline";
    var ai_diff = "easy";
    */

    if ( game_id === 0 ) {
        return (
            <div>
                <RastrosEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff}></RastrosEngine>
            </div>
        );
    }
    if ( game_id === 1 ) {
        return (
            <div>
                <GatosCaesEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff}></GatosCaesEngine>
            </div>
        );
    }
    
}

export default Game;