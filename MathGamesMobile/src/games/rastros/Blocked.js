import * as React from "react";
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

function Blocked(props) {
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

    return (
        <TouchableOpacity style={styles.button}>
            <Image
                style={styles.image}
                resizeMode = {'contain'}
                source={require("./../../../public/game_assets/rastros/blocked.png")}
            />
        </TouchableOpacity>
    )
}

export default Blocked;