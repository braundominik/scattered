function startAR(){

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
        startup(arToolkitContext.arController.canvas);
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    })

    onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return
        arToolkitContext.update(arToolkitSource.domElement)
    })

    var markerRoot = new THREE.Group
    scene.add(markerRoot)
    var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: "./patt.hiro"
        // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
    })

    var smoothedRoot = new THREE.Group()
    scene.add(smoothedRoot)
    var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
        lerpPosition: 0.4,
        lerpQuaternion: 0.3,
        lerpScale: 1,
    })
    onRenderFcts.push(function (delta) {
        smoothedControls.update(markerRoot)
    })

    var arWorldRoot = smoothedRoot
    // add a torus knot	


    var onProgress = function (xhr) {

        if (xhr.lengthComputable) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
            loadText.textContent = Math.round(percentComplete, 2) + '% downloaded'

            if(percentComplete == 100){
                renderer.domElement.addEventListener("click", shootPic);
                console.log("picture activated");
            }

        }

    };

    var onError = function () { };

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    new THREE.MTLLoader()
        .setPath('models/')
        .load('dand_material.mtl', function (materials) {

            materials.preload();

            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/')
                .load('dand_model.obj', function (object) {

                    object.position.y = 0;
                    object.scale.z = 0.5;
                    object.scale.x = 0.5;
                    object.scale.y = 0.5;
                    object.rotation.x = -1.5;
                    arWorldRoot.add(new THREE.HemisphereLight());
                    arWorldRoot.add(object);

                }, onProgress, onError);

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