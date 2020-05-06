// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.getElementById('sounds');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

// select our play button
const playButton = document.getElementById('playbutton');

// playButton.addEventListener(
//     'click',
//     function () {
//         // check if context is in suspended state (autoplay policy)
//         if (audioContext.state === 'suspended') {
//             audioContext.resume();
//         }

//         // play or pause track depending on state
//         if (this.dataset.playing === 'false') {
//             console.log('play');
//             audioElement.play();
//             this.dataset.playing = 'true';
//         } else if (this.dataset.playing === 'true') {
//             audioElement.pause();
//             this.dataset.playing = 'false';
//         }
//     },
//     false
// );