import * as React from 'react';
import {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import RastrosEngine from './../games/rastros/RastrosEngine';
import { LinearGradient } from 'expo-linear-gradient';
import {readData} from './../utilities/AsyncStorage';
import Loading from './../components/Loading';

function Game({navigation}) {
    const [game_id, setGameId] = useState("");
    readData('game').then(game=>{setGameId(JSON.parse(game).id)});

    if (game_id===0) {
        return (
            <ScrollView style={{flex: 1}}>
                <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
                    <RastrosEngine></RastrosEngine>
                </LinearGradient>
            </ScrollView>
        );
    } else {
        return <Loading />;
    }
}

export default Game;