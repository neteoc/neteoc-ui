/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as logger from 'firebase-functions/logger';

import axios from 'axios';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

// Initialize Firebase
admin.initializeApp();

export const newProfile = functions.auth.user().onCreate((user) => {
  logger.info('User created', { user: user });
  const doc = admin.firestore().doc(`users/${user.uid}`);
  const profiledoc = admin.firestore().doc(`users/${user.uid}/public/profile`);
  let approved = false;
  // TODO: The email domain whitelist should be configurable via the DB
  if (
    user.email &&
    /^[a-zA-Z0-9._%+-]+@(gasdf\.us|[a-zA-Z0-9.-]+\.(mil|gov))$/.test(user.email)
  ) {
    approved = true;
  }

  doc.set({
    approved: approved,
  });

  profiledoc.set({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
});

// Assuming the accessSecret function is correctly implemented and retrieves the TURNSTILE_SECRET_KEY
async function accessSecret(): Promise<string> {
  try {
    const [version] = await client.accessSecretVersion({
      name: 'projects/890260625147/secrets/turnstile_secret_key/versions/latest',
    });
    // Ensure the payload and data exist before attempting to convert to string
    if (version.payload && version.payload.data) {
      return version.payload.data.toString();
    } else {
      throw new Error('Secret payload is empty or undefined');
    }
  } catch (error) {
    console.error('Failed to access secret:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export const handleFormSubmission = functions.https.onRequest(
  async (req, res) => {
    console.log('Request body:', req.body);

    if (req.method != 'POST') {
      console.error('Method Not Allowed');
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { turnstileResponse, ...formData } = req.body;
    formData.status = 'new';
    formData.timestamp = admin.firestore.FieldValue.serverTimestamp();

    try {
      // Retrieve the TURNSTILE_SECRET_KEY using the accessSecret function
      const TURNSTILE_SECRET_KEY = await accessSecret();

      const validationResponse = await axios.post(
        `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
        {
          secret: TURNSTILE_SECRET_KEY,
          response: turnstileResponse,
          remoteip: req.body,
        }
      );

      if (!validationResponse.data.success) {
        res.status(403).send('Captcha validation failed');
        console.error('Captcha validation failed');
        console.error('Response:', validationResponse.data);
        return;
      }

      await admin.firestore().collection('recruiting').add(formData);
      res.redirect(303, 'https://gsdf.georgia.gov/thank-you/');
      return;
    } catch (error) {
      console.error('Error:', error);
      console.error('Internal Server Error - A');
      res.status(500).send('Internal Server Error - A');
      return;
    }
  }
);
