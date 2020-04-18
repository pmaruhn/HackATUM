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
    var questions = [];
    var questionParent = document.getElementById('questions');
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      var questionELM = document.createElement('div');
      questionELM.setAttribute('class', 'question');
      questionELM.innerText = childData.learner + ':		' + childData.question;
      questions.push(questionELM);
    });
    questionParent.innerHTML = '';
    questionParent.append(...questions);
    return 0;
  });
