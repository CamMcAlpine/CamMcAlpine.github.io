// Reference your database
var nameFormDB = firebase.database().ref("nameForm");
var cardFormDB = firebase.database().ref("cardForm");
var teamFormDB = firebase.database().ref("teamForm");

playerArray = [];

// Loop through nameformDB and buildplayer array to use
teamFormDB.once("value", (snapshot) => {

    snapshot.forEach((childSnapshot) => {
        playerArray.push(childSnapshot.val());
    });
    console.log(playerArray);
    lengthOfArray = playerArray.length;

    holeNumber = 0;
    teamNumber = 0;            
    for(i = 0; i < lengthOfArray; i++) {
        if(i % 4 == 0 && (lengthOfArray-i > 2) || i == 0) {
            holeNumber++;

            const card = document.createElement("div");
            card.id = "Hole" + holeNumber;
            card.classList.add("hole");
            card.textContent = "Hole " + holeNumber;
            container.appendChild(card);
        }
        if(i % 2 == 0){
            teamNumber++;

            const card = document.getElementById("Hole" + holeNumber);
            const team = document.createElement("div");
            team.classList.add("team");
            team.id = "Team" + teamNumber;
            team.textContent = "Team " + teamNumber;
            card.appendChild(team);
        }

        const team = document.getElementById("Team" + teamNumber);
        const player = document.createElement("div");
        player.classList.add("player");
        player.textContent = playerArray[i].name;
        team.appendChild(player);
    }
});

document.getElementById("clear-data-button").addEventListener("click", clearDatabaseConfirm);
