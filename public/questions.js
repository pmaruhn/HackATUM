var functions = firebase.functions();
const ttsreq = firebase.functions().httpsCallable('ttsreq');

// Reset Chat
firebase.database().ref('/questions').remove();

//Demo Questions
chat = [
  {
    name: 'Dwight',
    content:
      'Powerpoints are the peacocks of the business world; all show, no meat.',
  },
  {
    name: 'Michael',
    content: 'I don’t hate it. I just don’t like it at all and it’s terrible.',
  },
  { name: 'Angela', content: 'I normally don’t enjoy making people laugh.' },
  {
    name: 'Kelly',
    content: 'I talk a lot, so I’ve learned to tune myself out.',
  },
];

function postDemo(i) {
  var delay = Math.floor(Math.random() * (40 - 5 + 1)) + 5;
  setTimeout(function () {
    saveToFirebase(chat[i].name, chat[i].content);
  }, delay * 1000);
}

for (post in chat) {
  postDemo(post);
}

//Manage Questions
function pushQuestionToDatabase() {
  var x = document.getElementById('frm1');
  saveToFirebase(x.elements[0].value, x.elements[1].value);
  x.elements[0].value = '';
  x.elements[1].value = '';
}
function saveToFirebase(name, content) {
  var questionObject = {
    learner: name,
    question: content,
  };
  firebase
    .database()
    .ref('/questions')
    .push()
    .set(questionObject)
    .then(
      function (snapshot) {
        console.log('SUCCESS YAY'); // some success method
      },
      function (error) {
        console.log('aw man not an error! ' + error);
      }
    );
}

firebase
  .database()
  .ref('/questions')
  .on('value', function (snapshot) {
    document.getElementById('notifications').play();
    var lastQuestion = '';
    var questions = [];
    var questionParent = document.getElementById('questions');
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      lastQuestion = childData;
      var questionELM = document.createElement('div');
      questionELM.setAttribute('class', 'question');
      questionELM.innerHTML =
        '<h4 class="chatLearner">' +
        childData.learner +
        '</h4> <p class="chatQuestion">' +
        childData.question +
        '</p>';
      questions.push(questionELM);
    });
    questionParent.innerHTML = '';
    questionParent.append(...questions);

    //Read aloud question
    ttsreq(lastQuestion)
      .then(function (result) {
        console.log(result.data);
        // Read result of the Cloud Function.
        // var audioElement = document.createElement('audio');
        // audioElement.src = result;
        // //audioElement.crossOrigin = 'anonymous';
        // audioElement.play();
        // // pass it into the audio context
        // const track = audioContext.createMediaElementSource(audioElement);
        // track.connect(audioContext.destination);
        // ...
      })
      .catch(function (error) {
        console.log(error);
      });

    return 0;
  });
