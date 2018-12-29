window.addEventListener("load", init);
let overview = document.querySelector(".ovwrapper");

function init() {
    buildOverview();
}


function buildOverview() {
    let height = mainScreen.clientHeight;
    overview.style.height = height + "px";
}