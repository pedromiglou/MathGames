import React, {useEffect} from "react";

import "./Bracket.css";


function Bracket() {

    useEffect( () => {
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


        const capacidade = 32;
        //div geral
        let bracket_container = document.getElementById("bracket-container");

        let ndivs = capacidade/2;
        let collumn = 1

        while(true){

            if (ndivs === 1){
                let collumn_bracket = document.createElement("div");
                bracket_container.appendChild(collumn_bracket);
                let game_bracket = document.createElement("div");
                game_bracket.id = "c"+collumn+"_1";
                game_bracket.className = "bracket-game";
                collumn_bracket.appendChild(game_bracket);
                break;
            } else {
                let collumn_bracket = document.createElement("div");
                bracket_container.appendChild(collumn_bracket);
                for (let i=0; i<ndivs; i++){
                    let game_bracket = document.createElement("div");
                    game_bracket.id = "c"+collumn+"_"+i;;
                    game_bracket.className = "bracket-game";
                    collumn_bracket.appendChild(game_bracket);
                }
                ndivs = ndivs/2;    
                collumn++;
            }
        }        
    },[])

	return(
        <>
            <div id="bracket-container" className="bracket-container">

            </div>
        </>
    )
}

export default Bracket;