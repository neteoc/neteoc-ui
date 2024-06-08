/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";


// Initialize Firebase
admin.initializeApp();

export const newUserProfile = functions.auth.user().onCreate((user) => {
  logger.info("User created", {user: user});
  const doc = admin.firestore().doc(`users/${user.uid}`);

  doc.set({
    displayName: user.displayName,
  });

  doc.set({
    pubDetails: {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
  });
});
