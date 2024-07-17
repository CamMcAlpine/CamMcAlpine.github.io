// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

// Get the device ID
let deviceId = localStorage.getItem('deviceId');

nameFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const teamId = childSnapshot.val().teamId;
        const cardId = childSnapshot.val().cardId;

        if (teamId) {
            firebase.database().ref("nameForm").orderByChild("teamId").equalTo(teamId).once("value", (teamSnapshot) => {
                const teamMembers = [];
                teamSnapshot.forEach((teamMemberSnapshot) => {
                    teamMembers.push(teamMemberSnapshot.val().name);
                });
                document.getElementById("team").innerText = "Your Team: " + teamMembers.join(", ");
            });
        } else {
            document.getElementById("team").innerText = "You don't have a team yet.";
        }

        if (cardId) {
            firebase.database().ref("teams").orderByChild("cardId").equalTo(cardId).once("value", (cardSnapshot) => {
                const cardTeams = [];
                cardSnapshot.forEach((teamSnapshot) => {
                    if (teamSnapshot.key !== teamId) {
                        cardTeams.push(teamSnapshot.key);
                    }
                });

                if (cardTeams.length > 0) {
                    const opponents = [];
                    cardTeams.forEach((opponentTeamId) => {
                        firebase.database().ref("nameForm").orderByChild("teamId").equalTo(opponentTeamId).once("value", (opponentSnapshot) => {
                            opponentSnapshot.forEach((opponentSnapshot) => {
                                opponents.push(opponentSnapshot.val().name);
                            });
                            document.getElementById("opponents").innerText = "Your Opponents: " + opponents.join(", ");
                        });
                    });
                } else {
                    document.getElementById("opponents").innerText = "You don't have opponents yet.";
                }
            });
        } else {
            document.getElementById("opponents").innerText = "You don't have opponents yet.";
        }
    });
});