import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import ChooseGame from './screens/ChooseGame';
import GamePage from './screens/GamePage';
import Login from './screens/Login';
import Profile from './screens/Profile';
import LastGames from './screens/LastGames';
import Inventory from './screens/Inventory';
import Loading from './components/Loading';

import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {readData, saveData} from './utilities/AsyncStorage';
import Game from './screens/Game';
/* Uuid */
import { v4 as uuidv4 } from 'uuid';

const win = Dimensions.get('window');

const Stack = createStackNavigator();

function Games() {
  const [currentGame, setCurrentGame] = useState({name: ""});
  useEffect(() => {
    let mounted = true;
    readData("game").then(value => {if (value !== null && mounted) {setCurrentGame(JSON.parse(value));}});
    return () => {mounted=false}
  }, [currentGame]);
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#78c9ff'}}}>
      <Stack.Screen name="ChooseGame" options={{headerTitle: () => (<Text style={styles.header}>Jogos</Text>)}} component={ChooseGame} />
      <Stack.Screen name="GamePage" options={{
        headerTitle: () => (<Text style={styles.headerWithArrow}>{currentGame.title}</Text>),
        headerTintColor: "white",
        headerTitleAlign: "center"
      }} component={GamePage} />
      <Stack.Screen name="Game" options={{
        headerTitle: () => (<Text style={styles.headerWithArrow}>{currentGame.title}</Text>),
        headerTintColor: "white",
        headerTitleAlign: "center"
      }} component={Game} />
    </Stack.Navigator>
  )
}

const StackProfile = createStackNavigator();

function ProfileNav() {

  return (
    <StackProfile.Navigator screenOptions={{headerStyle: {backgroundColor: '#78c9ff'}}}>
      <StackProfile.Screen name="Profile" options={{headerTitle: () => (<Text style={styles.header}>Perfil</Text>)}} component={Profile} />
      <StackProfile.Screen name="Inventory" options={{
        headerTitle: () => (<Text style={styles.headerWithArrow}>Inventário</Text>),
        headerTintColor: "white",
        headerTitleAlign: "center"
      }} component={Inventory} />
      <StackProfile.Screen name="LastGames" options={{
        headerTitle: () => (<Text style={styles.headerWithArrow}>Últimos jogos</Text>),
        headerTintColor: "white",
        headerTitleAlign: "center"
      }} component={LastGames} />
    </StackProfile.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  const [loaded] = useFonts({
    BubblegumSans: require('./../public/fonts/BubblegumSans-Regular.ttf'),
  });
  const [login, setLogin] = useState(false);

  readData('user_id').then(id=>{
    if (id===null) {
      saveData('user_id', uuidv4());
    }
  })
  
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
          <Drawer.Screen name="Profile" component={ProfileNav} />
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
    fontSize: 30,
    textAlign: "center"
  },
  headerWithArrow: {
    color: "white",
    fontFamily: 'BubblegumSans',
    fontSize: 30,
    textAlign: "center"
  },
});