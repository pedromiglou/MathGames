import * as React from "react";
import {Image, TouchableOpacity} from 'react-native';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        var source;
        if (x===6 && y===0) {
            source = require("./../../../public/game_assets/rastros/p2.png");
        } else if (x===0 && y===6) {
            source = require("./../../../public/game_assets/rastros/p1.png");
        } else {
            source = require("./../../../public/game_assets/rastros/square.png")
        }

        return (
            <TouchableOpacity>
                <Image
                    style={{width: this.props.size, height: this.props.size, position: 'absolute', left: x * this.props.size, top: y * this.props.size}}
                    resizeMode = {'contain'}
                    source={source}
                />
            </TouchableOpacity>
        )
    }
}