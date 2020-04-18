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

    function addArray(array1, array2) {
      var sum = array1.map(function (num, idx) {
        return num + array2[idx];
      });
      return sum;
    }

    //Update Charts
    arousal = [0, 0, 0, 0]; // 'Intense', 'Pleasant', 'Mild', 'Unpleasant'
    emotionCounts = [0, 0, 0, 0, 0, 0, 0]; // angry, disgust, fear, happy, neutral, sad, surprise
    sleepiness = [];
    for (element in currentStates) {
      switch (currentStates[element].mood) {
        case 'angry':
          emotionCounts[0] += 1;
          arousal = addArray(arousal, [0.5, 0.75, 0, 0]);
          sleepiness.push(-0.4);
          break;
        case 'disgust':
          emotionCounts[1] += 1;
          arousal = addArray(arousal, [0.5, 0, 0, 0.4]);
          sleepiness.push(0.33);
          break;
        case 'fear':
          emotionCounts[2] += 1;
          arousal = addArray(arousal, [0.75, 0, 0, 0.5]);
          sleepiness.push(0.75);
          break;
        case 'sad':
          emotionCounts[3] += 1;
          arousal = addArray(arousal, [0, 0, 0.3, 0.75]);
          sleepiness.push(-0.5);
          break;
        case 'neutral':
          emotionCounts[4] += 1;
          arousal = addArray(arousal, [0, 0, 0.5, 0]);
          sleepiness.push(-0.75);
          break;
        case 'happy':
          emotionCounts[5] += 1;
          arousal = addArray(arousal, [0.5, 0.8, 0, 0]);
          sleepiness.push(0.75);
          break;
        case 'surprise':
          emotionCounts[6] += 1;
          arousal = addArray(arousal, [0.8, 0.3, 0, 0]);
          sleepiness.push(1);
          break;

        default:
          console.log('emotion missing');
          break;
      }
    }
    EmotionBarChartObject.data.datasets[0].data = emotionCounts;
    EmotionBarChartObject.update();

    PleasantChartObject.data.datasets[0].data = arousal;
    PleasantChartObject.update();

    SleepingChartObject.data.datasets[0].data = [sleepiness];
    SleepingChartObject.update();
  });
