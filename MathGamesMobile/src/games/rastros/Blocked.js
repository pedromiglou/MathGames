import * as React from "react";
import {Image} from 'react-native';

export default class Blocked extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <Image
              style={{width: this.props.size, height: this.props.size, position: 'absolute', left: x * this.props.size, top: y * this.props.size}}
              resizeMode = {'contain'}
              source={require("./../../../public/game_assets/rastros/blocked.png")}
            />
        )
    }
}