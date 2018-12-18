window.addEventListener("load", init);
let someValue;
let soundValue;
let soundReady = false;

function init() {
    someValue = document.getElementById("wert");

}

function draw(volume) {
    soundValue = volume;
    someValue.innerText = volume;
    //console.log(volume);
}