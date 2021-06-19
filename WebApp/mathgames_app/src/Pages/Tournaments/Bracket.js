import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';


import "./Bracket.css";

import TournamentService from '../../Services/tournament.service';

import { urlWeb } from "../../data/data";


function Bracket() {

   //useEffect( () => {
        /*
            numero divs primeira coluna = capacidade / 2
            se numero divs resultante diferente de 1
            criar uma nova coluna, com metade das divs da anterior
            se nova coluna tiver nºdivs diferente de 1 repetir o processo.
            Este processo repete-se até restar apenas 1 
        */

        //Isto pode vir a ter um problema, pq qnd a pagina é renderizada novamente, sao acrescentadas divs que não deveriam
        //Talvez seja preciso este useEffect depender de um useState para ser corrido so no inicio, e cujo estado nunca seja
        //alterado para nao correr este useEffect novamente
    
/*
        const capacidade = 32;
        //div geral
        let bracket_container = document.getElementById("bracket-container");

        let ndivs = capacidade/2;
        // let collumn = 1
        let counter = 1

        while(true){

            if (ndivs === 1){
                let collumn_bracket = document.createElement("div");
                bracket_container.appendChild(collumn_bracket);
                let game_bracket = document.createElement("div");
                // game_bracket.id = "c"+collumn+"_1";
                game_bracket.id = counter;
                game_bracket.className = "bracket-game";
                collumn_bracket.appendChild(game_bracket);
                for (let i=0; i<2; i++){
                    let input_bracket = document.createElement("input");
                    input_bracket.type = "text";
                    input_bracket.className = "input_bracket"
                    game_bracket.appendChild(input_bracket);
                }
                counter++;
                break;
            } else {
                let collumn_bracket = document.createElement("div");
                bracket_container.appendChild(collumn_bracket);
                for (let i=0; i<ndivs; i++){
                    let game_bracket = document.createElement("div");
                    // game_bracket.id = "c"+collumn+"_"+i;
                    game_bracket.id = counter;
                    game_bracket.className = "bracket-game";
                    collumn_bracket.appendChild(game_bracket);
                    for (let i=0; i<2; i++){
                        let input_bracket = document.createElement("input");
                        input_bracket.type = "text";
                        input_bracket.className = "input_bracket"
                        game_bracket.appendChild(input_bracket);
                    }
                    counter++;

                }
                ndivs = ndivs/2;    
                // collumn++;
            }
        }        
    },[])*/



    const [players] = useState({})
    const [bracket] = useState([])
    const [readyToDisplay, setReadyToDisplay] = useState(false)
    const [bracketUnavailable, setBracketUnavailable] = useState(false)

    const history = useHistory();

    const url = new URLSearchParams(window.location.search);
	let tournament_id = url.get("id");
    if (tournament_id === null || tournament_id === undefined) {
       window.location.assign(urlWeb)
    }
 
    const retrieveInformation = () => {
        async function checkTournamentStatus() {
            setBracketUnavailable(false)
            var response = await TournamentService.getTournamentById(tournament_id)
            console.log(response)
            if (!response["message"]) {
                if (response.status === "PREPARING") {
                    setBracketUnavailable(true)
                    return true
                }
                return false
            } else {
                history.push("/tournaments")
            }
            return false
        }

        async function fetchApiTournamentMatches() {
            var response = await TournamentService.getMatchesByTournament(tournament_id)
            if (!response["message"]) {
                for (let match of response) {
                    bracket.push({ 
                        matchNo: match.match_id,
                        roundNo: match.roundNo,
                        lastGames1: match.lastGames1,
                        lastGames2: match.lastGames2,
                        nextGame: match.nextGame,
                        player1: match.player1 === null ? null : players[match.player1].username,
                        player2: match.player2 === null ? null : players[match.player2].username,
                        bye: match.bye })
                }
            }

        }

        async function fetchApiTournamentPlayers() {
            var response = await TournamentService.getPlayersByTournament(tournament_id)
            if (!response["message"]) {
                for (let player of response) {
                    players[player.id] = player
                }
            }
        }

        async function getData() {
            var notavailable = await checkTournamentStatus();
            if (notavailable) return;
            await fetchApiTournamentPlayers();
            await fetchApiTournamentMatches();
            setReadyToDisplay(true)
        }
        getData()
    }

    useEffect(
        retrieveInformation
    , [bracket, players, tournament_id, history]) 


    useEffect( () => {

        async function renderBrackets(struct) {
            var bracketCount = 0;
            var groupCount = struct.map(function(s) { return s.roundNo; }).filter((v, i, a) => a.indexOf(v) === i).length; 
    
            var group = document.createElement("div");
            group.className = "group"+(groupCount+1);
            group.id = "b"+bracketCount
    
            const groupBy = key => array =>
                array.reduce((objectsByKeyValue, obj) => {
                    const value = obj[key];
                    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                    return objectsByKeyValue;
             }, {});
    
            const groupByRound = groupBy('roundNo');
            var grouped = groupByRound(struct)
            
            for(let g=1;g<=groupCount;g++) {
    
                var round = document.createElement("div");
                round.className = "r"+g;
    
                for (let gg = 0; gg < grouped[g].length; gg++) {
                    if(grouped[g][gg].bye) {
                        var newdiv = document.createElement("div")
                        round.appendChild(newdiv)
                    }
                    else {
                        var span3 = document.createElement("span")
                        span3.className = "teama"
                        span3.innerHTML = (grouped[g][gg].player1 === null ? "null" : grouped[g][gg].player1)
                        var span4 = document.createElement("span")
                        span4.className = "teamb"
                        span4.innerHTML = (grouped[g][gg].player2 === null ? "null" : grouped[g][gg].player2)
                        var div1 = document.createElement("div")
                        div1.className = "bracketbox"
                        div1.appendChild(span3)
                        div1.appendChild(span4)
                        var div2 = document.createElement("div")
                        div2.appendChild(div1)
                        round.appendChild(div2)
                    }
                }
                /*
                grouped[g].forEach(function(gg) {
                    if(gg.bye) {
                        var newdiv = document.createElement("div")
                        round.appendChild(newdiv)
                    }
                    else {
                        var span3 = document.createElement("span")
                        span3.className = "teama"
                        span3.innerHTML = (gg.player1 === null ? "null" : gg.player1)
                        var span4 = document.createElement("span")
                        span4.className = "teamb"
                        span4.innerHTML = (gg.player2 === null ? "null" : gg.player2)
                        var div1 = document.createElement("div")
                        div1.className = "bracketbox"
                        div1.appendChild(span3)
                        div1.appendChild(span4)
                        var div2 = document.createElement("div")
                        div2.appendChild(div1)
                        round.appendChild(div2)
                    }
                });*/
    
                group.appendChild(round);
            }
            
            var lastdiv = document.createElement("div")
            lastdiv.className = "r"+(groupCount+1)
            var lastdiv2 = document.createElement("div")
            lastdiv2.className="final"
            var lastdiv3 = document.createElement("div")
            lastdiv3.className="bracketbox"
            var lastspan1 = document.createElement("span")
            lastspan1.className = "teamc"
    
            var torneio = await TournamentService.getTournamentById(tournament_id)
            var winner = "null";
            console.log(players)
            console.log(torneio)
            if (torneio !== undefined && torneio.winner !== null) {
                winner = players[torneio.winner].username
            }
            lastspan1.innerHTML = winner
            lastdiv3.appendChild(lastspan1)
            lastdiv2.appendChild(lastdiv3)
            lastdiv.appendChild(lastdiv2)
            group.appendChild(lastdiv)
            
            var elemento = document.getElementsByClassName("brackets")
            elemento[0].appendChild(group)        
            bracketCount++;
        }

        if (readyToDisplay === true)
            renderBrackets(bracket)
    },[bracket, readyToDisplay, players, tournament_id])


    if (bracketUnavailable) {
        return (
            <>
                <p>Bracket is unavailable!</p>
            </>
        )
    }

	return(
        <>
            {/*<div id="bracket-container" className="bracket-container">*/}

            {<div className="brackets" id="brackets"></div>}
        </>
    )
}

export default Bracket;