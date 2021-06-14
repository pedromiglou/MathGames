import { React, useState, useEffect, Suspense } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import Avatar from "../../Components/Avatar";
import InventoryItems from "../../Components/InventoryItems";

import { games_info } from "../../data/GamesInfo";
import { ranks_info } from '../../data/ranksInfo';


import AuthService from "../../Services/auth.service"
import UserService from "../../Services/user.service"
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
    const [menuOption, setMenuOption] = useState("Geral");
    const [invOption, setInvOption] = useState("Chapeus");
    const [user, setUser] = useState("");
    const [games, setGames] = useState([]);

    const [hat, setHat] = useState("none");
    const [shirt, setShirt] = useState("none");
    const [color, setColor] = useState("#FFAF00");
    const [accessorie, setAccessorie] = useState("none");
    const [trouser, setTrouser] = useState("none");
    const [modalSaveShow, setSaveModalShow] = useState(false);
    const [modalCancelShow, setCancelModalShow] = useState(false);
    var geral_e;
    var inventario_e;
    var last_games_e;

    var current_user = AuthService.getCurrentUser();
    var ranks_dict = {}
    for (const [, value] of Object.entries(games_info)) {
        if (value["toBeDone"] === false) {
            var userRankValue;
            var userRank = 0
            switch (value["id"]) {
                case 0:
                    userRankValue = current_user.userRanksData.rastros
                    break;
                case 1:
                    userRankValue = current_user.userRanksData.gatos_e_caes
                    break;
                default:
                    userRankValue = 0;
                    break;
            }

            if (userRankValue <= 25)
                userRank = 0
            else if (userRankValue <= 75)
                userRank = 1
            else if (userRankValue <= 175)
                userRank = 2
            else if (userRankValue <= 275)
                userRank = 3
            else if (userRankValue <= 400)
                userRank = 4
            else if (userRankValue <= 550)
                userRank = 5
            else if (userRankValue <= 700)
                userRank = 6
            else if (userRankValue <= 850)
                userRank = 7
            else if (userRankValue <= 1050)
                userRank = 8
            else if (userRankValue <= 1250)
                userRank = 9
            else if (userRankValue <= 1450)
                userRank = 10
            else if (userRankValue <= 1700)
                userRank = 11
            else
                userRank = 12

            ranks_dict[value["id"]]  = userRank
        }
    }

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
            var response = await UserService.getLastGames(current_user.id);

            if (!response.error)
                setGames(response);
            else
                setGames("erro")
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

    var userLevel = getLevel(user.account_level);


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
                        {
                            
                        user.message !== undefined ?
                        <p>Perfil Indisponível</p>
                        :
                        <>
                        <div className="container row container-hidden top-profile">
                            <div className="col-lg-8 row">
                                <div className="col-lg-4 avatar-geral">
                                    <Suspense fallback={<h1>Loading ...</h1>}>	
                                        <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser}/>
                                    </Suspense>
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
                                        <p>{userLevel}</p>
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
                                        <p>{userLevel + 1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="solid" />
                        {Object.entries(games_info).map(([key, value]) => (	
                            value["toBeDone"] === false &&

                            <div key={key}>
                                <div className="row profile-games">
                                    <img
                                        src={value["img"]}
                                        alt="Info"
                                        id={key}
                                    />
                                    <div className="game-name">
                                        <p>{value["title"]}</p>
                                    </div>

                                    <img
                                        src={process.env.PUBLIC_URL +
                                            ranks_info[ranks_dict[key]].image}
                                        alt="Rank"
                                    />
                                    <p>{ranks_info[ranks_dict[key]].name}</p>
                                </div>
                                <hr className="solid solid-pos" />
                            </div>
                            )
                        )}
                        <br></br>
                        </>
                    }
                    </div>
                )}

                {menuOption === "Inventario" && (
                    <div className="col-lg-9 no-margins inventory">
                        <div className="row no-margins">
                            <div className="col-lg-5 container">
                                <div className="avatar-display">
                                    <h1>{user.username}</h1>
                                    <Avatar skinColor={color} hatName={hat} shirtName={shirt} accesorieName={accessorie} trouserName={trouser} />
                                </div>
                                <h3 className="centered">Cor de pele</h3>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 no-margin">
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d1" onClick={() => setColor("#7B241C")}></span>
                                            <span className="dot d2" onClick={() => setColor("#C0392B")}></span>
                                            <span className="dot d3" onClick={() => setColor("#D98880")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d4" onClick={() => setColor("#512E5F")}></span>
                                            <span className="dot d5" onClick={() => setColor("#7D3C98")}></span>
                                            <span className="dot d6" onClick={() => setColor("#A569BD")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d7" onClick={() => setColor("#1B4F72")}></span>
                                            <span className="dot d8" onClick={() => setColor("#2E86C1")}></span>
                                            <span className="dot d9" onClick={() => setColor("#5DADE2")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d10" onClick={() => setColor("#186A3B")}></span>
                                            <span className="dot d11" onClick={() => setColor("#28B463")}></span>
                                            <span className="dot d12" onClick={() => setColor("#58D68D")}></span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 no-margin">
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d13" onClick={() => setColor("#7E5109")}></span>
                                            <span className="dot d14" onClick={() => setColor("#D68910")}></span>
                                            <span className="dot d15" onClick={() => setColor("#F5B041")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d16" onClick={() => setColor("#6E2C00")}></span>
                                            <span className="dot d17" onClick={() => setColor("#BA4A00")}></span>
                                            <span className="dot d18" onClick={() => setColor("#DC7633")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d19" onClick={() => setColor("#626567")}></span>
                                            <span className="dot d20" onClick={() => setColor("#A6ACAF")}></span>
                                            <span className="dot d21" onClick={() => setColor("#CACFD2")}></span>
                                        </div>
                                        <div className="container skin-pallette-2" id="skin-pallette-1">
                                            <span className="dot d22" onClick={() => setColor("#17202A")}></span>
                                            <span className="dot d23" onClick={() => setColor("#273746")}></span>
                                            <span className="dot d24" onClick={() => setColor("#566573")}></span>
                                        </div>
                                    </div>
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
                                            <InventoryItems option={"Chapeus"} hatName={changeHat} current={hat} lvl={userLevel}/>
                                        </div>
                                    )}
                                    {invOption === "Camisolas" && (
                                        <div >
                                            <InventoryItems option={"Camisolas"} shirtName={changeShirt} current={shirt} lvl={userLevel}/>
                                        </div>
                                    )}
                                    {invOption === "Acessorios" && (
                                        <div >
                                            <InventoryItems option={"Acessorios"} accessorieName={changeAccessorie} current={accessorie} lvl={userLevel}/>
                                        </div>
                                    )}
                                    {invOption === "Calcas" && (
                                        <div >
                                            <InventoryItems option={"Calcas"} trouserName={changeTrousers} current={trouser} lvl={userLevel}/>
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
                                {
                                games === "erro" 
                                ?  <p className="no-games-found">Histórico de jogos indisponível!</p>
                                : Object.entries(games).length === 0 
                                    ? <p className="no-games-found">O seu histório de jogos é vazio!</p>
                                    :
                                    Object.entries(games).map(([key, value]) => (
                                        <>
                                        {value["winner"] !== null && 
                                            
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
                                                {value["updatedAt"]}
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
                                    }
                                    </>
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
