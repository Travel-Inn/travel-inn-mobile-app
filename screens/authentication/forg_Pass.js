import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { passwordReset } from '../../config/firebase';
import { validateEmail } from '../../utils/inputValidator';

export default function ForgottenPasswordPage({navigation}){
	// Initializing stateful variables. 
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState('');

	// Cleaning up stateful variables.
	const emptyState = () => {
		setEmail('');
  };

  const onHandlePasswordReset = async () => {
	  setLoading(true);
	  // Routine input check.
    if (!validateEmail(email)) {
		setLoading(false);
    } else if (await passwordReset(email) == 0){ // If password was successful.
	  	setLoading(false);
		emptyState();
		navigation.navigate('Login') // Move to login page.
    } else {
		setLoading(false);
		console.log("Unexpected error.");
  }
  }


    return(
		loading ? 
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
		: 
		<View style={styles.container}>
			<View style = {styles.imageContainer}>
				<View style={styles.imageBack}>
					<ImageBackground style={styles.pageImage} source={require("../../images/forgotten.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.loginText}>Forgotten password</Text>
                <Text style={styles.info}>Enter your Email address</Text>
                <Text style={styles.info}>to receive a verification code</Text>
				<Input
					keyboardType="email-address"
					textContentType="emailAddress"
					value={email}
					onChangeText={text => setEmail(text)}
					placeholder = "abcde123@example.com"
					leftIcon = {<Icon name="at" size = {20} color = 'white' style={{paddingRight: 5}}/>}
                    inputContainerStyle={{marginTop: 25}}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -5}}
				/>
				<TouchableOpacity
					onPress = {onHandlePasswordReset}
					color = "white"
					style= {styles.continue}
				>
				<Text style={styles.btnText}>Continue</Text>
				</TouchableOpacity>
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
		justifyContent: 'flex-start',
		backgroundColor: 'black',
		paddingLeft: 25,
		paddingRight: 25,
        paddingTop: 50,
	},
	loginText: {
		color: 'white',
		fontSize: 25,
		marginBottom: 35,
		alignSelf: 'center',
        fontWeight: 'bold',
		marginTop: Dimensions.get('screen').width*0.05
	},
	info:{
		color: 'white',
		alignSelf: 'center'
	},
	continue:{
		padding: 12,
		borderRadius: 15,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: 'white',
		marginTop: 30,
		marginBottom: 20,
		width: "60%",
		alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
	},
    btnText:{
        color: 'black',
        fontSize: 18
    }
});