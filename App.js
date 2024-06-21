import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MotoristaScreen from './screens/MotoristaScreen';
import SidePageScreen from './screens/SidePageScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Motorista" component={MotoristaScreen} options={{ title: 'Motoristas' }} />
        <Stack.Screen name="SidePageScreen" component={SidePageScreen} options={{ title: 'Passageiros' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
