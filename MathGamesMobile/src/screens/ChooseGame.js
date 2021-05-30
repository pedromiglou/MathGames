import * as React from 'react';
import {View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { saveData } from "./../utilities/AsyncStorage";
import { LinearGradient } from 'expo-linear-gradient';

const gameNames=[{key:1, name:'Rastros', age: '+6', description: 'Jogadores partilham as peças e efetuam uma corrida com uma “bola”, na tentativa de marcar um “auto-golo” ou de encurralar o adversário.', image: require('./../../public/images/games/rastros.png')},
                {key:2, name:'Gatos & Cães', age: '+6', description: 'Jogo de estratégia que tem como objetivo colocar por último uma peça no tabuleiro, deixando o adversário sem mais opções de jogada.', image: require('./../../public/images/games/gatosecaes.png')},
                {key:3, name:'Produto', age: '+15', description: 'Permite a prática de exercícios de otimização. O objetivo é obter o maior produto, entre elementos dos maiores grupos da respetiva cor.', image: require('./../../public/images/games/produto.png')},
                {key:4, name:'Yoté', age: '+6', description: 'O objetivo principal é capturar todas as peças do adversário ou bloquear as que restam. Neste caso vence aquele que tiver maior número de peças capturadas.', image: require('./../../public/images/games/yote.png')}];

const win = Dimensions.get('window');

function ChooseGame({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }} >
      <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
        {gameNames.map(X => 
          <TouchableHighlight style={styles.gameTile} key={X.key} onPress = {() => {
                saveData("game", X);
                navigation.navigate('GamePage');
              }
            }>
            <View>
              <LinearGradient colors={['#faad06', '#b1310a']} start={[1,1]} end={[0,0]} style={{flexDirection: "row"}}>
                <View style={{width: win.width*0.6}}>
                  <View style={{flexDirection: "row"}}>
                    <Text style={styles.title}>{X.name}</Text>
                    <Text style={styles.title}>{X.age}</Text>
                  </View>
                  
                  <Text style={styles.description}>{X.description}</Text>
                  <Text style={styles.description}>Toca para jogar!</Text>
                </View>
                  <Image
                    style={styles.image}
                    resizeMode = {'contain'}
                    source={X.image}
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