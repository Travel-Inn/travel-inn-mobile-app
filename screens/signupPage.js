import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';

export default function SignupPage({navigation}){
    return(
		<View style={styles.container}>
			<View style = {styles.imageContainer}>
				<View style={styles.imageBack}>
					<ImageBackground style={styles.pageImage} source={require("../images/home.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.signupText}>Sign Up</Text>
				<View style = {styles.signUpOptions}>
					<TouchableOpacity
						onPress = {null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Create with google</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress = {null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Create with Apple</Text>
					</TouchableOpacity>
				</View>
				<Input
					placeholder = "abcde123@example.com"
					leftIcon = {<Icon name="user" size = {20} color = 'white' style={{paddingRight: 5}}/>}
				/>
				<Input
					placeholder = "Username"
					leftIcon = {<Icon name="user" size = {20} color = 'white' style={{paddingRight: 5}}/>}
				/>
				<Input
					placeholder = " Mobile Phone"
					leftIcon = {<Icon name="phone" size = {20} color = 'white' style={{paddingRight: 5}}/>}
				/>
				<TouchableOpacity
					onPress = {()=>navigation.navigate('Login')}
					color = "white"
					style= {styles.continue}
				>
				<Text>Continue</Text>
				</TouchableOpacity>
				<Text onPress = {()=>navigation.navigate('Login')} style={styles.loginText}>
					Already have an account?<Text style={{color: 'blue'}}> Login</Text>
				</Text>
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
		marginBottom: -26,
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
	signUpOptions:{
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: 'center',
		marginBottom: 20,
	},
	signUpOption:{
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 12,
		marginRight: 15
	},
	form: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		paddingLeft: 15,
		paddingRight: 15
	},
	loginText: {
		color: 'white'
	},
	signupText:{
		color: 'white',
		fontSize: 25,
		marginBottom: 15,
		fontWeight: 'bold'
	},
	continue:{
		padding: 12,
		borderRadius: 15,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: 'white',
		marginTop: 10,
		marginBottom: 20,
		width: '60%',
		alignItems: 'center',
		justifyContent: 'center'
	}
});