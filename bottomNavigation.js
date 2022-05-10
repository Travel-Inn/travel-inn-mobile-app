import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Booking from './screens/booking';
import Contact from './screens/contact';
import Home from './screens/home';
import Menu from './screens/menu';

export default function BottomTabs(){
    const Tab = createBottomTabNavigator();
    
    return(
        <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ()=>(
                <Icon name="home" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Menu" component={Menu} options={{tabBarIcon: ()=>(
                <Icon name="cutlery" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Booking" component={Booking} options={{tabBarIcon: ()=>(
                <Icon name="briefcase" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Contact" component={Contact} options={{tabBarIcon: ()=>(
                <Icon name="user" size={20} color = "black"/>
            )}}/>
        </Tab.Navigator>
    )
}