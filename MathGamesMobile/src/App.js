import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Components/HomeScreen";
import NotificationsScreen from "./Components/NotificationsScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Início" component={HomeScreen} />
        <Drawer.Screen name="Jogos" component={NotificationsScreen} />
        <Drawer.Screen name="Torneios" component={NotificationsScreen} />
        <Drawer.Screen name="Classificações" component={NotificationsScreen} />
        <Drawer.Screen name="Amigos" component={NotificationsScreen} />
        <Drawer.Screen name="Definições" component={NotificationsScreen} />
        <Drawer.Screen name="Quem somos" component={NotificationsScreen} />
        <Drawer.Screen name="Estatísticas" component={NotificationsScreen} />
        <Drawer.Screen name="Notificações" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}