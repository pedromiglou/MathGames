import * as React from 'react';
import {Button, View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

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

function ChooseGame(props) {
    return (
        <ScrollView style={{ flex: 1 }}>
          <TouchableHighlight onPress = {() => props.switcher("")}>
            <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start" }}>
              <Icon name="arrow-left" /> 
              <Text style={{fontSize: 17, textAlign:'left', alignSelf:'flex-start'}}>ChooseGame</Text>
            </View>
          </TouchableHighlight>
          <Text style={{fontSize: 40, textAlign:'center'}}>{props.gameName}</Text>
          
          {gameModes.map(X => {
            return (<TouchableHighlight style={{margin: 10, backgroundColor: "#CCFFFF"}} key={X.key} onPress = {() => props.switcher("")}>
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