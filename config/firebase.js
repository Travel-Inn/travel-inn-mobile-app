import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import 'firebase/compat/auth';
import apiKeys from './keys';
import {GoogleAuthProvider, getAuth} from 'firebase/compat/auth';
import {GoogleSignin,GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';

// Initializing firebase.
let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(apiKeys.firebaseConfig);
}

export default Firebase;

GoogleSignin.configure({
  webClientId: "208360428593-1874986b299e2ou9laon0v52jtmai5vu.apps.googleusercontent.com",
});

export async function googleSignIn() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return firebase.auth().signInWithCredential(googleCredential);
  
};

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
      console.log("User details have been stored successfully")
      return 0;
  } catch (err) {
    console.log("There is something wrong!!!!", err.message);
      return 1;
  }
}

export async function signIn(email, password) {
  // Sign in function 
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
  // Password Reset function.
  try{
    await firebase
    .auth()
    .sendPasswordResetEmail(email);
    console.log("Password reset link has been sent")
    return 0;
  } catch(err) {
    console.log("There is something wrong", err.message);
  }
}

export async function loggingOut() {
  // Signing out function.
  try {
    await firebase.auth().signOut();
    console.log("User has been signed out")
  } catch (err) {
    console.log('There is something wrong!', err.message);
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
    console.log("User and Room Details have been updated successfully.")
    return 0;
  } catch(err){
    console.log("Error while updating user and room details.", err.message);
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
    console.log("User Details have been updated successfully.")
    return 0;
  } catch(err){
    console.log("Error while updating user details.", err.message);
    return 1;
  }

}