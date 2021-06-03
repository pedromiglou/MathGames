import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import Piece from './Piece';
import {GameLoop} from './GameLoop';
import {readData} from './../../utilities/AsyncStorage';

function RastrosEngine(props) {
    const boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    var entities = [];
    for (let x = 0; x<7; x++) {
        for (let y=0; y<7; y++) {
            entities.push([x, y]);
        }
    }
    entities = entities.map(X=>{
        return {position: X, size: Constants.CELL_SIZE, valid: false, blocked:false, renderer: <Square></Square>};
    });
    entities[30].blocked = true;
    entities.push({position: [4,2], size: Constants.CELL_SIZE, renderer: <Piece></Piece>});

    const [player1, setPlayer1] = useState("player1");
    const [player2, setPlayer2] = useState("player2");
    useEffect(() => {
        let mounted = true;
        readData("player1").then(p1=>{setPlayer1(p1.slice(1,-1))});
        readData("player2").then(p2=>{setPlayer2(p2.slice(1,-1))});
        this.engine.dispatch({type: "createSockets"});
        return () => {mounted=false}
      }, []);
    
    const gameLoop = new GameLoop();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Player2</Text>
            <Text style={styles.title}>{player2}</Text>
            <GameEngine
                ref={(ref)=>{this.engine=ref}}
                style={{width: boardSize, height: boardSize, flex: null}}
                systems={[ gameLoop.loop ]}
                entities={entities}
            />
            <Text style={styles.title}>Player1</Text>
            <Text style={styles.title}>{player1}</Text>
        </View>
    );
}

export default RastrosEngine;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        margin: 5,
        textAlign:'center',
        color: "white",
        fontFamily: 'BubblegumSans',
    },
});