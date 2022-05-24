import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, 
	Dimensions, SliderComponent, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import DatePicker from 'react-native-datepicker';
import { searchRoom } from '../config/firebase';
import { NavigationContainer } from '@react-navigation/native';

export default function Booking({navigation}) {
	const [inDate, setInDate] = React.useState('');
	const [outDate, setOutDate] = React.useState('');
	const [minPrice, setMinPrice] = React.useState('');
	const [maxPrice, setMaxPrice] = React.useState('');
	const [bedNum, setBedNum] = React.useState('');
	const [values, setValues] = React.useState([]);
	const [search, setSearch] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [feedback, setFeedback] =React.useState('');
	const db = firebase.firestore();
	const onHandleSearch = () => {
		setValues([]);
		setSearch(true);
		setLoading(true);
		setFeedback('');
		const newBedNum = Number(bedNum);
		const newMinPrice = Number(minPrice);
		const newMaxPrice = Number(maxPrice);
		const roomList = [];
		// Checks
		if (!newMinPrice){
		  setLoading(false);
		  console.log("Minimum price cannot be empty.");
		  console.log(newMinPrice);
		  return 1
		} else if (!newMaxPrice){
			setLoading(false);
			console.log("Maximum price cannot be empty.");
			return 1
		  }
		  else if (!newBedNum){
			setLoading(false);
			console.log("Bed number cannot be empty.");
			return 1
		  }
		  else console.log("Passed all checks");
		
	  
		db.collection("Rooms").where("isRoomAvailable", "==", true)
		.where("bedNum", "==", newBedNum).where("roomPrice", ">", newMinPrice)
		.where("roomPrice", "<", newMaxPrice)
			.get()
			.then((querySnapshot) => {
			  if(querySnapshot.empty){
				console.log("No rooms available");
				setFeedback("No rooms Available");
				setLoading(false);
				return 1;
			  }else{         
				 querySnapshot.forEach((doc) => {
				  roomList.push(doc.data());
				  setValues(values=>[...values,doc.data()]);
				});
				setLoading(false);    
			  }
			})
			.catch((error) => {
				setLoading(false);
				console.log("Error getting documents: ", error);
			});
		
	}

	React.useEffect(()=>{
		console.log(values);
		console.log(feedback);
		console.log("Myjddj");
	},[values, feedback])
	
	
	

	const rooms =[
		{
			name: 'Single Room',
			description: 'Single Room With single Bed',
			price: 250.00,
			image: require("../images/booking-room1.jpg")
		},
		{
			name: 'Twin-Bed Room',
			description: 'Single Room With Twin Beds',
			price: 300.00,
			image: require("../images/booking-room2.jpg")
		},
		{
			name: 'Double Room',
			description: 'Single Room With Double Bed',
			price: 350.00,
			image: require("../images/booking-room3.jpg")
		},

	]



  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../images/booking-image.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>Booking</Text>
			</ImageBackground>
			<View style={styles.content}>
				<View style={styles.searchform}>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
						<DatePicker
							date={inDate}
							mode="date"
							placeholder="Check In"
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							iconSource={null}
							onDateChange={null}
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							style={{marginLeft: 15}}
							customStyles={{
								dateInput:{
									backgroundColor: 'black',
									color: 'white',
									borderColor: "black",
									borderStyle: 'solid',
									borderWidth: 1,
									borderRadius: 10,
									marginRight: 10
								},
								placeholderText:{
									color: 'white',
								}
							}}
						/>

						<DatePicker
							date={outDate}
							mode="date"
							iconSource={null}
							placeholder="Check Out"
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							
							customStyles={{
								dateInput:{
									backgroundColor: 'black',
									color: 'white',
									borderColor: "black",
									borderStyle: 'solid',
									borderWidth: 1,
									borderRadius: 10,
									marginRight: 10
								},
								placeholderText:{
									color: 'white',
								}
							}}
						/>
					</View>
					<Input
						value={bedNum}
						textContentType="none"
						keyboardType="numeric"
						onChangeText={text => setBedNum(text)}
						placeholder = "Number of beds"
						placeholderTextColor={"white"}
						leftIcon={
						<Icon name='users' size={20} color="white" 
							style={{position: 'absolute', left: 15, top: 15}}
						/>}
						inputStyle = {{
							color: "white", textAlign: 'center', borderRadius: 10,
							backgroundColor: 'black', marginTop: 10
						}}
						inputContainerStyle={{borderBottomWidth: 0}}
					/>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', 
						marginLeft: "-30%", maxWidth: "50%", marginBottom: -20}}>
						<Input
							value={minPrice}
							textContentType="none"
							keyboardType="numeric"
							onChangeText={text => setMinPrice(text)}
							placeholder = "min"
							placeholderTextColor={'white'}
							inputStyle = {{
											backgroundColor: "black", textAlign: 'center',
											borderColor: "black", borderRadius: 10, color: 'white',
											borderStyle: "solid", borderWidth: 1,
										}}
							inputContainerStyle={{borderBottomWidth: 0,width: "60%"}}
						/>
						<Input
							value={maxPrice}
							textContentType="none"
							keyboardType="numeric"
							onChangeText={text => setMaxPrice(text)}
							placeholderTextColor={'white'}
							placeholder = "max"
							inputStyle = {{
											backgroundColor: "black", 
											textAlign: 'center',
											borderColor: "black", borderRadius: 10,
											color: 'white', borderStyle: "solid", borderWidth: 1
										}}
							inputContainerStyle={{borderBottomWidth: 0, width: "60%"}}
						/>
					</View>
				</View>
				<TouchableOpacity
					onPress = {() => onHandleSearch()}
					color = "white"
					style= {styles.continue}
				>
					<Text style={{fontWeight: 'bold'}}>Search</Text>
				</TouchableOpacity>

				{
					loading? <ActivityIndicator size={50} animating={true} color="white"/>:
					values?
					values.map((item,index)=>{
					return <TouchableOpacity key={index} style={styles.room}  onPress={()=>navigation.navigate('Room')}>
					<Image source={require('../images/booking-room2.jpg')} style={{flex: 2, maxHeight: "100%"}} />
					<View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
						<Text>{item.roomType}</Text>
						<Text>{item.roomDesc}</Text>
						<Text>{item.roomPrice}</Text>
					</View>
				</TouchableOpacity>}):
				<Text style={{color: 'white'}}>No rooms match your specification</Text>
				}
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
		backgroundColor: 'rgba(0,0,0, 0.7)',
		color: 'white',
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
  searchform:{
	backgroundColor: 'white', 
	width: Dimensions.get('screen').width*0.9,
	padding: 10,
	marginTop: Dimensions.get('screen').height*0.01,
	justifyContent: 'space-around',
	alignItems: 'center',
	borderRadius: 20
},
dateIcon:{
	position: 'absolute',
	left: 10,
},
continue:{
	padding: 12,
	borderRadius: 25,
	paddingLeft: 15,
	paddingRight: 15,
	marginTop: 20,
	marginBottom: 20,
	backgroundColor: 'white',
	width: '40%',
	alignItems: 'center',
	justifyContent: 'center'
},
room:{
	width: Dimensions.get('screen').width*0.85,
	flexDirection: 'row',
	backgroundColor: 'white',
	borderRadius: 20,
	height: Dimensions.get('screen').height*0.15,
	marginBottom: 20
},
});