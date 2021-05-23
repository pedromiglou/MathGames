import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Screens/Welcome';
import GameDashboard from './Screens/GameDashboard';
import ChooseGame from './Screens/ChooseGame';

const Stack = createStackNavigator();

function Games() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GameDashboard" component={GameDashboard} />
      <Stack.Screen name="ChooseGame" component={ChooseGame} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Welcome" component={Welcome} />
        <Drawer.Screen name="Games" component={Games} />
        <Drawer.Screen name="Tournaments" component={Welcome} />
        <Drawer.Screen name="Rankings" component={Welcome} />
        <Drawer.Screen name="Settings" component={Welcome} />
        <Drawer.Screen name="About us" component={Welcome} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;