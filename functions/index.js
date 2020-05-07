const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.learnerState = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.

  const data = req.body;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref('/learnerStates')
    .push()
    .set(data);
  res.send('Data pushed to database');
});

exports.ttsreq = functions.https.onRequest((req, res) => {
  const textToSpeech = require('@google-cloud/text-to-speech');

  // Import other required libraries
  const fs = require('fs');
  const util = require('util');
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  async function quickStart() {
    // The text to synthesize
    const text = 'Was für eine phenomenale Vorlesung!';

    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'de-DE', ssmlGender: 'MALE' },
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('test.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    res.send('Audio content written to file: test.mp3');
  }
  quickStart();
  // [END tts_quickstart]
});
