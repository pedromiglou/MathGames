import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";
import socket from "../../index"
import AuthService from '../../Services/auth.service';

import * as FaIcons from "react-icons/fa";
import {IconContext} from 'react-icons';

import { useDispatch } from 'react-redux';
import { addMatch } from '../../store/modules/matches/actions';

import { EndGameStatements } from '../../data/EndGameStatements';

function Game()  {
    //const games_list = useSelector(state => state.matchApp);
    const dispatch = useDispatch();
    let current_match = useRef(null);

    //var user = AuthService.getCurrentUser();
    const [game_ready_to_start, setReady] = useState(false);
    const [finishMatchModalShow, setFinishMatchModalShow] = useState(false);
    const [endGameMessage, setEndGameMessage] = useState("");
    
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
        game_id = parseInt( params.game_id );
        game_mode = params.game_mode;
        ai_diff = params.ai_diff;
        current_match.current = params.match;
    }

    function copy() {
        var link = document.getElementById("link");
        
        link.select();
        link.setSelectionRange(0, 99999); /* For mobile devices */

        document.execCommand("copy");

        /* Alert the copied text */
        alert("O link foi copiado!");
    }

    socket.off("match_end");
    socket.on("match_end", (msg) => {
        console.log("Finished game1")
        setEndGameMessage(msg);
        console.log(msg)
        setFinishMatchModalShow(true);
        
    });

    function FinishMatchModal(props) {
        console.log("Finished game2")
        console.log(endGameMessage)
        return (
            <Modal {...props} size="md" centered>
                <Modal.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Modal.Title style={{color: "#0056b3", fontSize: 30}}>
                        Jogo Terminado!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{color: "#0056b3", fontSize: 20}}>
                        Resultado: 
                        { endGameMessage["match_result"]==="win" &&
                            <span>
                                Vitória! <span className="smiley-happy"></span>
                                <br/>
                                { endGameMessage["endMode"]==="timeout" && EndGameStatements["win"]["timeout"] }
                                { endGameMessage["endMode"]==="valid_move" && EndGameStatements["win"][game_id] }
                                { endGameMessage["endMode"]==="invalid_move" && EndGameStatements["win"]["invalidMove"] }
                            </span>
                        }
                        { endGameMessage["match_result"]==="loss" &&
                            <span>
                                Derrota. <span className="smiley-sad"></span>
                                <br/>
                                { endGameMessage["endMode"]==="timeout" && EndGameStatements["loss"]["timeout"] }
                                { endGameMessage["endMode"]==="valid_move" && EndGameStatements["loss"][game_id] }
                                { endGameMessage["endMode"]==="invalid_move" && EndGameStatements["loss"]["invalidMove"] }
                            </span>
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button onClick={() => history.push("/gamePage?id=" + game_id)} className="btn btn-warning" style={{color: "#0056b3", fontSize: 20}}>Voltar à página de jogo</button>
                </Modal.Footer>
            </Modal>
        );
    }

    // Game is ready to start when both players are connected
    if ( game_ready_to_start === false ) {
        if ( match_id !== null ) {
            socket.emit("entered_link", {"user_id": AuthService.getCurrentUserId(), "match_id": match_id, "game_id": game_id})

            socket.once("match_found", (msg) => {
                console.log("Match Found")
                
                let match = { match_id: msg['match_id'], player1: msg['player1'], player2: msg['player2'] };
                current_match.current = match;
                dispatch( addMatch(match) );
                
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
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 mt-4">
                        <div className="row h-75 d-flex justify-content-center">
                            <div className="col">
                                <div className="row d-flex justify-content-center">
                                    <h5>Player 2</h5>
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <h5 className="name-text">{current_match.current['player2']}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row h-25 d-flex justify-content-center">
                            <div className="col">
                                <div className="row d-flex justify-content-center">
                                <h5>Player 1</h5>
                                </div>
                                <div className="row d-flex justify-content-center">
                                <h5 className="name-text">{current_match.current['player1']}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        {game_id===0 &&
                            <div id="my_div_game" className="container-canvas" style={{width: '1100px', height: '577px'}}>
                                <RastrosEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></RastrosEngine>
                            </div>
                        }
                        {game_id===1 &&
                            <div id="my_div_game" className="container-canvas" style={{width: '1200px', height: '624px'}}>
                                <GatosCaesEngine arg_game_mode={game_mode} arg_ai_diff={ai_diff}></GatosCaesEngine>
                            </div>
                        }
                    </div>
                </div>
                <FinishMatchModal show={finishMatchModalShow} onHide={() => setFinishMatchModalShow(false)}/>
            </div>
        );
    }
}


export default Game;