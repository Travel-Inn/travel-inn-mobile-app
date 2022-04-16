import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeeIcon from 'react-native-vector-icons/FontAwesome5';

export default function TopBtns(props){
	return(
		<View style={styles.topBtns}>
			<TouchableOpacity onPress={props.touchAction} style={styles.leftBtn}>
				<AwesomeIcon name="align-justify" size={25} color='black' />
			</TouchableOpacity>
			<TouchableOpacity style={styles.rightBtn}>
				<AwesomeeIcon name="user-circle" size={25} color='black' />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	topBtns:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 10,
		marginRight: 0,
		marginTop: 10,
		position: 'absolute',
		zIndex: 1,
		width: Dimensions.get('screen').width-25,
		justifyContent: 'space-between',
	},
	leftBtn:{
		backgroundColor: "white",
		padding: 4,
		borderRadius: 12,
	},
	rightBtn:{
		backgroundColor: "white",
		padding: 4,
		borderRadius: 12,
	},
});