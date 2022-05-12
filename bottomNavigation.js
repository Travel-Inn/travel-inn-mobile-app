import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Booking from './screens/booking';
import Contact from './screens/contact';
import Home from './screens/home';
import Menu from './screens/menu';
import Profile from './screens/profile';
import Room from './screens/room';
import UserDetails from './screens/userDetails';

export default function BottomTabs(){
    const Tab = createBottomTabNavigator();
    
    return(
        <Tab.Navigator initialRouteName='Home' backBehavior='history' screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ()=>(
                <Icon name="home" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Menu" component={Menu} options={{tabBarIcon: ()=>(
                <Icon name="cutlery" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Booking" component={Booking} options={{tabBarIcon: ()=>(
                <Icon name="briefcase" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ()=>(
                <Icon name="user" size={20} color = "black"/>
            )}}/>
            <Tab.Screen name="Contact" component={Contact} options={{tabBarButton:()=>null, tabBarVisible: false}} />
            <Tab.Screen name="User" component={UserDetails} options={{tabBarButton:()=>null, tabBarVisible: false}} />
            <Tab.Screen name="Room" component={Room} options={{tabBarButton:()=>null, tabBarVisible: false}} />
        </Tab.Navigator>
    )
}