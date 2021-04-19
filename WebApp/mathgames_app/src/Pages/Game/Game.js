import React from "react";
import { useHistory } from "react-router-dom";
import "./Game.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RastrosEngine from "../../Components/Engines/RastrosEngine";
import GatosCaesEngine from "../../Components/Engines/GatosCaesEngine";
//import socketIOClient from "socket.io-client";
//import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//const ENDPOINT = "http://127.0.0.1:4000";
//const socket = socketIOClient(ENDPOINT);

var game_id = 0;
var game_mode = "1vs1";
var ai_diff = "medium";


function Game() {
    let history = useHistory()
    var params = history.location.state

    if (params !== undefined) {
        game_id = parseInt(params.game_id);
        game_mode = params.game_mode;
        ai_diff = params.ai_diff
    }
    
    //Apenas para teste estas 2 linhas
    //var game_id = 0
    //var game_mode = "AI"

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

    if ( game_id === 0 ) {
        return (
            // <Route>
            //     <Link to='/game_page'>
            //         <button>Jogar</button>
            //     </Link>
            // </Route>
            <div>
                <RastrosEngine game_mode={game_mode} ai_diff={ai_diff}></RastrosEngine>
            </div>
        );
    }
    if ( game_id === 1 ) {
        return (
            <div>
                <GatosCaesEngine game_mode={game_mode} ai_diff={ai_diff}></GatosCaesEngine>
            </div>
        );
    }

    
   
    
    
}



export default Game;