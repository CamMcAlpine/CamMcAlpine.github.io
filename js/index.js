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

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var nameFormDB = firebase.database().ref("nameForm");

document.getElementById("nameForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");

    saveName(name);

    // enable alert
    document.querySelector(".alert").style.display = "block";

    // remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // reset the form
    document.getElementById("nameForm").reset();
}

const saveName = (name) => {
    var newNameForm = nameFormDB.push();

    newNameForm.set({
        name: name,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

// Fetching the names from the database and displaying them
nameFormDB.on("value", (snapshot) => {
    const namesList = document.getElementById("names");
    namesList.innerHTML = ""; // Clear the list before updating

    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const li = document.createElement("li");
        li.textContent = childData.name;
        namesList.appendChild(li);
    });
});
