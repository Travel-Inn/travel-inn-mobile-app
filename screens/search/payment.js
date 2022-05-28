import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Dimensions, StyleSheet, TextInput,ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bookRoom } from '../../config/firebase';
import { validateCreditCard, validateDates } from '../../utils/inputValidator';
import { getNumberOfNights } from '../../utils/numberOfNights';
import { pluralChecker } from '../../utils/pluralCheck';
import { errorToastNotifier, successfulToastNotifier } from '../../widgets/toastNotification';
import { convertDate } from '../../utils/timestampToDate';

	const fullWidth = Dimensions.get('screen').width;
	const ninety = Dimensions.get('screen').width*0.9;
	const eighty = Dimensions.get('screen').width*0.8;

export default function Payment({route, navigation}){
	// Room and user details.
	const { roomPrice, roomType, roomName, roomID, userInfo } = route.params;
	
	const currDate = new Date(); // Current date
	const  tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1); // Tomorrow's date
	const [step, setStep] = React.useState('white');
	const [inDate, setInDate] = React.useState(); // Checkin Date
	const [outDate, setOutDate] = React.useState(); // Checkout Date
	const [nights, setNights] = React.useState(''); // Number of nights
	const [plural, setPlural] = React.useState(''); // Plural checker
	const [cardNo, setCardNo] = React.useState('');
	const [expiryDate, setExpiryDate] = React.useState('');
	const [CVC, setCVC] = React.useState('');
	const [cardName, setCardName] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const onHandleSubmit = async () => {

		setLoading(true);
		const date1 = new Date(inDate).getTime();
		const date2 = new Date(outDate).getTime();
		const currDate1 = currDate.getTime();
		
		if (validateDates(currDate1, date1, date2)){ // Checks for dates.
			setLoading(false);
		} else if (nights ==0){ // Check for nights.
			setLoading(false);
			errorToastNotifier("Error", "Number of nights should be greater than 0.")
		} else if (validateCreditCard(cardNo, expiryDate, CVC, cardName)){ // Validate CC details
			setLoading(false);
		}  else if (await bookRoom(roomID, roomName, roomPrice, roomType, Date(inDate), Date(outDate)) ==0 ){ // Room book was successful.
			setLoading(false);
			//successfulToastNotifier("Success", "Your room was booked successfully.")
			navigation.navigate('Congrats'); //Move to congrats page.
		} else {
			setLoading(false);
			console.log("There was an error.");
		}
	}


		React.useEffect(() => {
		// Runs whenever use changes the checkIn and checkOut date.
		// Gets the number of nights and checks the 'plurality'.
		const temp = getNumberOfNights(inDate, outDate);
		const temp1 = pluralChecker(temp);
		setNights(temp);
		setPlural(temp1);
	},[inDate,outDate])

    return (
        <View style={styles.container}>
		<ScrollView>
			<ImageBackground source={require("../../images/payment.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>PAYMENT</Text>
			</ImageBackground>
			<View style={{flexDirection: 'row', width: ninety, justifyContent: 'center', 
			alignItems: 'center', alignSelf: 'center'}}>
				<Text style={{ width: 30, height: 30, borderRadius: 100, 
				borderWidth: 1,  color: 'white', paddingLeft: 9, paddingVertical: 5,
				backgroundColor: 'black'}}>1</Text>
				<View style={{width: '80%', height: 4, backgroundColor: step,
				borderTopWidth: 1, borderBottomWidth: 1}}>
				</View>
				<Text style={{ width: 30, height: 30, borderRadius: 100, 
				borderWidth: 1,  color: step=='black'?'white':'black', paddingLeft: 9, paddingVertical: 5,
				backgroundColor: step}}>2</Text>
			</View>
			{step=="white"?
				<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontSize: 18, fontWeight: 'bold'}}>Contact Information</Text>
				<TextInput
				value={userInfo.firstName+ " " + userInfo.lastName} // User's Full name
				editable={false}
				style={styles.contactInfo}
				/>
				<TextInput
				value={userInfo.email} // User's email
				editable={false}
				style={styles.contactInfo}
				/>
				<TextInput
				value={userInfo.phoneNum} // User's phone number
				editable={false}
				style={styles.contactInfo}
				/>
				<Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 15}}>Booking Details</Text>
				<View style={{flexDirection: 'row', width: ninety, justifyContent: 'space-around', alignItems: 'center', marginVertical: 5}}>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: 12, fontWeight: 'bold'}}>Check In Date</Text>
						<DatePicker
							date={inDate}
							mode="date"
							placeholder="Select Date"
							format="MM/DD/YYYY"
							minDate={currDate} // Minimum date shouldn't be lower than current date.
							maxDate={outDate} // Maximum date shouldn't be greater than check out date.
							confirmBtnText="Confirm"
							iconSource={null}
							onDateChange={(date) => {setInDate(date);}}
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							style={{marginLeft: 15}}
							customStyles={{
								dateInput:{
									backgroundColor: 'white',
									color: 'black',
									borderColor: "white",
									borderStyle: 'solid',
									borderWidth: 1,
									borderRadius: 10,
									marginRight: 10
								},
								placeholderText:{
									color: 'black',
								}
							}}
						/>

					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderLeftWidth: 1, padding: 5}}>
						<Text style={{fontSize: 12}}>  {nights} Night{plural}  </Text>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: 12, fontWeight: 'bold'}}>Check Out Date</Text>
						<DatePicker
							date={outDate}
							mode="date"
							placeholder="Select Date"
							format="MM/DD/YYYY"
							minDate={tomorrow} // Minimum date shouldn't be lower than checkIn Date.
							confirmBtnText="Confirm"
							iconSource={null}
							onDateChange={(date) => {setOutDate(date);}}
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							style={{marginLeft: 15}}
							customStyles={{
								dateInput:{
									backgroundColor: 'white',
									color: 'black',
									borderColor: "white",
									borderStyle: 'solid',
									borderWidth: 1,
									borderRadius: 10,
									marginRight: 10
								},
								placeholderText:{
									color: 'black',
								}
							}}
						/>
					</View>
				</View>
				<Text style={{width: fullWidth,paddingHorizontal: 20, borderTopWidth: 1, borderBottomWidth: 1, padding: 10}}>
					Price Summary
				</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>{roomType}</Text>
					<Text>GHC {roomPrice}.00</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>Number of Nights</Text>
					<Text>{nights}</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>Taxes and Fees</Text>
					<Text>GHC 50.00</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: fullWidth,paddingHorizontal: 20, 
				padding: 10, borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 5}}>
					<Text>Total Amount</Text>
					<Text>GHC {(roomPrice * nights) + 50}.00</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={()=>setStep('black')}>
					<Text style={{color: 'white', textAlign: 'center'}}>Continue</Text>
				</TouchableOpacity>

			</View>
			: loading ?
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size='large' />
			</View>
			:
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{width: eighty}}>Card Number</Text>
				<Input
				placeholder = "1234 1234 5678 5678"
				keyboardType='numeric'
				value={cardNo}
				onChangeText={text => setCardNo(text)}
				style={styles.contactInfo}
				maxLength={16}
				/>
				<Text style={{width: eighty}}>Expiry Date</Text>
				{/*  TODO: CHANGE TO MONTH(DATEPICKER) */}
				<Input
				placeholder = "MM/YY"
				value={expiryDate}
				onChangeText={text => setExpiryDate(text)}
				style={styles.contactInfo}
				/>
				<Text style={{width: eighty}}>CVC</Text>
				<Input
				placeholder = "123"
				keyboardType='numeric'
				value={CVC}
				onChangeText={text => setCVC(text)}
				style={styles.contactInfo}
				maxLength={3}
				/>
				<Text style={{width: eighty}}>Name on Card</Text>
				<Input
				placeholder="John Doe"
				value ={cardName}
				onChangeText={text => setCardName(text)}
				style={styles.contactInfo}
				/>
				<View style={{flexDirection: 'row', justifyContent: 'space-around',
				width: '90%', marginVertical: 10}}>
					<TouchableOpacity style={styles.button} onPress={()=>setStep('white')}>
						<Text style={{color: 'white'}}>Previous</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
						<Text style={{color: 'white'}}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		}
        </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
	 flex: 1,
	 backgroundColor: 'white'
	},
	screenName:{
		color: 'white',
        fontSize: 23,
		width: 120,
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
	contactInfo:{
		color: 'white', 
		backgroundColor: 'grey',
		width: eighty, 
		padding: 10, 
		borderRadius: 10,
		marginVertical: 4,
	},
	button:{
		backgroundColor: 'black',
		borderRadius: 10,
		padding: 10,
		width: '30%',
		textAlign: 'center'
	}
})