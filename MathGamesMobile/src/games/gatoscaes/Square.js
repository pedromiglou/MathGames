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
    if ((x==3 && y==4)||(x==4 && y==4)||(x==3 && y==5)||(x==4 && y==5)) {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/gatos_caes/valid_center_square.png");
        } else {
            source = require("./../../../public/game_assets/gatos_caes/center_square.png");
        }
    } else {
        if (props.valid&&!props.blocked) {
            source = require("./../../../public/game_assets/gatos_caes/valid_square.png");
        } else {
            source = require("./../../../public/game_assets/gatos_caes/square.png");
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