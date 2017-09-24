const functions = require('firebase-functions');
var Mailgun = require('mailgun-js');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const appConfig = require( "./config");

var mailgun = new Mailgun(appConfig.mailGun);

exports.createUserProfile = functions.auth.user().onCreate(event => {
    const user = event.data; // The Firebase user.
    admin.database().ref('/users').child(user.uid).child("pubDetails").set({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    })

});


// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.sendMissionSignupEmail = functions.database.ref('/missions/{missionId}/roster/{userId}')
    .onCreate(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();


      var data = {
    //Specify email data
      from: "noReply@neteoc.com",
    //The email to contact
      to: original.email,
    //Subject and text data  
      subject: 'Mission Signup Notice',
      html: `<p>Dear${original.displayName}</p><p>You have signed up for a mission. To see more details vist <a href="https://gsdf.neteoc.com/missions/${event.params.missionId}">https://gsdf-8dc44.firebaseapp.com/missions/${event.params.missionId}</a></p>`
    }

    console.log(original)

    console.log(data);

    //Invokes the method to send emails given the above data with the helper library
    return mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            console.log(body);
        }
    });
});

