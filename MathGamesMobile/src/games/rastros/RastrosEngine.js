import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import Piece from './Piece';
import {GameLoop} from './GameLoop';

function RastrosEngine(props) {
    const boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    var entities = [];
    for (let x = 0; x<7; x++) {
        for (let y=0; y<7; y++) {
            entities.push([x, y]);
        }
    }
    entities = entities.map(X=>{
        return {position: X, size: Constants.CELL_SIZE, valid: false, renderer: <Square></Square>};
    });
    entities.push({position: [4,2], size: Constants.CELL_SIZE, renderer: <Piece></Piece>})

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Player1</Text>
            <GameEngine
                ref={(ref)=>{this.engine=ref}}
                style={{width: boardSize, height: boardSize, flex: null}}
                systems={[ GameLoop ]}
                entities={entities}
            />
            <Text style={styles.title}>Player2</Text>
        </View>
    );
}

export default RastrosEngine;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    title: {
        fontSize: 22,
        margin: 5,
        textAlign:'center',
        color: "white",
        fontFamily: 'BubblegumSans',
    },
});