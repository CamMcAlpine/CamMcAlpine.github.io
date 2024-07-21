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

firebase.initializeApp(firebaseConfig);

const playersDB = firebase.database().ref("players");
const teamsDB = firebase.database().ref("teams");
const cardsDB = firebase.database().ref("cards");
const isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");

// Generate or retrieve a device ID
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
    deviceId = 'device-' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('deviceId', deviceId);
}

function submitForm(e) {
    e.preventDefault();
    const nameField = document.getElementById("name");
    const name = nameField.value;
    nameField.value = "";
    savePlayer(deviceId, name);
}

const savePlayer = (deviceId, name) => {
    const newPlayerRef = playersDB.push();
    newPlayerRef.set({
        deviceId: deviceId,
        name: name,
        teamId: null
    });
};

function generateTeams() {
    playersDB.once("value", (snapshot) => {
        const players = [];
        snapshot.forEach((childSnapshot) => {
            players.push({
                key: childSnapshot.key,
                name: childSnapshot.val().name,
                deviceId: childSnapshot.val().deviceId
            });
        });

        if (players.length < 2) {
            alert("Not enough players. Please add more players.");
            return;
        }

        shuffleArray(players);

        const teams = [];
        for (let i = 0; i < players.length; i += 2) {
            if (i === players.length - 1) {
                teams.push([players[i]]);
            } else {
                teams.push([players[i], players[i + 1]]);
            }
        }

        teams.forEach((team, index) => {
            const newTeamRef = teamsDB.push();
            const teamData = {};
            team.forEach((player) => {
                teamData[player.key] = true;
                playersDB.child(player.key).update({ teamId: newTeamRef.key });
            });
            newTeamRef.set({
                ...teamData,
                cardId: null
            });
        });

        generateCards();
    });
}

function generateCards() {
    teamsDB.once("value", (snapshot) => {
        const teams = [];
        snapshot.forEach((childSnapshot) => {
            teams.push({
                key: childSnapshot.key,
                data: childSnapshot.val()
            });
        });

        const cards = [];
        for (let i = 0; i < teams.length; i += 2) {
            if (i === teams.length - 1) {
                cards.push([teams[i]]);
            } else {
                cards.push([teams[i], teams[i + 1]]);
            }
        }

        cards.forEach((card, index) => {
            const newCardRef = cardsDB.push();
            const cardData = {};
            card.forEach((team) => {
                cardData[team.key] = true;
                teamsDB.child(team.key).update({ cardId: newCardRef.key });
            });
            newCardRef.set({
                teams: cardData,
                hole: index + 1
            });
        });

        isTeamsGeneratedRef.set(true);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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