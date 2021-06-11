import * as React from 'react';
import {ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const win = Dimensions.get('window');

function Welcome({ navigation }) {
    return (
      <View>
        <View style={{position:"absolute", x: 0, y:0}}>
          <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]}>
            <View style={{minHeight: win.height, minWidth: win.width}}></View>
          </LinearGradient>
        </View>
        <ScrollView>
            <Text style={styles.title}>Bem-vindo ao MathGames!</Text>

            <Image
                  style={styles.image}
                  resizeMode = {'contain'}
                  source={require('./../../public/images/header_img.png')}/>

            <Text style={styles.text}>Sejam muito bem-vindos à plataforma MathGames. Aqui podem encontrar vários jogos matemáticos para jogarem e se divertirem. Podem jogar competitivamente, criar torneios, jogar com amigos entre outras coisas. Esperemos que se divirtam!</Text>
            
            <TouchableHighlight
              onPress={() => navigation.navigate('Games')}
              style={styles.button}>
              <Text style={styles.buttonText}>Jogar Agora</Text>
            </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }

export default Welcome;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    padding: 10,
    textAlign:'center',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
  image: {
      alignSelf: 'stretch',
      width: win.width,
      height: win.width*500/800,
      padding: 10,
      margin: 0
  },
  text: {
    fontSize: 20,
    padding: 10,
    textAlign:'center',
    fontFamily: 'BubblegumSans',
    color: 'white'
  },
  button: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#3a4e60',
    borderRadius:30,
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontFamily: 'BubblegumSans',
    fontSize: 24
  }
});