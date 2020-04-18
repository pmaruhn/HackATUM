// webRTC Video Stream
RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
var database = firebase.database().ref('/videostream');
var video = document.getElementById('video');
var teacherVideo = document.getElementById('teacherVideo');
var yourId = Math.floor(Math.random() * 1000000000);
var servers = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'RX2mC4UFC5ybnYPe',
      username: 'philipp.maruhn@tum.de',
    },
  ],
};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event) =>
  event.candidate
    ? publishStream(yourId, JSON.stringify({ ice: event.candidate }))
    : console.log('Sent All Ice');
pc.ontrack = function (event) {
  console.log('here');
  document.getElementById('teacherVideo').srcObject = event.streams[0];
};

function publishStream(senderId, data) {
  //   console.log(senderId);
  //   var msg = firebase
  //     .database()
  //     .ref('/videostream')
  //     .push({ sender: senderId, message: data });
  //   //msg.remove();
}

function readMessage(data) {
  var msg = JSON.parse(data.val().message);
  console.log(msg.sdp);
  var sender = data.val().sender;
  //   if (sender != yourId) {
  if (msg.ice != undefined) pc.addIceCandidate(new RTCIceCandidate(msg.ice));
  else if (msg.sdp.type == 'offer')
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
  // .then(() => pc.createAnswer())
  // .then((answer) => pc.setLocalDescription(answer));
  // .then(() =>
  //   publishStream(yourId, JSON.stringify({ sdp: pc.localDescription }))
  // );
  //else if (msg.sdp.type == 'answer')
  //pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
  //   }
}

//database.once('value').then(readMessage);
database.on('child_added', readMessage);

// function showMyFace() {
//   navigator.mediaDevices
//     .getUserMedia({ audio: true, video: true })
//     .then((stream) => {
//       if (video !== null) {
//         video.srcObject = stream;
//       }
//     })
//     .then((stream) => pc.addStream(stream))
//     .then(showFriendsFace());
// }

// function showFriendsFace() {
//   pc.createOffer()
//     .then((offer) => pc.setLocalDescription(offer))
//     .then(() =>
//       publishStream(yourId, JSON.stringify({ sdp: pc.localDescription }))
//     );
// }
