import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Login({navigation}){
    return(
		<View style={styles.container}>
			<View style={styles.mainView}><Text onPress={()=>navigation.navigate("Drawer")}>Login</Text></View>
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