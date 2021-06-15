import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {readData, saveData} from "../utilities/AsyncStorage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';

const win = Dimensions.get('window');

function GamePage({navigation}) {
  const [game, setGame] = useState({name: ""});
  useEffect(() => {
    readData("game").then(value => {if (value !== null) {setGame(JSON.parse(value));}})
  }, []);
  const [aiMode, setAIMode] = useState("");

  return (
    <View>
      <View style={{position:"absolute", x: 0, y:0}}>
        <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
          <View style={{minHeight: win.height, minWidth: win.width}}></View>
        </LinearGradient>
      </View>
    
      <ScrollView>
        <View style={{flexDirection: "row"}}>
          <View style={{width: win.width/2}}>
            <Text style={styles.characteristics}>Idade: {game.age}</Text>
            <Text style={styles.characteristics}>Dificuldade: Fácil</Text>
          </View>
          
          <Image
            style={styles.image}
            resizeMode = {'contain'}
            source={game.img}
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
        
        <TouchableHighlight style={styles.button} onPress = {() => {
                      saveData("gameMode", "Competitivo");
                      navigation.navigate("Game");
                    }}>
          <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
            <View style={styles.buttonView}>
              <MaterialCommunityIcons name="sword-cross" size={22} color="black" style={styles.icon}/>
              <Text style={styles.modeName}> Competitivo</Text>
            </View>
          </LinearGradient>
        </TouchableHighlight>

        

        <TouchableHighlight style={styles.button} onPress = {() => {
                      saveData("gameMode", "Contra o Computador");
                      setAIMode("D");
                    }}>
          <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
            <View style={styles.buttonView}>
              <FontAwesome5 name="robot" size={22} color="black" style={styles.icon} />
              <Text style={styles.modeName}>Contra o Telemóvel</Text>
            </View>
          </LinearGradient>
        </TouchableHighlight>
        
        {aiMode==="D" && <View style={styles.buttonView}>
          <TouchableHighlight style={styles.button} onPress = {() => {
                        saveData("dif", "easy");
                        setAIMode("P");
                      }}>
            <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
              <View style={styles.buttonView}>
                <Text style={styles.modeName}>Fácil</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress = {() => {
                        saveData("dif", "medium");
                        setAIMode("P");
                      }}>
            <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
              <View style={styles.buttonView}>
                <Text style={styles.modeName}>Médio</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress = {() => {
                        saveData("dif", "hard");
                        setAIMode("P");
                      }}>
            <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
              <View style={styles.buttonView}>
                <Text style={styles.modeName}>Difícil</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
        </View>}

        {aiMode==="P" && <View style={styles.buttonView}>
          <TouchableHighlight style={styles.button} onPress = {() => {
                        readData('user_id').then(id=>{
                          saveData('player1', id.slice(1,-1));
                          saveData('player2', "AI")
                          navigation.navigate("Game");
                        })
                      }}>
            <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
              <View style={styles.buttonView}>
                <Text style={styles.modeName}>Jogador 1</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress = {() => {
                        readData('user_id').then(id=>{
                          saveData('player1', "AI")
                          saveData('player2', id.slice(1,-1));
                          navigation.navigate("Game");
                        })
                      }}>
            <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
              <View style={styles.buttonView}>
                <Text style={styles.modeName}>Jogador 2</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
        </View>}

        <TouchableHighlight style={styles.button} onPress = {() => {
                      saveData("gameMode", "No mesmo Computador");
                      saveData("player1", "Miglou");
                      saveData("player2", "Rafiky");
                      navigation.navigate("Game");
                    }}>
          <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
            <View style={styles.buttonView}>
              <Ionicons name="md-people-sharp" size={22} color="black" style={styles.icon} />
              <Text style={styles.modeName}> No mesmo Telemóvel</Text>
            </View>
          </LinearGradient>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

/* convidar por link
<TouchableHighlight style={styles.button} onPress = {() => {
              saveData("gameMode", "Gerar link de convite");
              navigation.navigate("Game");
            }}>
  <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
    <View style={styles.buttonView}>
      <Feather name="link" size={22} color="black" style={styles.icon} />
      <Text style={styles.modeName}>Gerar link de convite</Text>
    </View>
  </LinearGradient>
</TouchableHighlight>
*/

export default GamePage;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign:'center'
  },
  button: {
    margin: 10,
    backgroundColor: "#CCFFFF",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonView: {
    flexDirection: "row",
    alignSelf: "center"
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