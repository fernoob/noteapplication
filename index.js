import { registerRootComponent } from 'expo';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD8xhH6EYGTCBFxfXk_ELLIw8b9e4_wMdo",
    authDomain: "noteapplicati.firebaseapp.com",
    projectId: "noteapplicati",
    storageBucket: "noteapplicati.appspot.com",
    messagingSenderId: "683324323180",
    appId: "1:683324323180:web:51788f0b08f6b2fffeef49"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
