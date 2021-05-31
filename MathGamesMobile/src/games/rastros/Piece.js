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

    return (
        <TouchableOpacity>
            <Image
                style={imageStyle}
                resizeMode = {'contain'}
                source={require("./../../../public/game_assets/rastros/piece.png")}
            />
        </TouchableOpacity>
    )
}

export default Piece;