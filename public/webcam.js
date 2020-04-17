function startVideo() {
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  navigator.getMedia(
    // constraints
    { video: true, audio: false },

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

  //var video = document.getElementsByTagName('video')[0];
  video.style.height = '0px';
  video.style.width = '0px';
}
