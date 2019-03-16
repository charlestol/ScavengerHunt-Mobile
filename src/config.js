import firebase from 'firebase';  
require("firebase/firestore");

let config = {  
    apiKey: "AIzaSyB_BOnrLIbOsgFf2U84pOXYJagwGPltLaM",
    authDomain: "cziscavengerhunt.firebaseapp.com",
    databaseURL: "https://cziscavengerhunt.firebaseio.com",
    projectId: "cziscavengerhunt",
    storageBucket: "cziscavengerhunt.appspot.com",
    messagingSenderId: "812384034022"
};
firebase.initializeApp(config);

export const db = firebase.firestore();