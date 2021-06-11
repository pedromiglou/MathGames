import * as React from "react";
import {StyleSheet, View, Text} from 'react-native';
import Constants from "./Constants";

function GameText(props) {
    //props - position, size, text
    const x = props.position[0];
    const y = props.position[1];

    var styles;
    if (props.text[8]==="1") {
        styles = StyleSheet.create({
            row: {
                width: props.size*8,
                height: props.size,
                position: 'absolute',
                left: x * props.size,
                top: y * props.size
            },
            playerView: {
                flex: 1,
                borderWidth: 1,
                borderColor: 'white',
                alignSelf: "flex-start",
                margin: 1,
                marginTop: 5
            },
            title: {
                fontSize: 22,
                margin: 5,
                textAlign:'center',
                color: "white",
                fontFamily: 'BubblegumSans',
            },
        });
    } else if (props.text[8]==="2") {
        styles = StyleSheet.create({
            row: {
                width: props.size*8,
                height: props.size,
                position: 'absolute',
                left: x * props.size,
                top: y * props.size
            },
            playerView: {
                flex: 1,
                borderWidth: 1,
                borderColor: 'white',
                alignSelf: "flex-end",
                margin: 1,
                marginBottom: 5
            },
            title: {
                fontSize: 22,
                margin: 5,
                textAlign:'center',
                color: "white",
                fontFamily: 'BubblegumSans',
            },
        });
    } else {
        styles = StyleSheet.create({
            row: {
                width: props.size*8,
                height: props.size,
                position: 'absolute',
                left: x * props.size,
                top: y * props.size
            },
            playerView: {
                marginTop: Constants.CELL_SIZE/3,
                flex: 1,
                alignSelf: "center",
            },
            title: {
                fontSize: 22,
                textAlign:'center',
                color: "white",
                fontFamily: 'BubblegumSans',
            },
        });
    }
    

    return (
        <View style={styles.row}>
            <View style={styles.playerView}>
                <Text style={styles.title} numberOfLines={1}>{props.text}</Text>
            </View>
        </View>
    )
}

export default GameText;