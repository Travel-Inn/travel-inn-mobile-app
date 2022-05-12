import React from 'react';
import firebase from "firebase/compat/app";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import TopBtns from './topBar.js';
import RestaurantMenu from './restaurantMenu.js';

export default function Menu({navigation}) {
	 const [ beverages, setBeverages ] = React.useState('');
  
    // React.useEffect(() => {
    //     async function getBeverages() {
    //         let beveragesValues = await firebase
    //         .firestore()
    //         .collection("Menu")
    //         .doc("Beverages")
    //         .get();

    //         setBeverages(beveragesValues.data());
            
    //      }
    //      getBeverages();
    // })


	const [ref, setRef] = React.useState(null);
	const [loc, setLoc] = React.useState(0);
	const [locs, setLocs] = React.useState([]);
	const scrollHandler=(yloc)=>{
		ref.scrollTo({
			x: 0, 
			y: yloc,
			animated: true,
		});
	}
     const menuTabs = [
        {
            id: "breakfast",
            image: require('../images/breakfast-foods.jpg'),
            name: "Breakfast",
			loc: locs[0]
        }, 
        {
            id: "brunch",
            image: require('../images/brunch.jpg'),
            name: "Brunch",
			loc: locs[1]
        }, 
        {
            id: "lunch",
            image: require('../images/lunch.png'),
            name: "Lunch",
			loc: locs[2]
        }, 
        {
            id: "dinner",
            image: require('../images/dinner.jpg'),
            name: "Dinner",
			loc: locs[3]
        }, 
        {
            id: "dessert",
            image: require('../images/dessert.jpg'),
            name: "Dessert",
			loc: locs[4]
        }
     ]
  return (
    <View style={styles.menuContent} >
		<ScrollView ref={(ref)=>{setRef(ref);}}>
			<ImageBackground source={require("../images/menu.jpg")} resizeMode="cover" style={styles.menuPageInfo}>
				<Text style={styles.tabName}>Menu</Text>
			</ImageBackground>
			<View style={styles.menuList}>
				<ScrollView horizontal={true} contentContainerStyle={styles.menuTabs} showsHorizontalScrollIndicator={false}>
					{
						menuTabs.map((menuTab, index)=>(
							<TouchableOpacity style={styles.menuTab} key={index} onPress={()=>scrollHandler(menuTab.loc)}>
								<View style={styles.menuTabView}><Image source={menuTab.image} resizeMode="cover" style={styles.menuTabImage} /></View>
								<Text>{menuTab.name}</Text>
							</TouchableOpacity>
						))
					}
				</ScrollView>
				{
					RestaurantMenu.map((item, index)=>(
						<ImageBackground  key={index} 
						// onLayout={(event) =>{event.target.measure((x,y,width,height,pageX,pageY)=>{setLocs(locs=>[...locs,pageY])})}}
							source={item.image} 
							style={styles.menuContainer} resizeMode="cover" >
							<View style={styles.menuName}>
								<Text style={styles.submenu}>{item.menuName}</Text>
							</View>
							{item.menuName != "DESSERT"? <View style={styles.menuItems}>
								<Text style={styles.whiteText}>BEVERAGES</Text>
								<ScrollView contentContainerStyle={styles.menuTable}>
									<View style={{width: "45%"}}>
										{item.beverages.map((beverageItem, index)=>(
										<Text key={index} style={styles.whiteText}>{beverageItem.name}</Text>
										))}
									</View>
									<View style={{width: "45%", borderLeftWidth: 1, borderColor: "white"}}>
										{item.beverages.map((beverageItem, index)=>(
										<Text key={index} style={styles.whiteText}>{beverages.Tea}</Text>
										))}
									</View>
								</ScrollView>
								
								<Text style={styles.whiteText}>FOOD</Text>
								<ScrollView contentContainerStyle={styles.menuTable}>
									<View style={{width: "45%"}}>
										{item.food.map((foodItem, index)=>(
										<Text key={index} style={styles.whiteText}>{foodItem.name}</Text>
										))}
									</View>
									<View style={{width: "45%", borderLeftWidth: 1, borderColor: "white"}}>
										{item.food.map((foodItem, index)=>(
										<Text key={index} style={styles.whiteText}>{foodItem.price}</Text>
										))}
									</View>
								</ScrollView></View>:
							<View style={styles.menuItems}><Text style={styles.whiteText}>TREATS</Text>
								<ScrollView contentContainerStyle={styles.menuTable}>
									<View style={{width: "45%"}}>
										{item.food.map((foodItem, index)=>(
										<Text key={index} style={styles.whiteText}>{foodItem.name}</Text>
										))}
									</View>
									<View style={{width: "45%", borderLeftWidth: 1, borderColor: "white"}}>
										{item.food.map((foodItem, index)=>(
										<Text key={index} style={styles.whiteText}>{foodItem.price}</Text>
										))}
									</View>
							</ScrollView></View>}
						</ImageBackground>
					))
				}
			</View>
		</ScrollView>
	</View>
  );
}

const styles = StyleSheet.create({
	menuContent:{
	 flex: 1,
	},
	tabName:{
		backgroundColor: 'rgba(0,0,0, 0.7)',
		color: 'white',
		width: 100,
		textAlign: 'center',
		borderRadius: 25,
	},
	menuPageInfo: {
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'rgba(0,0,0, 0.7)',
		borderRadius: 25,
		justifyContent: 'center',
		height: Dimensions.get('screen').height*(3/4),
		alignItems: 'center',
		padding: 20,
		marginBottom: 10,
  },
  menuList:{
    backgroundColor: 'white',
    padding: 10,
  },
  menuTabs:{
    padding: 10,
	flexDirection: 'row',
	justifyContent: 'space-between',
  },
  menuTab:{
	backgroundColor: 'transparent',
	alignItems: 'center',
	marginRight: 15,
	borderStyle: 'solid',
  },
  menuTabView:{
    borderRadius: 105,
	width: 105,
	height: 105,
	borderColor: "red",
	justifyContent: "center",
	alignItems: "center",
	elevation: 4,
	shadowColor: 'green',
	shadowOpacity: 1.8,
},
  menuTabImage:{
    borderRadius: 100,
	width: 100,
	height: 100,
	borderColor: 'transparent',
  },
  menuContainer:{
    borderRadius: 25,
    marginBottom: 20,
    padding: 10,
    height: 330,
	justifyContent: 'space-around',
  },
  menuName:{
    color: 'white',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    borderRadius: 25,
    padding: 3,
	width: "80%",
	marginLeft: 'auto',
	marginRight: 'auto',
  },
  menuItems:{
    backgroundColor: 'rgba(0,0,0, 0.7)',
    borderRadius: 25,
    padding: 15,
	justifyContent: 'center',
	alignItems: 'center'
  },
  submenu:{
	  color: 'white',
	  textAlign: 'center',
	  padding: 8,
  },
  whiteText:{
	  color: 'white',
	  paddingLeft: 10,
	  padding: 5,
  },
    column: {
		color: 'white',
		borderRightWidth: 1,
		borderColor: 'white',
		paddingLeft: 5,
    },
	menuTable:{
		flexDirection: 'row',
		justifyContent: 'center'
	}
});