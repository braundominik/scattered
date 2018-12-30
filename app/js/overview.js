window.addEventListener("load", init);
let overview = document.querySelector(".ovwrapper");

function init() {
}

function buildOverview() {
    overview.innerHTML = "";
    let height = mainScreen.clientHeight;
    overview.style.height = height + "px";
    db.collection("dandelions").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            let div = document.createElement("div");
            div.className = "ovlist";
            div.textContent = doc.id;
            div.addEventListener("click", e => buildGallery(doc.id))
            overview.appendChild(div);
        })
    })
}