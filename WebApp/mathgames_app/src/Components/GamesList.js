import { React, useState } from "react";
import { Container, Card } from "react-bootstrap";

import "./GamesList.css";

const games_list = [
    {
        id: 0,
        title: "Game 1",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
        hoover: false,
    },
    {
        id: 1,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
        hoover: false,
    },
    {
        id: 2,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
        hoover: false,
    },
    {
        id: 3,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
        hoover: false,
    },
    {
        id: 4,
        title: "Game 2",
        img: process.env.PUBLIC_URL + "/images/mathGames.png",
        hoover: false,
    },
];

function GamesList() {
    const [title, setTitle] = useState(false);
    const titleState = () => setTitle(!title);

    function changeCard(e, game) {
        var x = document.getElementById(game.id);
        x.style.width = "350px";
        x.style.height = "350px";
        x.style.opacity = "0.5";
        x.style.backgroundColor = "aquat";

        games_list[game.id]["hoover"] = true;
        titleState();
    }

    function replaceCard(e, game) {
        var x = document.getElementById(game.id);
        x.style.margin = "0px";
        x.style.width = "300px";
        x.style.height = "300px";
        x.style.opacity = "1";
        x.style.backgroundColor = "white";

        games_list[game.id]["hoover"] = false;
        titleState();
    }

    const showTitle = (game) => {
        if (game.hoover) {
            return <h1 className="game-title">{game.title}</h1>;
        }
    };

    return (
        <Container className="display-games container">
            {games_list.map((game) => (
                <Card key={game.id}>
                    <div
                        onMouseEnter={(e) => changeCard(e, game)}
                        onMouseLeave={(e) => replaceCard(e, game)}
                    >
                        <img
                            src={game.img}
                            alt="Info"
                            className="card-img"
                            id={game.id}
                        />
                        {showTitle(game)}
                    </div>
                </Card>
            ))}
        </Container>
    );
}

export default GamesList;
