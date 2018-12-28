window.addEventListener("load", init);

function init() {
    showGallery();
}


function showGallery() {
    let gallery = document.querySelector(".gallery");
    let mainScreen = document.querySelector(".mainScreen");
    let height = mainScreen.clientHeight;
    gallery.style.height = height + "px";
    gallery.style.display = "grid";
}