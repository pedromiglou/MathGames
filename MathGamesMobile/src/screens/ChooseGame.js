import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {readData} from "./../utilities/AsyncStorage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';

const win = Dimensions.get('window');

function ChooseGame({navigation}) {
  const [game, setGame] = useState({name: ""});
  useEffect(() => {
    readData("game").then(value => {if (value !== null) {setGame(JSON.parse(value));}})
  }, []);

  const gameModes=[{key:1, name:'Competitivo', icon:<MaterialCommunityIcons name="sword-cross" size={22} color="black" style={styles.icon}/>},
                  {key:2, name:'No mesmo Computador', icon:<Ionicons name="md-people-sharp" size={22} color="black" style={styles.icon} />},
                  {key:3, name:'Gerar link de convite', icon:<Feather name="link" size={22} color="black" style={styles.icon} />},
                  {key:4, name:'Contra o Computador', icon:<FontAwesome5 name="robot" size={22} color="black" style={styles.icon} />}];
  
  return (
      <ScrollView style={{ flex: 1 }}>
        <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>

          <View style={{flexDirection: "row"}}>
            <View style={{width: win.width/2}}>
              <Text style={styles.characteristics}>Idade: {game.age}</Text>
              <Text style={styles.characteristics}>Dificuldade: Fácil</Text>
            </View>
            
            <Image
              style={styles.image}
              resizeMode = {'contain'}
              source={game.image}
            />

          </View>

          <View style={{width: win.width}}>
            <Text style={styles.description}>{game.description}</Text>
          </View>

          <Text style={styles.characteristics}>Rank</Text>

          <View style={{flexDirection: "row"}}>
              <Image
                style={styles.image2}
                resizeMode = {'contain'}
                source={require('./../../public/images/ranks/bronze1.png')}
              />
              <SimpleLineIcons name="arrow-down" size={24} color="black" style={styles.arrowIcon} />
              <Image
                style={styles.image}
                resizeMode = {'contain'}
                source={require('./../../public/images/ranks/bronze2.png')}
              />
              <SimpleLineIcons name="arrow-up" size={24} color="black" style={styles.arrowIcon}/>
              <Image
                style={styles.image2}
                resizeMode = {'contain'}
                source={require('./../../public/images/ranks/bronze3.png')}
              />
            
          </View>
          
          
          {gameModes.map(X => {
            return (<TouchableHighlight style={styles.button} key={X.key} onPress = {() => navigation.navigate("Welcome")}>
              <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
                <View style={styles.buttonView}>
                  {X.icon}
                  <Text style={styles.modeName}>{X.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>)
          })}
        </LinearGradient>
      </ScrollView>
  );
}

export default ChooseGame;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign:'center'
  },
  button: {
    margin: 10,
    backgroundColor: "#CCFFFF",
    borderWidth: 2,
    borderColor: "white"
  },
  buttonView: {
    flexDirection: "row"
  },
  arrowIcon: {
    marginTop: 35,
    marginBottom: 35,
    color: "white"
  },
  icon: {
    margin: 14,
    color: "white"
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.width*360/1463,
    padding: 10,
    margin: 5
  },
  image2: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.width*360/1463,
    padding: 10,
    margin: 5,
    opacity: 0.5
  },
  modeName: {
    fontSize: 26,
    padding: 10,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans'
  },
  characteristics: {
    fontSize: 25,
    margin: 10,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans'
  },
  description: {
    fontSize: 18,
    margin: 10,
    textAlign:'center',
    color: "white",
    fontFamily: 'BubblegumSans'
  }
});