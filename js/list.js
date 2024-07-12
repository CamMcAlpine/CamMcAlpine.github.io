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

// Fetch and display names in real-time
nameFormDB.on("value", (snapshot) => {
    const namesList = document.getElementById("names");
    namesList.innerHTML = ""; // Clear the list before updating
    snapshot.forEach((childSnapshot) => {
        const name = childSnapshot.val().name;
        const li = document.createElement("li");
        li.textContent = name;
        namesList.appendChild(li);
    });
});

var isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");

// Function to check for team generation flag and redirect
isTeamsGeneratedRef.on("value", (snapshot) => {
    const isGenerated = snapshot.val();
    if (isGenerated) {
        window.location.href = "pair.html";
    }
});

// Call fetchNames on page load
// fetchNames();

