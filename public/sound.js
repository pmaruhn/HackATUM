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
function playSound(ref, loop = false, volume = 1, id = 'sound') {
  var pathReference = storage.ref(ref);
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
      audioElement.id = id;
      audioElement.crossOrigin = 'anonymous';
      audioElement.loop = loop;
      audioElement.volume = volume;
      audioElement.play();
      audioElement.muted = !document.getElementById(id + 'Toggle').checked;

      // pass it into the audio context
      const track = audioContext.createMediaElementSource(audioElement);

      track.connect(audioContext.destination);

      document.body.appendChild(audioElement);
    })
    .catch(function (error) {
      // Handle any errors
    });
}

//Start Ambient Sound
playSound('sounds/ambient/newspaper.mp3', (loop = true), (volume = 0.1), (id = 'ambient'));
playSound(
  'sounds/ambient/babble.mp3',
  (loop = true),
  (volume = 1),
  (id = 'ambient')
);
playSound(
  'sounds/ambient/keyboard.mp3',
  (loop = true),
  (volume = 1),
  (id = 'ambient')
);
playSound(
  'sounds/ambient/library.mp3',
  (loop = true),
  (volume = 1),
  (id = 'ambient')
);

// Mute toggle
function  mute(track) {
  document.getElementById(track.id.replace('Toggle', '')).muted = !track.checked;
}
