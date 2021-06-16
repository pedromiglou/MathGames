import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import Piece from './Piece';
import {GameLoop} from './GameLoop';
import {readData} from './../../utilities/AsyncStorage';
import Storage from "./Storage";
import GameText from "./GameText";

function RastrosEngine() {
    const boardHeight = (Constants.GRID_SIZE+3) * Constants.CELL_SIZE;
    const boardWidth = Constants.GRID_SIZE * Constants.CELL_SIZE;

    var entities = [];
    entities.push({myTurn: null, gameEnded: null, gameMode: null, dif: null, match_id: null,
        player1: null, player2: null, user_id: null, turn: null, renderer: <Storage></Storage>});

    //add the tiles
    var squares = [];
    for (let x = 0; x<7; x++) {
        for (let y=0; y<7; y++) {
            squares.push([x, y+1]);
        }
    }
    squares.forEach(square => {
        entities.push({position: square, size: Constants.CELL_SIZE, valid: false, blocked:false,
            renderer: <Square></Square>});
    })

    entities[31].blocked = true;
    entities.push({position: [4,3], size: Constants.CELL_SIZE, renderer: <Piece></Piece>});

    useEffect(() => {
        let mounted = true;
        readData("gameMode").then(X=>{
            gameMode=X.slice(1,-1);
            readData('player1').then(p1=>{
                p1=p1.slice(1,-1);
                readData('player2').then(p2=>{
                    p2=p2.slice(1,-1);
                    entities.push({position: [0, 0], size: Constants.CELL_SIZE, text: "Jogador 2: "+p2, turn: 1,
                        dispatch: this.engine.dispatch, gameMode: gameMode, renderer: <GameText></GameText>});
                    entities.push({position: [0, 8], size: Constants.CELL_SIZE, text: "Jogador 1: "+p1, turn: 1,
                        dispatch: this.engine.dispatch, gameMode: gameMode, renderer: <GameText></GameText>});
                    readData("dif").then(X=>{
                        dif= X!==null ? X.slice(1,-1) : null;
                        readData('match_id').then(X=>{
                            match_id=X;
                            readData('user_id').then(X=>{
                                user_id=X.slice(1,-1);
                                entities[0].myTurn = user_id===p1 || gameMode==="No mesmo Computador";
                                entities[0].gameEnded = false;
                                entities[0].gameMode = gameMode;
                                entities[0].dif = dif;
                                entities[0].match_id = match_id;
                                entities[0].player1 = p1;
                                entities[0].player2 = p2;
                                entities[0].user_id = user_id;
                                entities[0].turn = 1;
                                this.engine.dispatch({type: "init"});
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