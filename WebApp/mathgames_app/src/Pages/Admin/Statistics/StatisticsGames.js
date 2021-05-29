import * as FaIcons from 'react-icons/fa';
import { React, useState } from "react";

import './Statistics.css';

//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsGames(props){
    const [currentGame, SetCurrentGame] = useState("Geral");

    function changeCurrentGame(game){
        let games = ["Geral", "Rastros", "CG"];

        SetCurrentGame(game);
        for (let i = 0; i < games.length; i++){
            let game_div = document.getElementById(games[i]);
            if (games[i] === game){
                game_div.classList.add("active");
            } else {
                if (game_div.classList.contains("active")){
                    game_div.classList.remove("active");
                }

            }
        }

    }

    return(
        <div className="statsGames">
            {/* Aqui tem de se meter isto a ir buscar os dados a API, com o rank dos jogos e dps com a resposta fazer um ciclo for */}
            <div className="game-stats-section">
                <h1>Escolhe o jogo que pretendes ver estatisticas</h1>
                <div className="game-stats">
                    
                    <div id="Geral" onClick={() => changeCurrentGame("Geral")} className="game-stats-choose active">
                        <span className="shadow"></span>
                        <span className="front">Geral</span>
                    </div>
                    <div id="Rastros" onClick={() => changeCurrentGame("Rastros")} className="game-stats-choose">
                        <span className="shadow"></span>
                        <span className="front">Rastros</span>
                    </div>
                    <div id="CG" onClick={() => changeCurrentGame("CG")} className="game-stats-choose">
                        <span className="shadow"></span>
                        <span className="front">Cães&Gatos</span>
                    </div>
                </div>
            </div>
            
            { currentGame === "Geral" &&
            
            <div className="geral-stats">
                <div className="geral-table shadow3D">
                    <h1> Tabela de jogos </h1>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                Lugar
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Jogo
                            </div>
                            
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">1</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Rastros
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-success badge-pill">+1</span>
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">2</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Cães&Gatos
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-danger badge-pill">-1</span>
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">3</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Yoté
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-dark badge-pill">=</span>
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">1</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Rastros
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-success badge-pill">+1</span>
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">2</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Cães&Gatos
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-danger badge-pill">-1</span>
                            </div>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center row">
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <span className="badge badge-primary badge-pill">3</span>
                            </div>

                            <div className="col-lg-9 col-md-9 col-sm-9">
                                Yoté
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1">
                                <span className="badge badge-dark badge-pill">=</span>
                            </div>
                        </li>

                        {/* {users.map(function(user, index) {
                            numberClassificationUsers++;
                            var contador = 1;
                            while (true) {
                                var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
                                var maximo = 400 * Math.pow(contador, 1.1);
                                if ( (minimo <= user.account_level) && (user.account_level < maximo)) {
                                    break;
                                }
                                contador++;
                            }
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center row">
                                    <div className="col-lg-1 col-md-1 col-sm-1 align-items-center">
                                        <span className="badge badge-primary badge-pill">{numberClassificationUsers}</span>
                                    </div>
                                    {
                                        current_user !== null && current_user["account_type"] === "A" 
                                        ?  <>
                                            <div className="col-lg-2 col-md-2 col-sm-2">
                                                {user.username}
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2">
                                                {user["account_type"]}
                                            </div>
                                            </>
                                        :
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            {user.username}
                                        </div>
                                    }
                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                        {contador}
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        {user.account_level} pontos
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2">
                                        { current_user !== null && current_user["account_type"] !== "A" && 
                                            <>
                                            { friends.length !== 0 &&
                                                <>
                                                { friends.some(e => e.id === user.id) &&
                                                    <>
                                                    <i className="subicon pointer"   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("remove_friend"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonRemove/></i>
                                                    <i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
                                                    </>
                                                } 
                                                { (!friends.some(e => e.id === user.id) && user.id !== current_user.id ) &&
                                                    <>
                                                    <i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonAdd/></i>
                                                    <i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
                                                    </>
                                                } 
                                                </>	
                                            }
                                            { friends.length === 0 &&  user.id !== current_user.id &&
                                                <>
                                                <i className="subicon pointer"  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("friend_request"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><IoIcons.IoPersonAdd/></i>
                                                <i className="subicon pointer" style={{marginLeft:"10px"}}   onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("report_player"); setConfirmModalShow(true); setFriendRequestSucess(false); setReportSucess(false); setReportAlreadyMade(false); }}><MdIcons.MdReport/></i>
                                                </>
                                                
                                            }
                                            </>
                                        }


                                        { current_user !== null && current_user["account_type"] === "A" && user.id !== current_user.id  &&
                                            <>
                                        
                                                <i className="subicon pointer" onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("upgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleUp/></i>
                                                <i className="subicon pointer" style={{marginLeft:"10px"}} onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("downgrade"); setConfirmModalShow(true) }}><FaIcons.FaRegArrowAltCircleDown/></i>
                                                <i className="subicon pointer" style={{marginLeft:"10px"}}  onClick={() => {setModalUserId(user.id); setModalUsername(user.username); setModalOperation("ban"); setConfirmModalShow(true) }}><IoIcons.IoBan/></i>
                                                
                                            </>
                                        }
                                        
                                    </div>
                                </li>
                            )
                            }) 
                        } */}
                    </ul>
                </div>
                
                
                <div className="geral-graphs">
                    <div className="shadow3D">
                        <h2>Número de jogos nos últimos 7 dias: {props.numberOfTotalMatches}</h2>
                        <div className="graph">
                            <CanvasJSChart options = {props.matchesByGameLast7Days} 
                                /* onRef={ref => this.chart = ref} */
                            /> 
                        </div>
                    </div>
                    <div className="shadow3D">
                        <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
                        <div className="graph">
                            <CanvasJSChart options={props.matchesLast7DaysGraph} />
                        </div>
                    </div>
                </div>
                
            </div>
            }

            { currentGame !== "Geral" && 
                <>        
                <div className="specific-stats">
                    <div className="geral-table shadow3D">
                        <h2>Ranks</h2>
                        <div className="ranks">
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/bronze1.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/bronze2.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/bronze3.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/prata1.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/prata2.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>  
                                <img src={process.env.PUBLIC_URL + "/images/ranks/prata3.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/ouro1.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/ouro2.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/ouro3.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/platina1.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/platina2.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/platina3.png"}></img>
                                <h5>20%</h5>
                            </div>
                            <div className="ranks-distr">
                                <h4>Bronze1</h4>
                                <img src={process.env.PUBLIC_URL + "/images/ranks/diamante.png"}></img>
                                <h5>20%</h5>
                            </div>
                        </div>

                    
                    
                    </div>
                
                
                    <div className="geral-graphs">
                        <div className="shadow3D">
                            <h2>Número de jogos nos últimos 7 dias: {props.numberOfTotalMatches}</h2>
                            <div className="graph">
                                <CanvasJSChart options = {props.matchesByGameLast7Days} 
                                    /* onRef={ref => this.chart = ref} */
                                /> 
                            </div>
                        </div>
                        <div className="shadow3D">
                            <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
                            <div className="graph">
                                <CanvasJSChart options={props.matchesLast7DaysGraph} />
                            </div>
                        </div>
                    </div>
                
                </div>
            
                </>
            }
            
        </div>
    );
    
}

export default StatisticsGames;
