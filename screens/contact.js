import React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import TopBtns from './topBar.js';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function Contact({navigation}){
    return(
        <View style={styles.contactContent}>
			<TopBtns touchAction={navigation.openDrawer}/>
            <ImageBackground source={require("../images/contact.jpg")} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contactPageInfo}>
                    <Text style={styles.whiteText}>Contact</Text>
                </View>
            </ImageBackground>
            <View style={styles.contacts}>
				<ScrollView contentContainerStyle={styles.contactGrid}>
					<View>
						<View style={styles.contact}><Icons name="facebook" size = {25} /><Text>Facebook</Text></View>
						<View style={styles.contact}><Icons name="twitter" size = {25} /><Text>Twitter</Text></View>
						<View style={styles.contact}><Icons name="instagram" size = {25} /><Text>Instagram</Text></View>
						<View style={styles.contact}><Icons name="phone" size = {20} /><Text>Phone</Text></View>
					</View>
					<View>
						<View style={styles.contact}><Icons name="linkedin" size = {25} /><Text>LinkedIn</Text></View>
						<View style={styles.contact}><Icons name="envelope" size = {25} /><Text>Email</Text></View>
						<View style={styles.contact}><Icons name="snapchat" size = {25} /><Text>Snapchat</Text></View>
						<View style={styles.contact}><Icons name="whatsapp" size = {25} /><Text>WhatsApp</Text></View>
					</View>
				</ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contactContent:{
        flex: 1,
      },
    backgroundImage:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactPageInfo:{
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        borderRadius: 25,
        width: Dimensions.get('window').width*(70/100),
        padding: 20,
    },
    whiteText:{
        color: 'white',
        marginBottom: 10,
		textAlign: 'center'
      },
    contacts:{
        flex: 1,
        backgroundColor: "white",
    },
	contactGrid:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15,
	},
	contact:{
		fontSize: 15,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center'
	}
});