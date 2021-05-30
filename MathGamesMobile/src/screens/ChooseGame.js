import * as React from 'react';
import {View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { saveData } from "./../utilities/AsyncStorage";
import { LinearGradient } from 'expo-linear-gradient';
import {gamesInfo} from './../data/GamesInfo';

const win = Dimensions.get('window');

function ChooseGame({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} >
      <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
        {gamesInfo.map(X => 
          <TouchableHighlight style={styles.gameTile} key={X.id} onPress = {() => {
                saveData("game", X);
                navigation.navigate('GamePage');
              }
            }>
            <View>
              <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
                <View style={{width: win.width*0.6}}>
                  <View style={{flexDirection: "row"}}>
                    <Text style={styles.title}>{X.title}</Text>
                    <Text style={styles.title}>{X.age}</Text>
                  </View>
                  
                  <Text style={styles.description}>{X.description}</Text>
                  <Text style={styles.description}>Toca para jogar!</Text>
                </View>
                  <Image
                    style={styles.image}
                    resizeMode = {'contain'}
                    source={X.img}
                  />
                
              </LinearGradient>
            </View>
          </TouchableHighlight>
        )}
      </LinearGradient>
    </ScrollView>
  );
}

export default ChooseGame;

const styles = StyleSheet.create({
  gameTile: {
    margin: 10,
    backgroundColor: "#CCFFFF",
    borderColor: "white",
    borderRadius: 2,
    borderWidth: 2
  },
  image: {
      flex: 1,
      alignSelf: 'stretch',
      width: win.width,
      height: win.width*360/1463,
      padding: 10,
      margin: 20
  },
  title: {
    fontSize: 22,
    margin: 5,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans',
  },
  description: {
    fontSize: 14,
    margin: 5,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans'
  }
});