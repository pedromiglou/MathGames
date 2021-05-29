import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";

import { EndGameStatements } from '../../data/EndGameStatements';

function Game()  {
    console.log("Passei aqui")
    //const games_list = useSelector(state => state.matchApp);
    let current_match = useRef(null);

    const [finishMatchModalShow, setFinishMatchModalShow] = useState(false);
    const [endGameMessage, setEndGameMessage] = useState("");

    let history = useHistory()
    var params = history.location.state
    var game_id, game_mode, ai_diff;

    game_id = parseInt( params.game_id );
    game_mode = params.game_mode;
    ai_diff = params.ai_diff;
    current_match.current = params.match;

    function processGameOver(msg) {
        setEndGameMessage(msg);
        setFinishMatchModalShow(true);
    }

    function FinishMatchModal(props) {
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
                                { endGameMessage["end_mode"]==="timeout" && EndGameStatements["win"]["timeout"] }
                                { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["win"][game_id][endGameMessage["extra"]] }
                                { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["win"]["invalidMove"] }
                            </span>
                        }
                        { endGameMessage["match_result"]==="loss" &&
                            <span>
                                Derrota. <span className="smiley-sad"></span>
                                <br/>
                                { endGameMessage["end_mode"]==="timeout" && EndGameStatements["loss"]["timeout"] }
                                { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["loss"][game_id][endGameMessage["extra"]] }
                                { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["loss"]["invalidMove"] }
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
                    {!finishMatchModalShow && game_id===0 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1100px', height: '577px'}}>
                            <RastrosEngine process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></RastrosEngine>
                        </div>
                    }
                    {!finishMatchModalShow && game_id===1 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1200px', height: '624px'}}>
                            <GatosCaesEngine process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></GatosCaesEngine>
                        </div>
                    }
                </div>
            </div>
            <FinishMatchModal show={finishMatchModalShow} onHide={() => setFinishMatchModalShow(false)}/>
        </div>
    );
}


export default Game;