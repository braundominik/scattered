window.addEventListener("load", init);



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
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });


function init() {

    let seedAmount;
    let button = document.getElementById("plant");
    button.addEventListener("click", plantFlower);

    //LOCATION


    //FIRESTORE

    //const dandList = document.getElementById("dand-list");

    //create element and render to dom
    /*     function renderDandelion(doc) {
            let li = document.createElement("li");
            let name = document.createElement("span");
            let city = document.createElement("span");
    
            li.setAttribute("data-id", doc.id);
            name.textContent = doc.data().name;
            city.textContent = doc.data().city;
    
            li.appendChild(name);
            li.appendChild(city);
            dandList.appendChild(li);
        }
        */

    /* db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id);
            if(doc.data().img == "sasa"){
                db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").doc(doc.id).update({
                    img: ""
                })
            }
        })
    }) */

    db.collection("dandelions").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
        })
    })


    function plantFlower() {
        seedAmount = 10 + (Math.floor(Math.random() * 40));
        console.log(seedAmount);

        db.collection("dandelions").add({
            owner: "matthias",
            seeds: seedAmount
        })
            .then((docRef) => {
                for (let i = 0; i < seedAmount; i++) {
                    db.collection("dandelions").doc(docRef.id).collection("seeds").add({
                        img: "",
                        loc: new firebase.firestore.GeoPoint(45,8)
                    })
                }
            })

    }
}