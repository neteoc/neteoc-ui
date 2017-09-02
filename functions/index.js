const functions = require('firebase-functions');

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
exports.makeUppercase = functions.database.ref('/missions/{missionId}/roster/{userId}')
    .onCreate(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();

      var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to: original.email,
    //Subject and text data  
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS!'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });
      
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

