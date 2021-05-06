import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from "./Components/Welcome";
import GameDashboard from "./Components/GameDashboard";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Início" component={Welcome} />
        <Drawer.Screen name="Jogos" component={GameDashboard} />
        <Drawer.Screen name="Torneios" component={Welcome} />
        <Drawer.Screen name="Classificações" component={Welcome} />
        <Drawer.Screen name="Definições" component={Welcome} />
        <Drawer.Screen name="Quem somos" component={Welcome} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}