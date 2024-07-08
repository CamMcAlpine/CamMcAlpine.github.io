// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3hFS_T2wtfV-ZR57u3PIa5BzgX_3Pgsw",
    authDomain: "wednesday-dubs.firebaseapp.com",
    databaseURL: "https://wednesday-dubs-default-rtdb.firebaseio.com",
    projectId: "wednesday-dubs",
    storageBucket: "wednesday-dubs.appspot.com",
    messagingSenderId: "1048374787195",
    appId: "1:1048374787195:web:dc97776e4005d4e7fa76de",
    measurementId: "G-7P46FJTMD1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

// Get the device ID
let deviceId = localStorage.getItem('deviceId');

// Fetch and display the user's partner
nameFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const partnerId = childSnapshot.val().partnerId;
        if (partnerId) {
            nameFormDB.orderByChild("deviceId").equalTo(partnerId).once("value", (partnerSnapshot) => {
                partnerSnapshot.forEach((partnerChildSnapshot) => {
                    const partnerName = partnerChildSnapshot.val().name;
                    document.getElementById("partner").innerText = partnerName;
                });
            });
        } else {
            document.getElementById("partner").innerText = "You don't have a partner yet.";
        }
    });
});
