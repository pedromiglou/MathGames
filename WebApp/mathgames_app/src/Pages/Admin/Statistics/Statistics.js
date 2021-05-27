import './Statistics.css';
import * as FaIcons from 'react-icons/fa';
import UserService from "../../../Services/user.service";
import { React, useState, useEffect } from "react";
//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Statistics() {

    const [numberOfBans, setNumberOfBans] = useState([])
    const [numberOfNewPlayers, setNumberOfNewPlayers] = useState([])
    const [numberOfTotalMatches, setNumberOfTotalMatchesLast7Days] = useState(0)
    const [matchesLast7Days, setMatchesLast7Days] = useState([])
    const [matchesByGameLast7Days, setMatchesByGameLast7Days] = useState([])

    useEffect(() => {
        async function fetchApiNumberOfBans() {
            var bans = await UserService.getNumberOfBans();
            setNumberOfBans(bans);
        }

        async function fetchApiNumberOfNewPlayers() {
            var newplayers = await UserService.getNumberOfNewPlayers();
            setNumberOfNewPlayers(newplayers);
        }

        async function fetchApiMatchesStatistics() {
            var matches = await UserService.getMatchesStatistics();
            setMatchesLast7Days(matches);
        }


        async function fetchApiMatchesStatisticsByGame() {
            var response = await UserService.getMatchesStatisticsByGame();
            console.log(response)
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
        }

        fetchApiNumberOfBans()
        fetchApiMatchesStatistics()
        fetchApiMatchesStatisticsByGame()
        fetchApiNumberOfNewPlayers()
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

    const bannedPlayers7DaysGraph = {
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

    const newPlayers7DaysGraph = {
        animationEnabled: true,
        //exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        data: [
          {
            type: "line",
            dataPoints: [
              { label: "6 days ago", y: numberOfNewPlayers[0] },
              { label: "5 days ago", y: numberOfNewPlayers[1] },
              { label: "4 days ago", y: numberOfNewPlayers[2] },
              { label: "3 days ago", y: numberOfNewPlayers[3] },
              { label: "2 days ago", y: numberOfNewPlayers[4] },
              { label: "yesterday", y: numberOfNewPlayers[5] },
              { label: "today", y: numberOfNewPlayers[6] }
            ]
          }
        ]
      };



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
                    <h2>Número de jogos nos últimos 7 dias: 
                        {
                            numberOfTotalMatches.message !== undefined
                            ? <p>Indisponível</p>
                            : numberOfTotalMatches
                        }
                    </h2>
                    <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                        {
                            matchesByGameLast7Days.message !== undefined
                            ? <p>Erro ao carregar o gráfico de partidas jogadas por jogo nos últimos 7 dias</p>
                            : <CanvasJSChart options = {matchesByGameLast7DaysGraph}/>
                        }
                    </div>
                </div>
                <div className="statsTournaments shadow3D">
                    <h2>Torneios</h2>
                    <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                        {
                            matchesLast7Days.message !== undefined
                            ? <p>Erro ao carregar o gráfico de partidas jogadas nos últimos 7 dias</p>
                            : <CanvasJSChart options={matchesLast7DaysGraph} />
                        }
                    </div>
                </div>
            </div>
            
            <div className="Section">
                <div className="statsPlayers shadow3D">
                    <h2>Novos Jogadores</h2>
                    <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                        {
                            numberOfNewPlayers.message !== undefined
                            ? <p>Erro ao carregar o gráfico de novos jogadores nos últimos 7 dias</p>
                            :  <CanvasJSChart options={newPlayers7DaysGraph} />
                        }
                    </div>
                </div>
                <div className="statsBannedPlayers shadow3D">
                    <h2>Jogadores Banidos</h2>
                    <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                        {
                            numberOfBans.message !== undefined
                            ? <p>Erro ao carregar o gráfico de jogadores banidos nos últimos 7 dias</p>
                            :  <CanvasJSChart options={bannedPlayers7DaysGraph} />
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Statistics;