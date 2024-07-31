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
    name_field.value = "";

    if(window.location.pathname == "/" || window.location.pathname == "/index.html") {
        saveName(deviceId, name);
        window.location.href = "/list.html";   
    }
    else{
        saveName(0, name);
    }
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
                partnerID: childSnapshot.val().partnerID
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
        lengthOfArray = shuffledNames.length;


        holeNumber = 0;
        teamNumber = 0;            
        for(i = 0; i < lengthOfArray; i++) {
            if(i % 4 == 0 && lengthOfArray-i > 2) {
                if(lengthOfArray-i <= 6){
                    holeNumber = 9;
                }
                else{
                    holeNumber++;
                }
            }
            if(i % 2 == 0){
                console.log("Team " + (teamNumber+1));
                teamNumber++;
            }

            var teamsForm = teamFormDB.push();

            teamsForm.set({
                player_key: shuffledNames[i].key,
                name: shuffledNames[i].name,
                team: teamNumber,
                hole: holeNumber,
                deviceId: shuffledNames[i].deviceId
            });
        }

        // Update the isTeamsGenerated flag to true
        const isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");
        isTeamsGeneratedRef.set(true);
    });

}

function displayPairing() {
    const pairingDiv = document.getElementById("pairing");
    pairingDiv.innerText = "Your Team: " + teamMembers.join(", ");;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function clearDatabaseConfirm() {
    const confirmation = confirm("Are you sure you want to clear all data from the database? This action cannot be undone.");
    if (confirmation) {
        clearDatabase();
        window.location.reload();
    }
}

function clearDatabase() {
    firebase.database().ref().set({
        players: null,
        teams: null,
        cards: null,
        isTeamsGenerated: false
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