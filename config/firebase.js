import firebase from "firebase/compat/app";
import  "firebase/compat/firestore";
import 'firebase/compat/auth';
import apiKeys from './keys'


let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(apiKeys.firebaseConfig);
}

export default Firebase;

export async function registration(email, password, name, phoneNum) {
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
        gender: null,
        phoneNum: phoneNum,

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

export async function searchRoom(minPrice, maxPrice, bedNum) {
  // Changing string-number to number and changes string-letters to empty values
  bedNum = Number(bedNum);
  minPrice = Number(minPrice);
  maxPrice = Number(maxPrice);
  var roomList = [];

  // Checks
  if (!minPrice){
    console.log("Minimum price cannot be empty.");
    return 1
  } else if (!maxPrice){
      console.log("Maximum price cannot be empty.");
      return 1
    }
    else if (!bedNum){
      console.log("Bed number cannot be empty.");
      return 1
    }
    else console.log("Passed all checks");
  

  const db = firebase.firestore();
  db.collection("Rooms").where("isRoomAvailable", "==", true)
  .where("bedNum", "==", bedNum).where("roomPrice", ">", minPrice)
  .where("roomPrice", "<", maxPrice)
      .get()
      .then((querySnapshot) => {
        if(querySnapshot.empty){
          console.log("No rooms available");
          return 1;
        }else{         
           querySnapshot.forEach((doc) => {
            roomList.push(doc.data());
          });
          console.log(roomList);
          return roomList;    
        }
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  
}

// export async function getRoomDetails(roomID){
//   const db = firebase.firestore();
//   db.collections("Rooms").doc(roomID)
//   .get()
//   .then((doc) => {
//     if (doc.exists){
//       console.log("Document data: ", doc.data());
//       return doc.data();
//     } else {
//       console.log("No such document exists.");
//     }
//   }).catch((error) => {
//     console.log("Error getting document:", error);
// });
// }