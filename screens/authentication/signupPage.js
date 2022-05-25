import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Text, Alert, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';
import { registration } from '../config/firebase';


export default function SignupPage({navigation}){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [loading, setLoading] = useState(false);


	const emptyState = () => {
		setEmail('');
		setPassword('');
		setName('');
		setPhone('');
  };

	 const onHandleSignup = async () => {
		setLoading(true);
		if (!email) {
			setLoading(false);
		console.log('Email is required');
		} else if (!password) {
			setLoading(false);
		console.log('Password field is required.');
		} else if (!name) {
			setLoading(false);
		console.log('Name field is required.');
		} else if (!phone) {
			setLoading(false);
			console.log("Phone field is required");
		} else if (await registration(email,password,name,phone) == 0 ) {
		}else{
			setLoading(false);
		}
	  
  };

    return(
		loading ? 
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>:
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
						//onPress = {()=>navigation.navigate("BottomNav")}
						onPress={null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Create with Google</Text>
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
					keyboardType='email-address'
					textContentType='emailAddress'
					autoCapitalize='none'
					value={email}
					onChangeText={text => setEmail(text)}
					placeholder = "abcde123@example.com"
					leftIcon = {<Icon name="at" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<Input
					autoCapitalize="none"
					value={password}
					onChangeText={text => setPassword(text)}
					placeholder = "password"
					leftIcon = {<Icon name="lock" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					secureTextEntry={true}
					rightIcon ={<Icon name="eye" size={20} color ="white"/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -7}}
				/>
				<Input
					autoCapitalize="True"
					value={name}
					onChangeText={text => setName(text)}
					placeholder = "Full Name"
					leftIcon = {<Icon name="user" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<Input
					autoCapitalize="True"
					value={phone}
					onChangeText={text => setPhone(text)}
					placeholder = "Phone Number"
					leftIcon = {<Icon name="user" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<TouchableOpacity
					onPress = {onHandleSignup}
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
		paddingRight: 15,
	},
	loginText: {
		color: 'white'
	},
	signupText:{
		color: 'white',
		fontSize: 25,
		marginBottom: 15,
		fontWeight: 'bold',
		marginTop: Dimensions.get('screen').width*0.05
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