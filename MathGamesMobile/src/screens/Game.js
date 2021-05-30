import * as React from 'react';
import {ScrollView} from 'react-native';
import RastrosEngine from './../games/rastros/RastrosEngine';
import { LinearGradient } from 'expo-linear-gradient';

function Game({navigation}) {
    return (
        <ScrollView style={{flex: 1}}>
            <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
                <RastrosEngine></RastrosEngine>
            </LinearGradient>
        </ScrollView>
    );
}

export default Game;