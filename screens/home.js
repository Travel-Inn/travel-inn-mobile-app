import React from 'react';
import { Text, Alert, View, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';


export default function Home({navigation}){

    return(
		<View style={styles.container}>
			<View style = {styles.imageContainer}>
				<View style={styles.imageBack}>
					<ImageBackground style={styles.pageImage} source={require("../images/home-welome.jpg")}/>
				</View>
			</View>
			<View style={styles.form}>
				<View style = {styles.options}>
					<TouchableOpacity
						onPress = {()=>navigation.navigate("Signup")}
						color = "black"
						style= {styles.loginorsignup}
					>
					<Text>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress = {()=>navigation.navigate("Login")}
						color = "black"
						style= {styles.loginorsignup}
					>
					<Text>Login</Text>
					</TouchableOpacity>
				</View>
                <View style={styles.page}>
                    <View style={{flex: 1,padding: 10, justifyContent: 'space-between'}}>
                        <Text style={styles.info}>Luxury Redefined</Text>
                        <Text style={styles.description}>Our rooms are designed to transport you into an environment made 
                            for leisure. Take your mind off the day-to-day of home life and find a 
                            private paradise for yourself
                        </Text>
                        <TouchableOpacity style={styles.explore} onPress={()=>navigation.navigate('Booking')}>
                            <Text style={styles.exploretext}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoImageContainer}>
                        <ImageBackground source={require("../images/reset.jpg")} style={styles.infoImage}/>
                    </View>
                </View>
                <View style={styles.page}>
                    <View style={{flex: 1,padding: 10, justifyContent: 'space-between'}}>
                        <Text style={styles.info}>Amazing Food</Text>
                        <Text style={styles.description}>Our extensive menu contains a variety of meals from all over
                        the world to cater for the different tastes of our family. Lose yourself in the variety of dishes
                        available and try new dishes.
                        </Text>
                        <TouchableOpacity style={styles.explore} onPress={()=>navigation.navigate('Menu')}>
                            <Text style={styles.exploretext}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoImageContainer}>
                        <ImageBackground source={require("../images/menu.jpg")} style={styles.infoImage}/>
                    </View>
                </View>
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
		height: "80%",
		transform: [{scaleX: 2}],
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
	options:{
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: 'center',
	},
	loginorsignup:{
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
		marginRight: 15
	},
	form: {
		flex: 4,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'black',
		paddingLeft: 15,
		paddingRight: 15,
	},
    page:{
        width: Dimensions.get('screen').width*0.9,
        flexDirection: 'row',
        height: Dimensions.get('screen').height*0.23,
        backgroundColor: '#111111',
        borderRadius: 20,
    },
	info:{
		color: 'orange',
        fontSize: 14,
        fontWeight: 'bold'
	},
    infoImageContainer:{
        flex: 1,
        transform: [{scaleX: 2}],
    },
    infoImage:{
        flex: 1,
        resizeMode: 'cover',
        transform: [{scaleX: 0.5}],
		justifyContent: 'center',
		alignItems: 'center',
    },
    description:{
        color: 'white',
        fontSize: 11,
    },
    explore:{
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 3,
        width: "55%",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    exploretext:{
        color: 'white',
        textAlign: 'center'
    }
});