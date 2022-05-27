import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import 'firebase/compat/auth';
import apiKeys from './keys';


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
        roomName: "",
        numberOfNights: 0,
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

export async function bookRoom(nights,roomID, roomName, inDate, outDate){
  // User booking a room function.
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

  try {
    // Update user data with room name.
    db.collection("Users")
    .doc(currentUser.uid)
    .update({
      checkIn: true,
      numberOfNights: nights,
      roomName: roomName
    });
    // update room data.
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
    });
    console.log("User Details have been updated successfully.")
    return 0;
  } catch(err){
    console.log("Error while updating user details.", err.message);
    return 1;
  }

}