import React from 'react';
import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import "firebase/compat/storage";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, LogBox} from 'react-native';
import RestaurantMenu from './restaurantMenu.js';

export default function Menu({navigation}) {
	 const [ breakfastBeverages, setBreakfastBeverages ] = React.useState([]);
	const [breakloop, setBreakloop] = React.useState(false);
	const [image, setImage] = React.useState([]);
	const [firsthalf, setfirst] = React.useState([]);
	const [secondhalf, setsecond] = React.useState([]);
  

	// React.useEffect(()=>{
	// 	firebase.storage().ref('menuImages/breakfast-foods.jpg').getDownloadURL()
	// 	.then(url=>{
	// 		setfirst(firsthalf=>[...firsthalf,url]);
	// 	})
	// 	firebase.storage().ref('menuImages/brunch.jpg').getDownloadURL()
	// 	.then((url)=>{
	// 		setfirst(firsthalf=>[...firsthalf,url]);
	// 		console.log(firsthalf);
	// 	})
	// 	firebase.storage().ref('menuImages/lunch.png').getDownloadURL()
	// 	.then((url)=>{
	// 		setfirst(firsthalf=>[...firsthalf,url]);
	// 		console.log(firsthalf);
	// 	})
	// 	firebase.storage().ref('menuImages/dinner.jpg').getDownloadURL()
	// 	.then((url)=>{
	// 		setsecond(secondhalf=>[...secondhalf,url]);
	// 		console.log(firsthalf);
	// 	})
	// 	firebase.storage().ref('menuImages/dessert.jpg').getDownloadURL()
	// 	.then((url)=>{
	// 		setsecond(secondhalf=>[...secondhalf,url]);
	// 	})
	// 	setfirst(firsthalf.sort());
	// 	console.log(firsthalf);
	// 	setsecond(secondhalf.sort()); 
	// 	setsecond(secondhalf.reverse());
	// },[])

	// React.useEffect(()=>{
	// 	setImage(firsthalf.concat(secondhalf));
	// 	console.log(image);
	// },[firsthalf,secondhalf])


	React.useEffect(()=>{
		LogBox.ignoreLogs(['Setting a timer']);
		const db = firebase.firestore(); 
		
		db.collection('menu').get().then((querysnapshot)=>{
			querysnapshot.forEach(snapshot=>{
				const barray=[];
				const farray=[];
				const menuname= snapshot.data().menuName;
				const menutype= snapshot.data().menuType;
				
				// setBreakfastBeverages(breakfastBeverages=>[...breakfastBeverages,snapshot.data()]);
				if(menuname!="Dessert"){
					db.collection('menu').doc(snapshot.data().menuName).collection('beverages').get().then((querysnapshot)=>{
						querysnapshot.forEach( snapshot=>{
							barray.push(snapshot.data())
						}) 
					});
				}
				db.collection('menu').doc(snapshot.data().menuName).collection('food').get().then((querysnapshot)=>{
					querysnapshot.forEach(snapshot=>{
						farray.push(snapshot.data());
					})
						const object = {menuName: menutype, beverages:barray, food: farray}
						setBreakfastBeverages(breakfastBeverages=>[...breakfastBeverages,object]);
				});
			})
		})
		
	},[breakloop])


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
				<Text style={styles.tabName}>MENU</Text>
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
					breakfastBeverages.map((item, index)=>(
						<ImageBackground  key={index} 
						onLayout={(event) =>{event.target.measure((x,y,width,height,pageX,pageY)=>{setLocs(locs=>[...locs,pageY])})}}
							source={menuTabs[index].image} 
							style={styles.menuContainer} resizeMode="cover" >
							<View style={styles.menuName}>
								<Text style={styles.submenu}>{item.menuName}</Text>
							</View>
							{item.menuName != "Dessert"? <View style={styles.menuItems}>
								<Text style={styles.whiteText}>BEVERAGES</Text>
								<ScrollView contentContainerStyle={styles.menuTable}>
									<View style={{width: "45%"}}>
										{item.beverages.map((beverageItem, index)=>(
										<Text key={index} style={styles.whiteText}>{beverageItem.name}</Text>
										))}
									</View>
									<View style={{width: "45%", borderLeftWidth: 1, borderColor: "white"}}>
										{item.beverages.map((beverageItem, index)=>(
										<Text key={index} style={styles.whiteText}>GHC {Number(beverageItem.price).toFixed(2)}</Text>
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
										<Text key={index} style={styles.whiteText}>GHC {Number(foodItem.price).toFixed(2)}</Text>
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
										<Text key={index} style={styles.whiteText}>GHC {Number(foodItem.price).toFixed(2)}</Text>
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
		width: 150,
		textAlign: 'center',
		borderRadius: 15,
		padding: 10
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