import React, { useRef } from "react";
import { GameOverModal } from '../../Components/GameOverModal';
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";


function Game()  {
    let current_match = useRef(null);
    const childRef = useRef();

    let history = useHistory()
    var params = history.location.state
    var game_id, game_mode, ai_diff;

    game_id = parseInt( params.game_id );
    game_mode = params.game_mode;
    ai_diff = params.ai_diff;
    current_match.current = params.match;

    function processGameOver(msg) {
        childRef.current.processGameOver(msg, game_id)
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
                    {game_id===0 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1100px', height: '577px'}}>
                            <RastrosEngine process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></RastrosEngine>
                        </div>
                    }
                    {game_id===1 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1200px', height: '624px'}}>
                            <GatosCaesEngine process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></GatosCaesEngine>
                        </div>
                    }
                </div>
            </div>
            <GameOverModal ref={childRef}></GameOverModal>
        </div>
    );
}


export default Game;