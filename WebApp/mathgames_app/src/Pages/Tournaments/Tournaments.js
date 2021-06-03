import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Tournaments.css";

import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';

import TournamentService from '../../Services/tournament.service';
import {games_info} from '../../data/GamesInfo';


function Tournaments() {
    const [tournaments, setTournaments] = useState([]);


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
        
        var response = await TournamentService.getTournamentsWithFilters(nome.value, capacidade.value, privacidade);
        if (!response["message"]) {
            setTournaments(response);
        }
    }

    const retrieveTournaments = () => {

        async function fetchApiTournaments() {
			var response = await TournamentService.getTournamentsWithFilters("", "", null);
            if (!response["message"]) {
                setTournaments(response);
            }
        };
        fetchApiTournaments();
	}

    useEffect(
		retrieveTournaments
	, [])


    return (
        <>
            {/* id:
            name:
            max_users:
            private:
            password:
            game_id:
            winner:
            creator */}

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
                                0/{tournament.max_users}
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
            </div>


            
        </>
    );
}

export default Tournaments;
