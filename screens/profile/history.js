import React from 'react';
import { BackHandler,Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HistoryScreen({navigation}) {

    const rooms =[
		{
			name: 'Single Room',
			num: "A312",
			booked: "23 May 2022",
			description: 'Single Room With single Bed',
			price: 250.00,
			image: require("../../images/booking-room1.jpg")
		},
		{
			name: 'Twin-Bed Room',
			num: "A313",
			booked: "24 May 2022",
			description: 'Single Room With Twin Beds',
			price: 300.00,
			image: require("../../images/booking-room2.jpg")
		},
		{
			name: 'Double Room',
			num: "B310",
			booked: "25 May 2022",
			description: 'Single Room With Double Bed',
			price: 350.00,
			image: require("../../images/booking-room3.jpg")
		},

	]

  return(
    <View style={styles.container} >
		<ScrollView>
			<ImageBackground source={require("../../images/contact.jpg")} resizeMode="cover" style={styles.pageImage}>
				<Text style={styles.screenName}>HISTORY</Text>
			</ImageBackground>
			<View style={styles.content}>
				<View style={styles.sort}>
					<Text style={{color: 'white'}}>Sort by Recent</Text>
					<TouchableOpacity>
						<Icon name="chevron-up" size={10} color="black" style={styles.icon} />
					</TouchableOpacity>
				</View>
            {
                rooms.length==0?
				<View style={{height: Dimensions.get('screen').height*0.4, justifyContent: 'center'}}>
					<Text style={styles.nothing}>Nothing to See Here</Text>
				</View>
				:
				rooms.map((item,index)=>{
					return <View key={index}  style={styles.room}>
                                <Image source={item.image} 
								style={{flex: 2, maxHeight: "100%", borderRadius: 8}} />
                                <View style={{flex: 4, justifyContent: 'space-around', paddingLeft: 15}}>
                                    <Text style={styles.roominfo}>{item.name}</Text>
                                    <Text style={styles.roominfo}>Room no. {item.num}</Text>
									<Text style={styles.roominfo}>Booked on: {item.booked}</Text>
                                    <Text style={{color: 'orange', fontWeight: 'bold'}}>GHC {item.price.toFixed(2)}</Text>
                                </View>
                            </View>
                })
            }
			</View>
			<TouchableOpacity style={styles.backbtn} onPress={()=>navigation.goBack()}>
				<Text>Back</Text>
			</TouchableOpacity>
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
	room:{
		width: Dimensions.get('screen').width*0.85,
		flexDirection: 'row',
		height: Dimensions.get('screen').height*0.15,
		borderColor: 'white',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		padding: 10
	},
	icon:{
		backgroundColor: 'grey',
		padding: 5,
		width: 30,
		textAlign: 'center',
		borderRadius: 10
	},
	roominfo:{
		color: 'white'
	},
	sort: {
		flexDirection: 'row', 
		width: "40%", 
		justifyContent: 'space-between', 
		alignSelf: 'flex-end',
		marginRight: 10,
		marginBottom: 10
	},
	backbtn:{
		backgroundColor: 'white',
		width: Dimensions.get('screen').width*0.4,
		borderRadius: 15,
		padding: 8,
		textAlign: 'center',
		alignSelf: 'center'
	},
	nothing:{
		fontSize: 25, 
		color: "grey",
		textAlign: 'center',
	}
});