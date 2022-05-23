import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupPage from '../screens/signupPage.js';
import LoginPage from '../screens/loginPage.js';
import ForgottenPasswordPage from '../screens/forg_Pass.js';
import ResetPasswordPage from '../screens/resetPassword.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
      <NavigationContainer >
    <Stack.Navigator initialRouteName='Login' headerMode='none'>
		<Stack.Screen name="Signup" component={SignupPage}/>
			<Stack.Screen name="Login" component={LoginPage} />
			<Stack.Screen name="Forgotten Password" component={ForgottenPasswordPage}/>
			<Stack.Screen name="Reset Password" component={ResetPasswordPage}/>
    </Stack.Navigator>
      </NavigationContainer>
  );
}