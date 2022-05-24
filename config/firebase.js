import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import 'firebase/compat/auth';
import apiKeys from './keys';

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(apiKeys.firebaseConfig);
}

export default Firebase;


export async function registration(email, password, name, phoneNum) {
  const db = firebase.firestore();
  const firstName = name.split(' ').slice(0, -1).join(' ');
  const lastName = name.split(' ').slice(-1).join(' ');

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log("User has created an account")

    db.collection("Users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        firstName: firstName,
        lastName: lastName,
        checkIn: false,
        roomName: "",
        numberOfNights: 0,
        phoneNum: phoneNum,
        uid: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("User details have been stored successfully")
      return 0;
  } catch (err) {
    console.log("There is something wrong!!!!", err.message);
      return 1;
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      console.log("User has been signed in")
      return 0;
  } catch (err) {
    console.log("There is something wrong!", err.message);
    return 1;
  }
}

export async function passwordReset(email) {
  try{
    await firebase
    .auth()
    .sendPasswordResetEmail(email);
    console.log("Password reset link has been sent")
  } catch(err) {
    console.log("There is something wrong", error.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
    console.log("User has been signed out")
  } catch (err) {
    console.log('There is something wrong!', err.message);
  }
}

export async function bookRoom(nights,roomID, roomName, inDate, outDate){
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

  try {
    db.collection("Users")
    .doc(currentUser.uid)
    .update({
      checkIn: true,
      numberOfNights: nights,
      roomName: roomName
    });
    db.collection("Rooms")
    .doc(roomID)
    .update({
      checkInDate:inDate,
      checkOutDate:outDate,
      isRoomAvailable: false,
    })
    console.log("User and Room Details have been updated successfully.")
    return 0;
  } catch(err){
    console.log("Unexpected error.", err.message);
    return 1;
  }
}