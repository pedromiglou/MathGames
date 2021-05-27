import * as FaIcons from 'react-icons/fa';
import { React } from "react";

//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsGames(props){
    return(
        <div className="statsGames shadow3D">
            {/* Aqui tem de se meter isto a ir buscar os dados a API, com o rank dos jogos e dps com a resposta fazer um ciclo for */}
            <h2>Jogos</h2>
            <table className="table table-borderless">
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">Jogo</th>
                <th scope="col">Atualização</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Rastros</td>
                <td>+1</td>
                <td><FaIcons.FaSearch/></td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Yoté</td>
                <td>-1</td>
                <td><FaIcons.FaSearch/></td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Cães&Gatos</td>
                <td>=</td>
                <td><FaIcons.FaSearch/></td>
                </tr>
            </tbody>
            </table>
            
            
            <h2>Número de jogos nos últimos 7 dias: {props.numberOfTotalMatches}</h2>
            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
            <CanvasJSChart options = {props.matchesByGameLast7Days} 
                /* onRef={ref => this.chart = ref} */
            /> 
            </div>
            <div className="statsTournaments shadow3D">
            <h2>Gráfico de Jogos dos ultimos 7 dias</h2>
            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                <CanvasJSChart options={props.matchesLast7DaysGraph} />
            </div>
        </div>
        
    </div>
    );
    
}

export default StatisticsGames;
