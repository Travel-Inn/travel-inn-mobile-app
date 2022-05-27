import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import firebase from "firebase/compat/app";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { loggingOut, updateUserData } from '../../config/firebase';
import { validateNumber, validateText, validateEmail, validateGender } from '../../utils/inputValidator';

export default function Profile({navigation}) {
    const [nav, setNav] = React.useState(["mainprofile"]);
    const [userDetails, setUserDetails] = React.useState([]);
    // Initializing stateful variables.
    const [fName, setFName] = React.useState('');
    const [lName, setLName] = React.useState('');
    const [ email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [ phone, setPhone ] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() =>{
        // Retrieving user data.
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;
            db.collection("Users").doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists){
                console.log("User data has been extracted.");
                setUserDetails(doc.data());
                } else {
                console.log("No such user exists.");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });



        },[])

    const onHandleSave = async () => {
	setLoading(true);
	// Routine input checks.
    if (!validateText(fName)) {
    setLoading(false);
    } else if (!validateText(lName)){
    setLoading(false);
    } else if (!validateEmail(email)) { 
		setLoading(false);
    } else if (!validateNumber(phone, 10)){
        setLoading(false);
    } else if (!validateGender(gender)){
        setLoading(false);
    }else if (await updateUserData(fName.trim(), lname.trim(), email.trim(),number.trim(), gender) == 0) {
        setNav((nav)=>nav.filter((_,i)=> i!==nav.length-1));
	}else{
	 setLoading(false);
	} 
  };

  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../../images/profile.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>PROFILE</Text>
			</ImageBackground>
			{nav[nav.length-1]=="mainprofile"?<View style={styles.content}>
                <View style={styles.user}>
                    <Image source={require('../../images/profile.jpg')} style={styles.profileImage}/>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{userDetails.firstName} {userDetails.lastName}</Text>
                        <Text style={{color: 'white'}}>{userDetails.email}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.options} onPress={()=>setNav([...nav,'profile', {userData: userDetails}])}>
                    <Text>Manage Your Account</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('Contact')}>
                    <Text>Contact Us</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('History')}>
                    <Text>History</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress = {loggingOut} style={styles.options}>
                    <Text>Sign Out</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>

			</View>
            : 
            <View style={styles.content}>
                <View style={styles.user}>
                    <Image source={require('../../images/profile.jpg')} style={styles.profileImage}/>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{userDetails.firstName} {userDetails.lastName}</Text>
                        <Text style={{color: 'white'}}>{userDetails.email}</Text>
                    </View>
                </View>
                <View style={styles.options}>
                    <Text>First Name</Text>
                    <Text>{userDetails.firstName}</Text>
                </View>
                <View style={styles.options}>
                    <Text>Last Name</Text>
                    <Text>{userDetails.lastName}</Text>
                </View>
                {/* <View style={styles.options}>
                    <Text>Email</Text>
                    <Text>{userDetails.email}</Text>
                </View> */}
                <Input
                keyboardType='email-address'
                textContentType='emailAddress'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder = {userDetails.email}
                leftIcon = {<Icon name="at" size = {20} color = 'white' style={{paddingRight: 5}}/>}               
				/>
                <View style={styles.options}>
                    <Text>Gender</Text>
                    <Text>{userDetails.gender}</Text>
                </View>
                <TouchableOpacity style={styles.options} >
                    <Text>Number</Text>
                    <Text>{userDetails.phoneNum}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backbtn} onPress={onHandleSave}>
				    <Text>Save</Text>
			    </TouchableOpacity>				
			</View>}
		</ScrollView>
	</View>
  );
}

const styles = StyleSheet.create({
    container:{
	 flex: 1,
	 backgroundColor: 'black'
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
    content:{
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center'
    },
    user:{
        flexDirection: 'row',
        width: Dimensions.get('screen').width,
        justifyContent: 'space-around',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        marginBottom: 20
    },
    profileImage:{
        width: Dimensions.get('screen').width*0.2,
        height: Dimensions.get('screen').width*0.2,
        borderRadius: Dimensions.get('screen').width*0.2,
    },
    options:{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 8,
        width: Dimensions.get('screen').width*0.9,
        justifyContent: 'space-between',
        borderRadius: 15,
        marginBottom: 30
    },
    backbtn:{
		backgroundColor: 'white',
		width: Dimensions.get('screen').width*0.4,
		borderRadius: 15,
		padding: 8,
		textAlign: 'center',
		alignSelf: 'center'
	},
});