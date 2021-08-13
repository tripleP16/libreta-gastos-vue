import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCYQSXAPB0hMspgH2HP4UnUlbY-cpbXLYw",
    authDomain: "lista-de-gastos-81896.firebaseapp.com",
    projectId: "lista-de-gastos-81896",
    storageBucket: "lista-de-gastos-81896.appspot.com",
    messagingSenderId: "1092787181785",
    appId: "1:1092787181785:web:aab1706aa90821420286c8"
};
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default db;