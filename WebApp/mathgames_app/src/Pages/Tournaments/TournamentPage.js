import React , {useEffect , useState} from "react";

import {useLocation, useHistory} from 'react-router-dom';

import * as IoIcons from 'react-icons/io5';

import "bootstrap/dist/css/bootstrap.min.css";
import "./TournamentPage.css";

function TournamentPage() {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const tournament_id = location.tournament_id;
    }, [location]);
    
    //Tem que se ir buscar com serviço baseado no id
    const participants = [{nome:"Jose", nivel:"3", rank:"ouro2"}, {nome:"Jose", nivel:"3", rank:"ouro2"}, {nome:"Jose", nivel:"3", rank:"ouro2"}, {nome:"Jose", nivel:"3", rank:"ouro2"}, 
    {nome:"Gabriel", nivel:"99", rank:"diamante"}, {nome:"Jose", nivel:"5", rank:"ouro2"}, {nome:"Jose", nivel:"3", rank:"ouro2"}]
    const tournament = {name:"Torneio dos fantásticos", owner_id: 3, participants: participants, capacity:8}
    //Tem que se ir buscar o user pelo serviço
    var user =  3;

    const [tournament_initialized, setTournament_Initialized] = useState(false);

    function seeBracket(){
        history.push("/bracket");
    }

    return(
        <>
            <div className="tournaments-container">
                <div className="tournamentPage_section">
                    <div className="participants_section">
                        <h1>{tournament.name}</h1>
                        <h2>Participantes: {tournament.participants.length}/{tournament.capacity}</h2>
                        <ul className="list-group">
                            <li className="list-group-item-t d-flex justify-content-between align-items-center row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    Nome
                                </div>    
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    Nivel
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    Rank
                                </div>   
                                {tournament.owner_id === user && 
                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                    
                                    </div>
                                    }                             
                            </li>
                        
                            {tournament.participants.map(function(participant, index) {
                                return(
                                    <li key={index} className="list-group-item-t d-flex justify-content-between align-items-center row">
                                        <div className="col-lg-4 col-md-3 col-sm-3">
                                            {participant.nome}
                                        </div>    
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            {participant.nivel}
                                        </div>
                
                                        <div className="col-lg-3 col-md-3 col-sm-3">
                                            {participant.rank}
                                    </div>

                                        {tournament.owner_id === user && 
                                        <div className="col-lg-2 col-md-2 col-sm-2">
                                            <IoIcons.IoPersonRemove/>
                                        </div>
                                        }                
                                    </li>
                            )})}

                            {tournament.participants.length === 0 && 
                                <li key="mensagem" className="list-group-item-t d-flex justify-content-between align-items-center row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <p>Ainda não existem participantes!</p>
                                    </div>        
                                </li>
                            }

                        </ul>
                    </div>

                    <div className="brackets_section">
                        <div className="tournament-rules">
                            <h1>Regras do Torneio:</h1>
                            <h3>Bla</h3>
                            <h3>Bla</h3>
                            <h3>Bla</h3>
                            <h3>Bla</h3>
                        </div>
                        <h1>Jogo</h1>
                        
                            
                        <div className="game-info">
                            <div className="image">
                                <img
                                src={process.env.PUBLIC_URL + "/images/games/rastros.png"}
                                alt="Info"
                                className="game-image"
                                />
                            </div>
                            <div className="game-description">
                                <p className="game-details-p">
                                    LOREM IMPSUM
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
                                            style={{ width: 75 + "%" }}
                                        >
                                            <span>fácil</span>
                                        </div>
                                    </div>
                                    <h4>Idade: +12 </h4>
                                </div>
                            </div>
                        </div>
                        

                        <div className="tournament-bracket">
                            <h1>Brackets</h1>
                            <div className="brackets">
                                {tournament_initialized && 
                                    <button onClick={() =>  seeBracket()}>See Bracket</button>
                                }
                                {!tournament_initialized && 
                                    <button onClick={() =>  setTournament_Initialized(true)}>Initialize tournament</button>
                                }
                            </div>
                        </div>
                        
                        {tournament.owner_id === user &&
                        <>
                            <button>Eliminar Torneio</button>
                            <button>Iniciar Torneio</button>
                        </>
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default TournamentPage;