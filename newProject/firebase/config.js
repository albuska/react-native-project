import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAq4EKEqhWUQ2WyWD0esDx9Cr90EMA_ztk",
  authDomain: "react-native-project-5964c.firebaseapp.com",
  projectId: "react-native-project-5964c",
  storageBucket: "react-native-project-5964c.appspot.com",
  messagingSenderId: "608536352983",
  appId: "1:608536352983:web:b1359beb43c2594bdf7892",
  measurementId: "G-TXW6S2WQX4",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
