import * as React from 'react';

import { createDrawerNavigator , DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from "./Components/Welcome";
import GameDashboard from "./Components/GameDashboard";
import ChooseGame from './Components/ChooseGame';

const Drawer = createDrawerNavigator();

const Drawer2 = createDrawerNavigator();

//fix this
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início" >
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