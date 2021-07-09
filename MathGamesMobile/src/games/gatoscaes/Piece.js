import * as React from "react";
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

function Piece(props) {
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
    if (props.type === 1) {
        source = require("./../../../public/game_assets/gatos_caes/cat.png");
    } else {
        source = require("./../../../public/game_assets/gatos_caes/dog.png");
    }

    return (
        <TouchableOpacity style={styles.button}>
            <Image
                style={styles.image}
                resizeMode = {'contain'}
                source={source}
            />
        </TouchableOpacity>
    )
}

export default Piece;