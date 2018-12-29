window.addEventListener("load", init);
let gallery = document.querySelector(".gallery");
let mainScreen = document.querySelector(".mainScreen");

function init() {
    buildGallery();
    //showGallery();
}


function showGallery() {
    let height = mainScreen.clientHeight;
    gallery.style.height = height + "px";
    gallery.style.display = "grid";
}

function buildGallery() {

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