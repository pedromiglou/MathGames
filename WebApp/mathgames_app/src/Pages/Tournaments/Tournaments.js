import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Tournaments.css";

import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import Pagination from "@material-ui/lab/Pagination";

import TournamentService from '../../Services/tournament.service';
import {games_info} from '../../data/GamesInfo';


import { Link } from 'react-router-dom';


import AuthService from '../../Services/auth.service';

function Tournaments() {
    var current_user = AuthService.getCurrentUser();
	let history = useHistory()

    if (current_user === null || current_user === undefined) {
        history.push({
            pathname: "/",
        })
    }
    
    const [tournaments, setTournaments] = useState([]);
    const [tournament_inputs, setTournamentInputs] = useState({name: "", capacity: "", private: null});

    const [page_tournaments, setPageTournaments] = useState(1);
	const [count_tournaments, setCountTournaments] = useState(0);

    const handlePageChangeTournaments = (event, value) => {
		setPageTournaments(value);
	};

    function submitFunction(event) {
		event.preventDefault();
		document.getElementById("searchButton").click();
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

        async function fetchApiTournaments() {
			var response = await TournamentService.getTournamentsWithFilters(tournament_inputs.name, tournament_inputs.capacity, tournament_inputs.private, parseInt(page_tournaments)-1, 10);
            if (!response["message"]) {
                setTournaments(response.tournaments);
                setCountTournaments(response.totalPages)
            }
        };
        fetchApiTournaments();
	}

    useEffect(
		retrieveTournaments
	, [tournament_inputs, page_tournaments])


    return (
        <>
        
            <div className="list-tournaments shadow3D animation-down">
				
				<div className="filters-t">
					
                    <div className="title-ind-t">
                        <i><RiIcons.RiTrophyFill/></i>
                        <h1>Torneios</h1>
                    </div>
                        
					
					<div className="row">
						<div className="col-12 col-md-12 col-lg-12">
							<form className="shadow-white" onSubmit={submitFunction}>
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
                
                   {tournaments.map(function(tournament, index) {
                       return(
						 <li key={tournament.id} className="list-group-item-t d-flex justify-content-between align-items-center row">
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
                                <FaIcons.FaArrowAltCircleRight/>
                            </div>                                
                        </li>
                   )})}

                   {tournaments.length === 0 && 
                     <li key="mensagem" className="list-group-item-t d-flex justify-content-between align-items-center row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <p>Não existem torneios disponíveis!</p>
                        </div>        
                     </li>
                   }

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
