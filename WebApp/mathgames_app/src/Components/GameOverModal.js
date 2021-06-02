import React, { forwardRef, useState, useImperativeHandle } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { EndGameStatements } from '../data/EndGameStatements';


export const GameOverModal = forwardRef((props, ref) => {
    const [finishMatchModalShow, setFinishMatchModalShow] = useState(false);
    const [endGameMessage, setEndGameMessage] = useState("");
    const [gameId, setGameId] = useState(-1);
    let history = useHistory()

    useImperativeHandle(ref, () => ({

        processGameOver(msg, game_id) {
            console.log("Id: ", game_id)
            setGameId(game_id);
            setEndGameMessage(msg);
            setFinishMatchModalShow(true);
        }

    }));

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
                                { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["win"][gameId][endGameMessage["extra"]] }
                                { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["win"]["invalidMove"] }
                            </span>
                        }
                        { endGameMessage["match_result"]==="loss" &&
                            <span>
                                Derrota. <span className="smiley-sad"></span>
                                <br/>
                                { endGameMessage["end_mode"]==="timeout" && EndGameStatements["loss"]["timeout"] }
                                { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["loss"][gameId][endGameMessage["extra"]] }
                                { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["loss"]["invalidMove"] }
                            </span>
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button onClick={() => history.push("/gamePage?id=" + gameId)} className="btn btn-warning" style={{color: "#0056b3", fontSize: 20}}>Voltar à página de jogo</button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <FinishMatchModal show={finishMatchModalShow} onHide={() => setFinishMatchModalShow(false)}/>
    );
});
