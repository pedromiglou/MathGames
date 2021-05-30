import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Square from './Square';
import Piece from './Piece';
import {GameLoop} from './GameLoop';

export default class RastrosEngine extends React.Component {
    constructor(props) {
        super(props);
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        var temp = [];
        for (let x = 0; x<7; x++) {
            for (let y=0; y<7; y++) {
                temp.push([x, y]);
            }
        }
        this.entities = temp.map(X=>{
            return {position: X, size: Constants.CELL_SIZE, renderer: <Square></Square>};
        });
        this.entities.push({position: [4,2], size: Constants.CELL_SIZE, renderer: <Piece></Piece>})

    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.title}>Player1</Text>
            <GameEngine
                ref={(ref)=>{this.engine=ref}}
                style={{width: this.boardSize, height: this.boardSize, flex: null}}
                systems={[ GameLoop ]}
                entities={this.entities}
            />
            <Text style={styles.title}>Player2</Text>
            
        </View>);
    }
}

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