import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';
import { registration } from '../../config/firebase';
import { validateEmail, validatePassword, validateNumber, validateText }from '../../utils/inputValidator';
import { successfulToastNotifier } from '../../widgets/toastNotification';


export default function SignupPage({navigation}){
	// Setting variable states
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [loading, setLoading] = useState(false);
	const [showpass, setShowpass] = React.useState(true);

	// For cleaning up the variables. 
	const emptyState = () => {
		setEmail('');
		setPassword('');
		setName('');
		setPhone('');
  };

	 const onHandleSignup = async () => {
		setLoading(true);
		// Routine input checks.
		if (!validateEmail(email)) {
			setLoading(false);
		} else if (!validatePassword(password)) {
			setLoading(false);
		} else if (!validateText(name)) {
			setLoading(false);
		} else if (!validateNumber(phone, 10)) {
			setLoading(false);
		} else if (await registration(email,password,name,phone) == 0 ) {
			 // Returns 0 when successful
		}else{
			setLoading(false);
			console.log("Unexpected error occurred.")
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
					<ImageBackground style={styles.pageImage} source={require("../../images/home.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.signupText}>Sign Up</Text>
				<View style = {styles.signUpOptions}>
					{/* <TouchableOpacity
						onPress={null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Create with Google</Text>
					</TouchableOpacity> */}
					{/* <TouchableOpacity
						onPress = {null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Create with Apple</Text>
					</TouchableOpacity> */}
				</View>
				<Input
					keyboardType='email-address'
					textContentType='emailAddress'
					value={email}
					onChangeText={text => setEmail(text)}
					placeholder = "abcde123@example.com"
					leftIcon = {<Icon name="at" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<Input
					value={password}
					onChangeText={text => setPassword(text)}
					placeholder = "password"
					leftIcon = {<Icon name="lock" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					secureTextEntry={showpass}
					rightIcon ={showpass==true?
					<Icon name="eye" size={20} color ="white" onPress={(()=>setShowpass(!showpass))}/>
					:
					<Icon name="eye-slash" size={20} color ="white" onPress={(()=>setShowpass(!showpass))}/>
					}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -7}}
				/>
				<Input
					autoCapitalize="words"
					value={name}
					onChangeText={text => setName(text)}
					placeholder = "Full Name"
					leftIcon = {<Icon name="user" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<Input
					autoCapitalize="words"
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