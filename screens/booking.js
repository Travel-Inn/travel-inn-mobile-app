import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';
import Firebase from '../config/firebase';
import { registration } from '../config/firebase';
import style from 'react-native-datepicker/style';


export default function Booking({navigation}){
	const [date, setDate] = useState('');
	const [min, setMin] = useState('');
	const [max, setMax] = useState('');
	const [name, setName] = useState('');

    return(
		<View style={styles.container}>
			<View style = {styles.imageContainer}>
				<View style={styles.imageBack}>
					<ImageBackground style={styles.pageImage} source={require("../images/home.jpg")}/>
				</View>
			</View>
			<View style={styles.content}>
				<View style={styles.searchform}>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
						<DatePicker
							date={date}
							mode="date"
							placeholder="Check In"
							style={{border: "1px solid black", marginRight: 10, borderRadius: 10}}
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="black" style={styles.dateIcon}/>}
							onDateChange={()=>setDate(date)}
						/>

						<DatePicker
							date={date}
							mode="date"
							placeholder="Check Out"
							style={{border: "1px solid black", borderRadius: 10}}
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="black" style={styles.dateIcon}/>}
							onDateChange={()=>setDate(date)}
						/>
					</View>
					<Input
						value={name}
						textContentType="none"
						keyboardType="numeric"
						onChangeText={text => setName(text)}
						placeholder = "Number of beds"
						inputStyle = {{color: "black"}}
					/>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
						<Input
							value={min}
							textContentType="telephoneNumber"
							keyboardType="numeric"
							onChangeText={text => setMin(text)}
							placeholder = "min"
							inputStyle = {{color: "black"}}
							style={{width: 20, border: "1px solid black", textAlign: 'center'}}
						/>
						<Input
							value={max}
							textContentType="telephoneNumber"
							keyboardType="numeric"
							onChangeText={text => setMax(text)}
							placeholder = "max"
							inputStyle = {{color: "black"}}
							style={{width: 20, border: "1px solid black", textAlign: 'center'}}
						/>
					</View>
					<TouchableOpacity
						onPress = {null}
						color = "white"
						style= {styles.continue}
					>
						<Text style={{color: 'white'}}>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	imageContainer:{
		flex: 2,
		borderBottomRightRadius: Dimensions.get('screen').width*(50/100),
		height: "80%",
		borderBottomLeftRadius: Dimensions.get('screen').width*(50/100),
		transform: [{scaleX: 2}],
		overflow: 'hidden',
		marginBottom: -Dimensions.get('screen').height*0.05,
		zIndex: 1
	},
	imageBack:{
		flex: 1,
		transform: [{scaleX: 0.5}],
		justifyContent: 'center',
		alignItems: 'center',
	},
	pageImage: {
		resizeMode: 'cover',
		width: Dimensions.get('screen').width,
		flex: 1,
	},
	searchform:{
		backgroundColor: 'white', 
		width: Dimensions.get('screen').width*0.9,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	dateIcon:{
		position: 'absolute',
		left: 10,
	},
	content: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		paddingLeft: 15,
		paddingRight: 15,
	},
	continue:{
		padding: 12,
		borderRadius: 15,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: 'black',
		width: '60%',
		alignItems: 'center',
		justifyContent: 'center'
	}
});