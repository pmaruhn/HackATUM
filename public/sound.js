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
function playSound(ref, loop = false, volume = 1, id = 'sound', muted = false) {
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
      audioElement.muted = muted;

      // pass it into the audio context
      const track = audioContext.createMediaElementSource(audioElement);

      track.connect(audioContext.destination);

      document.body.appendChild(audioElement);
    })
    .catch(function (error) {
      // Handle any errors
    });
}

playSound(
  'sounds/notifications/juntos.mp3',
  (loop = false),
  (volume = 1),
  (id = 'notifications')
);

//Start Ambient Sound
  playSound('sounds/ambient/newspaper.mp3', (loop = true), (volume = 0.1), (id = 'newspaper'));
  playSound('sounds/ambient/babble.mp3', (loop = true), (volume = 1), (id = 'babble'));
  playSound('sounds/ambient/keyboard.mp3', (loop = true), (volume = 0.3), (id = 'keyboard'));
  playSound('sounds/ambient/library.mp3', (loop = true), (volume = 0.5), (id = 'library'));
  playSound('sounds/speed/faster.mp3', (loop = true), (volume = 1), (id = 'slower'), (muted = true));
  playSound('sounds/speed/slower.mp3', (loop = true), (volume = 1), (id = 'faster'), (muted = true));

// Mute toggle
function  mute(track) {
  if (track.id == 'ambientToggle') {
    document.getElementById('newspaper').muted = !track.checked;
    document.getElementById('babble').muted = !track.checked;
    document.getElementById('keyboard').muted = !track.checked;
    document.getElementById('library').muted = !track.checked;
  } else {
    document.getElementById(track.id.replace('Toggle', '')).muted = !track.checked;
  }
}
