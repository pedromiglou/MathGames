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

import {urlWeb} from "./../../data/data";

import AuthService from '../../Services/auth.service';
import TournamentService from '../../Services/tournament.service';

import { RulesTooltip } from '../../Components/RulesTooltip';

function Tournaments() {
    var current_user = AuthService.getCurrentUser();
	let history = useHistory()

    const tournament_info = {
        rules:  "- Os torneios são criados por contas certificadas. Organizadores são responsáveis pela sua gestão.\n" +
                "- Os torneios iniciam apenas por indicação do seu organizador e apenas quando a sua capacidade está cheia.\n" +
                "- Os torneios são divididos em rounds. Cada round é iniciado manualmente pelo organizador. Os rounds só podem ser iniciados quando todas as partidas do round anterior terminam\n" +
                "- A bracket do torneio é atualizada de forma automática e pode ser acedida através do interior da página do torneio.\n" +
                "- Cada jogador deve efetuar o check in para aceder ao jogo do torneio no início de TODOS os rounds. Caso o check in não seja efetuado, o jogador é eliminado." +
                "- Apenas quando os dois jogadores efetuar o check in é que o jogo começa.\n" +
                "- Boa sorte a todos os participantes. Que vença o melhor.\n" ,
    };


    if (current_user === null || current_user === undefined) {
        window.location.assign(urlWeb);
    }
        
    const [userTournaments, setUserTournaments] = useState([])
    const [creatorTournaments, setCreatorTournaments] = useState([])
    const [tournaments, setTournaments] = useState([]);
    const [tournament_inputs, setTournamentInputs] = useState({name: "", capacity: "", private: null, jogos: null, creator: null});

    const [page_tournaments, setPageTournaments] = useState(1);
	const [count_tournaments, setCountTournaments] = useState(0);

    const [page_personal_tournaments, setPagePersonalTournaments] = useState(1);
	const [count_personal_tournaments, setCountPersonalTournaments] = useState(0);

    const [entrarTorneioModal, setEntrarTorneioModal] = useState(false);
    const [sairTorneioModal, setSairTorneioModal] = useState(false);
    const [torneioSelecionado, setTorneioSelecionado] = useState({id: null, name: null, private: null})
    const [erroPassword, setErroPassword] = useState(false);
    const [erroJoinningTournament, setErroJoinningTournament] = useState(false)
    const [erroLeavingTournament, setErroLeavingTournament] = useState(false)

    const [filterOption, setfilterOption] = useState("AllTournaments");


    const handlePageChangeTournaments = (event, value) => {
		setPageTournaments(value);
	};

    const handlePageChangePersonalTournaments = (event, value) => {
		setPagePersonalTournaments(value);
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
            goToTournament(tournamentId)
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



    function filtrar() {
        setTournamentInputs({name: "", capacity: "", private: null, jogos: null, creator: null})
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

        var rastros = document.getElementById("rastros")
        var gatoscaes = document.getElementById("gatoscaes")
        var arrayJogos = []
        var stringJogos = ""

        if (rastros.checked)
            arrayJogos.push(0)
        if (gatoscaes.checked)
            arrayJogos.push(1)
        
        if (arrayJogos.length === 0)
            stringJogos = null;
        else {
            for (let game of arrayJogos) {
                stringJogos=stringJogos + game + "-"
            }
            stringJogos = stringJogos.slice(0,-1)
        }

        setTournamentInputs({name: nome.value, capacity: capacidade.value, private: privacidade, jogos: stringJogos, creator: null})
        clearInputs()
    }

    function clearInputs() {
        var publico = document.getElementById("publico")
        publico.checked = false
        var privado = document.getElementById("privado")
        privado.checked = false
        var rastros = document.getElementById("rastros")
        rastros.checked = false
        var gatoscaes = document.getElementById("gatoscaes")
        gatoscaes.checked = false
        var nome = document.getElementById("filter_nome")
        nome.value = ""
        var capacidade = document.getElementById("filter_capacidade")
        capacidade.value = ""
    }

    const retrieveTournaments = () => {

        async function fetchApiUserTournaments() {
            var response = await TournamentService.getTournamentsByUser(current_user.id)
            if (!response["message"]) 
                setUserTournaments(response)
        }

        async function fetchApiTournamentsByCreator() {
            var response = await TournamentService.getTournamentByCreator(current_user.id, parseInt(page_personal_tournaments)-1, 10)  
            if (!response["message"]) {
                setCreatorTournaments(response.tournaments);
                setCountPersonalTournaments(response.totalPages);
            }
        }

        async function fetchApiTournaments() {
            var response = await TournamentService.getTournamentsWithFilters(tournament_inputs.name, tournament_inputs.capacity, tournament_inputs.private, tournament_inputs.jogos, parseInt(page_tournaments)-1, 10);  
            if (!response["message"]) {
                setTournaments(response.tournaments);
                setCountTournaments(response.totalPages)
            }
        };
        fetchApiTournamentsByCreator();
        fetchApiUserTournaments();
        fetchApiTournaments();
	}

    useEffect(
		retrieveTournaments
	, [tournament_inputs, page_tournaments, page_personal_tournaments, current_user.id])

    function goToTournament(id){
        history.push("/tournament?id="+id)
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
                         <RulesTooltip rules={tournament_info['rules']}></RulesTooltip>
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
                                                <input className="form-control form-control-lg" id="gatoscaes" type="checkbox" name="Privado"/>
                                                <h5>Gatos&Cães</h5>
                                            </div>
                                            
                                            
                                        </div>
                                        
									</div>

								</div>
								
								<button id="searchButton" className="btn btn-lg btn-search" type="button" onClick={() => {setfilterOption("AllTournaments"); filtrar();}}>Procurar <FaIcons.FaSearch/></button>
							</form>
                            
						</div>
					</div>

                    {current_user !== null && current_user["account_type"] === "T" &&
                    <div id="gerir" className="shadow-white">
                        <h1>Gerir Torneios</h1>
                        <Link to="createTournament" className="btn btn-lg btn-search">
                            Criar Novo Torneio <FaIcons.FaPlus/>
                        </Link>
                        <button id="myTButton" className="btn btn-lg btn-search" type="button" onClick={() => {setfilterOption("PersonalTournaments");}}>Ver os meus torneios <FaIcons.FaSearch/></button>
                    </div>
                    }
				</div>
                
                <hr></hr>
                {filterOption === "AllTournaments" &&
                    <>
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
                            <li key={tournament.id} className="list-group-item-t d-flex justify-content-between align-items-center row">
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {tournament.name}
                                </div>    
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {games_info[tournament.game_id].title}
                                </div>
        
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {tournament.usersCount}/{tournament.max_users}
                                </div>

                                {tournament.private 
                                ?
                                <div title="Privado" className="col-lg-2 col-md-2 col-sm-2" onClick={() => goToTournament(tournament.id)}>
                                <BsIcons.BsFillLockFill/>
                                </div>
                                : 
                                <div title="Público" className="col-lg-2 col-md-2 col-sm-2" onClick={() => goToTournament(tournament.id)}>
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
                    </>
                }

                {filterOption === "PersonalTournaments" &&
                    <>
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

                    
                        {creatorTournaments.length === 0 ? 
                        <li key="mensagem" className="list-group-item-t d-flex justify-content-between align-items-center row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <p>Não possui torneios criados!</p>
                            </div>        
                        </li>
                        :
                    
                        creatorTournaments.map(function(tournament, index) {
                        return(
                            <li key={tournament.id} className="list-group-item-t d-flex justify-content-between align-items-center row">
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {tournament.name}
                                </div>    
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {games_info[tournament.game_id].title}
                                </div>
        
                                <div className="col-lg-3 col-md-3 col-sm-3" onClick={() => goToTournament(tournament.id)}>
                                    {tournament.usersCount}/{tournament.max_users}
                                </div>

                                {tournament.private 
                                ?
                                <div title="Privado" className="col-lg-2 col-md-2 col-sm-2" onClick={() => goToTournament(tournament.id)}>
                                <BsIcons.BsFillLockFill/>
                                </div>
                                : 
                                <div title="Público" className="col-lg-2 col-md-2 col-sm-2" onClick={() => goToTournament(tournament.id)}>
                                <BsIcons.BsFillUnlockFill/>
                                </div>
                                }
                                
                                <div title="Entrar" className="col-lg-1 col-md-1 col-sm-1 join">
                                </div>    
                            </li>
                    )})}

                    </ul>
                    <div className="row justify-content-center">
                        <Pagination
                        className="my-3"
                        count={count_personal_tournaments}
                        page={page_personal_tournaments}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChangePersonalTournaments}
                        />
                    </div>
                    </>
                }
            </div>


            
        </>
    );
}

export default Tournaments;
