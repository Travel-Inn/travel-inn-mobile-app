import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import TopBtns from './topBar.js';

export default function Home({navigation}){
    return(
        <View style={styles.homeContent}>
			<TopBtns touchAction={navigation.openDrawer}/>
            <ImageBackground source={require("../images/home.jpg")} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.homePageInfo}>
                    <Text style={styles.whiteText}>Sunny-Side</Text>
                    <Text style={styles.whiteText}>___________O___________</Text>
                    <Text style={styles.whiteText}>Hotel</Text>
                    <Text style={styles.whiteText}>ROOMS-SUITE</Text>
                </View>
                <View style={styles.btns}>
                    <TouchableOpacity style={[styles.btn ,styles.firstBtn]}>
                        <Text style={styles.whiteText}>Contact Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.secondBtn]}>
                        <Text style={styles.whiteText}>Reserve Now</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    homeContent:{
        flex: 1,
      },
    backgroundImage:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homePageInfo:{
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        borderRadius: 25,
        width: Dimensions.get('window').width*(70/100),
        padding: 20,
    },
    whiteText:{
        color: 'white',
        marginBottom: 10,
		textAlign: 'center',
      },
    btns:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    firstBtn:{
        backgroundColor: 'darkslateblue',
    },
    secondBtn:{
        backgroundColor: 'darksalmon',
    },
    btn:{
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
        padding: 5,
        textAlign: 'center',
    }
});