import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB5QGV8bX9X-CUFoSIvNP6jE_MIDgkJ1as",
    authDomain: "attendence-app-a8da9.firebaseapp.com",
    projectId: "attendence-app-a8da9",
    storageBucket: "attendence-app-a8da9.appspot.com",
    messagingSenderId: "1025324017250",
    appId: "1:1025324017250:web:480e9134b40a3c7f23933b"
  };
  // Initialize Firebase
  
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()