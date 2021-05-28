import { React } from "react";

//import {Line} from 'react-chartjs-2';
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatisticsPlayers(props){
    return(
        <>
            <div className="statsPlayers shadow3D">
                <h2>Novos Jogadores</h2>
                <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                <CanvasJSChart options={props.newPlayers7DaysGraph} />
                </div>
            </div>
            <div className="statsBannedPlayers shadow3D">
                <h2>Jogadores Banidos</h2>
                <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                <CanvasJSChart options={props.bannedPlayers7DaysGraph} />
                {/*
                <Line
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    />
                */}
                </div>
            </div>
        </>
    );
    
}

export default StatisticsPlayers;