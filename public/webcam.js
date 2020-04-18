function startVideo() {
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  navigator.getMedia(
    // constraints
    { video: true, audio: true },
    // success callback
    function (stream) {
      var video = document.getElementsByTagName('video')[0];
      video.style.height = '640px';
      video.style.width = '480px';
      video.srcObject = stream;
      video.play();
    },
    //handle error
    function (error) {
      console.log(error);
    }
  );
}

function stopVideo() {
  video.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
}

const videoElem = document.getElementById('video');
const logElem = document.getElementById('log');
const startElem = document.getElementById('start');
const stopElem = document.getElementById('stop');

// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: 'always',
  },
  audio: false,
};

// // Set event listeners for the start and stop buttons
// startElem.addEventListener(
//   'click',
//   function (evt) {
//     startCapture();
//   },
//   false
// );

// stopElem.addEventListener(
//   'click',
//   function (evt) {
//     stopCapture();
//   },
//   false
// );

async function togglePresentation() {
  // logElem.innerHTML = '';

  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.error('Error: ' + err);
  }
}
