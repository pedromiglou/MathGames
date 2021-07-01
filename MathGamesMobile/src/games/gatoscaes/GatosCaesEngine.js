import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import {GameLoop} from './GameLoop';
import {readData} from './../../utilities/AsyncStorage';
import Storage from "./Storage";
import GameText from './GameText';
import Help from './Help';

function GatosCaesEngine() {
    const boardHeight = (Constants.GRID_SIZE+3) * Constants.CELL_SIZE;
    const boardWidth = Constants.GRID_SIZE * Constants.CELL_SIZE;

    var entities = [];
    entities.push({myTurn: null, gameEnded: null, gameMode: null, dif: null, match_id: null,
        player1: null, player2: null, user_id: null, turn: null, turnCount:null, renderer: <Storage></Storage>});

    //add the tiles
    var squares = [];
    for (let x = 0; x<8; x++) {
        for (let y=0; y<8; y++) {
            squares.push([x, y]);
        }
    }

    squares.forEach(square=>{
        entities.push({position: square, size: Constants.CELL_SIZE, valid: false, blockedG:false,
            blockedC: false, last: false, dispatch: ()=>{}, renderer: <Square></Square>});
    });
    
    useEffect(() => {
        let mounted = true;
        readData("gameMode").then(X=>{
            gameMode=X.slice(1,-1);
            readData('player1').then(p1=>{
                p1=p1.slice(1,-1);
                if (p1==="") p1 = "Jogador 1";
                readData('player2').then(p2=>{
                    p2=p2.slice(1,-1);
                    if (p2==="") p2 = "Jogador 2";
                    entities.push({position: [0, 0], size: Constants.CELL_SIZE, text: "Jogador 2: "+p2, turn: 1,
                        dispatch: this.engine.dispatch, gameMode: gameMode, renderer: <GameText></GameText>});
                    entities.push({position: [0, 9], size: Constants.CELL_SIZE, text: "Jogador 1: "+p1, turn: 1,
                        dispatch: this.engine.dispatch, gameMode: gameMode, renderer: <GameText></GameText>});
                    entities.push({position: [0, 10], size: Constants.CELL_SIZE, renderer: <Help></Help>});
                    readData("dif").then(X=>{
                        dif= X!==null ? X.slice(1,-1) : null;
                        readData('match_id').then(X=>{
                            match_id= X!==null ? X.slice(1,-1) : null;
                            readData('user_id').then(X=>{
                                user_id=X.slice(1,-1);
                                readData('username').then(X=>{
                                    username=X.slice(1,-1);
                                    entities[0].myTurn = username===p1 || gameMode==="No mesmo Computador";
                                    entities[0].gameEnded = false;
                                    entities[0].gameMode = gameMode;
                                    entities[0].dif = dif;
                                    entities[0].match_id = match_id;
                                    entities[0].player1 = p1;
                                    entities[0].player2 = p2;
                                    entities[0].user_id = user_id;
                                    entities[0].username = username;
                                    entities[0].turn = 1;
                                    entities[0].turnCount = 0;
                                    this.engine.dispatch({type: "init"});
                                })
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

export default GatosCaesEngine;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: Constants.CELL_SIZE/3
    }
});