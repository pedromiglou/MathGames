import React, {useState} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css";

import { games_info } from '../../data/GamesInfo';
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';

function Create() {
    var choosenGame = -1;
    const [tournament_fields, setTournamentFields] = useState({nome: "", privado: "", password:"", capacidade: "", jogo_id: choosenGame});

    function changeGame(game){
		const cards =  []
		for (var [key,value] of Object.entries(games_info)) {
			if (!value["toBeDone"] && key !== -1){
				
				var card = document.getElementById("card-" + value["title"]);
				cards.push(
					{ key: value["title"],
					  value:card
					}
				);
			}
		}

		for (let i = 0; i < cards.length; i++){
			if (game === cards[i].key){
				if (cards[i].value.classList.contains("not-active")){
					cards[i].value.classList.remove("not-active")
				}
				cards[i].value.classList.add("active") 
			} else {
				if (cards[i].value.classList.contains("active")){
					cards[i].value.classList.remove("active")
				}
				cards[i].value.classList.add("not-active") 
			}
		} 
	}

    function submitFunction(event) {
		event.preventDefault();
		document.getElementById("confirmButton").click();
	}

    function showInputPassword(){
        let p_input = document.getElementById("password");
        let p_label = document.getElementById("password_label");
        p_input.classList.remove("hidden");
        p_input.classList.add("show");
        p_label.classList.remove("hidden");
        p_label.classList.add("show");
    }

    function hideInputPassword(){
        let p_input = document.getElementById("password");
        let p_label = document.getElementById("password_label");
        p_input.classList.remove("show");
        p_input.classList.add("hidden");
        p_label.classList.remove("show");
        p_label.classList.add("hidden");
    }

    return (
        <>
        <div className="all-create">
            <form onSubmit={submitFunction}>
                <div className="CreateTSection shadow-white">
                        
                        <h1>Criar Torneio</h1>
                        <div className="name-section-T">
                            <h2 className="label-form">Nome Torneio</h2>
                            
                            <input className="form-control form-control-lg" id="filter_username" type="search" placeholder="Ex: Torneio dos Fantásticos"/>
                        </div>
                    <div className="pc-section">
                        <div className="privacy-section-T">
                            <h2 className="label-form">Privacidade</h2>
                            
                            <div className="inner-radio">
                                <input onClick={() => hideInputPassword()} className="form-control form-control-lg radio-b" id="publico" type="radio" name="privacidade"/>
                                <label for="publico">Público</label>
                            </div>
                            
                            <div className="inner-radio">
                                <input onClick={() => showInputPassword()} className="form-control form-control-lg radio-b" id="privado" type="radio" name="privacidade"/>
                                <label for="privado">Privado</label>
                            </div>
                            <label for="password" id="password_label" className="hidden">Password</label>
                            <input type="password" id="password" className="form-control form-control-lg hidden"></input>
                        </div>

                        <div className="users-section">
                            <h2 className="label-form">Número Utilizadores</h2>
                            <select className="form-control form-control-lg" name="capacidade" id="capacidade">
                                <option value="" disabled selected>Selecione uma opção</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                {/* <option value="32">32</option>
                                <option value="64">64</option> */}
                            </select>
                            
                        </div>
                    </div>
                    
                    <div className="games-section">
                        <h1 className="label-game">Jogo</h1>
                        <div className="row modal-games-T">
                            
                            {Object.entries(games_info).map(([key, value]) => (		
                                <div className={value["toBeDone"] ? "not-display" : "col-lg-6 centered set-padding"} key={key} id={key + "_Card"}>
                                    <Card id={"card-" + value["title"]} className="game-card" onClick={() => {choosenGame = value["id"];changeGame(value["title"])}}>
                                        <div>
                                        
                                            <img src={value["img"]}
                                                    alt="Info"
                                                    className="game-img"
                                                    id={key}
                                                    />
                                        
                                            <h2>
                                                {value["title"]}
                                            </h2>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    
                    <div className="row buttons">
                        <button id="confirmButton" onClick={() => setTournamentFields()} className="btn btn-lg btn-success" type="button">Confirmar</button>
                        <Link to="/tournaments" className="btn btn-lg btn-danger">
                            Cancelar
                        </Link>
                    </div>
                    
                </div>
                
            </form>
            
        </div>
            
            
        </>
    );
}

export default Create;