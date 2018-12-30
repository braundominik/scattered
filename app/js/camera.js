/*         const db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true }); */


// The width and height of the captured photo. We will set the
// width to the value defined here, but the height will be
// calculated based on the aspect ratio of the input stream.

var width = window.innerWidth; // We will scale the photo width to this
var height = 0; // This will be computed based on the input stream

// |streaming| indicates whether or not we're currently streaming
// video from the camera. Obviously, we start at false.

var streaming = false;

// The various HTML elements we need to configure or control. These
// will be set by the startup() function.
var canvas = null;
var startbutton = null;
let cameraWrap = null;
let allMediaStreams = [];

function startup() {
    cameraWrap = document.getElementsByClassName("camera-wrap");
    canvas = document.getElementById('takephoto-canvas');
    photo = document.getElementById('takephoto-preview');
    startbutton = document.getElementById('takephoto-startbutton');


    navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia({
        video: true,//{ facingMode: { exact: "environment" } },
        audio: false
    },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.srcObject = stream
                //console.log(video.srcObject);
                allMediaStreams.push(stream);
                //console.log(allMediaStreams);
            }
            video.play();
        },
        function (err) {
            console.log("An error occured! " + err);
        }
    );

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
                height = width * (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
            let diff = Math.abs(width - height);
            video.style.clipPath = "inset(0px " + diff / 2 + "px)";
            cameraWrap[0].style.marginTop = (window.innerHeight / 2 - height / 2) + "px";
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);


    clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    //photo.setAttribute('src', data);
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
        console.log(width);
        canvas.width = height;
        canvas.height = height;
        context.drawImage(video, -50, 0, width, height);

        var data = canvas.toDataURL('image/png');
        //photo.setAttribute('src', data);

        //previewarea.classList.remove("hide");
        //downloadbutton.href = data;

        // FULL EXAMPLE

        // File or Blob named mountains.jpg
        var file = dataURItoBlob(data);

        db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").get().then((snapshot) => {
            let nameSet = false;
            snapshot.docs.forEach(doc => {
                if (!nameSet) {
                    if (doc.data().img == "") {
                        nameSet = true;
                        file.name = doc.id;


                        // Create the file metadata
                        var metadata = {
                            contentType: 'image/jpeg'
                        };


                        // Upload file and metadata to the object 'images/mountains.jpg'
                        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);


                        // Listen for state changes, errors, and completion of the upload.
                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                            function (snapshot) {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                                        console.log('Upload is paused');
                                        break;
                                    case firebase.storage.TaskState.RUNNING: // or 'running'
                                        console.log('Upload is running');
                                        break;
                                }
                            }, function (error) {

                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;

                                    case 'storage/canceled':
                                        // User canceled the upload
                                        break;

                                    case 'storage/unknown':
                                        // Unknown error occurred, inspect error.serverResponse
                                        break;
                                }
                            }, function () {
                                // Upload completed successfully, now we can get the download URL
                                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                                    db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").get().then((snapshot) => {
                                        let refSaved = false;
                                        snapshot.docs.forEach(doc => {
                                            if (!refSaved) {
                                                if (doc.data().img == "") {
                                                    refSaved = true;
                                                    db.collection("dandelions").doc("OTZmsX1i98PH6bHlHG3x").collection("seeds").doc(doc.id).update({
                                                        img: downloadURL
                                                    })
                                                }
                                            }
                                        })
                                    })

                                    console.log('File available at', downloadURL);
                                });
                            });

                    }
                }
            })
        })


    } else {
        clearphoto();
    }

}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });


}
/* } */
