// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

// Fetch and display names in real-time
nameFormDB.on("value", (snapshot) => {
        const namesList = document.getElementById("names");
        if(namesList == null)
            return;
        namesList.innerHTML = ""; // Clear the list before updating
        snapshot.forEach((childSnapshot) => {
            const name = childSnapshot.val().name;
            const li = document.createElement("li");
            li.textContent = name;
            namesList.appendChild(li);
        });
});

var isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");

// Function to check for team generation flag and redirect
isTeamsGeneratedRef.on("value", (snapshot) => {
    const isGenerated = snapshot.val();
    if (isGenerated && window.location.pathname != "/admin.html") {
        window.location.href = "pair.html";
    }
});
