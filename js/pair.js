// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB3hFS_T2wtfV-ZR57u3PIa5BzgX_3Pgsw",
//     authDomain: "wednesday-dubs.firebaseapp.com",
//     databaseURL: "https://wednesday-dubs-default-rtdb.firebaseio.com",
//     projectId: "wednesday-dubs",
//     storageBucket: "wednesday-dubs.appspot.com",
//     messagingSenderId: "1048374787195",
//     appId: "1:1048374787195:web:dc97776e4005d4e7fa76de",
//     measurementId: "G-7P46FJTMD1"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Reference your database
var nameFormDB = firebase.database().ref("nameForm");
var cardFormDB = firebase.database().ref("cardForm");
var teamFormDB = firebase.database().ref("teamForm");

// // Get the device ID
// let deviceId = localStorage.getItem('deviceId');;

nameFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());

        // Get Partner ID
        partnerID = childSnapshot.val().partnerID;

        // Display Partner Name
        nameFormDB.child(partnerID).once("value", (partnerSnapshot) => {
            document.getElementById("pairing").innerHTML = partnerSnapshot.val().name;
        });

    });
});

teamFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        hole = childSnapshot.val().hole;
        document.getElementById("hole").innerHTML = hole;

        teamFormDB.orderByChild("hole").equalTo(hole).once("value", (holeSnapshot) => {
            holeSnapshot.forEach((childSnapshot) => {
                var card_player = document.createElement("li");
                card_player.id = "card_player";
                card_player.innerHTML = childSnapshot.val().name;
                document.getElementById("card").appendChild(card_player);
            });
        });
    });
});

document.getElementById("score-submit").addEventListener("click", submitScore);
