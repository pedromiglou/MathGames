import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GamePage.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function GamePage() {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col xl-5 lg-5 md-12 sm-12">
                    <h1>Yoté</h1>
                    <i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</i>
                    <br/>
                    <h1>Caracteristicas</h1>
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
                </div>
            </div>
        </div>
        
        
        </>
    );
}

export default GamePage;