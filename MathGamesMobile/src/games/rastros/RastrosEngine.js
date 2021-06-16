import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import Piece from './Piece';
import {GameLoop} from './GameLoop';
import {readData} from './../../utilities/AsyncStorage';

function RastrosEngine() {
    const boardHeight = (Constants.GRID_SIZE+3) * Constants.CELL_SIZE;
    const boardWidth = Constants.GRID_SIZE * Constants.CELL_SIZE;
    var entities = [];
    for (let x = 0; x<7; x++) {
        for (let y=1; y<8; y++) {
            entities.push([x, y]);
        }
    }

    entities = entities.map(X=>{
        return {position: X, size: Constants.CELL_SIZE, valid: false, blocked:false, renderer: <Square></Square>};
    });
    entities[30].blocked = true;
    entities.push({position: [4,3], size: Constants.CELL_SIZE, renderer: <Piece></Piece>});

    const [player1, setPlayer1] = useState("player1");
    const [player2, setPlayer2] = useState("player2");
    useEffect(() => {
        let mounted = true;
        readData("gameMode").then(X=>{
            gameMode=X.slice(1,-1);
            readData("dif").then(X=>{
                dif= X!==null ? X.slice(1,-1) : null;
                readData('match_id').then(X=>{
                    match_id=X;
                    readData('player1').then(p1=>{
                        p1=p1.slice(1,-1);
                        readData('player2').then(p2=>{
                            p2=p2.slice(1,-1);
                            readData('user_id').then(X=>{
                                user_id=X.slice(1,-1);
                                this.engine.dispatch({
                                    type: "init",
                                    myTurn: user_id===p1 || gameMode==="No mesmo Computador",
                                    gameEnded: false,
                                    gameMode: gameMode,
                                    dif: dif,
                                    match_id: match_id,
                                    player1: p1,
                                    player2: p2,
                                    user_id: user_id
                                });
                                setPlayer1(p1);
                                setPlayer2(p2);
                            });
                        });
                    });
                });
            });
        });
        return () => {mounted=false}
      }, []);

    return (
        <View style={styles.container}>
            <GameEngine
                ref={(ref)=>{this.engine=ref}}
                style={{width: boardWidth, height: boardHeight, flex: null}}
                systems={[ GameLoop ]}
                entities={entities}
            />
        </View>
    );
}

export default RastrosEngine;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: Constants.CELL_SIZE/3
    }
});