window.addEventListener("load", init);
let db;

function init() {

    var config = {
        apiKey: "AIzaSyBzy8dO7sc0d4AaPU3gUjxrySrVV_9uVOM",
        authDomain: "dandelion-firestore.firebaseapp.com",
        databaseURL: "https://dandelion-firestore.firebaseio.com",
        projectId: "dandelion-firestore",
        storageBucket: "dandelion-firestore.appspot.com",
        messagingSenderId: "376810902959"
    };
    firebase.initializeApp(config);

    db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    showGallery();
}


function showGallery() {
    let gallery = document.querySelector(".gallery");
    let mainScreen = document.querySelector(".mainScreen");
    let height = mainScreen.clientHeight;
    gallery.style.height = height + "px";
    gallery.style.display = "grid";

    //create Gallery Items and load Images
    db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").get().then((snapshot) => {
        let totalItems = snapshot.size;
        snapshot.docs.forEach(doc => {
            if (doc.data().img != "") {
                totalItems--;
                console.log(doc.data().img);
                let div = document.createElement("div");
                div.className = "gallery-item";
                div.setAttribute("style", "--aspect-ratio: 1/1;");
                div.style.backgroundImage = "url(" + doc.data().img + ")"
                gallery.appendChild(div);
            }
        })

        for (let i = 0; i < totalItems; i++) {
            let div = document.createElement("div");
            div.className = "gallery-item";
            div.setAttribute("style", "--aspect-ratio: 1/1;");
            gallery.appendChild(div);
        }
    })

}



function loadImagesinGallery() {


}