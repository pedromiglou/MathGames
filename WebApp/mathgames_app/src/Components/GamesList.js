import { React, useState } from "react";
import { Container, Card } from "react-bootstrap";
import ReactDOM from 'react-dom'

import "./GamesList.css";

const games_list = [
    {
        id: 0,
        title: "Game 1",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
    },
    {
        id: 1,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
    },
    {
        id: 2,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
    },
    {
        id: 3,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
    },
    {
        id: 4,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
    },
];

function GamesList() {

	var element = "";

    function changeCard(e) {
        e.target.style.width = "350px";
        e.target.style.height = "350px";
        e.target.style.opacity = "0.5";
        e.target.style.backgroundColor = "rgba(0,0,0,.5)";

		const element = (
			<h1 className='testex'>
			  Hello !
			</h1>
		  );
		  
		  ReactDOM.render(
			element,
			document.getElementById('root')
		  );
    }

    function replaceCard(e) {
        e.target.style.margin = "0px";
        e.target.style.width = "300px";
        e.target.style.height = "300px";
        e.target.style.opacity = "1";
        e.target.style.backgroundColor = "white";
		var wtf = "";
    }


    return (
        <Container className="display-games container">
            {games_list.map((game) => (
                <Card key={game.id}>
                    {/* <Card.Img
                        variant="top"
                        src={game.img}
                        className="card-img"
						onMouseOver={changeCard}
						onMouseLeave={replaceCard}
                    /> */}
                    <div>
                        <img
                            src={game.img}
                            alt="Info"
                            className="card-img"
							onMouseOver={changeCard}
							onMouseLeave={replaceCard}
                        />
						{element}
						
                    </div>
                </Card>
            ))}
        </Container>
    );
}

export default GamesList;
