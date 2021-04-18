import React from "react";
// import { Link } from "react-router-dom";
import GamesList from "../../Components/GamesList.js"
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import "./ChooseGame.css"
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseGameMode() {
    return (
        <div className="games-list">
            <Switch>
                <Link to='/game_page'>
                    <button className="btn">Jogar Rastros!</button>
                </Link>
            </Switch>
            <h1> Escolhe um Jogo !</h1>
            <GamesList />
        </div>
    );
}

export default ChooseGameMode;
