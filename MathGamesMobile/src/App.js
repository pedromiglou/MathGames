import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import GameDashboard from './screens/GameDashboard';
import ChooseGame from './screens/ChooseGame';
import Login from './screens/Login';
import Constants from 'expo-constants';
import { useState } from 'react';
import { useFonts } from 'expo-font';

const win = Dimensions.get('window');

const Stack = createStackNavigator();

function Games() {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#78c9ff'}}}>
      <Stack.Screen name="GameDashboard" options={{headerTitle: () => (<Text style={styles.header}>Jogos</Text>)}} component={GameDashboard} />
      <Stack.Screen name="ChooseGame" options={{title: "Modo de Jogo"}} component={ChooseGame} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  const [loaded] = useFonts({
    BubblegumSans: require('./assets/fonts/BubblegumSans-Regular.ttf'),
  });
  const [login, setLogin] = useState(false);
  
  if (!loaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <NavigationContainer>
        <View style={styles.topView}>
          <Image
              style={styles.logoImage}
              resizeMode = {'contain'}
              source={require('./../public/images/logo-light.png')}
            />
          <TouchableHighlight onPress = {() => setLogin(!login)}>
            <Image
                style={styles.loginImage}
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
  
}

export default App;

const styles = StyleSheet.create({
  topView: {
    flex:0.13,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin:0,
    padding: 5
  },
  logoImage: {
      flex: 1,
      width: win.width/4*3,
      height: win.width*360/1463/4*3,
      marginTop: Constants.statusBarHeight
  },
  loginImage: {
    flex: 1,
    width: win.width/4,
    height: win.width*360/1463/4,
    marginTop: Constants.statusBarHeight
  },
  header: {
    color: "white",
    fontFamily: 'BubblegumSans',
    fontSize: 30
  },
});