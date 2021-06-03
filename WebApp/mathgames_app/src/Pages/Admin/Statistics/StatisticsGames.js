import React, { useState, useEffect } from 'react';
import UserService from '../../../Services/user.service';
import './Statistics.css';

//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsGames(props){
    const [currentGame, SetCurrentGame] = useState("Geral");
    const [rastros_ranks, setRastrosRanks] = useState([]);
    const [gatos_e_caes_ranks, setGatosECaesRanks] = useState([]);

    const [rastros_7days, setRastros7Days] = useState([]);
    const [gatos_e_caes_7days, setGatosECaes7Days] = useState([]);

    const [matchesLast7Days, setMatchesLast7Days] = useState([])
    const [numberOfTotalMatches, setNumberOfTotalMatchesLast7Days] = useState(0);
    const [matchesByGameLast7Days, setMatchesByGameLast7Days] = useState([]);

    var numberClassificationGames = 0;
    function changeCurrentGame(game){
        let games = ["Geral", "Rastros", "GC"];

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

    useEffect(() => {
        async function fetchApiRastrosRanksStatistics() {
            var ranks = await UserService.getRanksStatisticsByGame("rastros");
            if (!ranks.error)
                setRastrosRanks(ranks);
            else 
                setRastrosRanks("error");
        }
        async function fetchApiGatosECaesRanksStatistics() {
            var ranks = await UserService.getRanksStatisticsByGame("gatos_e_caes");
            if (!ranks.error)
                setGatosECaesRanks(ranks);
            else
                setGatosECaesRanks("error");
        }
        async function fetchApiRastrosStatistics7Days() {
            var matches = await UserService.getMatchesStatistics7Days(0);
            if (!matches.error)
                setRastros7Days(matches);
            else
                setRastros7Days("error"); 
        }
        async function fetchApiGatosECaesStatistics7Days() {
            var matches = await UserService.getMatchesStatistics7Days(1);
            if (!matches.error)
                setGatosECaes7Days(matches);
            else
                setGatosECaes7Days("error");
        }

        async function fetchApiMatchesStatistics() {
            var matches = await UserService.getMatchesStatistics();
            if (!matches.error)
                setMatchesLast7Days(matches);
            else
                setMatchesLast7Days("error");
        }


        async function fetchApiMatchesStatisticsByGame() {
            var response = await UserService.getMatchesStatisticsByGame();
            if (!response.error) {
                if (response.message !== undefined) {
                    setNumberOfTotalMatchesLast7Days(response)
                    setMatchesByGameLast7Days(response)
                } else {
                    setNumberOfTotalMatchesLast7Days(response.countAllMatches);
                    var matches_percentage = response.matches.map(element => {
                        return {label: element.name, y: element.matchesCount}
                    })
                    setMatchesByGameLast7Days(matches_percentage);
                }
            } else {
                setNumberOfTotalMatchesLast7Days("error")
                setMatchesByGameLast7Days("error")
            }
        }

        fetchApiMatchesStatistics()
        fetchApiMatchesStatisticsByGame()
        fetchApiRastrosRanksStatistics()
        fetchApiGatosECaesRanksStatistics()
        fetchApiRastrosStatistics7Days()
        fetchApiGatosECaesStatistics7Days()
    }, [])

    const matchesLast7DaysGraph = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        data: [
            {
            type: "line",
            dataPoints: [
                { label: "6 days ago", y: matchesLast7Days[0] },
                { label: "5 days ago", y: matchesLast7Days[1] },
                { label: "4 days ago", y: matchesLast7Days[2] },
                { label: "3 days ago", y: matchesLast7Days[3] },
                { label: "2 days ago", y: matchesLast7Days[4] },
                { label: "yesterday", y: matchesLast7Days[5] },
                { label: "today", y: matchesLast7Days[6] }
            ]
            }
        ]
    };

    const matchesByGameLast7DaysGraph = {
        animationEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints: matchesByGameLast7Days
        }]
    }

    const rastros_matchesLast7DaysGraph = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        data: [
            {
            type: "line",
            dataPoints: [
                { label: "há 6 dias", y: rastros_7days[0] },
                { label: "há 5 dias", y: rastros_7days[1] },
                { label: "há 4 dias", y: rastros_7days[2] },
                { label: "há 3 dias", y: rastros_7days[3] },
                { label: "há 2 dias", y: rastros_7days[4] },
                { label: "ontem", y: rastros_7days[5] },
                { label: "hoje", y: rastros_7days[6] }
            ]
            }
        ]
    };

    const gatos_e_caes_matchesLast7DaysGraph = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        data: [
            {
            type: "line",
            dataPoints: [
                { label: "há 6 dias", y: gatos_e_caes_7days[0] },
                { label: "há 5 dias", y: gatos_e_caes_7days[1] },
                { label: "há 4 dias", y: gatos_e_caes_7days[2] },
                { label: "há 3 dias", y: gatos_e_caes_7days[3] },
                { label: "há 2 dias", y: gatos_e_caes_7days[4] },
                { label: "ontem", y: gatos_e_caes_7days[5] },
                { label: "hoje", y: gatos_e_caes_7days[6] }
            ]
            }
        ]
    };

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
                    <div id="GC" onClick={() => changeCurrentGame("GC")} className="game-stats-choose">
                        <span className="shadow"></span>
                        <span className="front">Gatos&Cães</span>
                    </div>
                </div>
            </div>
            
            { currentGame === "Geral" &&
            
            <div className="geral-stats">
                <div className="geral-table shadow3D">
                    <h1> Tabela de jogos </h1>
                    <ul className="list-group">
                        {matchesByGameLast7Days !== "error" && 
                            <>
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
                        
                            {matchesByGameLast7Days.map(function (game, index) {
                                numberClassificationGames = numberClassificationGames + 1;
                                return (
                                    <li className="list-group-item d-flex justify-content-between align-items-center row">
                                        <div className="col-lg-2 col-md-2 col-sm-2">
                                            <span className="badge badge-primary badge-pill">{numberClassificationGames}</span>
                                        </div>

                                        <div className="col-lg-9 col-md-9 col-sm-9">
                                            {game.label}
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1">
                                            <span className="badge badge-success badge-pill"></span>
                                        </div>
                                    </li>
                                )

                            })}
                            </>
                        }
                        {matchesByGameLast7Days === "error" &&
                            <li className="list-group-item justify-content-between align-items-center row">
                                <p>Dados indisponíveis.</p>
                            </li>
                        }
                    </ul>
                </div>
                
                
                <div className="geral-graphs">
                    <div className="shadow3D">
                        {matchesByGameLast7Days !== "error" &&
                            <>
                            <h2>Número de jogos nos últimos 7 dias: {numberOfTotalMatches}</h2>
                            <div className="graph">
                                <CanvasJSChart options = {matchesByGameLast7DaysGraph} 
                                    /* onRef={ref => this.chart = ref} */
                                /> 
                            </div>
                            </>
                        }
                        {matchesByGameLast7Days === "error" &&
                            <>
                            <h2>Número de jogos nos últimos 7 dias: Dados indisponíveis.</h2>
                            </>
                        }
                    </div>
                    <div className="shadow3D">
                        <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
                        {matchesLast7Days !== "error" &&
                            <div className="graph">
                                <CanvasJSChart options={matchesLast7DaysGraph} />
                            </div>
                        }
                        {matchesLast7Days === "error" &&
                                <h2>Dados indisponíveis.</h2>
                        }
                    </div>
                </div>
                
            </div>
            }

            { currentGame === "Rastros" && 
                <>        
                <div className="specific-stats">
                    <div className="geral-table shadow3D">
                        <h2>Ranks</h2>
                            { rastros_ranks !== "error" &&
                                <div className="ranks">
                                    <div className="ranks-distr">
                                        <h4>Bronze 1</h4>
                                        <img alt="bronze1" src={process.env.PUBLIC_URL + "/images/ranks/bronze1.png"}></img>
                                        <h5>{rastros_ranks[0]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Bronze 2</h4>
                                        <img alt="bronze2" src={process.env.PUBLIC_URL + "/images/ranks/bronze2.png"}></img>
                                        <h5>{rastros_ranks[1]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Bronze 3</h4>
                                        <img alt="bronze3"src={process.env.PUBLIC_URL + "/images/ranks/bronze3.png"}></img>
                                        <h5>{rastros_ranks[2]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 1</h4>
                                        <img alt="prata1" src={process.env.PUBLIC_URL + "/images/ranks/prata1.png"}></img>
                                        <h5>{rastros_ranks[3]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 2</h4>
                                        <img alt="prata2" src={process.env.PUBLIC_URL + "/images/ranks/prata2.png"}></img>
                                        <h5>{rastros_ranks[4]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 3</h4>  
                                        <img alt="prata3" src={process.env.PUBLIC_URL + "/images/ranks/prata3.png"}></img>
                                        <h5>{rastros_ranks[5]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 1</h4>
                                        <img alt="ouro1" src={process.env.PUBLIC_URL + "/images/ranks/ouro1.png"}></img>
                                        <h5>{rastros_ranks[6]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 2</h4>
                                        <img alt="ouro2" src={process.env.PUBLIC_URL + "/images/ranks/ouro2.png"}></img>
                                        <h5>{rastros_ranks[7]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 3</h4>
                                        <img alt="ouro3" src={process.env.PUBLIC_URL + "/images/ranks/ouro3.png"}></img>
                                        <h5>{rastros_ranks[8]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 1</h4>
                                        <img alt="platina1" src={process.env.PUBLIC_URL + "/images/ranks/platina1.png"}></img>
                                        <h5>{rastros_ranks[9]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 2</h4>
                                        <img alt="platina2" src={process.env.PUBLIC_URL + "/images/ranks/platina2.png"}></img>
                                        <h5>{rastros_ranks[10]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 3</h4>
                                        <img alt="platina3" src={process.env.PUBLIC_URL + "/images/ranks/platina3.png"}></img>
                                        <h5>{rastros_ranks[11]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Diamante</h4>
                                        <img alt="diamante" src={process.env.PUBLIC_URL + "/images/ranks/diamante.png"}></img>
                                        <h5>{rastros_ranks[12]}%</h5>
                                    </div>
                                </div>
                            }
                            { rastros_ranks === "error" &&
                                <h2>Dados indisponíveis.</h2>
                            }
                    </div>
                
                    <div className="geral-graphs">
                        <div className="shadow3D">
                            { rastros_7days !== "error" &&
                                <h2>Número de jogos nos últimos 7 dias: {rastros_7days.reduce(function(a, b) { return a + b; }, 0)}</h2>
                            }  
                            { rastros_7days === "error" &&
                                <h2>Dados indisponíveis.</h2>
                            }
                        </div>
                        <div className="shadow3D">
                            <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
                            { rastros_7days !== "error" &&
                                <div className="graph">
                                    <CanvasJSChart options={rastros_matchesLast7DaysGraph} />
                                </div>
                            }
                            { rastros_7days === "error" && 
                                <h2>Dados indisponíveis.</h2>
                            }
                        </div>
                    </div>
                
                </div>
            
                </>
            }



            { currentGame === "GC" && 
                <>        
                <div className="specific-stats">
                    <div className="geral-table shadow3D">
                        <h2>Ranks</h2>
                        { gatos_e_caes_ranks !== "error" &&
                                <div className="ranks">
                                    <div className="ranks-distr">
                                        <h4>Bronze 1</h4>
                                        <img alt="bronze1" src={process.env.PUBLIC_URL + "/images/ranks/bronze1.png"}></img>
                                        <h5>{gatos_e_caes_ranks[0]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Bronze 2</h4>
                                        <img alt="bronze2" src={process.env.PUBLIC_URL + "/images/ranks/bronze2.png"}></img>
                                        <h5>{gatos_e_caes_ranks[1]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Bronze 3</h4>
                                        <img alt="bronze3" src={process.env.PUBLIC_URL + "/images/ranks/bronze3.png"}></img>
                                        <h5>{gatos_e_caes_ranks[2]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 1</h4>
                                        <img alt="prata1" src={process.env.PUBLIC_URL + "/images/ranks/prata1.png"}></img>
                                        <h5>{gatos_e_caes_ranks[3]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 2</h4>
                                        <img alt="prata2" src={process.env.PUBLIC_URL + "/images/ranks/prata2.png"}></img>
                                        <h5>{gatos_e_caes_ranks[4]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Prata 3</h4>  
                                        <img alt="prata3" src={process.env.PUBLIC_URL + "/images/ranks/prata3.png"}></img>
                                        <h5>{gatos_e_caes_ranks[5]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 1</h4>
                                        <img alt="ouro1" src={process.env.PUBLIC_URL + "/images/ranks/ouro1.png"}></img>
                                        <h5>{gatos_e_caes_ranks[6]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 2</h4>
                                        <img alt="ouro2" src={process.env.PUBLIC_URL + "/images/ranks/ouro2.png"}></img>
                                        <h5>{gatos_e_caes_ranks[7]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Ouro 3</h4>
                                        <img alt="ouro3" src={process.env.PUBLIC_URL + "/images/ranks/ouro3.png"}></img>
                                        <h5>{gatos_e_caes_ranks[8]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 1</h4>
                                        <img alt="platina1" src={process.env.PUBLIC_URL + "/images/ranks/platina1.png"}></img>
                                        <h5>{gatos_e_caes_ranks[9]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 2</h4>
                                        <img alt="platina2" src={process.env.PUBLIC_URL + "/images/ranks/platina2.png"}></img>
                                        <h5>{gatos_e_caes_ranks[10]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Platina 3</h4>
                                        <img alt="platina3" src={process.env.PUBLIC_URL + "/images/ranks/platina3.png"}></img>
                                        <h5>{gatos_e_caes_ranks[11]}%</h5>
                                    </div>
                                    <div className="ranks-distr">
                                        <h4>Diamante</h4>
                                        <img alt="diamante" src={process.env.PUBLIC_URL + "/images/ranks/diamante.png"}></img>
                                        <h5>{gatos_e_caes_ranks[12]}%</h5>
                                    </div>
                                </div>
                            }
                            { gatos_e_caes_ranks === "error" &&
                                <h2>Dados indisponíveis.</h2>
                            }
                        
                    </div>
                
                
                    <div className="geral-graphs">
                        <div className="shadow3D">
                            { gatos_e_caes_7days !== "error" &&
                                <h2>Número de jogos nos últimos 7 dias: {gatos_e_caes_7days.reduce(function(a, b) { return a + b; }, 0)}</h2>
                            } 
                            { gatos_e_caes_7days === "error" &&
                                <h2>Dados indisponíveis.</h2>
                            }
                        </div>
                        <div className="shadow3D">
                            <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
                            { gatos_e_caes_7days !== "error" &&
                                <div className="graph">
                                    <CanvasJSChart options={gatos_e_caes_matchesLast7DaysGraph} />
                                </div>
                            } 
                            { gatos_e_caes_7days === "error" &&
                                <h2>Dados indisponíveis.</h2>
                            }
                        </div>
                    </div>
                
                </div>
            
                </>
            }
            
        </div>
    );
    
}

export default StatisticsGames;
