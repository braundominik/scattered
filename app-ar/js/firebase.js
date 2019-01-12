// Initialize Firebase
var config = {
    apiKey: "AIzaSyBzy8dO7sc0d4AaPU3gUjxrySrVV_9uVOM",
    authDomain: "dandelion-firestore.firebaseapp.com",
    databaseURL: "https://dandelion-firestore.firebaseio.com",
    projectId: "dandelion-firestore",
    storageBucket: "dandelion-firestore.appspot.com",
    messagingSenderId: "376810902959"
};
firebase.initializeApp(config);

// Create a root reference
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });