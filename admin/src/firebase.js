import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB-kHwnvOyf0THwYq5pRSG0oWXEHThYN6k",
    authDomain: "netflix-8a1d5.firebaseapp.com",
    projectId: "netflix-8a1d5",
    storageBucket: "netflix-8a1d5.appspot.com",
    messagingSenderId: "414740269964",
    appId: "1:414740269964:web:d6a37cf036b6981249a4a9",
    measurementId: "G-5G8LGFJ4GC"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;