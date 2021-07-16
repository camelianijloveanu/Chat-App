const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBmfd2GQTer0fjTqbfIjz7OTZxvt-YcEvg",
  authDomain: "chatapp-a91bb.firebaseapp.com",
  projectId: "chatapp-a91bb",
  storageBucket: "chatapp-a91bb.appspot.com",
  messagingSenderId: "548450133327",
  appId: "1:548450133327:web:15ffc54bf255be795a113a",
  measurementId: "G-WRG36DN160"
};


// Initialize Firebase
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase
