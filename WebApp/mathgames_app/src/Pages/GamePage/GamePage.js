import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GamePage.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';



//vamos ter de arranjar uma maneira de verificar o jogo guardado no useState para quando clicar no jogar ir para o jogo certo
function GamePage() {
    //De alguma maneira verificar se estiver vazio
    const [gameMode, setGameMode] = useState("");
    //Depois aqui podemos meter conforme as preferencias no perfil
    const [AIdif, setAIdif] = useState("");

    const dif_options = [
        { label: "easy", value:"easy"},
        { label: "medium", value:"medium"},
        { label: "hard", value:"hard"}
    ];

    function changeMode (val) {
        setGameMode(val);
        if (val === "AI"){
            showDif();
        } else{
            hideDif();
        }
        
    }

    function changeDif(e){
        var dif = e.target.value;
        setAIdif(dif);
    }

    function showDif() {
        var x = document.getElementById("sel_dif");
        x.style.display = "block";
    }

    function hideDif() {
        var x = document.getElementById("sel_dif");
        x.style.display = "none";
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col xl-5 lg-5 md-12 sm-12">
                    <h1>Yoté</h1>
                    <i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</i>
                    <h1>Caracteristicas</h1>
                    <h5>Dificuldade <i>X</i></h5>
                    <h5>Dificuldade <i>X</i></h5>
                    <h5>Dificuldade <i>X</i></h5>
                </div>
                <div className="col xl-7 lg-7 md-12 sm-12">
                    <div className="row">
                        <div className="col xl-6 lg-6 md-6 sm-6">
                            <h1>Rank</h1>
                        </div>
                        <div className="col xl-6 lg-6 md-6 sm-6">
                            <h1>Nivel</h1>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div idclassName="comp">
                                <button onClick={() => changeMode("competitivo")}>Competitivo</button>
                            </div>
                            <div className="offline1v1">
                                <button onClick={() => changeMode("1v1")}>1v1</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="invite">
                                <button onClick={() => changeMode("amigo")}>Convidar Amigo</button>
                            </div>
                            <div className="offlineAI">
                                <button onClick={() => changeMode("AI")}>Contra PC</button>
                            </div>
                            <select id="sel_dif" onChange={(e) => changeDif(e)}>
                                {dif_options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <Route>
                        <Link to='/game'>
                            <button>Jogar</button>
                        </Link>
                    </Route>    
                    </div>
                </div>
            </div>
        </div>
        
        
        </>
    );
}

export default GamePage;