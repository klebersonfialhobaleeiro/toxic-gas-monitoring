const GREEN_COLOR = '#44e657';
const YELLOW_COLOR = '#e4e418';
const RED_COLOR = '#ed4f4f';

export const sensorsData = {
  labels: ['MQ-2', 'MQ-9', 'MQ-8'],
  datasets: [
    {
      label: 'Sensors',
      data: [0,0,0],
      backgroundColor: [
        'rgba(240, 92, 13, 0.7)',
        'rgb(57, 181, 224, 0.7)', 
        'rgba(0, 56, 101,  0.7)'
      ]
    }
  ]
};

export const sensorsOptions = {
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monitoramento de gases tóxicos'
        }
      },
      elements: {
        arc: {
            borderWidth: 0
        }
      },
      scales: {
        r: {
          min: 0,
          max: 1024,
          ticks: {
            color: 'black',
            z : 2,
            backdropColor: 'rgba(255, 255, 255, 0.65)'
          },
          grid: {
            color: 'gray'
          }
        }
      }
    },
};

const leakLPGData = {
  labels :  ['LGP'],
  datasets: [
    {
      label: 'ppm',
      data: [0,0],
      backgroundColor: [
        'rgba(255, 255, 255, 0.4)',
        '#a6a9ada9',
      ],
      borderWidth: [1, 0, 0, 1]
    }
  ]
};

export { leakLPGData };