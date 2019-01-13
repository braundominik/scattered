//window.addEventListener("load", init);
let video = null;
let settingsWrapElement = null;
let loginWrapElement = null;
let warning = null;

//function init() {
let cameraButton = document.querySelector(".menu1");
let galleryButton = document.querySelector(".menu2");
let settingsButton = document.querySelector(".menu3");
let introVideo = document.getElementById("intro_video");
let animElement = document.getElementById("animation");

let menuWrapperElement = document.querySelector(".menuWrapper");
let cameraWrapElement = document.querySelector(".camera-wrap");
settingsWrapElement = document.querySelector(".settingsWrapper");
loginWrapElement = document.querySelector(".loginWrap");
locWrapElement = document.querySelector(".locwrapper");
video = document.getElementById('takephoto-video');
warning = document.querySelector(".warning");
let flash = document.querySelector(".flash");
flash.hidden = true;
warning.style.visibility = "hidden";
menuWrapperElement.style.visibility = "hidden";


cameraButton.addEventListener("click", loadLoc);
galleryButton.addEventListener("click", loadOverview);
settingsButton.addEventListener("click", loadSettings);
introVideo.addEventListener("ended", function () {
    document.querySelector(".start_video").style.display = "none";
})
/* cameraWrapElement.addEventListener("click", shootPic);
locWrapElement.addEventListener("click",shootPic); */

dandelionAnim = bodymovin.loadAnimation({
    container: document.getElementById("animation"), // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'data.json' // the path to the animation json
})

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
    unloadGallery();

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
    unloadGallery();

    /* Loading Overview */
    overview.style.display = "grid";
    console.log(galleryButton);
    galleryButton.firstElementChild.style.opacity = "1";

    /* Junk Code */
    //Get last part of path eg.: camera.html
    /* let originURL = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    if (originURL == "camera.html") {
        window.location = "index.html"
    } */
}

function unloadOverview() {
    overview.style.display = "none";
    galleryButton.firstElementChild.style.opacity = "0.5";
}




//}

function loadSettings() {

    /* Unloading other UI Elements */
    unloadLogin()
    unloadOverview();
    unloadCamera();
    unloadLoc();
    unloadGallery();


    animElement.style.display = "block";
    dandelionAnim.play();

    dandelionAnim.addEventListener("data_ready", function (data) {
        console.log(data);
    })

    dandelionAnim.addEventListener("complete", function () {
        animElement.style.display = "none";
        /* Loading Settings */
        settingsWrapElement.style.display = "block";
        menuWrapperElement.style.visibility = "visible";
        settingsButton.firstElementChild.style.opacity = "1";
    })


}

function unloadSettings() {
    settingsWrapElement.style.display = "none";
    settingsButton.firstElementChild.style.opacity = "0.5";
}

function unloadLogin() {
    warning.style.visibility = "visible";
    loginWrapElement.style.display = "none";

}

function loadLogin() {
    warning.style.visibility = "hidden";
    loginWrapElement.style.display = "flex";
    menuWrapperElement.style.visibility = "hidden";
}

function loadLoc() {
    unloadSettings();
    unloadOverview();
    unloadLogin();
    unloadCamera();
    unloadGallery();

    locWrapElement.style.display = "block";
    cameraButton.firstElementChild.style.opacity = "1";
    startAR();
}

function unloadLoc() {
    locWrapElement.style.display = "none";
    cameraButton.firstElementChild.style.opacity = "0.5";
    let videoEl = document.getElementsByTagName("video")[2];
    let canvasEl = document.getElementsByTagName("canvas");
    while (canvasEl[1] != null) {
        canvasEl[1].parentNode.removeChild(canvasEl[1]);
    }

    if (videoEl != null) {
        let stream = videoEl.srcObject;
        let tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        videoEl.srcObject = null;
        videoEl.parentNode.removeChild(videoEl);
    }
}