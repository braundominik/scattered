window.addEventListener("load", init);
let buttonClicked = false;
let globeAnimation;
let textAnimation;
function init() {
    //document.addEventListener("click", stopAnimation);
    //document.getElementById("button").addEventListener("click", animate);
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

    globeAnimation.setSpeed(0.2);

    textAnimation = bodymovin.loadAnimation({
        container: document.getElementById("textAnim"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './animations/text.json' // the path to the animation json
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
        let $svg = document.getElementsByTagName('svg');
        Array.from($svg).forEach(element => {
            console.log(element);
            element.setAttribute('preserveAspectRatio', 'xMidYMax meet');
        })
    });
}

setTimeout(changeText, 3000);
function changeText() {
    textAnimation.hide();
    actionAnimation.show();
    actionAnimation.play();
    document.getElementById("textAnim").addEventListener("click", plantTransition);
}

function plantTransition(){
    globeAnimation.hide();
    outroGlobeAnimation.play();
    outroGlobeAnimation.addEventListener("complete", function(){
        globeAnimation.destroy();
        textAnimation.destroy();
        console.log("complete");
        plantActionAnimation = bodymovin.loadAnimation({
            container: document.getElementById("textAnim"), // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: './animations/plantAction.json' // the path to the animation json
        })
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