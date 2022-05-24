import React from 'react';
import firebase from "firebase/compat/app";
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Dimensions, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';


	const fullWidth = Dimensions.get('screen').width;
	const ninety = Dimensions.get('screen').width*0.9;
	const eighty = Dimensions.get('screen').width*0.8;
export default function Payment({route, navigation}){
	const { roomPrice, roomType } = route.params;

	const [step, setStep] = React.useState('white');
	const [inDate, setInDate] = React.useState('09-10-2021');
	const [outDate, setOutDate] = React.useState('01-27-2022');
	const [nights, setNights] = React.useState();

		React.useEffect(() => {
		const nightNum = (start,end) => {
			const date1 = new Date(start);
			const date2 = new Date(end);

			// One day in milliseconds
			const oneDay = 1000 * 60 * 60 * 24;

			// Calculating the time difference between two dates
			const diffInTime = date2.getTime() - date1.getTime();
			// Calculating the no. of days between two dates
			const diffInDays = Math.round(diffInTime / oneDay);

			setNights(diffInDays);
		}
		nightNum(inDate, outDate);
		},[inDate,outDate])

    return (
        <View style={styles.container}>
		<ScrollView>
			<ImageBackground source={require("../images/payment.jpg")} resizeMode="cover" style={styles.pageImage}>
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
				value="Samuel Nai"
				editable={false}
				style={styles.contactInfo}
				/>
				<TextInput
				value="samuel.nai@yahoo.com"
				editable={false}
				style={styles.contactInfo}
				/>
				<TextInput
				value="055 154 0686"
				editable={false}
				style={styles.contactInfo}
				/>
				<Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 15}}>Booking Details</Text>
				<View style={{flexDirection: 'row', width: ninety, justifyContent: 'space-around', alignItems: 'center', marginVertical: 5}}>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: 12, fontWeight: 'bold'}}>Check In</Text>
						<DatePicker
							date={inDate}
							mode="date"
							placeholder="Check In"
							format="MM-DD-YYYY"
							minDate="06-14-2009"
							confirmBtnText="Confirm"
							iconSource={null}
							onDateChange={(date) => {setInDate(date);}}
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
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderLeftWidth: 1, padding: 5}}>
						<Text style={{fontSize: 12}}>{nights} Nights</Text>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: 12, fontWeight: 'bold'}}>Check Out</Text>
						<DatePicker
							date={outDate}
							mode="date"
							placeholder="Check In"
							format="MM-DD-YYYY"
							minDate="06-14-2009"
							confirmBtnText="Confirm"
							iconSource={null}
							onDateChange={(date) => {setOutDate(date);}}
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
					</View>
				</View>
				<Text style={{width: fullWidth,paddingHorizontal: 20, borderTopWidth: 1, borderBottomWidth: 1, padding: 10}}>
					Price Summary
				</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>{roomType}</Text>
					<Text>GHC {roomPrice}</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>Number of Nights</Text>
					<Text>{nights}</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: eighty, marginVertical: 5}}>
					<Text>Taxes and Fees</Text>
					<Text>GHC 50</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: fullWidth,paddingHorizontal: 20, 
				padding: 10, borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 5}}>
					<Text>Total Amount</Text>
					<Text>GHC {(roomPrice * nights) + 50}</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={()=>setStep('black')}>
					<Text style={{color: 'white', textAlign: 'center'}}>Continue</Text>
				</TouchableOpacity>

			</View>
			:
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{width: eighty}}>Card Number</Text>
				<TextInput
				value = "1234 1234 5678 5678"
				editable={false}
				style={styles.contactInfo}
				/>
				<Text style={{width: eighty}}>Expiry Date</Text>
				<TextInput
				value = "MM/YY"
				editable={false}
				style={styles.contactInfo}
				/>
				<Text style={{width: eighty}}>CVC</Text>
				<TextInput
				value = "123"
				editable={false}
				style={styles.contactInfo}
				/>
				<Text style={{width: eighty}}>Name on Card</Text>
				<TextInput
				value ="Samuel Nai"
				editable={false}
				style={styles.contactInfo}
				/>
				<View style={{flexDirection: 'row', justifyContent: 'space-around',
				width: '90%', marginVertical: 10}}>
					<TouchableOpacity style={styles.button} onPress={()=>setStep('white')}>
						<Text style={{color: 'white'}}>Previous</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={()=>setStep('black')}>
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