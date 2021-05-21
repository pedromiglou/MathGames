import './Statistics.css';
import * as FaIcons from 'react-icons/fa';
import UserService from "../../../Services/user.service";
import { React, useState, useEffect } from "react";
//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Statistics() {

    const [numberOfBans, setNumberOfBans] = useState([])

    useEffect(() => {
        async function fetchApiNumberOfBans() {
            var bans = await UserService.getNumberOfBans();
            console.log(bans);
            setNumberOfBans(bans);
        }

        fetchApiNumberOfBans()
    }, [])

    /*
    const state = {
        labels: ['6 days ago', '5 days ago', '4 days ago',
                 '3 days ago', '2 days ago', 'yesterday', 'today'],
        datasets: [
          {
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [numberOfBans[0], numberOfBans[1], numberOfBans[2], numberOfBans[3], numberOfBans[4], numberOfBans[5], numberOfBans[6]]
          }
        ]
      }
      */

    const options = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        data: [
          {
            type: "line",
            dataPoints: [
              { label: "6 days ago", y: numberOfBans[0] },
              { label: "5 days ago", y: numberOfBans[1] },
              { label: "4 days ago", y: numberOfBans[2] },
              { label: "3 days ago", y: numberOfBans[3] },
              { label: "2 days ago", y: numberOfBans[4] },
              { label: "yesterday", y: numberOfBans[5] },
              { label: "today", y: numberOfBans[6] }
            ]
          }
        ]
      };

    return (
        <div className="Statistics">
            <h1>Estatisticas Gerais</h1>
            <div className="Section">
                <div className="statsGames shadow3D">
                    {/* Aqui tem de se meter isto a ir buscar os dados a API, com o rank dos jogos e dps com a resposta fazer um ciclo for */}
                    <h2>Jogos</h2>
                    <table className="table table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Jogo</th>
                        <th scope="col">Atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Rastros</td>
                        <td>+1</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Yoté</td>
                        <td>-1</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Cães&Gatos</td>
                        <td>=</td>
                        <td><FaIcons.FaSearch/></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="statsTournaments shadow3D">
                    <h2>Torneios</h2>
                    <h1>Aqui n sei mt bem o que se vai por ainda, mas vai ser estatisticas de torneios</h1>
                </div>
            </div>
            
            <div className="Section">
                <div className="statsPlayers shadow3D">
                    <h2>Jogadores</h2>
                    <h1>Estatisticas relacionadas com os jogadore</h1>
                </div>
                <div className="statsBannedPlayers shadow3D">
                    <h2>Jogadores Banidos</h2>
                    <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                    <CanvasJSChart options={options} />
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
    )
}

export default Statistics;