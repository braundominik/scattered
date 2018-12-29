window.addEventListener("load", init);
let video = null;
let settingsWrapElement = null;
let loginWrapElement = null;

function init() {
    let cameraButton = document.querySelector(".menu1");
    let galleryButton = document.querySelector(".menu2");
    let settingsButton = document.querySelector(".menu3");

    let cameraWrapElement = document.querySelector(".camera-wrap");
    settingsWrapElement = document.querySelector(".settingsWrapper");
    loginWrapElement = document.querySelector(".loginWrap");
    video = document.getElementById('takephoto-video');

    cameraButton.addEventListener("click", loadCamera);
    galleryButton.addEventListener("click", loadOverview);
    settingsButton.addEventListener("click", loadSettings);

    function loadCamera() {

        /* Unloading other UI Elements */
        unloadSettings();
        unloadOverview();
        unloadLogin();

        /* Loading Camera */
        startup();
        cameraWrapElement.style.display = "block";

        /* Junk Code */
        //video.srcObject.getTracks()[0].start();
        //get Camera Wrapper Element
        //Get display property Style from CSS File
        //let cameraWrapStyle = getComputedStyle(cameraWrapElement).display;

    }

    function unloadCamera() {
        if (video.srcObject != null) {
            cameraWrapElement.style.display = "none";
            video.srcObject.getTracks()[0].stop();
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

    function loadSettings() {

        /* Unloading other UI Elements */
        unloadLogin()
        unloadOverview();
        unloadCamera();

        /* Loading Settings */
        settingsWrapElement.style.display = "block";

    }


}

function unloadSettings() {
    settingsWrapElement.style.display = "none";
}

function unloadLogin() {
    loginWrapElement.style.display = "none";
}

function loadLogin() {
    loginWrapElement.style.display = "flex";
}