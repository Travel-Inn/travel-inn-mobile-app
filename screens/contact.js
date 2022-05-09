import React, { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";
import { Text,Linking, View, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import TopBtns from './topBar.js';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function Contact({navigation}){
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');

    useEffect(() => {
        async function getContacts() {
            let contactValues = await firebase
            .firestore()
            .collection("Contacts")
            .doc("contact_id")
            .get();

            let contacts = contactValues.data();
            setPhone(contacts.phone);
            setEmail(contacts.email);
            setFacebook(contacts.facebook);
            setInstagram(contacts.instagram);
            setLinkedin(contacts.linkedin);
            setTwitter(contacts.twitter);
         }
         getContacts();
    })

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
						<View style={styles.contact}><Icons name="facebook" size = {25} /><Text onPress={()=> Linking.openURL(facebook)}>{facebook}</Text></View>
						<View style={styles.contact}><Icons name="twitter" size = {25} /><Text onPress={()=> Linking.openURL(twitter)}>{twitter}</Text></View>
						<View style={styles.contact}><Icons name="instagram" size = {25} /><Text onPress={()=> Linking.openURL(instagram)}>{instagram}</Text></View>
					</View>
					<View>
						<View style={styles.contact}><Icons name="linkedin" size = {25} /><Text onPress={()=> Linking.openURL(linkedin)}>{linkedin}</Text></View>
						<View style={styles.contact}><Icons name="envelope" size = {25} /><Text onPress={()=> Linking.openURL('mailto:${email}')}>{email}</Text></View>
						<View style={styles.contact}><Icons name="phone" size = {20} /><Text onPress={()=> Linking.openURL('tel:{phone}')}>{phone}</Text></View>
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