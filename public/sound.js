// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// // get the audio element
// const audioElement = document.createElement('audio');
// audioElement.src = '02.mp3';
// audioElement.crossOrigin = 'anonymous';
// audioElement.loop = true;

// To solve CORS Error: https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin/37765371#37765371
// Create a reference with an initial file path and name
var storage = firebase.storage();

//Play emotion sounds
function playEmotion(emotion) {
  var pathReference = storage.ref('sounds/emotions/' + emotion + '.m4a');
  pathReference
    .getDownloadURL()
    .then(function (url) {
      // `url` is the download URL

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      var audioElement = document.createElement('audio');
      audioElement.src = url;
      audioElement.crossOrigin = 'anonymous';
      audioElement.play();

      // pass it into the audio context
      const track = audioContext.createMediaElementSource(audioElement);

      track.connect(audioContext.destination);
    })
    .catch(function (error) {
      // Handle any errors
    });
}
