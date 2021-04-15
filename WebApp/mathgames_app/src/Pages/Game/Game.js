import React, {useState, useEffect} from "react";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";


function Game() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);


    var game = "rastros";
    var game_mode = "AI";

    if ( game === "rastros" )
        return (
            <div>           
                <p>
                It's <time dateTime={response}>{response}</time>
                </p> 
                <RastrosEngine game_type={game_mode}></RastrosEngine>
            </div>
        );
    if ( game === "gatoscaes" )
        return (
            <div>
                <p>
                It's <time dateTime={response}>{response}</time>
                </p>
                <GatosCaesEngine game_type={game_mode}></GatosCaesEngine>
            </div>
        );
}

export default Game;