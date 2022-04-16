import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const screen = createNativeStackNavigator();

export default function BottomNavigation(){
    return(
        <NavigationContainer>
            <screen.Navigator initialRouteName='Home' screenOptions={{screenBarColor: 'rgba(0,0,0, 0.7)'}}>
            
        </screen.Navigator>
        </NavigationContainer>
    );
}