import { React } from "react";

import './Statistics.css';
//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsPlayers(props){
    return(
        <>
            <div className="statsPlayers">
                <div className="player-stats">
                    <div className="player-table shadow3D">
                        <h1> Tabela de jogadores com mais reports </h1>
                        <ul className="list-group">
                            {/* Cabeçalho. Se não quiserem por, deixem estar assim vazio. */}
                            <li className="list-group-item d-flex justify-content-between align-items-center row">
                            
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
                                    <span className="badge badge-primary badge-pill">3</span>
                                </div>

                                <div className="col-lg-9 col-md-9 col-sm-9">
                                    Yoté
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-1">
                                    <span className="badge badge-dark badge-pill">=</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                
                    <div className="player-graphs">
                        <div className="shadow3D">
                            <h2>Novos Jogadores</h2>
                            <div className="graph">
                            <CanvasJSChart options={props.newPlayers7DaysGraph} />
                            </div>
                        </div>
                        <div className="shadow3D">
                            <h2>Jogadores Banidos</h2>
                            <div className="graph">
                            <CanvasJSChart options={props.bannedPlayers7DaysGraph} />
                            {/*
                            <Line
                                data={state}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                            */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
    
}

export default StatisticsPlayers;