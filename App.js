import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firebase from 'firebase/compat/app';
import apiKeys from './config/keys';
import Routes from './navigation';



const Stack = createNativeStackNavigator();
export default function App() {
	if (!firebase.apps.length) {
		console.log("Connected with Firebase")
		firebase.initializeApp(apiKeys.firebaseConfig);
	}


	return (
		<Routes/>
	);
}
