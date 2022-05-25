import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/home/home';
import Menu from './menu';
import Contact from './contact';
import Booking from './booking';

const Drawer = createDrawerNavigator();

export default function SideDrawer(){
    return(
            <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Menu" component={Menu}/>
                <Drawer.Screen name="Booking" component={Booking}/>
                <Drawer.Screen name="Contact" component={Contact}/>
            </Drawer.Navigator>
    )
}
