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

// Generate or retrieve a device ID
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
    deviceId = 'device-' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('deviceId', deviceId);
}

document.getElementById("nameForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var id = getPlayerID();
    console.log(id);
    const name = getElementVal("name");
    saveName(id, deviceId, name);
    // window.location.href = "list.html";
}

const saveName = (playerID, deviceId, name) => {
    var newNameForm = nameFormDB.push();
    newNameForm.set({
        deviceId: deviceId,
        name: name,
        playerID: playerID
    });
};

function getPlayerID() {
    playerID = 1;
    // Find Number of Entries in Name field of DB
    nameFormDB.once("value", (snapshot) => {
        length = snapshot.numChildren();
        const namesArray = [];
        snapshot.forEach((childSnapshot) => {
            namesArray.push({
                key: childSnapshot.key,
                deviceId: childSnapshot.val().deviceId,
                name: childSnapshot.val().name,
                playerID: childSnapshot.val().playerID
            });
        });
        if(length > 0){
            playerID = namesArray[length-1].playerID + 1;
            console.log(playerID);
        }
    });
    return playerID;
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};