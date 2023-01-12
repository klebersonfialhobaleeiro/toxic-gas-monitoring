const GREEN_COLOR = '#44e657';
const YELLOW_COLOR = '#e4e418';
const RED_COLOR = '#ed4f4f';

const sensorsLabels = ['MQ-2', 'MQ-9', 'MQ-8'];

const sensorsData = {
  labels: sensorsLabels,
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

const sensorsConfig = {
    type: 'polarArea',
    data: sensorsData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Gas monitoring'
        }
      },
      elements: {
        arc: {
            borderWidth: 0
        }
      },
      scales: {
        r: {
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

const sensorsCtx = document.getElementById('sensors-chart');
const sensors = {config: sensorsConfig, ctx: sensorsCtx}

const leasksLabels = ['LGP']

const leakLGPData = {
  labels : leasksLabels,
  datasets: [
    {
      label: 'ppm',
      data: [85,15],
      backgroundColor: [
         GREEN_COLOR, 
        'rgba(255, 255, 255, 0.4)',
      ],
      borderWidth: [1, 0, 0, 1]
    }
  ]
}

const leakLGPConfig = {
  type: 'doughnut',
  data: leakLGPData,
  options: {
    cutout: '70%',
    rotation : -90,
    circumference : 180,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gas monitoring'
      }
    },
  },
};

const leakLGPctx = document.getElementById('lgp-chart');

const leaksLGP = {ctx: leakLGPctx, config: leakLGPConfig};





export {sensors, leaksLGP}