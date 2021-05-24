import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Screens/Welcome';
import GameDashboard from './Screens/GameDashboard';
import ChooseGame from './Screens/ChooseGame';
import Login from './Screens/Login';
import Constants from 'expo-constants';
import { useState } from 'react';

const Stack = createStackNavigator();

function Games() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GameDashboard" component={GameDashboard} />
      <Stack.Screen name="ChooseGame" component={ChooseGame} />
    </Stack.Navigator>
  )
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
      flex: 1,
      width: win.width/4*3,
      height: win.width*360/1463/4*3,
      marginTop: Constants.statusBarHeight
  }
});

const styles2 = StyleSheet.create({
  image: {
      flex: 1,
      width: win.width/4,
      height: win.width*360/1463/4,
      marginTop: Constants.statusBarHeight
  }
});

const Drawer = createDrawerNavigator();

function App() {
  const [login, setLogin] = useState(false);
  return (
    <NavigationContainer>
      <View style={{flex:0.13, flexDirection: "row", alignItems: "center", borderBottomColor: 'black', borderBottomWidth: 1,margin:0, padding: 5}}>
        <Image
            style={styles.image}
            resizeMode = {'contain'}
            source={require('./../public/images/logo-light.png')}
          />
        <TouchableHighlight onPress = {() => setLogin(!login)}>
          <Image
              style={styles2.image}
              resizeMode = {'contain'}
              source={require('./../public/images/Login.png')}
            />
        </TouchableHighlight>
      </View>
      {login ? <Login /> :
      <Drawer.Navigator>
        <Drawer.Screen name="Welcome" component={Welcome} />
        <Drawer.Screen name="Games" component={Games} />
        <Drawer.Screen name="Tournaments" component={Welcome} />
        <Drawer.Screen name="Rankings" component={Welcome} />
        <Drawer.Screen name="Settings" component={Welcome} />
        <Drawer.Screen name="About us" component={Welcome} />
      </Drawer.Navigator>}
    </NavigationContainer>
  );
}

export default App;