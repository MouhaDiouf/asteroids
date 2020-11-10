import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAq9V6Gy7duilCLN13_FXNWay9XR8oP9jY',
  authDomain: 'asteroids-9f05a.firebaseapp.com',
  databaseURL: 'https://asteroids-9f05a.firebaseio.com',
  projectId: 'asteroids-9f05a',
  storageBucket: 'asteroids-9f05a.appspot.com',
  messagingSenderId: '274721845624',
  appId: '1:274721845624:web:3764377d9cad2829e1588d',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
