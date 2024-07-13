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

/*
We dont need the above part if we are using 
both <script src="./js/list.js"></script> and 
<script src="./js/admin.js"></script> in our admin.html file
*/

// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

// Fetch and display names in real-time
nameFormDB.on("value", (snapshot) => {
    const playersList = document.getElementById("players-list");
    playersList.innerHTML = ""; // Clear the list before updating
    snapshot.forEach((childSnapshot) => {
        const name = childSnapshot.val().name;
        // Create player Box
        const playerBox = document.createElement("li");
        playerBox.classList.add("player-box");
        playersList.appendChild(playerBox);

        // Create player name
        const playerName = document.createElement("h4");
        playerName.classList.add("player");
        playerName.textContent = name;
        playerBox.appendChild(playerName);

        // Add Trash Can Icon
        const deleteIcon = document.createElement("div");
        deleteIcon.classList.add("material-symbols-outlined");
        deleteIcon.textContent = "delete";
        playerBox.appendChild(deleteIcon);
        deleteIcon.addEventListener("click", () => {
            nameFormDB.child(childSnapshot.key).remove();
        });
    });
});

document.getElementById("gen-teams-button").addEventListener("click", pairNames);

function pairNames() {
    const playersPerTeam = 2;
    const teamsPerCard = 2;

    nameFormDB.once("value", (snapshot) => {
        const namesArray = [];
        snapshot.forEach((childSnapshot) => {
            namesArray.push({
                key: childSnapshot.key,
                deviceId: childSnapshot.val().deviceId,
                name: childSnapshot.val().name,
            });
        });

        // Shuffle names
        shuffleArray(namesArray);

        const teams = [];
        while (namesArray.length > 0) {
            const team = namesArray.splice(0, playersPerTeam);
            const teamId = firebase.database().ref().child('teams').push().key;
            team.forEach(player => {
                nameFormDB.child(player.key).update({ teamId: teamId });
            });
            teams.push(teamId);
        }

        const cards = [];
        while (teams.length > 0) {
            const card = teams.splice(0, teamsPerCard);
            const cardId = firebase.database().ref().child('cards').push().key;
            card.forEach(teamId => {
                firebase.database().ref('teams/' + teamId).update({ cardId: cardId });
            });
            cards.push(cardId);
        }

        // Update the isTeamsGenerated flag to true
        const isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");
        isTeamsGeneratedRef.set(true);

        // // Redirect users to pairing page
        // setTimeout(() => {
        //     window.location.href = "pair.html";
        // }, 1000);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// document.getElementById("clear-data").addEventListener("click", clearDatabaseConfirm);

function clearDatabaseConfirm() {
    const confirmation = confirm("Are you sure you want to clear all data from the database? This action cannot be undone.");
    if (confirmation) {
        clearDatabase();
    }
}

function clearDatabase() {
    // Reference your database
    var database = firebase.database();

    // Delete all data at the "nameForm" node (clears everything under nameForm)
    database.ref("nameForm").remove().then(() => {
        console.log("Name Form cleared successfully!");
    }).catch((error) => {
        console.error("Error clearing Name Form:", error);
    });

    // Delete all data at the "teams" node (clears everything under teams)
    database.ref("teams").remove().then(() => {
        console.log("Teams cleared successfully!");
    }).catch((error) => {
        console.error("Error clearing Teams:", error);
    });

    // Delete all data at the "cards" node (clears everything under cards)
    database.ref("cards").remove().then(() => {
        console.log("Cards cleared successfully!");
    }).catch((error) => {
        console.error("Error clearing Cards:", error);
    });

    // Reset the isTeamsGenerated flag to false
    var isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");
    isTeamsGeneratedRef.set(false);
}

