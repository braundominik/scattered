let loginButton = document.querySelector(".loginAction");
let currentUser = document.querySelector(".user");
let logoutButton = document.querySelector(".logout");
let activeMarkers = [];

loginButton.addEventListener("submit", function (_e) {
    _e.preventDefault();
    let email = _e.srcElement[0].value;
    let password = _e.srcElement[1].value;


    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (val) {
            console.log(val.operationType);
            if (val.operationType == "signIn") {
                db.collection("dandelions").get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        console.log(doc.data().owner);
                        console.log(val.user.uid);
                        if (doc.data().owner == val.user.uid) {
                            db.collection("dandelions").doc(doc.id).collection("seeds").get().then((snapshot) => {
                                snapshot.docs.forEach(doc => {
                                    activeMarkers.push(doc.data().active);
                                })
                            })
                        }
                    })
                })
                loadSettings();
            }
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/user-not-found") {
                console.log("user not found creating new account");
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function (user) {


                        seedAmount = 2
                        console.log(`Creating ${seedAmount} seeds`);
                        console.log(seedAmount);
                        console.log(user);
                        console.log(user.user.uid);

                        db.collection("dandelions").add({
                            owner: user.user.uid,
                            seeds: seedAmount
                        })
                            .then((docRef) => {
                                for (let i = 0; i < seedAmount; i++) {
                                    activeMarkers.push(true);
                                    db.collection("dandelions").doc(docRef.id).collection("seeds").add({
                                        img: "m" + i,
                                        active: true
                                    })
                                }
                            })

                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            }
        });

})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        buildOverview();
        warning.style.display = "none";
        currentUser.textContent = user.email;
        logoutButton.textContent = "Logout";

    } else {
        currentUser.textContent = "no user";
        console.log("Logged out");
        logoutButton.textContent = "Login";
        overview.innerHTML = "";
        gallery.innerHTML = "";
        warning.style.display = "flex";
    }
});

logoutButton.addEventListener("click", logout);

function logout() {

    if (logoutButton.textContent == "Login") {
        unloadSettings();
        loadLogin();
    }

    firebase.auth().signOut().then(function () {
        unloadSettings();
        loadLogin();
    }).catch(function (error) {
    });
}

/* let currentUser = firebase.auth().currentUser;
console.log(currentUser); */



