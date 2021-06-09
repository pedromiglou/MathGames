import * as React from 'react';
import {ScrollView, Text, Dimensions, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const win = Dimensions.get('window');

function Loading() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]} style={styles.linearGradient}>
          <Text style={styles.title}>Loading...</Text>
        </LinearGradient>
      </ScrollView>
    );
  }

export default Loading;

const styles = StyleSheet.create({
  scrollView: {
      flexGrow: 1,
      flex:1
  },
  linearGradient: {
      minHeight: win.height
  },
  title: {
    fontSize: 40,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'BubblegumSans',
    color: 'white'
  }
});