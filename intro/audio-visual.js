window.addEventListener("load", init);
let someValue;

function init() {
    someValue = document.getElementById("wert");

}

function draw(volume) {
    someValue.innerText = volume;
    console.log(volume);
}