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

function submitForm(e) {
    name_field = document.getElementById("name");
    e.preventDefault();
    let name = name_field.value;
    name_field.value = " ";
    saveName(deviceId, name);
}

const saveName = (deviceId, name) => {
    // Generate or retrieve a device ID
    var newNameForm = nameFormDB.push();
    newNameForm.set({
        deviceId: deviceId,
        name: name,
    });
};

function pairNames() {
    const playersPerTeam = 2;

    nameFormDB.once("value", (snapshot) => {
        const namesArray = [];
        snapshot.forEach((childSnapshot) => {
            namesArray.push({
                key: childSnapshot.key,
                deviceId: childSnapshot.val().deviceId,
                name: childSnapshot.val().name,
            });
        });

        if(namesArray.length < 2) {
            alert("Not enough players. Please add more players.");
            return;
        }
        
        // Shuffle names
        shuffledNames = shuffleArray(namesArray);

        // Load Teams
        for (i = 0; i < namesArray.length; i += playersPerTeam) {

            // If odd number of people, one person is Cali
            if(i == namesArray.length - 1) {
                player1Key = namesArray[i].key;
                nameFormDB.child(player1Key).update({ partnerID: player1Key });
                break;                
            }
            player1Key = namesArray[i].key;
            player2Key = namesArray[i + 1].key;

            // Put partner ID in player name form
            nameFormDB.child(player1Key).update({ partnerID: player2Key });
            nameFormDB.child(player2Key).update({ partnerID: player1Key });
        }

        // Load Cards
        var prevCard = "";
        lengthOfArray = namesArray.length;


        for (i = 0; i < lengthOfArray; i += 4) {
            newArray = namesArray.splice(0, 4);
            playersPerCard = 4;
            console.log(newArray);

            if(newArray.length < 4) {
                playersPerCard = newArray.length;
                
                //Add on prev card
                if(playersPerCard <= 2) {
                    if(prevCard != "") {
                        cardFormDB.child(prevCard).child("players").once("value", (snapshot) => {
                            snapshot.forEach((childSnapshot) => {
                                console.log(childSnapshot.val().key);
                                newArray.push({
                                    key: childSnapshot.val().key,
                                    deviceId: childSnapshot.val().deviceId,
                                    name: childSnapshot.val().name,
                                });
                            });
                            console.log(newArray);
                    });
                        for (j = 0; j < playersPerCard; j++) {
                            playerKey = newArray[j].key;
                            nameFormDB.child(playerKey).update({cardID : prevCard});
                        }
                        cardFormDB.child(prevCard).update({ players : newArray });
                        cardFormDB.child(prevCard).update({ hole : 2 });
                        break;   
                    }
                }         
            }

            var newCardForm = cardFormDB.push()
            newCardForm.set({ hole : 1 });
            prevCard = newCardForm.key;

            // Put each player on card
            cardFormDB.child(prevCard).update({ players : newArray });

            // Update Card ID's for each player
            for(j = 0; j < playersPerCard; j++) {                
                playerKey = newArray[j].key;
                nameFormDB.child(playerKey).update({cardID : prevCard});
            }
        }

        // Update the isTeamsGenerated flag to true
        const isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");
        isTeamsGeneratedRef.set(true);
    });

}

function displayPairing() {
    console.log("HELLO");
    const pairingDiv = document.getElementById("pairing");
    pairingDiv.innerText = "Your Team: " + teamMembers.join(", ");;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

    // Delete all data at the "cardForm" node (clears everything under cardForm)
    database.ref("cardForm").remove().then(() => {
        console.log("Card Form cleared successfully!");
    }).catch((error) => {
        console.error("Error clearing Card Form:", error);
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

    // Reset the isTeamsGenerated flag
    database.ref("isTeamsGenerated").set(false).then(() => {
        console.log("isTeamsGenerated flag reset successfully!");
    }).catch((error) => {
        console.error("Error resetting isTeamsGenerated flag:", error);
    });
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

// Generate or retrieve a device ID
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
    deviceId = 'device-' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('deviceId', deviceId);
}