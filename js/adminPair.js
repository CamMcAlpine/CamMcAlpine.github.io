// Reference your database
var nameFormDB = firebase.database().ref("nameForm");
var cardFormDB = firebase.database().ref("cardForm");

playerArray = [];

// Loop through nameformDB and buildplayer array to use
nameFormDB.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        playerArray.push(childSnapshot.val());
    });
});

console.log(playerArray);

cardFormDB.once("value", (snapshot) => {
    // Loops each card
    let teamNumber = 1;
    snapshot.forEach((childSnapshot) => {
        const card = document.createElement("div");
        card.classList.add("hole");
        card.textContent = "Hole " + childSnapshot.val().hole;
        container.appendChild(card);

        let playerNumber = 0;
        while(playerNumber < childSnapshot.val().players.length) {
            console.log(playerNumber);
            const team = document.createElement("div");
            team.classList.add("team");
            team.textContent = "Team " + teamNumber;
            card.appendChild(team);

            player1Info = childSnapshot.val().players[playerNumber];
            console.log(player1Info);
        
            // Pull first player
            const player = document.createElement("div");
            player.classList.add("player");
            player.textContent = player1Info.name;
            team.appendChild(player);

            // If first player's partner is itself
            if(playerNumber < childSnapshot.val().players.length - 1) {
                playerNumber++;
                nameFormDB.child(childSnapshot.val().players[playerNumber].key).limitToFirst(10).once("value", (partnerSnapshot) => {
                    player2Info = partnerSnapshot.val();
                    
                    const player = document.createElement("div");
                    player.classList.add("player");
                    player.textContent = player2Info.name;
                    team.appendChild(player);
                })
            }
            playerNumber++;

            teamNumber++;
        }
    });

});

// // FIX THIS WHEN YOUR BRAIN ISNT MUSH
// function sortByTeams(array) {
    
//     newArray = array;
//     console.log(newArray);
//     for (i = 0; i < newArray.length; i++) {
//         if (i % 2 == 0) {
//             player1 = newArray.pop();
//             player2 = newArray.pop();
//         }
//     }
//     return newArray;
// }
