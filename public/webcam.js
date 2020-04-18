const presentationElem = document.getElementById('presentation');
const audioElem = document.getElementById('audio');
const videoElem = document.getElementById('video');

function startVideo() {
  navigator = navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  navigator.getMedia(
    { video: true, audio: false },
    // success callback
    function (stream) {
      videoElem.srcObject = stream;
      videoElem.play();
    },
    //handle error
    function (error) {
      console.log(error);
    }
  );
}

function startAudio(l) {
  navigator = navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  navigator.getMedia(
    { video: false, audio: true },
    // success callback
    function (stream) {
      audioElem.srcObject = stream;
      audioElem.play();
    },
    //handle error
    function (error) {
      console.log(error);
    }
  );
}

function stopAudio() {
  let tracks = audioElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  audioElem.srcObject = null;
}

function stopVideo() {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

var displayMediaOptions = {
  video: {
    cursor: 'always',
  },
  audio: false,
};

async function startCapture() {
  // logElem.innerHTML = '';

  try {
    presentationElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.error('Error: ' + err);
  }
}

function stopCapture(evt) {
  let tracks = presentationElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  presentationElem.srcObject = null;
}

function dumpOptionsInfo() {
  const presentationTracks = presentationElem.srcObject.getVideoTracks()[0];

  console.info('Track settings:');
  console.info(JSON.stringify(presentationTracks.getSettings(), null, 2));
  console.info('Track constraints:');
  console.info(JSON.stringify(presentationTracks.getConstraints(), null, 2));
}
