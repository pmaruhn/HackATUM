// Initialiase array to Store current user states
var currentStates = [];
var learnerCount = 0;
var emotionCounts = [0, 0, 0, 0, 0, 0, 0]; // angry, disgust, fear, happy, neutral, sad, surprise

// Get learner states
firebase
  .database()
  .ref('/learnerStates')
  .on('value', function (snapshot) {
    console.log('New Data, updating...');
    var comments = [];
    var commentParent = document.getElementById('data');
    snapshot.forEach(function (childSnapshot) {
      var datapoint = childSnapshot.val();
      var uniqueUser = true;
      currentStates.forEach((element) => {
        if (element.user == datapoint.user) {
          element.mood = datapoint.data.mood;
          uniqueUser = false;
        }
      });
      if (uniqueUser) {
        currentStates.push({
          user: datapoint.user,
          mood: datapoint.data.mood,
        });
      }
      learnerCount = currentStates.length;
      document.getElementById('learnerCount').innerText = learnerCount;
    });

    //Update Charts
    emotionCounts = [0, 0, 0, 0, 0, 0, 0]; // angry, disgust, fear, happy, neutral, sad, surprise
    for (element in currentStates) {
      switch (currentStates[element].mood) {
        case 'angry':
          emotionCounts[0] += 1;
          break;
        case 'disgust':
          emotionCounts[1] += 1;
          break;
        case 'fear':
          emotionCounts[2] += 1;
          break;
        case 'happy':
          emotionCounts[3] += 1;
          break;
        case 'neutral':
          emotionCounts[4] += 1;
          break;
        case 'sad':
          emotionCounts[5] += 1;
          break;
        case 'surprise':
          emotionCounts[6] += 1;
          break;

        default:
          console.log('emotion missing');
          break;
      }
    }
    EmotionBarChartObject.data.datasets[0].data = emotionCounts;
    EmotionBarChartObject.update();
  });
