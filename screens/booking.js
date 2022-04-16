import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TopBtns from './topBar.js';

export default function Booking({navigation}){
    return(
        <View style={styles.container}>
			<TopBtns touchAction={navigation.openDrawer}/>
			<View style={styles.mainView}><Text>Booking</Text></View>
		</View>
    );
}

const styles = StyleSheet.create({
	container:{
		backgroundColor: 'orange',
		flex: 1,
	},
	mainView:{
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});