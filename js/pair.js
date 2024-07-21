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

// Reference your database
var nameFormDB = firebase.database().ref("nameForm");
var cardFormDB = firebase.database().ref("cardForm");

// // Get the device ID
// let deviceId = localStorage.getItem('deviceId');


nameFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
    const namesArray = [];
    const cardsArray = [];
    snapshot.forEach((childSnapshot) => {
        namesArray.push({
            key: childSnapshot.key,
            deviceId: childSnapshot.val().deviceId,
            name: childSnapshot.val().name,
        });
    });

    // cardFormDB.once("value", (snapshot) => {
    //     const cardsArray = [];
    //     snapshot.forEach((childSnapshot) => {
    //         console.log(childSnapshot.val());
    //         cardsArray.push({
    //             player : childSnapshot.val().playerNum
    //         });
    //         cardsArray.push({
    //             hole : childSnapshot.val().hole
    //         });
    //     });
    //     if (cardsArray.length > 0) {
    //         document.getElementById("card").innerHTML = cardsArray[0].cardId;
    //     }
    // });


    snapshot.forEach((childSnapshot) => {
        // Display Partner
        for (i = 1; i < namesArray.length; i++) {
            if (namesArray[i].key == childSnapshot.val().partnerID) {
                document.getElementById("pairing").innerHTML = "Your Partner: " + namesArray[i].name;
            }            
        };

        // Display Card
        let cardID = childSnapshot.val().cardID;
        cardFormDB.child(cardID).once("value", (cardSnapshot) => {
            players = cardSnapshot.val().players;
            playerNames = [];
            for(i = 0; i < players.length; i++){
                playerNames.push(players[i].name);
            }
            playerNames = playerNames.toString().split(",").join("\n");
            console.log(playerNames);
            document.getElementById("card").innerHTML = playerNames;
            // Display Hole
            document.getElementById("hole").innerHTML = "Hole: " + cardSnapshot.val().hole;
        })

    });

});

// nameFormDB.orderByChild("deviceId").equalTo(deviceId).once("value", (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//         const teamId = childSnapshot.val().teamId;
//         const cardId = childSnapshot.val().cardId;

//         if (teamId) {
//             firebase.database().ref("nameForm").orderByChild("teamId").equalTo(teamId).once("value", (teamSnapshot) => {
//                 const teamMembers = [];
//                 teamSnapshot.forEach((teamMemberSnapshot) => {
//                     teamMembers.push(teamMemberSnapshot.val().name);
//                 });
//                 document.getElementById("team").innerText = "Your Team: " + teamMembers.join(", ");
//             });
//         } else {
//             document.getElementById("team").innerText = "You don't have a team yet.";
//         }

//         if (cardId) {
//             firebase.database().ref("teams").orderByChild("cardId").equalTo(cardId).once("value", (cardSnapshot) => {
//                 const cardTeams = [];
//                 cardSnapshot.forEach((teamSnapshot) => {
//                     if (teamSnapshot.key !== teamId) {
//                         cardTeams.push(teamSnapshot.key);
//                     }
//                 });

//                 if (cardTeams.length > 0) {
//                     const opponents = [];
//                     cardTeams.forEach((opponentTeamId) => {
//                         firebase.database().ref("nameForm").orderByChild("teamId").equalTo(opponentTeamId).once("value", (opponentSnapshot) => {
//                             opponentSnapshot.forEach((opponentSnapshot) => {
//                                 opponents.push(opponentSnapshot.val().name);
//                             });
//                             document.getElementById("opponents").innerText = "Your Opponents: " + opponents.join(", ");
//                         });
//                     });
//                 } else {
//                     document.getElementById("opponents").innerText = "You don't have opponents yet.";
//                 }
//             });
//         } else {
//             document.getElementById("opponents").innerText = "You don't have opponents yet.";
//         }
//     });
// });