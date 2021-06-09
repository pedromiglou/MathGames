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

import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {readData, saveData} from './utilities/AsyncStorage';
import Game from './screens/Game';
/* Uuid */
import { v4 as uuidv4 } from 'uuid';

import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const navigationRef = React.createRef();
export function openDrawer(routeName, params) {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  readData('user_id').then(id=>{
    if (id===null) {
      saveData('user_id', uuidv4());
    } else {
      setUsername(id.slice(1, -1));
    }
  })

  if (!loaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <View style={styles.topView}>
          <TouchableOpacity onPress = {() => login ? setLogin(false) : openDrawer()}>
            <Feather name="menu" size={28} color="grey" style={styles.topIcon}/>
          </TouchableOpacity>

          <Image
              style={styles.logoImage}
              resizeMode = {'contain'}
              source={require('./../public/images/logo-light.png')}
            />
          
          {loggedIn ?
            <TouchableOpacity style={styles.loginImage} onPress={()=>navigationRef.current.dispatch(DrawerActions.jumpTo('Profile'))}>
              <Text style={styles.username} numberOfLines={1}>{username}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress = {() => setLogin(!login)}>
              <Image
                  style={styles.loginImage}
                  resizeMode = {'contain'}
                  source={require('./../public/images/Login.png')}
                />
            </TouchableOpacity>
          }
        </View>
        {login ?
          <Login return={setLogin} login={setLoggedIn}/>
          :
          <Drawer.Navigator>
            <Drawer.Screen name="Welcome" component={Welcome} />
            <Drawer.Screen name="Games" component={Games} />
            {loggedIn && <Drawer.Screen name="Tournaments" component={Welcome} />}
            <Drawer.Screen name="Rankings" component={Welcome} />
            <Drawer.Screen name="Settings" component={Welcome} />
            {loggedIn && <Drawer.Screen name="Profile" component={ProfileNav} />}
            <Drawer.Screen name="About us" component={Welcome} />
          </Drawer.Navigator>
        }
      </NavigationContainer>
    );
  }
  
}

export default App;

const styles = StyleSheet.create({
  topView: {
    flex:0.13,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin:0,
    padding: 5
  },
  topIcon: {
    marginTop: Constants.statusBarHeight,
    marginLeft: 10
  },
  logoImage: {
      width: win.width/5*3,
      height: win.width*360/1463/5*3,
      marginTop: Constants.statusBarHeight
  },
  loginImage: {
    width: win.width/3,
    height: win.width*360/1463/3,
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
  username: {
    color: "#78c9ff",
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    textAlign: "center",
  },
});