var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var ctxAgreementBarChart = document.getElementById('agreementBarChart');
var ctxEmotionBarChart = document.getElementById('emotionBarChart');
var ctxPleasantChart = document.getElementById('pleasantChart');
var ctxSleepingChart = document.getElementById('sleepingChart');

var AgreementBarChartObject = new Chart(ctxAgreementBarChart, {
  type: 'bar',
  data: {
    labels: ['agree', 'disagree'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(155, 240, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
      },
    ],
  },
  options: {
    legend: {
      display: false,
      labels: {
        fontColor: 'white',
        fontSize: 18,
        fontFamily: "'Alegreya Sans', sans-serif",
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
            fontColor: 'white',
            fontSize: 18,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white',
            fontSize: 14,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var EmotionBarChartObject = new Chart(ctxEmotionBarChart, {
  type: 'bar',
  data: {
    labels: ['angry', 'disgust', 'fear', 'sad', 'neutral', 'happy', 'surprise'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(155, 240, 86, 1)',
        ],
      },
    ],
  },
  options: {
    legend: {
      display: false,
      labels: {
        fontColor: 'white',
        fontSize: 18,
        fontFamily: "'Alegreya Sans', sans-serif",
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
            fontColor: 'white',
            fontSize: 18,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white',
            fontSize: 14,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var PleasantChartObject = new Chart(ctxPleasantChart, {
  type: 'radar',
  data: {
    labels: ['Intense', 'Pleasant', 'Mild', 'Unpleasant'],
    datasets: [
      {
        backgroundColor: 'rgba(0,128,128,1)',
        data: [0, 0, 0, 0],
      },
    ],
  },
  options: {
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    scale: {
      pointLabels: {
        fontColor: 'white',
        fontSize: 14,
        stepSize: 1,
        fontFamily: "'Alegreya Sans', sans-serif",
        beginAtZero: true,
      },
      ticks: {
        display: false,
      },
      gridLines: {
        display: false,
      },
    },
  },
});

function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({ length: count }).map(() => Math.random() * delta + min);
}

const boxplotData = {
  // define label tree
  labels: [],
  datasets: [
    {
      label: 'Dataset 1',
      backgroundColor: 'rgba(0,128,128,1)',
      borderColor: 'rgba(0,128,128,1)',
      medianColor: 'white',
      itemRadius: 0,
      itemBackgroundColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1,
      outlierColor: '#999999',
      lowerColor: 'red',
      data: [[0]],
    },
  ],
};

SleepingChartObject = new Chart(ctxSleepingChart, {
  type: 'horizontalBoxplot',
  data: boxplotData,
  options: {
    title: {
      display: true,
      fontColor: 'white',
      fontSize: 14,
      stepSize: 1,
      fontFamily: "'Alegreya Sans', sans-serif",
      position: 'bottom',
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'white',
        fontSize: 18,
        fontFamily: "'Alegreya Sans', sans-serif",
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
            fontColor: 'white',
            fontSize: 18,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white',
            fontSize: 10,
            stepSize: 1,
            fontFamily: "'Alegreya Sans', sans-serif",
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
