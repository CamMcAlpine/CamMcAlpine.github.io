// Reference your database
var nameFormDB = firebase.database().ref("nameForm");

document.getElementById("nameForm").addEventListener("submit", submitForm);