import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
import GameDashboard from './components/GameDashboard';
import ChooseGame from './components/ChooseGame';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="GameDashboard" component={GameDashboard} />
        <Stack.Screen name="ChooseGame" component={ChooseGame} />
        <Stack.Screen name="Tournaments" component={Welcome} />
        <Stack.Screen name="Rankings" component={Welcome} />
        <Stack.Screen name="Settings" component={Welcome} />
        <Stack.Screen name="About us" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;