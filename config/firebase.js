import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import {Alert} from "react-native";


export async function registration(email, password, name) {
  const db = firebase.firestore();
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log("User has created an account")

    db.collection("Users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        name: name,
        checkIn: false,
        checkInDate: null,
        checkOutDate: null,
      });
      console.log("User details have been stored successfully")
      return 1;
  } catch (err) {
    console.log("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      console.log("User has been signed in")
  } catch (err) {
    console.log("There is something wrong!", err.message);
  }
}

export async function passwordReset(email) {
  try{
    await firebase
    .auth()
    .sendPasswordResetEmail(email);
    console.log("Password has been resetted")
  } catch(err) {
    console.log("There is something wrong", error.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
    navigation.navigate('Login');
    console.log("User has been signed out")
  } catch (err) {
    console.log('There is something wrong!', err.message);
  }
}
