
function startAR() {
    let listenerAdded = false;
    let loadText = document.getElementById("loading");

    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement);
    //renderer.domElement.addEventListener("click", shootPic);

    var onRenderFcts = [];

    var scene = new THREE.Scene();

    var camera = new THREE.Camera();
    scene.add(camera);

    var arToolkitSource = new THREEx.ArToolkitSource({
        // to read from the webcam 
        sourceType: 'webcam',
        // to read from an image
        // sourceType : 'image',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',		
        // to read from a video
        // sourceType : 'video',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',		
    })

    arToolkitSource.init(function onReady() {
        onResize()
    })

    // handle resize
    window.addEventListener('resize', function () {
        onResize()
    })
    function onResize() {
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }


    var arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: "./camera_para.dat",
        detectionMode: 'mono',
        maxDetectionRate: 30,
        canvasWidth: 80 * 3,
        canvasHeight: 60 * 3,
    })

    arToolkitContext.init(function onCompleted() {
        console.log(arToolkitContext);
        startup(arToolkitContext.arController.canvas, arToolkitSource.domElement);
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    })

    onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return
        arToolkitContext.update(arToolkitSource.domElement)
    })



    var markerRoot1 = new THREE.Group
    scene.add(markerRoot1)


    if (activeMarkers[0]) {
        var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
            type: 'pattern',
            patternUrl: "marker/m0.patt",
            // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
        })

        artoolkitMarker.addEventListener("markerFound", function (event) {
            if (!shootAllowed) {
                activateShootMode("marker1");
            }
        })
    }



    var markerRoot2 = new THREE.Group
    scene.add(markerRoot2)

    if (activeMarkers[1]) {
        var artoolkitMarker2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
            type: 'pattern',
            patternUrl: "marker/m1.patt"
            // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
        })

        artoolkitMarker2.addEventListener("markerFound", function (event) {
            if (!shootAllowed) {
                activateShootMode("marker2");
            }
        })
    }

    console.log(markerRoot1);
    //console.log(markerRoot2);

    /* scene.remove(markerRoot1) */



    var smoothedRoot = new THREE.Group()
    scene.add(smoothedRoot)
    var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
    })

    var smoothedRoot2 = new THREE.Group()
    scene.add(smoothedRoot2)
    var smoothedControls2 = new THREEx.ArSmoothedControls(smoothedRoot2, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
    })

    onRenderFcts.push(function (delta) {
        smoothedControls.update(markerRoot1)
        smoothedControls2.update(markerRoot2)
    })

    var arWorldRoot = smoothedRoot
    var arWorldRoot2 = smoothedRoot2
    // add a torus knot	

    var onProgress = function (xhr) {

        if (xhr.lengthComputable) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
            loadText.textContent = Math.round(percentComplete, 2) + '% downloaded'

            /* if (percentComplete == 100 && listenerAdded == false) {
                listenerAdded = true;
                renderer.domElement.addEventListener("click", shootPic);
                console.log(arToolkitSource);
                console.log(renderer.domElement);
                console.log("picture activated");
            } */

        }

    };

    var onError = function () { };

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    new THREE.MTLLoader()
        .setPath('models/')
        .load('dandelion2.mtl', function (materials) {

            materials.preload();

            if (activeMarkers[0]) {
                new THREE.OBJLoader()
                    .setMaterials(materials)
                    .setPath('models/')
                    .load('lpd.obj', function (object) {

                        object.position.y = 0;
                        object.scale.z = 0.5;
                        object.scale.x = 0.5;
                        object.scale.y = 0.5;
                        object.rotation.x = -1.5;
                        arWorldRoot.add(new THREE.HemisphereLight());
                        arWorldRoot.add(object);
                    }, onProgress, onError);
            }

            if (activeMarkers[1]) {
                new THREE.OBJLoader()
                    .setMaterials(materials)
                    .setPath('models/')
                    .load('lpd.obj', function (object) {
                        object.name = "TESTOBJEKT";
                        object.position.y = 0;
                        object.scale.z = 0.5;
                        object.scale.x = 0.5;
                        object.scale.y = 0.5;
                        object.rotation.x = -1.5;
                        arWorldRoot2.add(new THREE.HemisphereLight());
                        arWorldRoot2.add(object);

                    }, onProgress, onError);
            }

            console.log(scene);

        });


    // render the scene
    onRenderFcts.push(function () {
        renderer.render(scene, camera);
        //stats.update();
    })
    // run the rendering loop
    var lastTimeMsec = null
    requestAnimationFrame(function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec = nowMsec
        // call each update function
        onRenderFcts.forEach(function (onRenderFct) {
            onRenderFct(deltaMsec / 1000, nowMsec / 1000)
        })
    })

}