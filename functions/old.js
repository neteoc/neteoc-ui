const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// Listens for mission roster signups and updates other locations
exports.addUserMission = functions.database.ref('/missions/{missionID}/roster/{userID}')
    .onCreate()(event => {
        admin.database().ref(`/missions/${event.params.missionID}/`).on("value", function(snapshot) {
            console.log(snapshot.val());
            return admin.database().ref(`/users/${event.params.userID}/missions`).child(event.params.missionID).set(snapshot.val())
            // return admin.database().ref(`/users/${event.params.userID}/missions`).child(event.params.missionID).remove();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
});

// Listens for mission roster signups and updates other locations
exports.removeUserMissions = functions.database.ref('/missions/{missionID}/roster/{userID}')
    .onDelete()(event => {
        admin.database().ref(`/missions/${event.params.missionID}/`).on("value", function(snapshot) {
            console.log(snapshot.val());
            //return admin.database().ref(`/users/${event.params.userID}/missions`).child(event.params.missionID).set(snapshot.val())
            return admin.database().ref(`/users/${event.params.userID}/missions`).child(event.params.missionID).remove();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
});