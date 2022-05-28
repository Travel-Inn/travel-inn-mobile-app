import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import 'firebase/compat/auth';
import apiKeys from './keys';
import { errorToastNotifier, successfulToastNotifier } from "../widgets/toastNotification";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

// Initializing firebase.
let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(apiKeys.firebaseConfig);
}

export default Firebase;


export async function registration(email, password, name, phoneNum) {
  // User registration.
  const db = firebase.firestore();
  // splitting name into first and last name.
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
        phoneNum: phoneNum,
        uid: currentUser.uid,
        gender: "N/A",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return 0;
  } catch (err) {
    errorToastNotifier(err.code,err.message);
    // if (err.code == auth/invalid-email){
    // errorToastNotifier("Error","Invalid Email");
    // } else if (err.code == auth/invalid-password){
    //   errorToastNotifier("Error", "Invalid password. Password should be at least 6 characters.");
    // } else {
    //   errorToastNotifier("Error", "Unexpected error.")
    // }
      return 1;
  }
}

export async function signIn(email, password) {
  // Sign in function 
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      return 0;
  } catch (err) {
    errorToastNotifier(err.code,err.message);
    // if (err.code == auth/invalid-email){
    // errorToastNotifier("Error","Invalid Email");
    // } else if (err.code == auth/invalid-password){
    //   errorToastNotifier("Error", "Invalid password. Password should be at least 6 characters.");
    // } else if (err.code == auth/user-not-found) {
    //   errorToastNotifier("Error", "There is no existing user record corresponding to the provided identifier.");
    // } else {
    //   errorToastNotifier("Error", "Unexpected error.");
    // }
    return 1;
  }
}

export async function passwordReset(email) {
  // Password Reset function.
  try{
    await firebase
    .auth()
    .sendPasswordResetEmail(email);
    return 0;
  } catch(err) {
      errorToastNotifier(err.code,err.message);
  }
}

export async function loggingOut() {
  // Signing out function.
  try {
    await firebase.auth().signOut();
    successfulToastNotifier("Success", "User has signed out.")
  } catch (err) {
      errorToastNotifier(err.code,err.message);
  }
}

export async function bookRoom(roomID, roomName, roomPrice, roomType, inDate, outDate){
  // User booking a room function.
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

  try {
    // update user booked rooms.
    db.collection("Users")
    .doc(currentUser.uid)
    .collection("bookedRooms")
    .add({
      bookedOn: new Date(),
      roomName: roomName,
      roomID: roomID,
      checkInDate:inDate,
      checkOutDate:outDate,
      roomPrice: roomPrice ,
      roomStatus: "pending", 
      roomType: roomType
    });
    return 0;
  } catch(err){
      errorToastNotifier(err.code,err.message);
    return 1;
  }
}
export async function updateUserData(fname,lname,email,number,gender){
  // Updating user data 
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;

  try {
    db.collection("Users")
    .doc(currentUser.uid)
    .update({
      firstName: fname,
      lastName: lname,
      email: email,
      phoneNum: number,
      gender: gender,
      updatedAt: new Date(),
    });
    return 0;
  } catch(err){
      errorToastNotifier(err.code,err.message);
    return 1;
  }

}