import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity, Image, TextInput, LogBox, StyleSheet, ScrollView, Dimensions} from 'react-native';
import firebase from "firebase/compat/app";
import Icon from 'react-native-vector-icons/FontAwesome';
import { loggingOut, updateUserData } from '../../config/firebase';
import { validateNumber, validateText, validateEmail, validateGender } from '../../utils/inputValidator';
import { successfulToastNotifier } from '../../widgets/toastNotification';

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
		LogBox.ignoreLogs(['Setting a timer']);
        // Retrieving user data.
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;
            db.collection("Users").doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists){
                console.log("User data have been extracted.");
                setUserDetails(doc.data());
                setEmail(doc.data().email)
                setFName(doc.data().firstName)
                setLName(doc.data().lastName)
                setGender(doc.data().gender)
                setPhone(doc.data().phoneNum)
                } else {
                console.log("No such user exists.");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });



        },[nav])

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
    }else if (await updateUserData(fName.trim(), lName.trim(), email.trim(),phone.trim(), gender.trim()) == 0) {
        successfulToastNotifier("Success", "User Details have been updated successfully.");
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
                <TouchableOpacity style={styles.options} onPress={()=>setNav([...nav,'profile'])}>
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
                    <TextInput
                keyboardType='default'
                textContentType="name"
                autoCapitalize='none'
                value={fName}
                onChangeText={text => setFName(text)}
                style={{paddingRight: 10}}
                />
                </View>
                <View style={styles.options}>
                    <Text>Last Name</Text>
                    <TextInput
                keyboardType='email-address'
                textContentType='emailAddress'
                autoCapitalize='none'
                value={lName}
                onChangeText={text => setLName(text)}
                style={{paddingRight: 10}}
                />
                </View>
                <View style={styles.options}>
                    <Text>Email</Text>
                    <TextInput
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{paddingRight: 10}}           
                    />
                </View>
                
                <View style={styles.options}>
                    <Text>Gender</Text>
                    <TextInput
                    keyboardType="default"
                    textContentType="name"
                    autoCapitalize='none'
                    value={gender}
                    onChangeText={text => setGender(text)}
                    style={{paddingRight: 10}}
                    />
                </View>
                <TouchableOpacity style={styles.options} >
                    <Text>Number</Text>
                    <TextInput
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoCapitalize='none'
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    style={{paddingRight: 10}}
                    />
                </TouchableOpacity>
                <View style={{flexDirection: "row", width: Dimensions.get('screen').width*0.8, justifyContent:'space-around'}}>
                <TouchableOpacity style={styles.backbtn} onPress={()=>setNav((nav)=>nav.filter((_,i)=> i!==nav.length-1))}>
				    <Text>Back</Text>
			    </TouchableOpacity>		
                <TouchableOpacity style={styles.backbtn} onPress={onHandleSave}>
				    <Text>Save</Text>
			    </TouchableOpacity>	
                </View>		
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
		width: Dimensions.get('screen').width*0.3,
		borderRadius: 15,
		padding: 8,
        justifyContent: 'center',
        alignItems: 'center',

	},
});