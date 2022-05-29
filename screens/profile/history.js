import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase/compat/app";
import { convertDate } from '../../utils/timestampToDate';

export default function HistoryScreen({route, navigation}) {
	const [values, setValues] = React.useState([]);
	const [loading, setLoading] = React.useState([]);
	const [roomState, setRoomState] = React.useState('Awaiting');
	const db = firebase.firestore();
	const uid = firebase.auth().currentUser.uid;

	const onHandleBack =() => {
		// Clear values and go back.
		navigation.goBack();
		setValues([]);
	}

	React.useEffect(() => {
		// Runs when the screen is focused.{Displayed} 
		const unsubscribe = navigation.addListener('focus', () =>{
			setLoading(true);
			db.collection("Users")
		   .doc(uid)
		   .collection("bookedRooms")
		   .onSnapshot((querySnapshot) => {
			   if(querySnapshot.empty){
				   setValues("empty");
				   setLoading(false);
			   }else{
				   querySnapshot.forEach((doc) => {
					   setValues(values=>[...values,doc.data()]);
				   });
				   setLoading(false);
			   }
		   });
		});
		return unsubscribe; //Umount listener.
	},[navigation])


  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../../images/contact.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>HISTORY</Text>
			</ImageBackground>
			<View style={styles.content}>
				<View style={styles.sort}>
					<Text style={{color: 'white'}}>Sort by Recent</Text>
					<TouchableOpacity>
						<Icon name="chevron-up" size={10} color="black" style={styles.icon} />
					</TouchableOpacity>
				</View>
            {
				loading?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
				</View>
				:
                values == "empty"?
				<View style={{height: Dimensions.get('screen').height*0.4, justifyContent: 'center'}}>
					<Text style={styles.nothing}>No rooms booked.</Text>
				</View>
				:
				values == "error"?
				<View style={{height: Dimensions.get('screen').height*0.4, justifyContent: 'center'}}>
					<Text style={styles.nothing}>No rooms booked.</Text>
				</View>
				:				
				values.map((item,index)=>{
					return <View key={index}  style={styles.room}>
                                <Image source={require("../../images/contact.jpg")} 
								style={{flex: 2, maxHeight: "100%", borderRadius: 8}} />
                                <View style={{flex: 4, justifyContent: 'space-around', paddingLeft: 15}}>
                                    <Text style={styles.roominfo}>Room no. {item.roomName}</Text>
                                    <Text style={styles.roominfo}>{item.roomType}</Text>
									<Text style={styles.roominfo}>Booked on: {convertDate(item.bookedOn)}</Text>
									<Text style={styles.roominfo}>Status: {item.roomStatus}</Text>
                                    <Text style={{color: 'orange', fontWeight: 'bold'}}>GHC {item.roomPrice}.00</Text>
                                </View>
								<View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
									<Text style={[styles.statuscheck,{backgroundColor: roomState=="Awaiting"? 'grey':
									roomState=="In Use"? 'green': 'red'}]}>{roomState}</Text>
								</View>
                            </View>
                })
            }
			</View>
			<TouchableOpacity style={styles.backbtn} onPress={onHandleBack}>
				<Text>Back</Text>
			</TouchableOpacity>
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
		width: 150,
		textAlign: 'center',
		borderRadius: 25,
		backgroundColor: 'rgba(0,0,0, 0.7)',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10
		
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
	room:{
		width: Dimensions.get('screen').width*0.85,
		flexDirection: 'row',
		height: Dimensions.get('screen').height*0.15,
		borderColor: 'white',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		padding: 10
	},
	icon:{
		backgroundColor: 'grey',
		padding: 5,
		width: 30,
		textAlign: 'center',
		borderRadius: 10
	},
	roominfo:{
		color: 'white'
	},
	sort: {
		flexDirection: 'row', 
		width: "40%", 
		justifyContent: 'space-between', 
		alignSelf: 'flex-end',
		marginRight: 10,
		marginBottom: 10
	},
	backbtn:{
		backgroundColor: 'white',
		width: Dimensions.get('screen').width*0.4,
		borderRadius: 15,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	nothing:{
		fontSize: 25, 
		color: "grey",
		textAlign: 'center',
	},
	statuscheck:{
		padding: 5,
		color: 'white',
		borderRadius: 5,
	}
});