import * as React from "react";
import {StyleSheet, View, Text} from 'react-native';
import Constants from "./Constants";
import CountDown from 'react-native-countdown-component';

function GameText(props) {
    //props - position, size, text, turn
    const x = props.position[0];
    const y = props.position[1];

    var styles;
    var player;

    if (props.text[8]==="1") {
        player=1;
        styles = StyleSheet.create({
            row: {
                width: props.size*7,
                height: props.size,
                position: 'absolute',
                left: x * props.size,
                top: y * props.size,
                marginTop: 7
            },
            playerView: {
                flex: 1,
                alignSelf: "flex-start",
                margin: 1,
            },
            title: {
                fontSize: 22,
                margin: 5,
                textAlign:'center',
                color: "white",
                fontFamily: 'BubblegumSans',
                marginLeft: props.gameMode !== "Contra o Computador" ? 70 : 10
            },
        });
        
    } else if (props.text[8]==="2") {
        player=2;
        styles = StyleSheet.create({
            row: {
                width: props.size*7,
                height: props.size,
                position: 'absolute',
                left: x * props.size,
                top: y * props.size,
                marginBottom: 7
            },
            playerView: {
                flex: 1,
                alignSelf: "flex-start",
                margin: 1,
            },
            title: {
                fontSize: 22,
                margin: 5,
                textAlign:'center',
                color: "white",
                fontFamily: 'BubblegumSans',
                marginLeft: props.gameMode !== "Contra o Computador" ? 70 : 10
            },
        });
    } else {
        player=0;
        styles = StyleSheet.create({
            row: {
                width: props.size*6,
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
            {player>0 && props.gameMode !== "Contra o Computador" && <CountDown
                style={{alignSelf: "flex-start", width: 70, position: "absolute"}}
                until={300}
                onFinish={() => props.dispatch({type: "gameEnded", turn: props.turn})}
                size={15}
                timeToShow={["M","S"]}
                timeLabelStyle={{fontFamily: "BubblegumSans"}}
                timeLabels={{m: null, s: null}}
                digitTxtStyle={{fontFamily: "BubblegumSans", color: "white", paddingBottom: 0}}
                digitStyle={{paddingBottom: 0}}
                running={player===props.turn}
            />}
            
            <View style={styles.playerView}>
                <Text style={styles.title} numberOfLines={1}>{props.text}</Text>
            </View>
        </View>
    )
}

export default GameText;