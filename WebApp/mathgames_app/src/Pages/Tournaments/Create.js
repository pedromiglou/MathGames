import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css";

import { games_info } from '../../data/GamesInfo';
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';

import TournamentService from '../../Services/tournament.service';
import AuthService from '../../Services/auth.service';

function Create() {
    const [choosenGame, setChoosenGame] = useState(-1);
    //const [tournament_fields, setTournamentFields] = useState({nome: "", privado: "", password:"", capacidade: "", jogo_id: choosenGame});

    const [error, setError] = useState(false);
    const [gameError, setGameError] = useState(false);
    const [duplicatedNameError, setDuplicatedNameError] = useState(false)
    const [nameTooBigError, setNameTooBigError] = useState(false);
    const [fieldsError, setFieldsError] = useState(false);
    const [sucesso, setSucesso] = useState("");

	let history = useHistory()

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

    async function createTournament() {
        setGameError(false)
        setError(false)
        setDuplicatedNameError(false)
        setNameTooBigError(false)
        setFieldsError(false)
        var name = document.getElementById('filter_username').value;
        if (name === "" || name === undefined || name === null) {setFieldsError(true); return}
        if (name.length > 45) {setNameTooBigError(true); return}
        var max_users = document.getElementById('capacidade').value;
        if (max_users === "") {setFieldsError(true); return}
        var privado;
        var password;
        if (document.getElementById("publico").checked) {
            privado = false;
            password = null;
        } else if (document.getElementById("privado").checked) {
            privado = true;
            password = document.getElementById("password").value;
            if (password === "") {setFieldsError(true); return}
        } else {
            setFieldsError(true); 
            return
        }
        var game_id = choosenGame;
        if (game_id === -1) {
            setGameError(true);
        } else {
            var creator = AuthService.getCurrentUser().id;
            var res = await TournamentService.createTournament(name, max_users, privado, password, game_id, creator);
            if (res.error) {
                if (res.message === "Tournament name is already in use!")
                    setDuplicatedNameError(true)
                else
                    setError(true);
            } else {
                setSucesso(true);
                history.push({
                    pathname: "/tournaments"
                })
            }
        }
	}

    return (
        <>
        {error === true 
            ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            Ocorreu um erro ao criar o torneio. Verifique os campos. 
            </div> : null}
        {sucesso === true 
            ? <div className="alert alert-success" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            Torneio criado com sucesso.
            </div> : null}
        {gameError === true 
            ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            Erro. Escolha o jogo do torneio.
            </div> : null}
        
        {fieldsError === true 
            ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            Deve preencher todos os campos para criar o torneio. 
            </div> : null}

        {duplicatedNameError === true 
            ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            O nome do torneio deve ser único. Por favor, selecione um novo nome. 
            </div> : null}

        {nameTooBigError === true 
            ? <div className="alert alert-danger" role="alert" style={{margin:"10px auto", width: "90%", textAlign:"center", fontSize:"22px"}}>
            O nome do torneio deve ter no máximo 45 caractéres. 
            </div> : null}

        <div className="all-create">
            <form>
                <div className="CreateTSection shadow-white">
                        
                        <h1>Criar Torneio</h1>
                        <div className="name-section-T">
                            <h2 className="label-form">Nome Torneio</h2>
                            
                            <input required className="form-control form-control-lg" id="filter_username" type="search" placeholder="Ex: Torneio dos Fantásticos"/>
                        </div>
                    <div className="pc-section">
                        <div className="privacy-section-T">
                            <h2 className="label-form">Privacidade</h2>
                            
                            <div className="inner-radio">
                                <input required onClick={() => hideInputPassword()} className="form-control form-control-lg radio-b" id="publico" type="radio" name="privacidade"/>
                                <label for="publico">Público</label>
                            </div>
                            
                            <div className="inner-radio">
                                <input onClick={() => showInputPassword()} onChange={() => {document.getElementById("password").required = document.getElementById("privado").checked ;}} className="form-control form-control-lg radio-b" id="privado" type="radio" name="privacidade"/>
                                <label for="privado">Privado</label>
                            </div>
                            <label for="password" id="password_label" className="hidden">Password</label>
                            <input type="password" id="password" className="form-control form-control-lg hidden"></input>
                        </div>

                        <div className="users-section">
                            <h2 className="label-form">Número Utilizadores</h2>
                            <select required className="form-control form-control-lg" name="capacidade" id="capacidade">
                                <option value="" disabled selected>Selecione uma opção</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="32">32</option>
                                <option value="64">64</option>
                            </select>
                            
                        </div>
                    </div>
                    
                    <div className="games-section">
                        <h1 className="label-game">Jogo</h1>
                        <div className="row modal-games-T">
                            
                            {Object.entries(games_info).map(([key, value]) => (		
                                <div className={value["toBeDone"] ? "not-display" : "col-lg-6 centered set-padding"} key={key} id={key + "_Card"}>
                                    <Card id={"card-" + value["title"]} className="game-card" onClick={() => {setChoosenGame(value["id"]);changeGame(value["title"])}}>
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
                        <button id="confirmButton" className="btn btn-lg btn-success" type="button" onClick={createTournament}>Confirmar</button>
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