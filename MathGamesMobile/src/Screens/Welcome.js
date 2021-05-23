import * as React from 'react';
import {Button, View, ScrollView, Text, Image, Dimensions, StyleSheet} from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.width*360/1463-20,
        padding: 10,
        margin: 0
    }
});

const styles2 = StyleSheet.create({
  image: {
      flex: 1,
      alignSelf: 'stretch',
      width: win.width,
      height: win.width*558/668-20,
      padding: 10,
      margin: 0
  }
});

function Welcome({ navigation }) {
    return (
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        <Image
          style={styles.image}
          resizeMode = {'contain'}
          source={require('./../../public/images/logo-light.png')}
        />

        <Text style={{fontSize: 30, padding: 10, textAlign:'center'}}>Bem-vindos ao MathGames!</Text>

        <Image
              style={styles2.image}
              resizeMode = {'contain'}
              source={require('./../../public/images/header_img.png')}/>

        <Text style={{fontSize: 20, padding: 10,  textAlign:'center'}}>Sejam muito bem-vindos à plataforma MathGames. Aqui podem encontrar vários jogos matemáticos para jogarem e se divertirem. Podem jogar competitivamente, criar torneios, jogar com amigos entre outras coisas. Esperemos que se divirtam!</Text>
        
        <Button
          onPress={() => navigation.navigate('Games')}
          title="Jogar Agora"
        />
      </ScrollView>
    );
  }

export default Welcome;