import React, {useState, useEffect} from "react";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";
import socketIOClient from "socket.io-client";

//const ENDPOINT = "http://127.0.0.1:4000";
//const socket = socketIOClient(ENDPOINT);


function Game() {
    /*
    const [response, setResponse] = useState("");

    useEffect(() => {
        socket.on("server-client", data => {
            console.log("9")
            setResponse(data);
        });
    }, []);



    function teste(event) {
        event.preventDefault();
        var input = document.getElementById('input');
        
        if (input.value) {
            socket.emit('client-server', input.value);
            input.value = '';
        }
    }
    */
   

    var game = "rastros";
    var game_mode = "AI";

    if ( game === "rastros" ) {
        return (
            <div>    
                {
                    /*
                    <p>
                    It's <span>{response}</span>
                    </p> 
                    <form onSubmit={teste} id='form'>
                        <input id='input'></input>
                    </form>
                    */
                }
                
                <RastrosEngine game_type={game_mode}></RastrosEngine>
            </div>
        );
    }
    if ( game === "gatoscaes" ) {
        return (
            <div>
                {
                    /*
                    <p>
                    It's <span>{response}</span>
                    </p> 
                    <form onSubmit={teste} id='form'>
                        <input id='input'></input>
                    </form>
                    */
                }
                <GatosCaesEngine game_type={game_mode}></GatosCaesEngine>
            </div>
        );
    }

    
   
    
    
}



export default Game;