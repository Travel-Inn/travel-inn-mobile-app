import React, { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";
import { Text,Linking, View, StyleSheet, Dimensions, ImageBackground, ScrollView, LogBox} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function Contact(){
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
        const getContacts=async()=> {
            // Retrieving contact document. 
            let contactValues = await firebase
            .firestore()
            .collection("Contacts")
            .doc("contact_id")
            .get();

            // Assigning contact fields to respective variables.
            let contacts = contactValues.data();
            setPhone(contacts.phone);
            setEmail(contacts.email);
            setFacebook(contacts.facebook);
            setInstagram(contacts.instagram);
            setLinkedin(contacts.linkedin);
            setTwitter(contacts.twitter);
         }
         getContacts();
    },[])

    return(
        <View style={styles.contactContent}>
            <ImageBackground source={require("../../images/contact.jpg")} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contactPageInfo}>
                    <Text style={styles.whiteText}>CONTACT INFO</Text>
                </View>
            </ImageBackground>
            <View style={styles.contacts}>
				<ScrollView contentContainerStyle={styles.contactGrid}>
                    <View style={styles.contact}><Icons name="facebook" size = {25} color="white" />
                        <Text style={{color: 'white', paddingLeft: 10}} onPress={()=> Linking.openURL(facebook)}>{facebook}</Text>
                    </View>
                    <View style={styles.contact}><Icons name="twitter" size = {25} color="white"/>
                        <Text style={{color: 'white', paddingLeft: 10}}  onPress={()=> Linking.openURL(twitter)}>{twitter}</Text>
                    </View>
                    <View style={styles.contact}><Icons name="instagram" size = {25} color="white"/>
                        <Text style={{color: 'white', paddingLeft: 10}}  onPress={()=> Linking.openURL(instagram)}>{instagram}</Text>
                    </View>
                    <View style={styles.contact}><Icons name="linkedin" size = {25} color="white"/>
                        <Text style={{color: 'white', paddingLeft: 10}}  onPress={()=> Linking.openURL(linkedin)}>{linkedin}</Text>
                    </View>
                    <View style={styles.contact}><Icons name="envelope" size = {25} color="white"/>
                        <Text style={{color: 'white', paddingLeft: 10}}  onPress={()=> Linking.openURL('mailto:${email}')}>{email}</Text>
                    </View>
                    <View style={styles.contact}><Icons name="phone" size = {20} color="white"/>
                        <Text style={{color: 'white', paddingLeft: 10}}  onPress={()=> Linking.openURL('tel:{phone}')}>{phone}</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactPageInfo:{
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        borderRadius: 25,
        width: Dimensions.get('window').width*(70/100),
        padding: 15,
    },
    whiteText:{
        color: 'white',
        fontSize: 20,
		textAlign: 'center',
		borderRadius: 25,
		backgroundColor: 'rgba(0,0,0, 0.7)',
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
        overflow: 'hidden'
      },
    contacts:{
        flex: 1,
        backgroundColor: "#000000",
        paddingLeft: 10
    },
	contactGrid:{
		justifyContent: 'space-around',
		marginTop: 15,
        flex: 1,
	},
	contact:{
		fontSize: 15,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
	}
});