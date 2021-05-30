import * as React from "react";
import {Image} from 'react-native';

function Piece(props) {
    const imageStyle = {
        width: props.size,
        height: props.size,
        position: 'absolute',
        left: props.position[0] * props.size,
        top: props.position[1] * props.size
    }

    return (
        <Image
            style={imageStyle}
            resizeMode = {'contain'}
            source={require("./../../../public/game_assets/rastros/piece.png")}
        />
    )
}

export default Piece;