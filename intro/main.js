window.addEventListener("load", init);
let buttonClicked = false;
let globeAnimation;
let textAnimation;
let availHeight; //stores the avaiable height on screen;
function init() {
    //document.addEventListener("click", stopAnimation);
    //document.getElementById("button").addEventListener("click", animate);

    availHeight = document.getElementsByTagName("html")[0].offsetHeight;

    globeAnimation = bodymovin.loadAnimation({
        container: document.getElementById("globeAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './animations/globe.json' // the path to the animation json
    })

    globeAnimation.setSpeed(0.2);

    outroGlobeAnimation = bodymovin.loadAnimation({
        container: document.getElementById("globeAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './animations/outroGlobe.json' // the path to the animation json
    })

    outroGlobeAnimation.hide();

    globeAnimation.setSpeed(0.2);

    textAnimation = bodymovin.loadAnimation({
        container: document.getElementById("textAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './animations/scattered_logo.json' // the path to the animation json
    })


    actionAnimation = bodymovin.loadAnimation({
        container: document.getElementById("textAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './animations/actionText.json' // the path to the animation json
    })
    actionAnimation.hide();

    bgAnimation = bodymovin.loadAnimation({
        container: document.getElementById("textAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: './animations/bg.json' // the path to the animation json
    })

    globeAnimation.addEventListener('DOMLoaded', function () {
        console.log('loaded');
        setupSVGs();
    });

    document.addEventListener("click", changeText);
}

function changeText() {
    document.removeEventListener("click", changeText);
    textAnimation.hide();
    actionAnimation.show();
    actionAnimation.play();
    document.getElementById("textAnim").addEventListener("click", plantTransition);
}

function plantTransition() {
    document.getElementById("textAnim").removeEventListener("click", plantTransition);
    globeAnimation.hide();
    outroGlobeAnimation.play();
    outroGlobeAnimation.play();
    outroGlobeAnimation.addEventListener("complete", handleComplete);
    console.log("test");    
}

function handleComplete() {
    outroGlobeAnimation.removeEventListener("complete", handleComplete);
    globeAnimation.destroy();
    textAnimation.destroy();
    console.log("complete");
    document.getElementById("textAnim").style.height = "100%";
    plantActionAnimation = bodymovin.loadAnimation({
        container: document.getElementById("textAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: './animations/plantAction.json' // the path to the animation json
    });
    plantActionAnimation.addEventListener("data_ready", function(){
        setupSVGs();
    })
    
}

function setupSVGs() {
    console.log("setupSVGs");
    let $svg = document.getElementsByTagName('svg');
    Array.from($svg).forEach(element => {
        console.log(element);
        element.setAttribute('preserveAspectRatio', 'xMidYMax slice');
        //element.style.height = availHeight + "px";
    })
}

/* function animate() {
    console.log("Funktion");
    if (!buttonClicked) {
        animation.setDirection(1);
        animation.play();
        buttonClicked = true;
    }

    else{
        animation.setDirection(-1);
        animation.play();
        buttonClicked = false;
    }

    animation.playSegments([15,26], true);
} */