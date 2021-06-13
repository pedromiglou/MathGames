import * as React from "react";
import {Image, TouchableOpacity} from 'react-native';

function Piece(props) {
    const imageStyle = {
        width: props.size,
        height: props.size,
        position: 'absolute',
        left: props.position[0] * props.size,
        top: props.position[1] * props.size
    }

    var source;
    if (props.type === 1) {
        source = require("./../../../public/game_assets/gatos_caes/cat.png");
    } else {
        source = require("./../../../public/game_assets/gatos_caes/dog.png");
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

export default Piece;