import React from "react";
import { Row, Container, Card } from "react-bootstrap";

import "./GamesList";

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

const Teste = () => {
	return (
		<Container className="display-games">
            <Row>
                {games_list.map((game) => (
					<Card>
						<Card.Img
							variant="top"
							src={game.img}
							style={{ margin: "0" }}
							fluid
						/>
					</Card>
				))}
            </Row>
		</Container>
	);
};

export default Teste;
