import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";
import socket from "../../index"

var game_id = 0;
var game_mode = "1vs1";
var ai_diff = "medium";

function Game() {
    console.log("user_id:")
    console.log(sessionStorage.getItem('user_id'))

    const [game_ready_to_start, changeReady] = useState(false);

    const url = new URLSearchParams(window.location.search);
	let match_id = url.get("id");
    
    let history = useHistory()
    var params = history.location.state
    if (params !== undefined) {
        game_id = parseInt(params.game_id);
        game_mode = params.game_mode;
        ai_diff = params.ai_diff;
    }

    console.log("tou reload pagina")
    if (game_ready_to_start === false) {
        console.log("jogo nao esta ready")
        if (match_id !== null) {
            //Jogo entre amigos nao logados por link
            game_mode = "Amigo"
            socket.emit("entered_link", {"user_id": sessionStorage.getItem("user_id"), "match_id": match_id})

            socket.on("match_found", (msg) => {
                console.log("recebi match pronta")
                console.log("Match starting!");
                sessionStorage.setItem('match_id', msg['match_id']);
                sessionStorage.setItem('starter', msg['starter']);
                changeReady(true)
            })
        } else {
            console.log("jogo nao de amigos")
            changeReady(true)
        }
        return (
            <div>
                <h1>Waiting for game...</h1>
            </div>
        );
    } else {
        console.log("vamos jogar")
        
        
    
        
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



    
   
    
    
}



export default Game;