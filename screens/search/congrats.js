import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';

export default function Congratulation({navigation}){

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../../images/congrat.jpg")} style ={styles.screenImage}>
                <View style={styles.congratView}>
                    <Text style={styles.congratText}>CONGRATULATIONS</Text>
                    <Text style={styles.info}>YOUR BOOKING WAS SUCCESSFULLY COMPLETED</Text>
                </View>
                <View style={{bottom: 10, position: 'absolute'}}>
                    <Text style={{color: 'white'}}>TAP ANYWHERE TO CONTINUE</Text>
                </View>
            </ImageBackground>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('Booking')}><View 
            style={styles.clickAnywhere}>
            </View></TouchableWithoutFeedback>
        </View>

    )
}

const fullHeight = Dimensions.get('screen').height;
const fullWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    screenImage:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    congratView:{
        padding: 10,
        paddingTop: 70,
        paddingBottom: 70,
        backgroundColor: 'rgba(0,0,0, 0.7)',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 30
    },
    congratText:{
        fontSize: 20,
        color: 'white',
    },
    info:{
        color: 'white'
    },
    clickAnywhere:{
        opacity: 0,
        position: 'absolute', 
        width: fullWidth, 
        height: fullHeight,
        zIndex: 2
    }
})