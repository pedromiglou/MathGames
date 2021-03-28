import React from "react";
// import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ChooseGame.css";

function ChooseGame() {
	return (
		<div className="page-container-2">
			<div className="container title_choose">
				<h1>Escolhe um jogo!</h1>
			</div>

			<Container className="display-games">
				{/* div className="col-xl-12 col-lg-12 col-md-6 col-sm-4"> */}
				<Row>
                    <Col xl={4} lg={4} md={6} sm={12}> 
						{/* <CardDeck> */}
                        <Card onClick={console.log("Ola cliquei no card")}>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                                fluid
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                            />
                        </Card>
						{/* </CardDeck> */}
					</Col>
				</Row>
			</Container>
            <Container className="display-games">
				{/* div className="col-xl-12 col-lg-12 col-md-6 col-sm-4"> */}
				<Row>
                    <Col xl={4} lg={4} md={6} sm={12}> 
						{/* <CardDeck> */}
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                                fluid
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                            />
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/mathGames.png"
                                }
                                style={{ margin: "0" }}
                            />
                        </Card>
						{/* </CardDeck> */}
					</Col>
				</Row>
			</Container>

			{/* <div className="container display-games">
                <div className="row">
                    <div className="col">
                        <figure>
                            <Link
                                to={{
                                    pathname: "mode",
                                    aboutProps: { game: "rastros" },
                                }}
                            >
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                    <div className="col">
                        <figure>
                            <Link to="mode">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/mathGames.png"
                                    }
                                    alt="logo"
                                    style={{ height: "250px" }}
                                />
                            </Link>
                        </figure>
                    </div>
                </div>
            </div> */}
		</div>
	);
}

export default ChooseGame;
