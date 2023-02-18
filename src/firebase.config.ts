/*eslint-disable*/
const config = {
    apiKey: "AIzaSyBOR8gYahAu4ybvNUWNSQWWPPSHAA24yOw",
    authDomain: "board-game-ed9b2.firebaseapp.com",
    databaseURL: "https://board-game-ed9b2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "board-game-ed9b2",
    storageBucket: "board-game-ed9b2.appspot.com",
    messagingSenderId: "456509633169",
    appId: "1:456509633169:web:d1bf5c08beaadcac494530"
}

export default function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
}
