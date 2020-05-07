var functions = firebase.functions();
const tts = firebase.functions().httpsCallable('tts');

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
    tts(lastQuestion)
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
