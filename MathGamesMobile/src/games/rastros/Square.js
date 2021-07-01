import * as React from "react";
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

function Square(props) {
    const x = props.position[0];
    const y = props.position[1];

    const styles = StyleSheet.create({
        button: {
            width: props.size,
            height: props.size,
            position: 'absolute',
            left: x * props.size,
            top: (y+1) * props.size
        },
        image: {
            width: props.size,
            height: props.size,
        }
    });

    var source;
    if (x===6 && y===0) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_p2.png");
        } else if (props.last) {
            source = require("./../../../public/game_assets/rastros/last_move_p2.png");
        } else {
            source = require("./../../../public/game_assets/rastros/p2.png");
        }
    } else if (x===0 && y===6) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_p1.png");
        } else if (props.last) {
            source = require("./../../../public/game_assets/rastros/last_move_p1.png");
        } else {
            source = require("./../../../public/game_assets/rastros/p1.png");
        }
    } else {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_square.png");
        } else if (props.last) {
            source = require("./../../../public/game_assets/rastros/last_move_square.png");
        } else {
            source = require("./../../../public/game_assets/rastros/square.png");
        }
    }

    return (
        <TouchableOpacity onPress={()=>props.dispatch({type: "move", x: x, y: y})} style={styles.button}>
            <Image
                style={styles.image}
                resizeMode = {'contain'}
                source={source}
            />
        </TouchableOpacity>
    )
}

export default Square;