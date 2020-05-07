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

const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

exports.tts = functions.https.onCall((data, context) => {
  // function quickStart(data) {
  // The text to synthesize
  const text = data.question;
  return data.question;
  // Construct the request
  // const googlerequest = {
  //   input: { text: text },
  //   // Select the language and SSML voice gender (optional)
  //   voice: { languageCode: 'de-DE', ssmlGender: 'MALE' },
  //   // select the type of audio encoding
  //   audioConfig: { audioEncoding: 'MP3' },
  // };
  // // Performs the text-to-speech googlerequest
  // const [googleresponse] = await client.synthesizeSpeech(googlerequest);
  // // Write the binary audio content to a local file
  // // const writeFile = util.promisify(fs.writeFile);
  // // await writeFile('output.mp3', googleresponse.audioContent, 'binary');
  // // return googleresponse.audioContent;

  // // }
  // // quickStart(data);
});
