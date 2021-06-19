import React, { forwardRef, useState, useImperativeHandle } from "react";
import './GameOverModal.css';
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { EndGameStatements } from '../data/EndGameStatements';


export const GameOverModal = forwardRef((props, ref) => {
    const [finishMatchModalShow, setFinishMatchModalShow] = useState(false);
    const [gameOverMessage, setGameOverMessage] = useState({});
    let history = useHistory()

    useImperativeHandle(ref, () => ({

        processGameOver(msg) {
            setGameOverMessage( processEndGameMessage(msg) );
            setFinishMatchModalShow(true);
        }

    }));

    function processEndGameMessage(endGameMessage) {
        let gameId = parseInt(endGameMessage["game_id"]);
        let result = endGameMessage["match_result"];
        let endMode = endGameMessage["end_mode"];
        
        if ( result === "offline_finish" ) {
            let winner = endGameMessage["winner"];
            if ( endMode === "timeout" || endMode === "invalid_move" )
                return {game_id: gameId, result: result, winner: winner, message: EndGameStatements["win"][endMode], end_mode: endMode};
            
            return {game_id: gameId, result: result, winner: winner, message: EndGameStatements["win"][gameId][endMode], end_mode: endMode};
        }
        if ( result === "ai_win" || result === "ai_loss" ) {
            let aiDifficulty = endGameMessage["ai_difficulty"];
            return {game_id: gameId, result: result, ai_difficulty: aiDifficulty, end_mode: endMode};
        }

        if ( endMode === "timeout" || endMode === "invalid_move" || endMode === "forfeit" )
            return {game_id: gameId, result: result, message: EndGameStatements[result][endMode], end_mode: endMode};

        return {game_id: gameId, result: result, message: EndGameStatements[result][gameId][endMode], end_mode: endMode};

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
                    <p className="result-body">
                        <span className="result-header">Resultado:</span>
                        { gameOverMessage["result"]==="win" &&
                            <span className="result-text">
                                Vitória!
                                {gameOverMessage["end_mode"] === "forfeit" && <span className="emoji flag"></span>}
                                {gameOverMessage["end_mode"] !== "forfeit" && <span className="emoji smiley-happy"></span>}
                            </span>
                        }
                        { gameOverMessage["result"]==="loss" &&
                            <span className="result-text">
                                Derrota. 
                                {gameOverMessage["end_mode"] === "forfeit" && <span className="emoji flag"></span>}
                                {gameOverMessage["end_mode"] !== "forfeit" && <span className="emoji smiley-sad"></span>}
                            </span>
                        }
                        { gameOverMessage["result"]==="offline_finish" &&
                            <span className="result-text">
                                Parabéns { gameOverMessage["winner"] }! Venceste o jogo! <span className="emoji clap"></span>
                            </span>
                        }
                        { gameOverMessage["result"]==="ai_win" &&
                            <span className="result-text">
                                Parabéns! Conseguiste derrotar o computador em dificuldade { gameOverMessage["ai_difficulty"] }! <span className="emoji clap"></span>
                            </span>
                        }
                        { gameOverMessage["result"]==="ai_loss" &&
                            <span className="result-text">
                                Perdeste contra o computador em dificuldade { gameOverMessage["ai_difficulty"] }. <span className="emoji robot"></span>
                                <br/>
                                Melhor sorte para a próxima!
                            </span>
                        }
                        <br/>
                        { gameOverMessage["result"]!=="ai_win" && gameOverMessage["result"]!=="ai_loss" && gameOverMessage["message"] }
                    </p>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button onClick={() => history.push("/gamePage?id=" + gameOverMessage["game_id"])} className="btn btn-warning" style={{color: "#0056b3", fontSize: 20}}>Voltar à página de jogo</button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <FinishMatchModal show={finishMatchModalShow} onHide={() => setFinishMatchModalShow(false)}/>
    );
});
