import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase/compat/app";


export default function UserDetails() {
    const [userDetails, setUserDetails] = React.useState([]);

    React.useEffect(() =>{
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;
            db.collection("Users").doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists){
                console.log("User data has been extracted.");
                setUserDetails(doc.data());
                setName(userDetails.name);
                } else {
                console.log("No such user exists.");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });



        },[])
  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../images/profile.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>PROFILE</Text>
			</ImageBackground>
			<View style={styles.content}>
                <View style={styles.user}>
                    <Image source={require('../images/profile.jpg')} style={styles.profileImage}/>
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
                <View style={styles.options}>
                    <Text>Email</Text>
                    <Text>{userDetails.email}</Text>
                </View>
                <View style={styles.options}>
                    <Text>Gender</Text>
                    <Text>Male</Text>
                </View>
                <View style={styles.options}>
                    <Text>Number</Text>
                    <Text>{userDetails.phoneNum}</Text>
                </View>
				
			</View>
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
        marginBottom: 30,
        paddingRight: 25
    }
});