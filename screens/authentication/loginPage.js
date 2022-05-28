import React from 'react';
import { Text,  View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';
import { googleSignIn, signIn } from '../../config/firebase';
import { validateEmail, validatePassword } from '../../utils/inputValidator';


export default function LoginPage({navigation}){
	// Initializing stateful variables.
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	// Cleaning up variables.
	const emptyState = () => {
		setEmail('');
		setPassword('');
  };

  const onHandleGoogleSignIn = async () => {
	  await googleSignIn();
  }

  const onHandleLogin = async () => {
	setLoading(true);
	// Routine input checks.
    if (!validateEmail(email)) { 
		setLoading(false);
    } else if (!validatePassword(password)) {
		setLoading(false);
    } else if (await signIn(email,password) == 0) {
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
					<ImageBackground style={styles.pageImage} source={require("../../images/login.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.loginText}>Login</Text>
				<View style = {styles.signUpOptions}>
					<TouchableOpacity
						onPress = {onHandleGoogleSignIn}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Login with Google</Text>
					</TouchableOpacity>
					 {/* If apple login is possible display the option. If not don't display.
					{isAppleLoginAvailable && <TouchableOpacity
						onPress = {null}
						color = "black"
						style= {styles.signUpOption}
					>
					<Text>Login with Apple</Text>
					</TouchableOpacity>} */}
				</View>
				<Input
					keyboardType="email-address"
					textContentType="emailAddress"
					value={email}
					onChangeText={text => setEmail(text)}
					placeholder = "abcde123@example.com"
					leftIcon = {<Icon name="at" size = {20} color = 'white' style={{paddingRight: 5}}/>}
					inputStyle = {{color: "white"}}
					leftIconContainerStyle ={{backgroundColor: "black", marginBottom: -6}}
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
				<Text onPress ={()=>navigation.navigate("Forgotten Password")} style={{color: 'white',  alignSelf: 'flex-end'}}>Forgotten Password?</Text>
				<TouchableOpacity
					onPress = {onHandleLogin}
					color = "white"
					style= {styles.continue}
				>
				<Text>Continue</Text>
				</TouchableOpacity>
				<Text onPress = {()=>navigation.navigate('Signup')} style={styles.signupText}>Don't have an account?<Text style={{color: 'blue'}}> Signup</Text></Text>
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
		backgroundColor: 'black',
		paddingLeft: 15,
		paddingRight: 15,
	},
	loginText: {
		color: 'white',
		fontSize: 25,
		marginBottom: 35,
		alignSelf: 'center',
		fontWeight: 'bold',
		marginTop: Dimensions.get('screen').width*0.05
	},
	signupText:{
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
	}
});