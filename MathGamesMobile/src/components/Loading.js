import * as React from 'react';
import {ScrollView, Text, Dimensions, StyleSheet} from 'react-native';

const win = Dimensions.get('window');

function Loading() {
    return (
      <ScrollView>
        <Text style={styles.title}>Loading...</Text>
      </ScrollView>
    );
  }

export default Loading;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'BubblegumSans',
    color: 'white'
  }
});