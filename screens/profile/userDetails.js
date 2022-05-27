import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase/compat/app";


export default function UserDetails({route, navigation}) {
    // Receiving user data.
    const {userData} = route.params;

  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../../images/profile.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>PROFILE</Text>
			</ImageBackground>
			<View style={styles.content}>
                <View style={styles.user}>
                    <Image source={require('../../images/profile.jpg')} style={styles.profileImage}/>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{color: 'white'}}>{userData.email}</Text>
                    </View>
                </View>
                <View style={styles.options}>
                    <Text>First Name</Text>
                    <Text>{userData.firstName}</Text>
                </View>
                <View style={styles.options}>
                    <Text>Last Name</Text>
                    <Text>{userData.lastName}</Text>
                </View>
                <View style={styles.options}>
                    <Text>Email</Text>
                    <Text>{userData.email}</Text>
                </View>
                <View style={styles.options}>
                    <Text>Gender</Text>
                    <Text>Male</Text>
                </View>
                <View style={styles.options}>
                    <Text>Number</Text>
                    <Text>{userData.phoneNum}</Text>
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