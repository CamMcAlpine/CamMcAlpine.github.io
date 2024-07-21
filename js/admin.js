document.addEventListener("DOMContentLoaded", function() {
    const playersList = document.getElementById("players-list");

    // Function to render the list of players
    function renderPlayers(snapshot) {
        playersList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const player = childSnapshot.val();
            const li = document.createElement("li");
            li.textContent = player.name;
            playersList.appendChild(li);
        });
    }

    // Listen for changes in the players database
    playersDB.on("value", (snapshot) => {
        renderPlayers(snapshot);
    });

    // Initially load the players list
    playersDB.once("value", (snapshot) => {
        renderPlayers(snapshot);
    });
});
