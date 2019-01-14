window.addEventListener("load", init);
let overview = document.querySelector(".ovwrapper");

function init() {
}

function buildOverview() {
    //overview.innerHTML = "";
    let height = mainScreen.clientHeight;
    overview.style.height = height + "px";


    /* db.collection("dandelions").where("owner", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function (querySnapshot) {
            let x = 0;
            querySnapshot.forEach(function (doc) {
                x++;
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let div = document.createElement("div");
                div.className = "ovlist";
                div.textContent = "Flower " + x;
                div.addEventListener("click", e => buildGallery(doc.id))
                overview.appendChild(div);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        }); */


    db.collection("dandelions").where("owner", "==", firebase.auth().currentUser.uid)
        .onSnapshot(function (querySnapshot) {
            let x = 0;
            while (overview.lastElementChild != overview.firstElementChild) {
                overview.removeChild(overview.lastElementChild);
            }
            querySnapshot.forEach(function (doc) {
                x++;
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let div = document.createElement("div");
                div.className = "ovlist";
                div.textContent = "Flower " + x;
                div.addEventListener("click", e => buildGallery(doc.id))
                overview.appendChild(div);
            });
        })



    /* db.collection("dandelions").get().then((snapshot) => {
        console.log(snapshot);
        snapshot.docs.forEach(doc => {
            let div = document.createElement("div");
            div.className = "ovlist";
            div.textContent = doc.id;
            div.addEventListener("click", e => buildGallery(doc.id))
            overview.appendChild(div);
        })
    }) */
}



