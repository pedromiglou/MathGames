import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Tournaments.css";

import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import Pagination from "@material-ui/lab/Pagination";

import {games_info} from '../../data/GamesInfo';

import { Modal, Button } from "react-bootstrap";


import AuthService from '../../Services/auth.service';
import TournamentService from '../../Services/tournament.service';

function Tournaments() {
    var current_user = AuthService.getCurrentUser();
	let history = useHistory()

    if (current_user === null || current_user === undefined) {
        history.push({
            pathname: "/",
        })
    }
        
    const [userTournaments, setUserTournaments] = useState([])
    const [tournaments, setTournaments] = useState([]);
    const [tournament_inputs, setTournamentInputs] = useState({name: "", capacity: "", private: null});

    const [page_tournaments, setPageTournaments] = useState(1);
	const [count_tournaments, setCountTournaments] = useState(0);

    const [entrarTorneioModal, setEntrarTorneioModal] = useState(false);
    const [sairTorneioModal, setSairTorneioModal] = useState(false);
    const [torneioSelecionado, setTorneioSelecionado] = useState({id: null, name: null, private: null})
    const [erroPassword, setErroPassword] = useState(false);
    const [erroJoinningTournament, setErroJoinningTournament] = useState(false)
    const [erroLeavingTournament, setErroLeavingTournament] = useState(false)


    const handlePageChangeTournaments = (event, value) => {
		setPageTournaments(value);
	};

    function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
	}

    async function entrarTorneio(tournamentId, password) {
        setErroJoinningTournament(false)
        var response = await TournamentService.jointTournament(tournamentId, current_user.id, password)
        if (response.error) {
            setErroJoinningTournament(true)
        } else {
            retrieveTournaments()
        }
    }

    async function sairTorneio(tournamentId) {
        setErroLeavingTournament(false)
        var response = await TournamentService.leaveTournament(tournamentId, current_user.id)
        if (response.error) {
            setErroLeavingTournament(true)
        } else {
            retrieveTournaments()
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



    async function filtrar() {
        var nome = document.getElementById("filter_nome")
        var capacidade = document.getElementById("filter_capacidade")

        var publico = document.getElementById("publico")
        var privado = document.getElementById("privado")
        var privacidade;
        if (publico.checked && privado.checked) {
            privacidade = null
        } else if (publico.checked) {
            privacidade = false
        } else if (privado.checked) {
            privacidade = true
        } else {
            privacidade = null
        }
        
        setTournamentInputs({name: nome.value, capacity: capacidade.value, private: privacidade})
    }

    const retrieveTournaments = () => {

        async function fetchApiUserTournaments() {
            var response = await TournamentService.getTournamentsByUser(current_user.id)
            setUserTournaments(response)
        }

        async function fetchApiTournaments() {
			var response = await TournamentService.getTournamentsWithFilters(tournament_inputs.name, tournament_inputs.capacity, tournament_inputs.private, parseInt(page_tournaments)-1, 10);
            if (!response["message"]) {
                setTournaments(response.tournaments);
                setCountTournaments(response.totalPages)
            }
        };
        fetchApiUserTournaments();
        fetchApiTournaments();
	}

    useEffect(
		retrieveTournaments
	, [tournament_inputs, page_tournaments, current_user.id])

    function goToTournament(id){
        history.push("/tournament", {tournament_id: id});
    }


    return (
        <> 
            {erroJoinningTournament === true 
                    ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                        Occoreu um erro ao tentar entrar no torneio. Operação não foi concluída.
                    </div> : null}

            {erroLeavingTournament === true 
                ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
                    Occoreu um erro ao tentar sair do torneio. Operação não foi concluída.
                </div> : null}


            <div className="list-tournaments shadow3D animation-down">
				
				<div className="filters-t">
					
                    <div className="title-ind-t">
                        <i><RiIcons.RiTrophyFill/></i>
                        <h1>Torneios</h1>
                    </div>
                        
					
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12">
							<form className="shadow-white form-center" onSubmit={submitFunction}>
								<div className="form-tournaments">
									<div className="name-section">
										<h2>Nome Torneio</h2>
										
                                        <input className="form-control form-control-lg" id="filter_nome" type="search" placeholder="Procurar pelo nome do torneio"/>
									</div>
								
                                    <div className="privacy-section">
                                        <h2>Privacidade</h2>
                                        <div className="checkbox-display">
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="publico" type="checkbox" name="Público"/>
                                                <h5>Público</h5>
                                            </div>
                                            
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="privado" type="checkbox" name="Privado"/>
                                                <h5>Privado</h5>
                                            </div>
                                                
                                            
                                        </div>
									</div>

                                    <div className="users-section">
										<h2>Capacidade</h2>
                                        <input className="form-control form-control-lg" id="filter_capacidade" type="number" placeholder="Procurar pela capacidade do torneio"/>
									</div>

                                    <div className="games-section">
                                        <h2>Jogos</h2>
                                        <div className="checkbox-display">
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="rastros" type="checkbox" name="Público"/>
                                                <h5>Rastros</h5>
                                            </div>
                                            <div className="inner-checkbox">
                                                <input className="form-control form-control-lg" id="GC" type="checkbox" name="Privado"/>
                                                <h5>Gatos&Cães</h5>
                                            </div>
                                            
                                            
                                        </div>
                                        
									</div>

								</div>
								
								
								<button id="searchButton" className="btn btn-lg btn-search" type="button" onClick={filtrar}>Procurar <FaIcons.FaSearch/></button>
							</form>
                            
						</div>
					</div>

                    {current_user !== null && current_user["account_type"] === "T" &&
                    <div id="gerir" className="shadow-white">
                        <h1>Gerir Torneios</h1>
                        <Link to="createTournament" className="btn btn-lg btn-search">
                            Criar Novo Torneio <FaIcons.FaPlus/>
                        </Link>
                        <button id="myTButton" className="btn btn-lg btn-search" type="button">Ver os meus torneios <FaIcons.FaSearch/></button>
                    </div>
                    }
				</div>
                
                <hr></hr>

                <ul className="list-group">
                    <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Nome
                        </div>    
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Jogo
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-3">
                            Capacidade
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2">
                            Privacidade
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 join">
                            
                        </div>                                
                    </li>

                    {tournaments.length === 0 ? 
                     <li key="mensagem" className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <p>Não existem torneios disponíveis!</p>
                        </div>        
                     </li>
                    :
                
                    tournaments.map(function(tournament, index) {
                       return(
						 <li key={tournament.id} onClick={() => goToTournament(tournament.id)} className="list-group-item-t d-flex justify-content-between align-items-center row">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                {tournament.name}
                            </div>    
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                {games_info[tournament.game_id].title}
                            </div>
    
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                {tournament.usersCount}/{tournament.max_users}
                            </div>

                            {tournament.private 
                            ?
                             <div title="Privado" className="col-lg-2 col-md-2 col-sm-2">
                             <BsIcons.BsFillLockFill/>
                            </div>
                            : 
                            <div title="Público" className="col-lg-2 col-md-2 col-sm-2">
                            <BsIcons.BsFillUnlockFill/>
                            </div>
                            }
                            
                            <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">

                            {tournament.status === "PREPARING" && 
                                <>
                                {tournament.creator !== current_user.id &&
                                    <>
                                    {userTournaments.length === 0  &&
                                        <FaIcons.FaArrowAltCircleRight onClick={() => {setTorneioSelecionado({id: tournament.id, name: tournament.name, private: tournament.private}); setEntrarTorneioModal(true); }}/>
                                    }

                                    {userTournaments.length !== 0  && userTournaments.some(e => e.tournament_id === tournament.id) &&
                                        <FaIcons.FaArrowAltCircleLeft  onClick={() => {setTorneioSelecionado({id: tournament.id, name: tournament.name, private: tournament.private}); setSairTorneioModal(true); }}/>
                                    }

                                    {userTournaments.length !== 0  && !(userTournaments.some(e => e.tournament_id === tournament.id)) &&
                                        <FaIcons.FaArrowAltCircleRight onClick={() => {setTorneioSelecionado({id: tournament.id, name: tournament.name, private: tournament.private}); setEntrarTorneioModal(true); }}/>
                                    }
                                    </>
                                }
                                </>
                            }
                            </div>    
                        </li>
                   )})}

                   <EntrarTorneioModal
                        show={entrarTorneioModal}
                        onHide={() => setEntrarTorneioModal(false)}
                        torneioid={torneioSelecionado.id}
                        torneioname={torneioSelecionado.name}
                        torneioprivate={torneioSelecionado.private === true ? "true" : "false"}
                    />  

                    <SairTorneioModal
                        show={sairTorneioModal}
                        onHide={() => setSairTorneioModal(false)}
                        torneioid={torneioSelecionado.id}
                        torneioname={torneioSelecionado.name}
                    />  

                </ul>
                <div className="row justify-content-center">
                    <Pagination
                    className="my-3"
                    count={count_tournaments}
                    page={page_tournaments}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChangeTournaments}
                    />
                </div>
            </div>


            
        </>
    );
}

export default Tournaments;
