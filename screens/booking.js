import React from 'react';
import { useState } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';


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
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.searchform}>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
						<DatePicker
							date={date}
							mode="date"
							placeholder="Check In"
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							iconSource={null}
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							onDateChange={()=>setDate(date)}
							customStyles={{
								dateInput:{
									backgroundColor: 'black',
									color: 'white',
									border: "1px solid black",
									borderRadius: 10,
									marginRight: 20
								},
								placeholderText:{
									color: 'white',
								}
							}}
						/>

						<DatePicker
							date={date}
							mode="date"
							iconSource={null}
							placeholder="Check Out"
							format="DD-MM-YYYY"
							minDate="14-06-2022"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							iconComponent={<Icon name="calendar-o" size={20} color="white" style={styles.dateIcon}/>}
							onDateChange={()=>setDate(date)}
							customStyles={{
								dateInput:{
									backgroundColor: 'black',
									color: 'white',
									border: "1px solid black",
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
						value={name}
						textContentType="none"
						keyboardType="numeric"
						onChangeText={text => setName(text)}
						placeholder = "Number of beds"
						placeholderTextColor={"white"}
						leftIcon={
						<Icon name='users' size={20} color="white" 
							style={{position: 'absolute', left: 15, top: 15, borderBottom: 'none'}}
						/>}
						inputStyle = {{
							color: "white", textAlign: 'center', borderRadius: 10,
							backgroundColor: 'black', marginTop: 10
						}}
						inputContainerStyle={{borderBottom: 'none'}}
					/>
					<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
						<Input
							value={min}
							textContentType="telephoneNumber"
							keyboardType="numeric"
							onChangeText={text => setMin(text)}
							placeholder = "min"
							placeholderTextColor={'white'}
							inputStyle = {{
											backgroundColor: "black", textAlign: 'center', width: 50, 
											border: "1px solid black", borderRadius: 10, color: 'white'
										}}
							inputContainerStyle={{borderBottom: "none"}}
						/>
						<Input
							value={max}
							textContentType="telephoneNumber"
							keyboardType="numeric"
							onChangeText={text => setMax(text)}
							placeholderTextColor={'white'}
							placeholder = "max"
							inputStyle = {{
											backgroundColor: "black", 
											textAlign: 'center', width: 50, 
											border: "1px solid black", borderRadius: 10,
											color: 'white'
										}}
							inputContainerStyle={{borderBottom: "none"}}
						/>
					</View>
				</View>
				<TouchableOpacity
						onPress = {null}
						color = "white"
						style= {styles.continue}
					>
						<Text style={{fontWeight: 'bold'}}>Search</Text>
				</TouchableOpacity>
				<View style={styles.room}>
					<Image source={require('../images/menu.jpg')} style={{flex: 2}} />
					<View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
						<Text>Single Room</Text>
						<Text>Single Room with Single Bed</Text>
						<Text>GHC 200.00</Text>
					</View>
				</View>
				<View style={styles.room}>
					<Image source={require('../images/login.jpg')} style={{flex: 2}} />
					<View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
						<Text>Twin-Bed Room</Text>
						<Text>Single Room with Twin Beds</Text>
						<Text>GHC 300.00</Text>
					</View>
				</View>
				<View style={styles.room}>
					<Image source={require('../images/forgotten.jpg')} style={{flex: 2}} />
					<View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
						<Text>Double Room</Text>
						<Text>Single Room with Double Bed</Text>
						<Text>GHC 350.00</Text>
					</View>
				</View>
			</ScrollView>
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
		minHeight: "35%",
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
		marginTop: Dimensions.get('screen').height*0.4,
		justifyContent: 'space-around',
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
		overflow: 'scroll'
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
	}
});