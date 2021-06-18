import './Statistics.css';
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import StatisticsGames from './StatisticsGames';
import StatisticsTournaments from './StatisticsTournaments';
import StatisticsPlayers from './StatisticsPlayers';
// import { FaThumbsDown } from 'react-icons/fa';
// import { RGBAFormat, RGBA_ASTC_4x4_Format } from 'three';

import AuthService from '../../../Services/auth.service';

function Statistics() {
    
  
    const [filterOption, setFilterOption] = useState("Jogos");
    var current_user = AuthService.getCurrentUser();
    let history = useHistory()

    if (current_user === null || current_user === undefined || current_user.account_type !== "A") {
        history.push({
            pathname: "/",
        })
    }
    
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

    return (
        <div className="Statistics">
            <div className="row options animation-up">
				      <div className="col-lg-12 col-md-12 col-sm-12" id="filter_options">
					      <div className="row top-bar no-margin ">
						      <div className="col-lg-3 col-md-3 col-sm-3">
                  
                  {filterOption === "Jogos" &&
                    <h1>Estatisticas Jogos</h1>
                  }
                  {/*{filterOption === "Torneios" &&
                    <h1>Estatisticas Torneios</h1>
                  }*/}
                  {filterOption === "Jogadores" &&
                    <h1>Estatisticas Jogadores</h1>
                  }
						      </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 top-button">
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
                  {/*<div className="col-lg-3 col-md-3 col-sm-3 top-button">
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
                    </div>*/}
                  <div className="col-lg-4 col-md-4 col-sm-4 top-button">
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
				{filterOption === "Jogos" && <StatisticsGames />}
				{filterOption === "Torneios" && <StatisticsTournaments/>}
				{filterOption === "Jogadores" && <StatisticsPlayers />}
            </div> 
            
        </div>
    )
}

export default Statistics;