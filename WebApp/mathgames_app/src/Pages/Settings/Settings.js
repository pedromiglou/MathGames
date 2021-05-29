//import PlayerCard from '../../Components/PlayerCard/PlayerCard'
import React from "react";

function Settings() {
    // function FinishMatchModal(props) {
    //     return (
    //         <Modal {...props} size="md" centered>
    //             <Modal.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    //                 <Modal.Title style={{color: "#0056b3", fontSize: 30}}>
    //                     Jogo Terminado!
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <p style={{color: "#0056b3", fontSize: 20}}>
    //                     Resultado: 
    //                     { endGameMessage["match_result"]==="win" &&
    //                         <span>
    //                             Vitória! <span className="smiley-happy"></span>
    //                             <br/>
    //                             { endGameMessage["end_mode"]==="timeout" && EndGameStatements["win"]["timeout"] }
    //                             { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["win"][game_id][endGameMessage["extra"]] }
    //                             { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["win"]["invalidMove"] }
    //                         </span>
    //                     }
    //                     { endGameMessage["match_result"]==="loss" &&
    //                         <span>
    //                             Derrota. <span className="smiley-sad"></span>
    //                             <br/>
    //                             { endGameMessage["end_mode"]==="timeout" && EndGameStatements["loss"]["timeout"] }
    //                             { endGameMessage["end_mode"]==="valid_move" && EndGameStatements["loss"][game_id][endGameMessage["extra"]] }
    //                             { endGameMessage["end_mode"]==="invalid_move" && EndGameStatements["loss"]["invalidMove"] }
    //                         </span>
    //                     }
    //                 </p>
    //             </Modal.Body>
    //             <Modal.Footer style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    //                 <button onClick={() => history.push("/gamePage?id=" + game_id)} className="btn btn-warning" style={{color: "#0056b3", fontSize: 20}}>Voltar à página de jogo</button>
    //             </Modal.Footer>
    //         </Modal>
    //     );
    // }

    return(
        <>
        {/* <button className="btn btn-info" onClick={() => {
            let elem = document.getElementById("texto");
            
            FinishMatchModal()
        }}>Hide</button>
        <p className="" id="texto"> Texto Exemplo</p>
            <PlayerCard></PlayerCard> */}
        </>
    )
}

export default Settings;