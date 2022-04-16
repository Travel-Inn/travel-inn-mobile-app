import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SideDrawer from './screens/drawer.js';
import Login from './screens/login.js';

const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer >
		  <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
			<Stack.Screen name="Login" component={Login}/>
			<Stack.Screen name="Drawer" component={SideDrawer}/>
		  </Stack.Navigator>
		</NavigationContainer>
	);
}
