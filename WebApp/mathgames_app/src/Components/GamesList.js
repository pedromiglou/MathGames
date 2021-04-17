import { React, useState } from "react";
import { Container, Card } from "react-bootstrap";
import {Route, Link} from "react-router-dom";
import {games_info} from '../data/GamesInfo';

import "./GamesList.css";


function GamesList() {
    const [title, setTitle] = useState(false);
    const titleState = () => setTitle(!title);

    function changeCard(e, game) {
        var x = document.getElementById(game.id);
        x.style.width = "350px";
        x.style.height = "350px";
        x.style.opacity = "0.5";
        x.style.backgroundColor = "aquat";

        game.hoover = true;
        titleState();
    }

    function replaceCard(e, game) {
        var x = document.getElementById(game.id);
        x.style.margin = "0px";
        x.style.width = "300px";
        x.style.height = "300px";
        x.style.opacity = "1";
        x.style.backgroundColor = "white";

        game.hoover = false;
        titleState();
    }

    const showTitle = (game) => {
        if (game.hoover) {
            return <h1 className="game-title">{game.title}</h1>;
        }
    };

    return (
        <>
        <Container className="display-games container">
            {Object.entries(games_info).map( ([key, value]) =>  ( 
                <Card key={key}>
                    <Route>
                        <Link to={value['path']}>
                            <div
                                onMouseEnter={(e) => changeCard(e, value)}
                                onMouseLeave={(e) => replaceCard(e, value)}
                            >
                                <img
                                    src={value['img']}
                                    alt="Info"
                                    className="card-img"
                                    id={key}
                                />
                                {showTitle(value)}
                            </div> 
                        </Link>
                    </Route>    
                </Card>
            ))}
        </Container>
        
        </>
    );
}

export default GamesList;
