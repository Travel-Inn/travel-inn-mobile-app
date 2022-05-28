import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './bottomNavigation.js';
const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
		<Stack.Screen name="BottomNav" component={BottomTabs}/>
    </Stack.Navigator>
  );
}