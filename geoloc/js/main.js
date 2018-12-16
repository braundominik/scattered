window.addEventListener("load", init);

function init() {
    let pos = document.getElementById("pos");
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        console.log(position);
        getSquareCorners(position);
        pos.innerText = position.coords.latitude + ", " + position.coords.longitude;
    }

    function getSquareCorners(pos){
        
    }

    getLocation();
}