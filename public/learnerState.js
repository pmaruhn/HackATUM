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
          element.agreement = datapoint.data.agreement;
          uniqueUser = false;
        }
      });
      if (uniqueUser) {
        currentStates.push({
          user: datapoint.user,
          mood: datapoint.data.mood,
          agreement: datapoint.data.agreement,
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
    agreementCounts = [0, 0]; //'agree', 'disagree'
    arousal = [0, 0, 0, 0]; // 'Intense', 'Pleasant', 'Mild', 'Unpleasant'
    emotionCounts = [0, 0, 0, 0, 0, 0, 0]; // angry, disgust, fear, happy, neutral, sad, surprise
    sleepiness = [];
    for (element in currentStates) {
      switch (currentStates[element].agreement) {
        case 'agree':
          agreementCounts[0] += 1;
          break;
        case 'disagree':
          agreementCounts[1] += 1;
          break;
        default:
          console.log('neutral agreement');
          break;
      }
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
    AgreementBarChartObject.data.datasets[0].data = agreementCounts;
    AgreementBarChartObject.update();

    EmotionBarChartObject.data.datasets[0].data = emotionCounts;
    EmotionBarChartObject.update();

    PleasantChartObject.data.datasets[0].data = arousal;
    PleasantChartObject.update();

    SleepingChartObject.data.datasets[0].data = [sleepiness];
    SleepingChartObject.update();

    if (emotionCounts[0] >= 1) {
      // playSound('sounds/emotions/angry.m4a');
    }
    if (emotionCounts[1] >= 1) {
      // playSound('sounds/emotions/disgust.m4a');
    }
    if (emotionCounts[2] >= 1) {
      // playSound('sounds/emotions/fear.m4a');
    }
    if (emotionCounts[3] >= 1) {
      // playSound('sounds/emotions/sad.m4a');
    }
    if (emotionCounts[4] >= 1) {
      // playSound('sounds/emotions/neutral.m4a');
    }
    if (emotionCounts[5] >= 1) {
      // playSound('sounds/emotions/happy.m4a');
    }
    if (emotionCounts[6] >= 1) {
      // playSound('sounds/emotions/surprise.m4a');
    }
  });
