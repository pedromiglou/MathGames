import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './PlayerCard.css';
import {Prompt} from 'react-router-dom';
// import Avatar from '../Avatar';
import userService from '../../Services/user.service';
import { ranks_info } from '../../data/ranksInfo';

import { Modal, Button } from "react-bootstrap";



import * as MdIcons from 'react-icons/md';


const PlayerCard = forwardRef(({username, gameId, shouldFindUser, showReportButton, other_player}, ref) => {
    const [user, setUser] = useState(null);
    const [other_user, setOtherUser] = useState(null)

    const [modalConfirmShow, setConfirmModalShow] = useState(false);
	const [modalUsername, setModalUsername] = useState("");
	const [modalId, setModalUserId] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    var rankGameNames = {0: "rastros", 1: "gatos_e_caes"};
    //const Avatar = React.lazy(() => import('../Avatar'));

    useEffect(() => {
        if (!shouldFindUser)
            return;
        userService.getUserByUsername(username).then(value => {
            setUser(value)
        })

        if (showReportButton)
            userService.getUserByUsername(other_player).then(value => {setOtherUser(value)})

    }, [username, shouldFindUser, showReportButton, other_player])

    useImperativeHandle(ref, () => ({

        setGameOver() {
            console.log("Setting to true");
            setGameOver(true);
        }
    }));

    function isGuest() {
        return user===null;
    }

    function getUserLevel() {
        let account_level = user.account_level;
        var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if ( (minimo <= account_level) && (account_level < maximo)) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
    }

    async function report_player(player) {
		let reason = document.getElementById("reason").value;

		let response = await userService.report_player(other_user.id, player, reason);
		if (response.report_already_made) {
            alert("O Report para este jogador já foi efetuado anteriormente. Apenas pode reportar uma vez cada jogador. ")
		}
		if (!response.error) {
            alert("O Report foi realizado com sucesso! ")
		} 
	}

    function ConfirmOperationModal(props) {
		let modal_username = props.username;

        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Reportar Jogador {modal_username}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende reportar o seguinte jogador: {modal_username}?</p>

                <label style={{color: "#0056b3", fontSize: 20}} for="reason">Motivo: </label>
                <select defaultValue="Uso Batota" id="reason" className="form-select" aria-label="Default select example">
                    <option value="Uso Batota">Uso Batota</option>
                    <option value="Exploração de Bug">Exploração de Bug</option>
                    <option value="Nome inapropriado">Nome inapropriado</option>
                </select>

            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {report_player(props.id); props.onHide();}} className="btn save-btn">Confimar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }


    return (
        <div className="exterior-card rounded">
            <Prompt when={!gameOver} message="Sair da página irá resultar em derrota imediata. Queres sair?"></Prompt>
            <div className="main-card">

                <div className="row ml-0 mr-0 h-100">
                    {/* <div className="col-4 pl-1 pr-1 avatar">
                        <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                    </div> */}
                    <div className="col h-100 main-card-body">
                        <div className="row mb-2 mt-2 justify-content-center card-username">
                            <div className="name-text">
                                { isGuest() && username }
                                { !isGuest() && user.username }
                                { showReportButton && 
                                    <i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setConfirmModalShow(true);}}><MdIcons.MdReport/></i>
                                }
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6 text-center">
                                Nivel
                            </div>
                            <div className="col-6 text-center">
                                Rank
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col text-center level-text">
                                { isGuest() && "-" }
                                { !isGuest() && getUserLevel() }
                            </div>
                            <div className="col text-center level-text">
                                { isGuest() && "-" }
                                { !isGuest() && 
                                    <img alt="Rank" width={60} height={60} src={process.env.PUBLIC_URL + ranks_info[ userService.convert_user_rank( user.ranks[rankGameNames[gameId]] ) ].image } />
                                }
                            </div>
                        </div>

                        <ConfirmOperationModal
						show={modalConfirmShow}
						onHide={() => setConfirmModalShow(false)}
						username={modalUsername}
						id={modalId}
					/>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default PlayerCard;