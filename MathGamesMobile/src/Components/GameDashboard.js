import * as React from 'react';
import {Button, View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';

const gameNames=[{key:1, name:'Rastros'}, {key:2, name:'Gatos&Cães'}];

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

function GameDashboard({ navigation }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {gameNames.map(X => 
        <TouchableHighlight style={{margin: 10, backgroundColor: "#CCFFFF"}} key={X.key} onPress = {() => navigation.navigate('ChooseGame')}>
          <View>
            <Image
              style={styles.image}
              resizeMode = {'contain'}
              source={require('./../../public/images/mathGames.png')}
            />
            <Text style={{fontSize: 30, padding: 10, textAlign:'center'}}>{X.name}</Text>
          </View>
        </TouchableHighlight>
      )}
    </ScrollView>
  );
}

export default GameDashboard;