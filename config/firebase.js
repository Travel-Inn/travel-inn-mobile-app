import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {Alert} from "react-native";

export async function registration(email, password, name) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        name: name,
      });
      navigation.navigate('Drawer');
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      navigation.navigate('Drawer');
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}