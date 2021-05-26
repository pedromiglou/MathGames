import * as React from 'react';
import {View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { saveData } from "./../utilities/AsyncStorage";
import { LinearGradient } from 'expo-linear-gradient';

const gameNames=[{key:1, name:'Rastros'}, {key:2, name:'Gatos&Cães'}, {key:3, name:'Operações'}, {key:4, name:'Yoté'}];

const win = Dimensions.get('window');

function GameDashboard({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} >
      <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
        {gameNames.map(X => 
          <TouchableHighlight style={{margin: 10, backgroundColor: "#CCFFFF"}} key={X.key} onPress = {() => {
                saveData("gameName", X.name);
                navigation.navigate('ChooseGame');
              }
            }>
            <View>
              <LinearGradient colors={['#faad06', '#b1310a']} style={styles.background}>
                <Image
                  style={styles.image}
                  resizeMode = {'contain'}
                  source={require('./../../public/images/mathGames.png')}
                />
                <Text style={styles.title}>{X.name}</Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>
        )}
      </LinearGradient>
    </ScrollView>
  );
}

export default GameDashboard;

const styles = StyleSheet.create({
  image: {
      flex: 1,
      alignSelf: 'stretch',
      width: win.width,
      height: win.width*360/1463-20,
      padding: 10,
      margin: 0
  },
  title: {
    fontSize: 30,
    padding: 10,
    textAlign:'center'
  }
});