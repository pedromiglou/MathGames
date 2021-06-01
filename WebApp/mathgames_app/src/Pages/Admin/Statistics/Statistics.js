import './Statistics.css';
import UserService from "../../../Services/user.service";
import { React, useState, useEffect } from "react";

import StatisticsGames from './StatisticsGames';
import StatisticsTournaments from './StatisticsTournaments';
import StatisticsPlayers from './StatisticsPlayers';
// import { FaThumbsDown } from 'react-icons/fa';
// import { RGBAFormat, RGBA_ASTC_4x4_Format } from 'three';


function Statistics() {
    const [numberOfBans, setNumberOfBans] = useState([])
    const [numberOfNewPlayers, setNumberOfNewPlayers] = useState([])
    const [matchesLast7Days, setMatchesLast7Days] = useState([])
    const [numberOfTotalMatches, setNumberOfTotalMatchesLast7Days] = useState(0);
    const [matchesByGameLast7Days, setMatchesByGameLast7Days] = useState([]);
    
    const [filterOption, setFilterOption] = useState("Jogos");
    
    function changeToJogos() {
		setFilterOption("Jogos");

		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "underline";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = ""; */
	}

	function changeToTorneios() {
		setFilterOption("Torneios");

		
		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "underline";
        mostPlayed_e.style.textDecoration = ""; */
	}

	function changeToJogadores() {
		setFilterOption("Jogadores");

		/*allGames_e = document.getElementById("allGames");
		recommended_e = document.getElementById("recommendedGames");
		mostPlayed_e = document.getElementById("mostPlayedGames");

		allGames_e.style.textDecoration = "";
        recommended_e.style.textDecoration = "";
        mostPlayed_e.style.textDecoration = "underline"; */
	}

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
            <div className="row options animation-up">
				      <div className="col-lg-12 col-md-12 col-sm-12" id="filter_options">
					      <div className="row top-bar no-margin ">
						      <div className="col-lg-3 col-md-3 col-sm-3">
                  
                  {filterOption === "Jogos" &&
                    <h1>Estatisticas Jogos</h1>
                  }
                  {filterOption === "Torneios" &&
                    <h1>Estatisticas Torneios</h1>
                  }
                  {filterOption === "Jogadores" &&
                    <h1>Estatisticas Jogadores</h1>
                  }
						      </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 top-button">
                    <button
                      onClick={changeToJogos}
                      className={
                        filterOption === "Jogos"
                          ? "box actived-btn"
                          : "box up"
                      }
                    >
                      Estatisticas Jogos
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 top-button">
                    <button
                      onClick={changeToTorneios}
                      className={
                        filterOption === "Torneios"
                          ? "box actived-btn"
                          : "box up"
                      }
                    >
                      Estatisticas Torneios
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 top-button">
                    <button
                      onClick={changeToJogadores}
                      className={
                        filterOption === "Jogadores"
                          ? "box actived-btn"
                          : "box up"
                      }
                    >
                      Estatisticas Jogadores
                    </button>
                  </div>
					      </div>
				      </div>
			      </div>

            
            <div className="Section animation-down">
				{filterOption === "Jogos" && <StatisticsGames numberOfTotalMatches={numberOfTotalMatches} matchesByGameLast7Days={matchesByGameLast7DaysGraph} matchesLast7DaysGraph={matchesLast7DaysGraph}/>}
				{filterOption === "Torneios" && <StatisticsTournaments/>}
				{filterOption === "Jogadores" && <StatisticsPlayers newPlayers7DaysGraph={newPlayers7DaysGraph} bannedPlayers7DaysGraph={bannedPlayers7DaysGraph}/>}
            </div> 
            
        </div>
    )
}

export default Statistics;