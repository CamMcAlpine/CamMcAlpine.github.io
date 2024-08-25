// Reference your database
var nameFormDB = firebase.database().ref("nameForm");
var cardFormDB = firebase.database().ref("cardForm");
var teamFormDB = firebase.database().ref("teamForm");

var isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");

// Function to check for team generation flag and redirect
isTeamsGeneratedRef.on("value", (snapshot) => {
    const isGenerated = snapshot.val();
    if (isGenerated && (window.location.pathname == "/admin.html" || window.location.pathname == "/admin")) {
        window.location.href = "adminPair.html";
    }
});

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

        const paidBox = document.createElement("input");
        paidBox.type = 'checkbox';
        paidBox.classList.add("paid-box");
        playerBox.appendChild(paidBox);

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
document.getElementById("name_field").addEventListener("submit", submitForm);
document.getElementById("clear-data-button").addEventListener("click", clearDatabaseConfirm);