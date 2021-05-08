import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";
import socket from "../../index"
import AuthService from '../../Services/auth.service';

import { Card } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import {IconContext} from 'react-icons';


function Game()  {
    var user = AuthService.getCurrentUser();
    const [game_ready_to_start, setReady] = useState(false);
    
    const url = new URLSearchParams(window.location.search);
	let match_id = url.get("id");

    let history = useHistory()
    var params = history.location.state
    var game_id, game_mode, ai_diff;

    if ( match_id !== null ) {
        //FriendByLink
        game_id = parseInt( url.get("g") );
        game_mode = "amigo";
        ai_diff = undefined;
    }
    else {
        game_id = parseInt( params.game_id );
        game_mode = params.game_mode;
        ai_diff = params.ai_diff;
    }

    function copy() {
        var link = document.getElementById("link");
        
        link.select();
        link.setSelectionRange(0, 99999); /* For mobile devices */

        document.execCommand("copy");

        /* Alert the copied text */
        alert("O link foi copiado!");
    }

    console.log(game_ready_to_start)
    console.log(match_id)
    console.log(match_id == null)
    console.log(user === null)
    // Game is ready to start when both players are connected
    if ( game_ready_to_start === false ) {
        if ( match_id !== null ) {
            if (user === null)
                socket.emit("entered_link", {"user_id": sessionStorage.getItem("user_id"), "match_id": match_id, "game_id": game_id})
            else
                socket.emit("entered_link", {"user_id": String(user.id), "match_id": match_id, "game_id": game_id})

            socket.on("match_found", (msg) => {
                console.log("Match_Found")
                sessionStorage.setItem('match_id', msg['match_id']);
                sessionStorage.setItem('starter', msg['starter']);
                console.log("foiaqui1")
                setReady(true)
            })
        } else {
            setReady(true)
        }
        return (
            <div className="col-lg-12 link-geral-position">
                <IconContext.Provider  value={{color: 'white'}}>
                    
                    <div className="link-card">
                        <h2>Copia o link para convidar alguém!</h2>
                        <hr className="link-hr"></hr>
                        <div className="bottom-link row">
                            <input readOnly={true} className="link" id="link" value={"http://localhost:3000/game/?"+url.toString()}></input>
                            <div className="div-link-button">
                                <button id="button-copy" className="button-copy" onClick={() => copy()}><i className="copy-icon"><FaIcons.FaCopy/></i></button>
                            </div>
                        </div>
                    </div>
                    
                </IconContext.Provider>
            </div>
        );
    } else {
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
    
}


export default Game;

