//window.addEventListener("load", init);
let video = null;
let settingsWrapElement = null;
let loginWrapElement = null;
let warning = null;

//function init() {
let cameraButton = document.querySelector(".menu1");
let galleryButton = document.querySelector(".menu2");
let settingsButton = document.querySelector(".menu3");

let cameraWrapElement = document.querySelector(".camera-wrap");
settingsWrapElement = document.querySelector(".settingsWrapper");
loginWrapElement = document.querySelector(".loginWrap");
locWrapElement = document.querySelector(".locwrapper");
video = document.getElementById('takephoto-video');
warning = document.querySelector(".warning");
let flash = document.querySelector(".flash");
flash.hidden = true;
warning.style.visibility = "hidden";

cameraButton.addEventListener("click", loadLoc);
galleryButton.addEventListener("click", loadOverview);
settingsButton.addEventListener("click", loadSettings);
cameraWrapElement.addEventListener("click", shootPic);
locWrapElement.addEventListener("click",loadCamera);

function shootPic() {
    flash.hidden = false;
    //flash.animate({ opacity: 0.5 }, 300)
    var flashanim = flash.animate([
        // keyframes
        { opacity: 0.0 },
        { opacity: 1 },
        { opacity: 0.0 },

    ], {
            // timing options
            duration: 500,
            iterations: 1
        });

    flashanim.onfinish = function () {
        flash.hidden = true;
    }
    takepicture();
}

function loadCamera() {

    /* Unloading other UI Elements */
    unloadSettings();
    unloadOverview();
    unloadLogin();
    unloadLoc();

    /* Loading Camera */
    startup()


    cameraWrapElement.style.display = "block";

    /* Junk Code */
    //video.srcObject.getTracks()[0].start();
    //get Camera Wrapper Element
    //Get display property Style from CSS File
    //let cameraWrapStyle = getComputedStyle(cameraWrapElement).display;

}

function unloadCamera() {
    if (video.srcObject != null) {
        /* console.log(video);
        console.log(video.srcObject);
        console.log(video.srcObject.getTracks()); */
        cameraWrapElement.style.display = "none";
        console.log(allMediaStreams);
        allMediaStreams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
        allMediaStreams = [];
        console.log(allMediaStreams);
        /* video.srcObject.getTracks()[0].stop(); */
        video.srcObject = null;
    }

    else {
        cameraWrapElement.style.display = "none";
    }
}

function loadOverview() {

    /* Unloading other UI Elements */
    unloadSettings();
    unloadCamera();
    unloadLogin();
    unloadLoc();

    /* Loading Overview */
    overview.style.display = "grid";

    /* Junk Code */
    //Get last part of path eg.: camera.html
    /* let originURL = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    if (originURL == "camera.html") {
        window.location = "index.html"
    } */
}

function unloadOverview() {
    overview.style.display = "none";
}




//}

function loadSettings() {

    /* Unloading other UI Elements */
    unloadLogin()
    unloadOverview();
    unloadCamera();
    unloadLoc();

    /* Loading Settings */
    settingsWrapElement.style.display = "block";

}

function unloadSettings() {
    settingsWrapElement.style.display = "none";
}

function unloadLogin() {
    warning.style.visibility = "visible";
    loginWrapElement.style.display = "none";
}

function loadLogin() {
    warning.style.visibility = "hidden";
    loginWrapElement.style.display = "flex";
}

function loadLoc() {
    unloadSettings();
    unloadOverview();
    unloadLogin();
    unloadCamera();

    locWrapElement.style.display = "block";

}

function unloadLoc(){
    locWrapElement.style.display = "none";
}