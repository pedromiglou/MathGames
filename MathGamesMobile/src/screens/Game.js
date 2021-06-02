import * as React from 'react';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import RastrosEngine from './../games/rastros/RastrosEngine';
import { LinearGradient } from 'expo-linear-gradient';
import {readData, saveData} from './../utilities/AsyncStorage';
import Loading from './../components/Loading';
import socket from './../utilities/Socket';

function Game({navigation}) {
    //wait until everything is ready
    const [ready, setReady] = useState(-1);

    var game_id;
    var gameMode;
    var user_id;
    readData('game').then(game=>{
        game_id = JSON.parse(game).id;
        readData('gameMode').then(mode=>{
            gameMode = mode.slice(1,-1);
            //se nao for online pode prosseguir
            if (gameMode!=="Competitivo") {
                setReady(game_id);
            } else { //se for fazer as primeiras comunicacoes com o servidor
                readData('user_id').then(id=>{
                    user_id = id.slice(1,-1);
                    socket.emit("user_id", {"user_id": user_id, "game_id": String(game_id)});
                    socket.on("match_found", (msg) => {
                        saveData('match_id', msg['match_id']);
                        saveData('starter', msg['starter']);
                        saveData('opponent', msg['opponent']);
                        setReady(game_id);
                    });
                });
            }
        });
    });

    return (ready===-1) ? <Loading /> :
        <ScrollView style={{flex: 1}}>
            <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
                <RastrosEngine></RastrosEngine>
            </LinearGradient>
        </ScrollView>
    ;
}

export default Game;