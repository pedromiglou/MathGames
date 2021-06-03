import * as React from "react";
import {Image, TouchableOpacity} from 'react-native';

function Square(props) {
    const x = props.position[0];
    const y = props.position[1];

    const imageStyle = {
        width: props.size,
        height: props.size,
        position: 'absolute',
        left: x * props.size,
        top: y * props.size
    }

    var source;
    if (x===6 && y===0) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_p2.png");
        } else {
            source = require("./../../../public/game_assets/rastros/p2.png");
        }
    } else if (x===0 && y===6) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_p1.png");
        } else {
            source = require("./../../../public/game_assets/rastros/p1.png");
        }
    } else {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/rastros/valid_square.png");
        } else {
            source = require("./../../../public/game_assets/rastros/square.png");
        }
    }

    return (
        <TouchableOpacity>
            <Image
                style={imageStyle}
                resizeMode = {'contain'}
                source={source}
            />
        </TouchableOpacity>
    )
}

export default Square;