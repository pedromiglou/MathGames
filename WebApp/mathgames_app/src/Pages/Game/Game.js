import React, { useRef } from "react";
import { GameOverModal } from '../../Components/GameOverModal';
import { useHistory } from "react-router-dom";
import "./Game.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socket from "../../index";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";
import { GameTimer } from '../../Components/GameTimer';
import PlayerCard from "../../Components/PlayerCard/PlayerCard";

function Game()  {
    // Clear listeners to make sure there are no repeated events
    socket.off("match_end");

    let current_match = useRef(null);
    const gameOverModalRef = useRef();
    // const gameTimer1Ref = useRef();
    // const gameTimer2Ref = useRef();
    const activeGameRef = useRef();

    let history = useHistory()
    var params = history.location.state
    var game_id, game_mode, ai_diff;

    game_id = parseInt( params.game_id );
    game_mode = params.game_mode;
    ai_diff = params.ai_diff;
    current_match.current = params.match;

    function processGameOver(msg) {
        gameOverModalRef.current.processGameOver(msg);

        // gameTimer1Ref.current.pause();
        // gameTimer2Ref.current.pause();

    }

    function triggerTimerSwitch(playerThatMoved) {
        // if ( playerThatMoved===1 ) {
        //     gameTimer1Ref.current.pause();
        //     gameTimer2Ref.current.start();
        // } else if ( playerThatMoved===2 ) {
        //     gameTimer2Ref.current.pause();
        //     gameTimer1Ref.current.start();
        // }

    }

    function triggerFinishGame(gameOverMessage) {
        activeGameRef.current.getGame().scene.getScene("RastrosScene").finish_game(gameOverMessage);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 mt-4">
                    <div className="row h-75 d-flex justify-content-center">
                        <div className="col">
                            <div className="row d-flex justify-content-center">
                                {/* {game_mode!=="ai" && <GameTimer ref={gameTimer2Ref} totalGameTime={10000} player="player2" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={false}></GameTimer>} */}
                                <h5>Player 2</h5>
                                <PlayerCard></PlayerCard>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <h5 className="name-text">{current_match.current['player2']}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row h-25 d-flex justify-content-center">
                        <div className="col">
                            <div className="row d-flex justify-content-center">
                                {/* {game_mode!=="ai" && <GameTimer ref={gameTimer1Ref} totalGameTime={10000} player="player1" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={true}></GameTimer>} */}
                                <h5>Player 1</h5>
                                <PlayerCard></PlayerCard>
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
                            <RastrosEngine ref={activeGameRef} trigger_timer_switch={triggerTimerSwitch} process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></RastrosEngine>
                        </div>
                    }
                    {game_id===1 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1200px', height: '624px'}}>
                            <GatosCaesEngine process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></GatosCaesEngine>
                        </div>
                    }
                </div>
            </div>
            <GameOverModal ref={gameOverModalRef}></GameOverModal>
        </div>
    );
}


export default Game;