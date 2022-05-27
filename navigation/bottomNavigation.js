import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Booking from '../screens/search/booking';
import Congratulation from '../screens/search/congrats';
import Contact from '../screens/profile/contact';
import HistoryScreen from '../screens/profile/history';
import Home from '../screens/home/home';
import Menu from '../screens/menu/menu';
import Payment from '../screens/search/payment';
import Profile from '../screens/profile/profile';
import Room from '../screens/search/room';
import UserDetails from '../screens/profile/userDetails';

// User stack.
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
            <Tab.Screen name="Payment" component={Payment} options={{tabBarButton:()=>null, tabBarVisible: false}} />
            <Tab.Screen name="History" component={HistoryScreen} options={{tabBarButton:()=>null, tabBarVisible: false}} />
            <Tab.Screen name="Congrats" component={Congratulation} options={{tabBarButton:()=>null, tabBarVisible: false}} />
        </Tab.Navigator>
    )
}