import * as React from 'react';
import {Button, View, Text} from 'react-native';

function Welcome({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bem-vindos ao MathGames!</Text>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Play now"
        />
      </View>
    );
  }

export default Welcome;