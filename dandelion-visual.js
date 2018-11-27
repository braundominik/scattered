var volumeTest;
(function (volumeTest) {
    window.addEventListener("load", init);
    let crc;
    let canvas;
    let someValue;
    let progress = 0.5;
    function init() {
        canvas = document.getElementById("flower");
        crc = canvas.getContext("2d");
        someValue = document.getElementById("wert");
        //animate();
    }
    /* function animate(): void {
        draw();
        setTimeout(animate, 100);
    } */
    function draw(volume) {
        crc.fillStyle = "white";
        crc.fillRect(0, 0, canvas.width, canvas.height);
        crc.strokeStyle = "black";
        crc.lineWidth = 20;
        crc.beginPath();
        if (volume > 0.001) {
            progress = progress + 0.005;
        }
        crc.arc(200, 200, 100, progress * Math.PI, 2.5 * Math.PI);
        crc.stroke();
        someValue.innerText = volume;
        console.log(volume);
    }
    volumeTest.draw = draw;
})(volumeTest || (volumeTest = {}));
//# sourceMappingURL=dandelion-visual.js.map