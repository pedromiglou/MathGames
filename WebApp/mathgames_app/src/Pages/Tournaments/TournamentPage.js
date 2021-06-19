import React , {useEffect , useState} from "react";

import {useHistory} from 'react-router-dom';

import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';

import "bootstrap/dist/css/bootstrap.min.css";
import "./TournamentPage.css";
import socket from "../../index"

import { games_info } from "../../data/GamesInfo";

import { Modal, Button } from "react-bootstrap";


import AuthService from '../../Services/auth.service';
import TournamentService from '../../Services/tournament.service';

function TournamentPage() {
    var current_user = AuthService.getCurrentUser();

    const history = useHistory();

    const [readyToDisplay, setReadyToDisplay] = useState(false)
    const [tournament, setTournament] = useState( {id: null, private: null, name: null, creator: null, max_users:null, winner: null, game_id: null, status: null})
    const [players, setPlayers] = useState([]);

    const [jogadorSelecionado, setJogadorSelecionado] = useState({id: null, name: null})
    const [removingPlayerModal, setRemovingPlayerModal] = useState(false);
    const [erroRemovingPlayer, setErroRemovingPlayer] = useState(false)
    const [erroRemovingTournament, setErroRemovingTournament] = useState(false)
    const [erroTournamentNotFull, setErroTournamentNotFull] = useState(false)
    const [erroStartingTournament, setErroStartingTournament] = useState(false)
    const [erroChangingDescription, setErroChangingDescription] = useState(false)
    const [erroInitializeRound, setErroInitializeRound] = useState(false)
    const [erroCheckIn, setErroCheckIn] = useState("")
    const [initializeRoundSuccess, setInitializeRoundSuccess] = useState(false)

    const url = new URLSearchParams(window.location.search);
	let tournament_id = url.get("id");
    
    const retrieveInformation = () => {
        
        async function fetchApiTournament() {
            var response = await TournamentService.getTournamentById(tournament_id)
            if (!response["message"])
                setTournament(response)
        }

        async function fetchApiTournamentPlayers() {
            var response = await TournamentService.getPlayersByTournament(tournament_id)
            if (!response["message"]) 
                setPlayers(response)
        }

        async function getData() {
            await fetchApiTournament();
            await fetchApiTournamentPlayers();
            setReadyToDisplay(true)

        }
        getData();
	}

    useEffect(
		retrieveInformation
	, [tournament_id]) 


    async function removePlayer(playerId) {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        var response = await TournamentService.leaveTournament(tournament_id, playerId)
        if (response.error) {
            setErroRemovingPlayer(true)
        } else {
            retrieveInformation()
        }
    }

    async function removeTournament() {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        var response = await TournamentService.removeTournament(tournament_id)
        if (response.error) {
            setErroRemovingTournament(true)
        } else {
            history.push({
                "pathname": "/tournaments"
            })
        }
    }

    async function initializeTournament() {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        if (tournament.max_users !== players.length) {
            setErroTournamentNotFull(true)
            return
        }
        var response = await TournamentService.initializeTournament(tournament_id)
        if (response.error) {
            setErroStartingTournament(true)
        } else {
            retrieveInformation()
        }
    }

    async function initializeNextRound() {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        socket.off("round_start");

        var response = await TournamentService.initializeNextRound(tournament_id)
        if (response.error) {
            setErroInitializeRound(true)
        } else {
            socket.emit("tournament_newround", {"user_id": AuthService.getCurrentUserId(), "tournament_id": tournament_id})

            socket.once("round_start", (msg) => {
                let erro = msg['erro'];
                if ( erro ) {
                    setErroInitializeRound(true)
                } else {
                    setInitializeRoundSuccess(true)
                }
            })
        }
    }


    async function changeDescription() {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        var description = document.getElementById("tournament-details")
        if (description.value === "") {
            description =  description.placeholder
        } else {
            description =  description.value
        }
        var response = await TournamentService.changeDescription(tournament_id, description)
        if (response.error) {
            setErroChangingDescription(true)
        } else {
            retrieveInformation()
        }
    }


    function checkInForGame() {
        setErroRemovingPlayer(false)
        setErroRemovingTournament(false)
        setErroTournamentNotFull(false)
        setErroStartingTournament(false)
        setErroChangingDescription(false)
        setErroInitializeRound(false)
        setErroCheckIn("")
        setInitializeRoundSuccess(false)
        socket.off("check_in");

        socket.emit("tournament_checkin", {"user_id": AuthService.getCurrentUserId(), "tournament_id": tournament_id})

        socket.once("check_in", (msg) => {
            let erro = msg['erro'];
            if ( erro ) {
                let message = msg["message"]
                if (message === "Game has already started")
                    setErroCheckIn("O teu jogo já iniciou. Check In já nao é permitido. Caso tenhas vencido a partida, espera que o próximo round seja iniciado.")
                if (message === "You are not participating in this tournament")
                    setErroCheckIn("Voçe já foi eliminado ou não pertence a este torneio.")
                if (message === "Tournament is not active")
                    setErroCheckIn("Este torneio não se encontra ativo.")
            } else {
                let match_id = msg['match_id']
                history.push("/gamePage?id="+tournament.game_id+"&tid="+tournament.id+"&mid="+match_id)
            }
        })
    }
    
    //Used to get players level taking account_level (elo)
    const getPlayerLevel = (account_level) => {
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

    const [userInTournament, setUserInTournament] = useState(players.some(e => e.username === current_user.username ));

    useEffect( () => {
        setUserInTournament(players.some(e => e.username === current_user.username ));
    })

    const [entrarTorneioModal, setEntrarTorneioModal] = useState(false);
    const [sairTorneioModal, setSairTorneioModal] = useState(false);
    const [erroPassword, setErroPassword] = useState(false);
    const [erroJoinningTournament, setErroJoinningTournament] = useState(false)
    const [erroLeavingTournament, setErroLeavingTournament] = useState(false)
    const [successJoinningTournament, setSuccessJoinningTournament] = useState(false)
    const [successLeavingTournament, setSuccessLeavingTournament] = useState(false)
    
    async function entrarTorneio(tournamentId, password) {
        setErroJoinningTournament(false)
        setSuccessJoinningTournament(false)
        var response = await TournamentService.jointTournament(tournamentId, current_user.id, password)
        if (response.error) {
            setErroJoinningTournament(true)
        } else {
            setSuccessJoinningTournament(true)
            setUserInTournament(true)
            window.location.reload(false);
        }
    }

    async function sairTorneio(tournamentId) {
        setErroLeavingTournament(false)
        setSuccessLeavingTournament(false)
        var response = await TournamentService.leaveTournament(tournamentId, current_user.id)
        if (response.error) {
            setErroLeavingTournament(true)
        } 
        else {
            setSuccessLeavingTournament(true)
            setUserInTournament(false)
        }
    }


    function EntrarTorneioModal(props) {
        function confirmar() {
            setErroPassword(false);
            var password = null
            if (props.torneioprivate === "true") {
                password = document.getElementById("joinpassword").value
                if (password === null || password === "") {
                    setErroPassword(true);
                    return
                }
            }
            entrarTorneio(props.torneioid, password)
            props.onHide()
        }

        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Entrar Torneio
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erroPassword === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Deve preencher a password
                </div> : null}

                {props.torneioprivate === "true" &&
                    <> 
                    <p style={{color: "#0056b3", fontSize: 20}}>Este torneio é privado. Insira password:</p>
                    <input id={"joinpassword"} type={"password"} placeholder={"Password"}></input>
                    </>
                }

              <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende entrar no torneio {props.torneioname}?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {confirmar();}} className="btn save-btn">Confirmar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
    }


    function SairTorneioModal(props) {
        function confirmar() {
            sairTorneio(props.torneioid)
            props.onHide()
            history.push("/tournaments");
        }

        return (
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Sair Torneio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende sair do torneio {props.torneioname}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{fontSize: 18}} onClick={() => {confirmar();}} className="btn save-btn">Confirmar</Button>
                <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
            </Modal>
        );
    }


    function RemoverPlayerModal(props) {

        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Remover Jogador
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende remover o jogador {props.jogadorname}?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {removePlayer(props.jogadorid); props.onHide()}} className="btn save-btn">Confirmar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    function make_fields_editable(){
        var tournament_details = document.getElementById("tournament-details");
        var buttons = document.getElementById("action-buttons");
        tournament_details.readOnly = false;
        buttons.style.display = "flex";
    }

    function make_fields_not_editable(){
        var tournament_details = document.getElementById("tournament-details");
        var buttons = document.getElementById("action-buttons");
        tournament_details.readOnly = true;
        buttons.style.display = "none";
    }

    if (!readyToDisplay) {
        return(
            <>
                <div className="tournaments-container">

                    <div className="tournamentPage_section">
                        <p>A carregar o torneio...</p>
                    </div>
                </div>
            </>
        )
    }
    return(
        <>
            {successJoinningTournament === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Entrou no torneio com sucesso.
                </div> : null}
            {successLeavingTournament === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Saiu do torneio com sucesso.
                </div> : null}
            {erroJoinningTournament === true 
                    ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                        Occoreu um erro ao tentar entrar no torneio. Operação não foi concluída.
                    </div> : null}
            {erroLeavingTournament === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar sair do torneio. Operação não foi concluída.
                </div> : null}
            {erroRemovingPlayer === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar remover o jogador. Operação não foi concluída.
                </div> : null}

            {erroRemovingTournament === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar remover o torneio. Operação não foi concluída.
                </div> : null}

            {erroTournamentNotFull === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    O Torneio precisa de estar cheio para ser iniciado. Aguarde que mais utilizadores se juntem!
                </div> : null}

            {erroStartingTournament === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar iniciar o torneio. Operação não foi concluída.
                </div> : null}

            {erroChangingDescription === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar alterar a descrição do torneio. Operação não foi concluída.
                </div> : null}
            
            {erroInitializeRound === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar iniciar a fase seguinte do torneio. Operação não foi concluída.
                </div> : null}

            {erroCheckIn !== "" 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    {erroCheckIn}
                </div> : null}
            
            {initializeRoundSuccess === true 
                ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Ronda iniciada com sucesso!
                </div> : null}

            <div className="tournaments-container">
                <div className="tournamentPage_section">
                    <div className="participants_section">
                        <h1 className="tournament-name-h1">{tournament.name}</h1>
                        <div className="tournament-info-sp">
                            <h2>Participantes: {players.length}/{tournament.max_users}</h2>
                            {tournament.status === "PREPARING" && 
                            <h2 className="tournament-state">Estado: A aguardar jogadores... </h2> }
                            {tournament.status === "STARTED" && 
                            <h2 className="tournament-state">Estado: Iniciado </h2>}
                            {tournament.status === "FINISHED" && 
                            <h2 className="tournament-state">Estado: Torneio Concluido </h2>}
                        </div>
                        <hr className="tournament-divider state-participants"></hr>
                        <ul className="tournament-list-participants">
                            <li className="list-group-item-t d-flex justify-content-between align-items-center row participants-item">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    Nome
                                </div>    
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    Nivel
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    Rank
                                </div>   
                                {tournament.creator === current_user.id && 
                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                    
                                    </div>
                                }                             
                            </li>
                        
                            {players.map(function(player, index) {
                                return(
                                    <li key={index} className="list-group-item-t d-flex justify-content-between align-items-center row participants-item">
                                        <div className="col-lg-4 col-md-3 col-sm-3">
                                            {player.username}
                                        </div>    
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            {getPlayerLevel(player.account_level)}
                                        </div>
                
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            Rank
                                    </div>

                                        <div className="col-lg-2 col-md-2 col-sm-2">
                                        {tournament.creator === current_user.id && tournament.status === "PREPARING" &&
                                            <IoIcons.IoBan onClick={() => {setJogadorSelecionado({id: player.id, name: player.username}); setRemovingPlayerModal(true)}}/>
                                        }                

                                        </div>
                                    </li>
                            )})}

                            <RemoverPlayerModal
                                show={removingPlayerModal}
                                onHide={() => setRemovingPlayerModal(false)}
                                jogadorid={jogadorSelecionado.id}
                                jogadorname={jogadorSelecionado.name}
                            />  

                            {players.length === 0 && 
                                <li key="mensagem" className="list-group-item-t d-flex justify-content-between align-items-center row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <p>Ainda não existem participantes!</p>
                                    </div>        
                                </li>
                            }

                        </ul>
                        
                        <div className="tournament-bottom-actions">
                            {tournament.creator !== current_user.id && tournament.status === "PREPARING" ?
                                userInTournament ? 
                                <div id="button-join-tournament" onClick={() => setSairTorneioModal(true)} className="button-clicky leave-tournament">
                                    <span className="shadow"></span>
                                    <span className="front">Sair do Torneio</span>
                                </div>
                                :
                                <div id="button-join-tournament" onClick={() => setEntrarTorneioModal(true)} className="button-clicky join-tournament">
                                    <span className="shadow"></span>
                                    <span className="front">Entrar no Torneio</span>
                                </div>
                            :
                            <div>

                            </div>
                            }

                            <div className="tournament-bracket">
                                <div className="brackets">
                                    <div id="button-join-tournament" onClick={() => history.push("/bracket?id="+tournament_id)} className="button-clicky see-bracket">
                                        <span className="shadow"></span>
                                        <span className="front">Ver Bracket</span>
                                    </div>
                                    {/* <button onClick={() => history.push("/bracket?id="+tournament_id)}>See Bracket</button> */}
                                </div>
                            </div>
                        </div>
                        

                        

                    <EntrarTorneioModal
                        show={entrarTorneioModal}
                        onHide={() => setEntrarTorneioModal(false)}
                        torneioid={tournament.id}
                        torneioname={tournament.name}
                        torneioprivate={tournament.private === true ? "true" : "false"}
                    />  

                    <SairTorneioModal
                        show={sairTorneioModal}
                        onHide={() => setSairTorneioModal(false)}
                        torneioid={tournament.id}
                        torneioname={tournament.name}
                    /> 
        
                    </div>

                    <div className="vertical-divider"></div>

                    <div className="brackets_section">
                        <div className="tournament-rules">
                            <div className="details-edit">
                                <h1>Descrição do Torneio</h1>
                                {tournament.creator === current_user.id && tournament.status === "PREPARING" &&
                                    <MdIcons.MdModeEdit size={35} id="edit-icon" className="edit-icon" title="edit" onClick={() => make_fields_editable()}/>
                                }
                            </div>
                            <div className="description-t" >
                                <textarea  className="description-input" id="tournament-details" readOnly placeholder={tournament.description}></textarea>
                            </div>
                            <div className="action-buttons" id="action-buttons" style={{display:"none"}}>
                                {tournament.creator === current_user.id && tournament.status === "PREPARING" &&
                                    <>
                                    <button onClick={() => {make_fields_not_editable(); changeDescription() } }>Confirmar</button>
                                    <button onClick={() => make_fields_not_editable()}>Cancelar</button>
                                    </>
                                }

                            </div>
                        </div>
                        <h1>Jogo</h1>
                        
                            
                        <div className="game-info">
                            <div className="image">
                                <img
                                src={games_info[tournament.game_id].img}
                                alt="Info"
                                className="game-image"
                                />
                            </div>
                            <div className="game-description">
                                <p className="game-details-p">
                                    {games_info[tournament.game_id].title}
                                </p>
                                <hr className="descr-div-caract"></hr>
                                <div className="col-lg-12 game-caracteristics">
                                    <h2 className="caract-gamemode"> Caracteristicas </h2>
                                    
                                    <h4>Dificuldade</h4>
                                    <div className="progress caract">
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                            role="progressbar"
                                            aria-valuenow="75"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{ width: games_info[tournament.game_id].dificulty + "%" }}
                                        >
                                            <span>{games_info[tournament.game_id].dificulty_label}</span>
                                        </div>
                                    </div>
                                    <h4>Idade: +{games_info[tournament.game_id].age} </h4>
                                </div>
                            </div>
                        </div>
                        

                        <div className="tournament-bottom-actions">
                            {tournament.creator === current_user.id && tournament.status === "PREPARING" &&
                            <>
                                <div id="button-join-tournament" onClick={() => removeTournament()} className="button-clicky leave-tournament">
                                    <span className="shadow"></span>
                                    <span className="front">Eliminar Torneio</span>
                                </div>
                                <div id="button-join-tournament" onClick={() => initializeTournament()} className="button-clicky join-tournament">
                                    <span className="shadow"></span>
                                    <span className="front">Iniciar Torneio</span>
                                </div>

                                {/* <button onClick={() => removeTournament()}>Eliminar Torneio</button> */}
                                {/* <button onClick={() => initializeTournament()}>Iniciar Torneio</button> */}
                            </>
                            }

                            {tournament.creator === current_user.id && tournament.status === "STARTED" &&
                                <>
                                <button onClick={() => initializeNextRound()}>Iniciar Fase Seguinte</button>
                                </>
                            }

                            {players.some(e => (e.id === current_user.id && e.eliminated === false)) && tournament.status === "STARTED" &&
                                <>
                                <button onClick={() => checkInForGame()}>Check In</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TournamentPage;