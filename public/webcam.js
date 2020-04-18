// webRTC Video Stream
var database = firebase.database().ref('/videostream');
var video = document.getElementById('video');
var friendsVideo = document.getElementById('friendsVideo');
var yourId = Math.floor(Math.random() * 1000000000);
var servers = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'webrtc',
      username: 'websitebeaver@mail.com',
    },
  ],
};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event) =>
  event.candidate
    ? sendMessage(yourId, JSON.stringify({ ice: event.candidate }))
    : console.log('Sent All Ice');
pc.onaddstream = (event) => (friendsVideo.srcObject = event.stream);

function sendMessage(senderId, data) {
  console.log(senderId);
  var msg = firebase
    .database()
    .ref('/videostream')
    .push({ sender: senderId, message: data });
  msg.remove();
}

function readMessage(data) {
  var msg = JSON.parse(data.val().message);
  var sender = data.val().sender;
  if (sender != yourId) {
    if (msg.ice != undefined) pc.addIceCandidate(new RTCIceCandidate(msg.ice));
    else if (msg.sdp.type == 'offer')
      pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
        .then(() => pc.createAnswer())
        .then((answer) => pc.setLocalDescription(answer))
        .then(() =>
          sendMessage(yourId, JSON.stringify({ sdp: pc.localDescription }))
        );
    else if (msg.sdp.type == 'answer')
      pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
  }
}

database.on('child_added', readMessage);

function showMyFace() {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => (video.srcObject = stream))
    .then((stream) => pc.addStream(stream));
}

function showFriendsFace() {
  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .then(() =>
      sendMessage(yourId, JSON.stringify({ sdp: pc.localDescription }))
    );
}

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
