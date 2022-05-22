import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, ScrollView, Dimensions, StyleSheet, TextInput} from 'react-native';

export default function Payment(){

    return (
        <View style={styles.container}>
		<ScrollView>
			<ImageBackground source={require("../images/payment.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>PAYMENT</Text>
			</ImageBackground>
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
				<Text style={{fontSize: 18, fontWeight: 'bold'}}>Booking Details</Text>
				<View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around', alignItems: 'center', marginVertical: 5}}>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: '80%', fontWeight: 'bold'}}>Check In</Text>
						<Text style={{fontSize: '80%'}}>Fri, 25th March, 2022</Text>
						<Text style={{fontSize: '80%'}}>12PM</Text>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderLeftWidth: 1, padding: 5}}>
						<Text style={{fontSize: '80%'}}>5 Nights</Text>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
						<Text style={{fontSize: '80%', fontWeight: 'bold'}}>Check Out</Text>
						<Text style={{fontSize: '80%'}}>Wed, 30th March, 2022</Text>
						<Text style={{fontSize: '80%'}}>12PM</Text>
					</View>
				</View>
				<Text style={{width: '100%',paddingHorizontal: 20, borderTopWidth: 1, borderBottomWidth: 1, padding: 10}}>
					Price Summary
				</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: "80%", marginVertical: 5}}>
					<Text>Single Room</Text>
					<Text>GHC 200</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: "80%", marginVertical: 5}}>
					<Text>Number of Nights</Text>
					<Text>5</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: "80%", marginVertical: 5}}>
					<Text>Taxes and Fees</Text>
					<Text>GHC 50</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%',paddingHorizontal: 20, 
				padding: 10, borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 5}}>
					<Text>Total Amount</Text>
					<Text>GHC 1,050</Text>
				</View>
				<TouchableOpacity style={styles.button}>
					<Text style={{color: 'white'}}>Continue</Text>
				</TouchableOpacity>

			</View> 
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
	contactInfo:{
		color: 'white', 
		backgroundColor: 'grey',
		width: '80%', 
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