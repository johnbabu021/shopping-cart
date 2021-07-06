import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyDqBepHTNSPEUiJjCFTJyNSM54e-OHbxtY",
    authDomain: "shoppingcart-7f922.firebaseapp.com",
    projectId: "shoppingcart-7f922",
    storageBucket: "shoppingcart-7f922.appspot.com",
    messagingSenderId: "852473201183",
    appId: "1:852473201183:web:12fb4311e3057d40320b2a",
    measurementId: "G-3X56WP12T4"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore;
export { firebase, FieldValue }