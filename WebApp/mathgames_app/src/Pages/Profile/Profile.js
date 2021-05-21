import { React, useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import Avatar from "../../Components/Avatar";
import InventoryItems from "../../Components/InventoryItems";

import { games_info } from "../../data/GamesInfo";

import AuthService from "../../Services/auth.service"
import UserService from "../../Services/user.service"
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
    const [menuOption, setMenuOption] = useState("Geral");
    const [invOption, setInvOption] = useState("Chapeus");
    const [user, setUser] = useState("");
    const [games, setGames] = useState([]);

    const [hat, setHat] = useState("MagicianHat");
    const [shirt, setShirt] = useState("");
    const [color, setColor] = useState("#FFAF00");
    const [accessorie, setAccessorie] = useState("None");
    const [trouser, setTrouser] = useState("#808080");
    const [modalSaveShow, setSaveModalShow] = useState(false);
    const [modalCancelShow, setCancelModalShow] = useState(false);
    var geral_e;
    var inventario_e;
    var last_games_e;


    // Tem de colocar no redux o tipo de user
    useEffect(() => {
		var current_user = AuthService.getCurrentUser();
        
        async function fetchApiUserById() {
            var user = await UserService.getUserById(current_user.id);
            setUser(user);
            setHat(user.avatar_hat);
            setShirt(user.avatar_shirt);
            setColor(user.avatar_color);
            setAccessorie(user.avatar_accessorie);
            setTrouser(user.avatar_trouser);
        }

		// Load user games history
        async function fetchApiLastGames() {
            console.log(current_user.id)
            var response = await UserService.getLastGames(current_user.id);
            if (!response.error)
                setGames(response);
        }

        if (current_user !== null) {
            fetchApiUserById();
            fetchApiLastGames();
        }

    }, [])

    function geral() {
        setMenuOption("Geral");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "#7158e2";
        inventario_e.style.backgroundColor = "rgb(63, 63, 63)";
        last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
    }
    function inventario() {
        setMenuOption("Inventario");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "rgb(63, 63, 63)";
        inventario_e.style.backgroundColor = "#7158e2";
        last_games_e.style.backgroundColor = "rgb(63, 63, 63)";
    }
    function last_games() {
        setMenuOption("lastgames");

        geral_e = document.getElementById("Geral");
        inventario_e = document.getElementById("Inventario");
        last_games_e = document.getElementById("Last_Games");

        geral_e.style.backgroundColor = "rgb(63, 63, 63)";
        inventario_e.style.backgroundColor = "rgb(63, 63, 63)";
        last_games_e.style.backgroundColor = "#7158e2";
    }

    const getLevel = (account_level) => {
		var contador = 1;
		if (typeof account_level !== "undefined") {
			while (true) {
				var minimo = contador === 1 ? 0 : 400 * Math.pow(contador-1, 1.1);
				var maximo = 400 * Math.pow(contador, 1.1);
				if ( (minimo <= account_level) && (account_level < maximo)) {
					return contador;
				}
				contador++;
			}
		} else {
			return 0;
		}
	}

    const getBarProgression = (account_level) => {
		var nivel_atual = getLevel(account_level)
        var minimo = 400 * Math.pow(nivel_atual-1, 1.1);
		var maximo = 400 * Math.pow(nivel_atual, 1.1);
        return ((account_level-minimo)/(maximo - minimo)) * 100
	}


    function changeHat(hatName) {
        setHat(hatName);
    }

    function changeShirt(shirtName) {
        setShirt(shirtName);
    }

    function changeAccessorie(accessorieName) {
        setAccessorie(accessorieName);
    }

    function changeTrousers(trousersName) {
        setTrouser(trousersName);
    }

    async function saveAvatar() {
        var current_user = AuthService.getCurrentUser();
        await UserService.update_user(color, hat, shirt, accessorie, trouser, current_user.id);
        window.location.reload();
    }

    function SaveChangesModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Guardar alterações
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende guardar as alterações efetuadas?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => {saveAvatar();}} className="btn save-btn">Guardar</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      function CancelChangesModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: "#0056b3", fontSize: 30}}>
                Cancelar alterações
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{color: "#0056b3", fontSize: 20}}>Tem a certeza que pretende descartar as alterações efetuadas?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{fontSize: 18}} onClick={() => window.location.reload()} className="btn save-btn">Sim</Button>
              <Button style={{fontSize: 18}} onClick={props.onHide} className="btn cancel-btn">Não</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div className="hero-container">
            <div className="header">
                <div className="background">
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                    <div className="cube-profile"></div>
                </div>
            </div>
            <div className="row profile-border profile-container">
                <div className="col-lg-3 side">
                    <button
                        className="side-button box up-1"
                        type="button"
                        onClick={geral}
                        id="Geral"
                        style={{ backgroundColor: "#7158e2", color: "white" }}
                    >
                        Geral
                    </button>
                    <button
                        className="side-button-2 box up-1"
                        type="button"
                        onClick={inventario}
                        id="Inventario"
                    >
                        Inventario
                    </button>
                    <button
                        className="side-button-3 box up-1"
                        type="button"
                        onClick={last_games}
                        id="Last_Games"
                    >
                        Ultimos Jogos
                    </button>
                </div>
                {menuOption === "Geral" && (
                    <div className="col-lg-9 no-margins profile ">
                        <div className="container row container-hidden top-profile">
                            <div className="col-lg-8 row">
                                <div className="col-lg-4 avatar-geral">
                                    <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                                </div>
                                <div className="col-lg-8">
                                    <div className="account-name">
                                        <h1>{user.username}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 profile-level">
                                <p className="lvl"> Nivel </p>
                                <div className="lvl-style row">
                                    <div className="col-12 col-sm-12 col-lg-2">
                                        <p>{getLevel(user.account_level)}</p>
                                    </div>
                                    <div className="col-12 col-sm-12 col-lg-7">
                                        <div className="progress">
                                            <div
                                                className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                                role="progressbar"
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: getBarProgression(user.account_level) +"%" }}
                                            >
                                                {/* <span>Dificuldade</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-lg-2">
                                        <p>{getLevel(user.account_level) + 1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="solid" />
                        {Object.entries(games_info).map(([key, value]) => (	
                            
                            <>
                                <div className="row profile-games">
                                    <img
                                        src={value["img"]}
                                        alt="Info"
                                        id={key}
                                    />
                                    <div className="game-name">
                                        <p>{value["title"]}</p>
                                    </div>
                                </div>
                                <hr className="solid solid-pos" />
                            </>
                            )
                        )}
                        
                    </div>
                )}

                {menuOption === "Inventario" && (
                    <div className="col-lg-9 no-margins inventory">
                        <div className="row no-margins">
                            <div className="col-lg-5 avatar-display container">
                                <h1>{user.username}</h1>
                                    <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                                <div className="container skin-pallette" id="skin-pallette">
                                    <h3>Cor de pele</h3>
                                    <span className="dot-1" onClick={() => setColor("#FFAF00")}></span>
                                    <span className="dot-2" onClick={() => setColor("#694028")}></span>
                                    <span className="dot-3" onClick={() => setColor("#B1A7FF")}></span>
                                    <span className="dot-4" onClick={() => setColor("#12EED4")}></span>
                                </div>
                            </div>

                            <div className="col-lg-7 invetory-options">
                                <div className="row">
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Chapeus")}>
                                        <div className="options-text">
                                            <span className={invOption === "Chapeus" ? ("option-active") : ''}>Chapeus</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Camisolas")}>
                                        <div className="options-text">
                                            <span className={invOption === "Camisolas" ? ("option-active") : ''}>Camisolas</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Calcas")}>
                                        <div className="options-text">
                                            <span className={invOption === "Calcas" ? ("option-active") : ''}>Calcas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Acessorios")}>
                                        <div className="options-text">
                                            <span className={invOption === "Acessorios" ? ("option-active") : ''}>Acessorios</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Tabuleiros")}>
                                        <div className="options-text">
                                            <span className={invOption === "Tabuleiros" ? ("option-active") : ''}>Tabuleiros</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 options-items" onClick={() => setInvOption("Pecas")}>
                                        <div className="options-text">
                                            <span className={invOption === "Pecas" ? ("option-active") : ''}>Pecas</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="inv-list">
                                    {invOption === "Chapeus" && (
                                        <div >
                                            <InventoryItems option={"Chapeus"} hatName={changeHat} current={hat} />
                                        </div>
                                    )}
                                    {invOption === "Camisolas" && (
                                        <div >
                                            <InventoryItems option={"Camisolas"} shirtName={changeShirt} current={shirt} />
                                        </div>
                                    )}
                                    {invOption === "Acessorios" && (
                                        <div >
                                            <InventoryItems option={"Acessorios"} accessorieName={changeAccessorie} current={accessorie} />
                                        </div>
                                    )}
                                    {invOption === "Calcas" && (
                                        <div >
                                            <InventoryItems option={"Calcas"} trouserName={changeTrousers} current={trouser} />
                                        </div>
                                    )}
                                </div>

                                <div className="row save-cancel-btns">
                                    <div className="col-lg-6 col-sm-12">
                                    <button className="btn save-btn" onClick={() => setSaveModalShow(true)}>
                                        Salvar
                                    </button>

                                    <SaveChangesModal
                                        show={modalSaveShow}
                                        onHide={() => setSaveModalShow(false)}
                                    />
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <button className="btn cancel-btn" onClick={() => setCancelModalShow(true)}> Cancelar </button>
                                    </div>

                                    <CancelChangesModal
                                        show={modalCancelShow}
                                        onHide={() => setCancelModalShow(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {menuOption === "lastgames" && (
                    <div className="col-lg-9 no-margins">
                        <div className="last_games_container">
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col col-2">Data</div>
                                    <div className="col col-2">Jogo</div>
                                    <div className="col col-2">Resultado</div>
                                    <div className="col col-2">Exp. Ganha</div>
                                    <div className="col col-2">Detalhes</div>
                                </li>
                                {Object.entries(games).length === 0 
                                    ? <p className="no-games-found">O seu histório de jogos é vazio!</p>
                                    :
                                    Object.entries(games).map(
                                    ([key, value]) => (
                                        <li
                                            className={
                                                ((value["winner"] === "1" && value["player1"] === user.id) || (value["winner"] === "2" && value["player2"] === user.id) )
                                                    ? "won table-row history-box foo-history-win"
                                                    : ((value["winner"] === "2" && value["player1"] === user.id) || (value["winner"] === "1" && value["player2"] === user.id) ) 
                                                    ? "lost table-row history-box foo-history-lose"
                                                    : "draw table-row history-box foo-history-draw"
                                            }
                                            key={key}
                                        >
                                            <div className="col col-2">
                                                {value["createdAt"]}
                                            </div>
                                            <div className="col col-2">
                                                {value["game_id"] === 0
                                                    ? "Rastros" : value["game_id"] === 1 ?
                                                        "Gatos&Cães" : "Outro"}
                                            </div>
                                            <div className="col col-2">
                                                { ((value["winner"] === "1" && value["player1"] === user.id) || (value["winner"] === "2" && value["player2"] === user.id) )
                                                            ? "Vitória"
                                                            : ((value["winner"] === "2" && value["player1"] === user.id) || (value["winner"] === "1" && value["player2"] === user.id) ) 
                                                            ? "Derrota"
                                                            : "Empate"
                                                            }
                                            </div>
                                            <div className="col col-2">
                                                +{((value["winner"] === "1" && value["player1"] === user.id) || (value["winner"] === "2" && value["player2"] === user.id) )
                                                            ? "100"
                                                            : ((value["winner"] === "2" && value["player1"] === user.id) || (value["winner"] === "1" && value["player2"] === user.id) ) 
                                                            ? "30"
                                                            : "45"
                                                            }
                                            </div>
                                            <div className="col col-2">
                                                <button
                                                    className={
                                                        ((value["winner"] === "1" && value["player1"] === user.id) || (value["winner"] === "2" && value["player2"] === user.id) )
                                                            ? "won-button table-row"
                                                            : ((value["winner"] === "2" && value["player1"] === user.id) || (value["winner"] === "1" && value["player2"] === user.id) ) 
                                                            ? "lost-button table-row"
                                                            : "draw-button table-row"
                                                    }
                                                >
                                                    Detalhes
                                                </button>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );


    
};

export default Profile;
