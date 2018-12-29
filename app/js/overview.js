window.addEventListener("load", init);
let overview = document.querySelector(".ovwrapper");

function init() {
}


function showOverview() {
    let height = mainScreen.clientHeight;
    overview.style.height = height + "px";
    overview.style.display = "grid";
}