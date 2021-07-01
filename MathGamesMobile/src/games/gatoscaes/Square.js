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
    if ((x==3 && y==3)||(x==4 && y==3)||(x==3 && y==4)||(x==4 && y==4)) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/gatos_caes/center_square.png");
        } else if (props.last) {
            source = require("./../../../public/game_assets/gatos_caes/last_move_center_square.png");
        } else {
            source = require("./../../../public/game_assets/gatos_caes/center_square.png");
        }
    } else {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/gatos_caes/square.png");
        } else if (props.last) {
            source = require("./../../../public/game_assets/gatos_caes/last_move_square.png");
        } else {
            source = require("./../../../public/game_assets/gatos_caes/square.png");
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