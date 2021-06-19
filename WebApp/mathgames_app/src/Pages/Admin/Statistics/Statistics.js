import './Statistics.css';
import { React, useState } from "react";
import { useHistory } from "react-router-dom";

import StatisticsGames from './StatisticsGames';
import StatisticsTournaments from './StatisticsTournaments';
import StatisticsPlayers from './StatisticsPlayers';

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
	}


	function changeToJogadores() {
		setFilterOption("Jogadores");
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