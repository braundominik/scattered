function vibrate() {
    //navigator.vibrate(500);
}

function getLocCheckLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
            console.log(pos);
        });
    }
}


function checkLoc(pos) {
    let lat = pos.coords.latitude
    let lng = pos.coords.longitude
    if ((lat<=lat+0.001 && lat>=lat-0.001)){
        console.log("test");
    }


    console.log(pos);
}

getLocCheckLoc();