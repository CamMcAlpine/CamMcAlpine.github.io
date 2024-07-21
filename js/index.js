// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

document.getElementById("nameForm").addEventListener("submit", submitForm);

var isTeamsGeneratedRef = firebase.database().ref("isTeamsGenerated");

// Function to check for team generation flag and redirect
isTeamsGeneratedRef.on("value", (snapshot) => {
    const isGenerated = snapshot.val();
    if (isGenerated && window.location.pathname != "/admin.html") {
        window.location.href = "pair.html";
    }
});