import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ResetPasswordPage({navigation}){
    return(
		<View style={styles.container}>
			<View style = {styles.imageContainer}>
				<View style={styles.imageBack}>
					<ImageBackground style={styles.pageImage} source={require("../images/reset.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.loginText}>Reset password</Text>
                <Text style={styles.info}>Your password must be different from</Text>
                <Text style={styles.info}>any previously used passwords</Text>
				<Input
					placeholder = "New Password"
					leftIcon = {<Icon name="lock" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					secureTextEntry={true}
					rightIcon ={<Icon name="eye" size={20} color ="white"/>}
                    inputContainerStyle={{marginTop: 25}}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -7}}
				/>
				<Input
					placeholder = "Confirm new password"
					leftIcon = {<Icon name="lock" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					secureTextEntry={true}
					rightIcon ={<Icon name="eye" size={20} color ="white"/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -7}}
				/>
				<TouchableOpacity
					onPress = {()=>navigation.navigate('Login')}
					color = "white"
					style= {styles.continue}
				>
				<Text>Submit</Text>
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
		marginTop: 50,
		marginBottom: 20,
		width: "60%",
		alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
	},
    btnText:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
});