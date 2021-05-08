import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";
import socket from "../../index"

function Game()  {
    const [game_ready_to_start, setReady] = useState(false);
    const url = new URLSearchParams(window.location.search);
	let match_id = url.get("id");

    let history = useHistory()
    var params = history.location.state
    var game_id, game_mode, ai_diff;


    if ( match_id !== null ) {
        game_id = parseInt( url.get("g") );
        game_mode = "amigo";
        ai_diff = undefined;
    }
    else {
        if (params !== undefined) {
            game_id = parseInt( params.game_id );
            game_mode = params.game_mode;
            ai_diff = params.ai_diff;
        }
    }

    // Game is ready to start when both players are connected
    if ( game_ready_to_start === false ) {
        if ( match_id !== null ) {
            game_mode = "amigo"
            socket.emit("entered_link", {"user_id": sessionStorage.getItem("user_id"), "match_id": match_id, "game_id": game_id})

            socket.on("match_found", (msg) => {
                sessionStorage.setItem('match_id', msg['match_id']);
                sessionStorage.setItem('starter', msg['starter']);
                setReady(true)
            })
        } else {
            setReady(true)
        }
        return (
            <div>
                <h1>Waiting for game...</h1>
            </div>
        );
    } else {
        if ( game_id === 0 ) {
            return (
                <div class="container container-main">
                    <div id="my_div_game" class="container-canvas mt-3" style={{width: '1100px', height: '577px'}}>
                        <canvas id="game_canvas" className="game"></canvas>
                        <RastrosEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff}></RastrosEngine>
                    </div>
                </div>
            );
        }
        if ( game_id === 1 ) {
            return (
                <div class="container container-main">
                    <div id="my_div_game" class="container-canvas mt-2" style={{width: '1200px', height: '624px'}}>
                        <canvas id="game_canvas" className="game"></canvas>
                        <GatosCaesEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff}></GatosCaesEngine>
                    </div>
                </div>
            );
        }
    }
    
}

export default Game;