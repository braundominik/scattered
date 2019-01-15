window.addEventListener("load", init);
let gallery = document.querySelector(".gallery");
let mainScreen = document.querySelector(".mainScreen");

function init() {
    //buildGallery("OTZmsX1i98PH6bHlHG3x");
    //showGallery();
}


function showGallery() {
    unloadOverview();
    gallery.style.display = "grid";
}

function unloadGallery() {
    gallery.style.display = "none";
}

function buildGallery(key) {
    showGallery();
    let height = mainScreen.clientHeight;
    gallery.style.height = height + "px";
    gallery.innerHTML = "";
    //create Gallery Items and load Images
    db.collection("dandelions").doc(key).collection("seeds").get().then((snapshot) => {
        let totalItems = snapshot.size;
        console.log(totalItems);
        snapshot.docs.forEach(doc => {
            /* if (doc.data().img == "") { */
                totalItems--;
                console.log(doc.data().img);
                let div = document.createElement("div");
                div.className = "gallery-item";
                div.setAttribute("style", "--aspect-ratio: 1/1;");
                if (doc.data().active) {
                    div.style.backgroundImage = "url(marker/" + doc.data().marker + ")";
                }
                if (!doc.data().active) {
                    div.style.backgroundImage = "url(" + doc.data().img + ")";
                }
                gallery.appendChild(div);
            /* } */
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