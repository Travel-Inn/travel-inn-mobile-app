import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, 
	Dimensions, KeyboardAvoidingView, ActivityIndicator, LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import { validateBedNum, validatePrices } from '../../utils/inputValidator';
import { loggingOut } from '../../config/firebase';
import { errorToastNotifier, successfulToastNotifier } from '../../widgets/toastNotification';


export default function Booking({navigation}) {
	// Initializing input variables.
	const [minPrice, setMinPrice] = React.useState('');
	const [maxPrice, setMaxPrice] = React.useState('');
	const [bedNum, setBedNum] = React.useState('');
	const [userDetails, setUserDetails] = React.useState([]);
	const [values, setValues] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const db = firebase.firestore();

	const onHandleLogout = () =>{
		errorToastNotifier("Error", "Authentication error. Logging out...");
		loggingOut();
		return null;
	}

	const onHandleSearch = () => {
		setValues([]); // room details
		setLoading(true); 
		// Converts string-number('2) to a number type and string-text('temp') to an empty number.
		const newMinPrice = Number(minPrice.trim());
    	const newMaxPrice = Number(maxPrice.trim());
		const newBedNum = Number(bedNum.trim());

		// Checks
		if (!validatePrices(newMinPrice, newMaxPrice)){
		  setLoading(false);
		} 
		  else if (!validateBedNum(newBedNum)){
			setLoading(false);
		  }
		  else {
		// If checks passed, search for rooms.
		  console.log("Passed all checks");  
			db.collection("Rooms").where("isRoomAvailable", "==", true)
			.where("bedNum", "==", newBedNum).where("roomPrice", ">", newMinPrice)
			.where("roomPrice", "<", newMaxPrice)
				.get()
				.then((querySnapshot) => {
				if(querySnapshot.empty){
					setValues("empty"); // If there are no rooms, update values with empty
					setLoading(false);
				}else{         
					querySnapshot.forEach((doc) => {
					setValues(values=>[...values,doc.data()]); // If there's a match, update values with the rooms.
					});
					setLoading(false);    
				}
				})
				.catch((error) => {
					setValues("Error");
					setLoading(false); // If there was an error, update values with the error.
					//console.log("Error getting documents: ", error.message);
				});
			}	
	}

	React.useEffect(() =>{
		// Retrieve user data.
		LogBox.ignoreLogs(['Setting a timer']);
		const db = firebase.firestore();
		const user = firebase.auth().currentUser;
		db.collection("Users")
		.doc(user.uid)
		.get()
		.then((doc) => {
			if (doc.exists){
			console.log("User data has been extracted.");
			setUserDetails(doc.data()); // If there's a match, update user details var with user data.
			} else {
			setUserDetails("empty"); // If there's no match, update user details with empty.
		}
		}).catch((error) => {
			setUserDetails("error"); // If there's an error, update user details with error.
			errorToastNotifier("Error", "Unexpected error. Please restart app.")
			//console.log("Error getting document:", error); 
		});
	},[])


  return(
    <View style={styles.container} >
		<ScrollView>
			<KeyboardAvoidingView>
			<ImageBackground source={require("../../images/booking-image.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>Booking</Text>
			</ImageBackground>
			<View style={styles.content}>
				<View style={styles.searchform}>
					<Input
						value={bedNum}
						textContentType="none"
						keyboardType="numeric"
						onChangeText={text => setBedNum(text)}
						placeholder = "Number of beds"
						placeholderTextColor={"grey"}
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
					<Text style={{fontWeight: "bold", marginLeft: 10}}>Price</Text>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', 
						marginLeft: "-30%", maxWidth: "50%", marginBottom: -20}}>
						<Input
							value={minPrice}
							textContentType="none"
							keyboardType="numeric"
							onChangeText={text => setMinPrice(text)}
							placeholder = "min"
							placeholderTextColor={'grey'}
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
							placeholderTextColor={'grey'}
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
					// Checks the current state and variables. 
					loading ? 
					<ActivityIndicator size={50} animating={true} color="white"/>:
					userDetails === "empty" ? onHandleLogout() :// Authentication error. Force log out. 
					userDetails === "error" ? <Text style={{color: 'white'}}>Error extracting user details. Restart app.</Text> :	 //TODO: Force restart app.
					values === "empty" ? <Text style={{color: 'white'}}>No room matched your specification</Text> :
					values === "error" ? <Text style={{color: 'white'}}>There was an error retrieving the rooms. Try Again.</Text> :
					Array.isArray(values) ?
					values.map((item,index)=>{
					return <TouchableOpacity key={index} style={styles.room}  onPress={()=>navigation.navigate('Room',{roomDetails: item, userData: userDetails})}>
					<Image source={require('../../images/booking-room2.jpg')} style={{flex: 2, maxHeight: "100%"}} />
					<View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
						<Text>{item.roomType}</Text>
						<Text>{item.roomDesc}</Text>
						<Text>{item.roomPrice}</Text>
					</View>
				</TouchableOpacity>}) :
				<Text style={{color: 'white'}}></Text>
				}
			</View>
			</KeyboardAvoidingView>
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
		paddingRight: 10,
		overflow: 'hidden'
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