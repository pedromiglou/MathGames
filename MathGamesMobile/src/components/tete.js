import React, {Component} from 'react';
import {StyleSheet, Button, Alert, View} from 'react-native';

import Avatar from "../components/Avatar2";


export default class tete extends Component {

  state = {
    uniqueValue: 1
  }

  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }))
  }

  render() {
    return (
      <View style={styles.container} key={this.state.uniqueValue}>
        <Button
        onPress={this.forceRemount}
          title="Learn More"
          color="#841584"
        />
        <Avatar shirtName="Camouflage2"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});