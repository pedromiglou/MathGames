import * as React from 'react';
import {Button, View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';

const gameModes=[{key:1, name:'Competitivo'}, {key:2, name:'No mesmo Computador'}, {key:3, name:'Gerar link de convite'}, {key:4, name:'Contra o Computador'}];

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

function ChooseGame({navigation}) {
    return (
        <ScrollView style={{ flex: 1 }}>
          <Text style={{fontSize: 40, textAlign:'center'}}>Rastros</Text>
          
          {gameModes.map(X => {
            return (<TouchableHighlight style={{margin: 10, backgroundColor: "#CCFFFF"}} key={X.key} onPress = {() => navigation.navigate("Welcome")}>
              <View>
                <Image
                  style={styles.image}
                  resizeMode = {'contain'}
                  source={require('./../../public/images/mathGames.png')}
                />
                <Text style={{fontSize: 30, padding: 10, textAlign:'center'}}>{X.name}</Text>
              </View>
            </TouchableHighlight>)
          })}
        </ScrollView>
    );
}

export default ChooseGame;