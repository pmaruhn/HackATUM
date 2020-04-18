var ctxEmotionBarChart = document.getElementById('emotionBarChart');
var ctxPleasantChart = document.getElementById('pleasantChart');

var EmotionBarChartObject = new Chart(ctxEmotionBarChart, {
  type: 'bar',
  data: {
    labels: ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'],
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
      labels: {
        fontColor: 'white',
        fontSize: 18,
        fontFamily: "'Alegreya Sans', sans-serif",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
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
        data: [20, 10, 4, 2],
      },
    ],
  },
  options: {
    legend: {
      labels: {
        display: false,
      },
    },
    scale: {
      gridLines: false,
    },
  },
});
