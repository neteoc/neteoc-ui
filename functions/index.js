const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUserProfile = functions.auth.user().onCreate(event => {
    const user = event.data; // The Firebase user.
    admin.database().ref('/users').child(user.uid).child("pubDetails").set({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    })

});

