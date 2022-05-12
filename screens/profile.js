import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile({navigation}) {

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
                        <Text style={{color: 'white'}}>Samuel Nai</Text>
                        <Text style={{color: 'white'}}>samuel.nai@yahoo.com</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('User')}>
                    <Text>Manage Your Account</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('Contact')}>
                    <Text>Contact Us</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.options}>
                    <Text>History</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.options}>
                    <Text>Sign Out</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </TouchableOpacity>
				
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
        marginBottom: 30
    }
});