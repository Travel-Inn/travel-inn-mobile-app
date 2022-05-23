import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './bottomNavigation.js';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
      <NavigationContainer >
    <Stack.Navigator headerMode='none'>
		<Stack.Screen name="BottomNav" component={BottomTabs}/>
    </Stack.Navigator>
      </NavigationContainer>
  );
}