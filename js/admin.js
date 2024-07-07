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

document.getElementById("pair").addEventListener("click", pairNames);

function pairNames() {
    nameFormDB.once("value", (snapshot) => {
        const namesArray = [];
        snapshot.forEach((childSnapshot) => {
            namesArray.push({
                key: childSnapshot.key,
                deviceId: childSnapshot.val().deviceId,
                name: childSnapshot.val().name,
            });
        });

        // Shuffle names and pair them
        shuffleArray(namesArray);

        for (let i = 0; i < namesArray.length; i += 2) {
            if (i + 1 < namesArray.length) {
                nameFormDB.child(namesArray[i].key).update({ partnerId: namesArray[i + 1].deviceId });
                nameFormDB.child(namesArray[i + 1].key).update({ partnerId: namesArray[i].deviceId });
            } else {
                nameFormDB.child(namesArray[i].key).update({ partnerId: "none" });
            }
        }

        // Redirect users to pairing page
        setTimeout(() => {
            window.location.href = "pair.html";
        }, 1000);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
