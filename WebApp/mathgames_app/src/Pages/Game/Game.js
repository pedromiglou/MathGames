import React, { useRef, useEffect } from "react";
import { GameOverModal } from '../../Components/GameOverModal';
import { useHistory, useLocation } from "react-router-dom";
import "./Game.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socket from "../../index";
import { RastrosEngine } from "../../Components/Engines/RastrosEngine";
import { GatosCaesEngine } from "../../Components/Engines/GatosCaesEngine";
import { GameTimer } from '../../Components/GameTimer';
import PlayerCard from "../../Components/PlayerCard/PlayerCard";
import authService from "../../Services/auth.service";

import { RulesTooltip } from '../../Components/RulesTooltip';
import { games_info } from "../../data/GamesInfo";


function Game()  {
    // Clear listeners to make sure there are no repeated events
    socket.off("match_end");

    let current_match = useRef(null);
    const gameOverModalRef = useRef();
    const gameTimer1Ref = useRef();
    const gameTimer2Ref = useRef();
    const activeGameRef = useRef();
    const playerCardRef = useRef();

    let history = useHistory()
    const location = useLocation();
    var params = history.location.state
    var game_id, game_mode, ai_diff, tournament_id;

    game_id = parseInt( params.game_id );
    game_mode = params.game_mode;
    ai_diff = params.ai_diff;
    current_match.current = params.match;
    tournament_id = params.tournament

	const game_info = games_info[game_id];

    useEffect(() => {

        function matchHasFinished() {
            let sceneNames = {0: "RastrosScene", 1: "GatosCaesScene"};

            if (activeGameRef.current === undefined)
                return false;

            let game = activeGameRef.current.getGame();
            let scene = game.scene.getScene(sceneNames[game_id]);

            return scene.game_over;
        }

        return history.listen((location) => {
            if (!matchHasFinished())
                socket.emit("forfeit_match", {"user_id": authService.getCurrentUserId()})
        })

    }, [history, location, game_id]);

    function processGameOver(msg) {

        if (gameOverModalRef.current === null)
            return
        
        gameOverModalRef.current.processGameOver(msg);

        if (game_mode!=="ai") {
            gameTimer1Ref.current.pause();
            gameTimer2Ref.current.pause();
        }

        
        playerCardRef.current.setGameOver();

    }

    function triggerTimerSwitch(playerThatMoved) {
        if ( playerThatMoved===1 ) {
            gameTimer1Ref.current.pause();
            gameTimer2Ref.current.start();
        } else if ( playerThatMoved===2 ) {
            gameTimer2Ref.current.pause();
            gameTimer1Ref.current.start();
        }

    }

    function triggerFinishGame(gameOverMessage) {
        let sceneNames = {0: "RastrosScene", 1: "GatosCaesScene"};
        
        let game = activeGameRef.current.getGame();
        let scene = game.scene.getScene(sceneNames[game_id]);
        
        scene.finish_game(gameOverMessage);
    }

    function getCurrentPlayerCard() {
        var showReportButton = false
        var showForfeitFlag = false

        if (game_mode === "online" || game_mode === "amigo") {
            showForfeitFlag = true

            if (current_match.current["player1"].length < 21 && current_match.current["player2"].length < 21) {
                showReportButton = true
            }
        }

        if ( current_match.current["player1"]===authService.getCurrentUsername() || game_mode==="offline" )
            return(
                <div className="col-3 mt-4">
                     <div style={{textAlign:"center"}}>
                        <RulesTooltip size="42" title="Regras" rules={game_info['rules']} goal={game_info['goal']} website={game_info['website']}></RulesTooltip>
                    </div>
                    <div className="row h-50 d-flex justify-content-center">
                        <div className="col">
                            <div id="player2-info" className="row d-flex justify-content-center">
                                <div className="col">
                                    <h5>Jogador 2</h5>
                                </div>
                                <div id="player2-countdown" className="col d-flex justify-content-end">
                                    {game_mode!=="ai" && <GameTimer ref={gameTimer2Ref} totalGameTime={300000} player="player2" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={false}></GameTimer>}
                                </div>
                                <PlayerCard username={current_match.current["player2"]} gameId={game_id} gameMode={game_mode} shouldFindUser={game_mode!=="ai" && game_mode!=="offline"} showReportButton={showReportButton} other_player={current_match.current["player1"]} showForfeitFlag={false}></PlayerCard>
                            </div>
                        </div>
                    </div>
                    <div className="row h-50 d-flex justify-content-center">
                        <div className="col">
                            <div id="player1-info" className="row d-flex justify-content-center">
                                <div className="col">
                                    <h5>Jogador 1</h5>
                                </div>
                                <div id="player1-countdown" className="col d-flex justify-content-end">
                                    {game_mode!=="ai" && <GameTimer ref={gameTimer1Ref} totalGameTime={300000} player="player1" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={true}></GameTimer>}
                                </div>
                                <PlayerCard ref={playerCardRef} username={current_match.current["player1"]} gameId={game_id} gameMode={game_mode} shouldFindUser={game_mode!=="offline"} showReportButton={false} other_player={current_match.current["player2"]} showForfeitFlag={showForfeitFlag}></PlayerCard>
                            </div>
                        </div>
                    </div>
                </div>
            )

        if ( current_match.current["player2"]===authService.getCurrentUsername() )
            return (
                <div className="col-3 mt-4">
                    <div style={{textAlign:"center"}}>
                        <RulesTooltip size="42" title="Regras" rules={game_info['rules']} goal={game_info['goal']} website={game_info['website']}></RulesTooltip>
                    </div>
                    <div className="row h-50 d-flex justify-content-center">
                        <div className="col">
                            <div id="player1-info" className="row d-flex justify-content-center">
                                {/* {game_mode!=="ai" && <GameTimer ref={gameTimer2Ref} totalGameTime={10000} player="player2" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={false}></GameTimer>} */}
                                <div className="col">
                                    <h5>Jogador 1</h5>
                                </div>
                                <div id="player1-countdown" className="col d-flex justify-content-end">
                                    {game_mode!=="ai" && <GameTimer ref={gameTimer1Ref} totalGameTime={300000} player="player1" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={true}></GameTimer>}
                                </div>
                                <PlayerCard username={current_match.current["player1"]} gameId={game_id} gameMode={game_mode} shouldFindUser={game_mode!=="ai" && game_mode!=="offline"} showReportButton={showReportButton} other_player={current_match.current["player2"]} showForfeitFlag={false}></PlayerCard>
                            </div>
                        </div>
                    </div>
                    <div className="row h-50 d-flex justify-content-center">
                        <div className="col">
                            <div id="player2-info" className="row d-flex justify-content-center">
                                {/* {game_mode!=="ai" && <GameTimer ref={gameTimer1Ref} totalGameTime={10000} player="player1" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={true}></GameTimer>} */}
                                <div className="col">
                                    <h5>Jogador 2</h5>
                                </div>
                                <div id="player2-countdown" className="col d-flex justify-content-end">
                                    {game_mode!=="ai" && <GameTimer ref={gameTimer2Ref} totalGameTime={300000} player="player2" gameId={game_id} gameMode={game_mode} currentMatch={current_match.current} finishMatchMethod={triggerFinishGame} autoStart={false}></GameTimer>}
                                </div>
                                <PlayerCard ref={playerCardRef} username={current_match.current["player2"]} gameId={game_id} gameMode={game_mode} shouldFindUser={game_mode!=="offline"} showReportButton={false} other_player={current_match.current["player1"]} showForfeitFlag={showForfeitFlag}></PlayerCard>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }

    return (
        <>
            <div className="row ml-5">
                { getCurrentPlayerCard() }
                <div className="col-9">
                    {game_id===0 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1100px', height: '577px'}}>
                            <RastrosEngine ref={activeGameRef} trigger_timer_switch={triggerTimerSwitch} process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></RastrosEngine>
                        </div>
                    }
                    {game_id===1 &&
                        <div id="my_div_game" className="container-canvas" style={{width: '1200px', height: '624px'}}>
                            <GatosCaesEngine ref={activeGameRef} trigger_timer_switch={triggerTimerSwitch} process_game_over={processGameOver} arg_game_mode={game_mode} arg_ai_diff={ai_diff} curr_match={current_match.current}></GatosCaesEngine>
                        </div>
                    }
                </div>
            </div>
            <GameOverModal ref={gameOverModalRef} tournament_id={tournament_id}></GameOverModal>
        </>
    );
}


export default Game;