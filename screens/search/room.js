import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pluralChecker} from '../../utils/pluralCheck.js';

export default function Room({route, navigation}) {
    // Room details and user details parameters
  const { roomDetails, userData } = route.params;
  // Add an s depending on the number of beds.
   const plural = pluralChecker(roomDetails.bedNum);
  
   
   
   return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../../images/room-screen.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>ROOM</Text>
			</ImageBackground>
			<View style={styles.content}>
                <View style={styles.roomTitle}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{roomDetails.roomType} - Room No.{roomDetails.roomName}</Text>
                </View>
                <View style={styles.roomInfo}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white', paddingLeft: 3}}>1 Night</Text>
                    </View>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>GHC {roomDetails.roomPrice}</Text>
                </View>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 20}}>
                    <Image source={require('../../images/room-detail.jpg')} style={styles.roomImage}/>
                </View>
                <Text>Amenities Included with booking</Text>
                <View style={styles.amenities}>
                    <Text style={{color: 'white', paddingBottom: 5}}>
                        <Icon name="wifi" color="#aa3300"/> Wifi</Text>
                    <Text style={{color: 'white', paddingRight: 25}}>
                    <Icon name="tint" color="#aa3300"/> A/C</Text>
                    <Text style={{color: 'white', paddingRight: 25}}>
                    <Icon name="tv" color="#aa3300"/> Smart TV</Text>
                    <Text style={{color: 'white', paddingRight: 25}}>
                    <Icon name="cutlery" color="#aa3300"/> Free Meals</Text>
                    <Text style={{color: 'white', paddingRight: 25}}>
                    <Icon name="bed" color="#aa3300"/> {roomDetails.bedNum} Bed{plural}</Text>
                    <Text style={{color: 'white', paddingRight: 25}}>
                    <Icon name="car" color="#aa3300"/> Free Parking</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Payment', {
                 roomPrice: roomDetails.roomPrice, roomType: roomDetails.roomType.trim(),
                 roomName: roomDetails.roomName.trim(), roomID: roomDetails.roomID.trim(),
                 userInfo: userData})}>
                    <Text>Book Room</Text>
                </TouchableOpacity>
				
			</View>
		</ScrollView>
	</View>
  );
}

const styles = StyleSheet.create({
    container:{
	 flex: 1,
	 backgroundColor: 'black'
	},
	screenName:{
		color: 'white',
        fontSize: 23,
		width: 100,
		textAlign: 'center',
		borderRadius: 25,
	},
	pageImage: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'rgba(0,0,0, 0.7)',
		borderRadius: 25,
		justifyContent: 'center',
		height: Dimensions.get('screen').height*0.35,
		alignItems: 'center',
		padding: 20,
		marginBottom: 10,
    },
    content:{
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center'
    },
    roomTitle:{
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        marginBottom: 20
    },
    roomInfo:{
        flexDirection:'row', 
        justifyContent: 'space-around',
        width: Dimensions.get('screen').width,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 20
    },
    roomImage:{
        width: Dimensions.get('screen').width*0.9,
        height: Dimensions.get('screen').width*0.5,
        paddingBottom: 8,
        marginBottom: 20
    },
    amenities:{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        paddingLeft:15, 
        paddingRight:15,
        marginBottom: 10
    },
    btn:{
        backgroundColor: 'white',
        padding: 8,
        width: Dimensions.get('screen').width*0.3,
        borderRadius: 15,
        alignItems: 'center'
    }
});