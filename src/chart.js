
const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const labels = ['MQ-2', 'MQ-9', 'MQ-8'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Sensors',
      data: [0,0,0],
      backgroundColor: ['#EF5B0C','#39B5E0', '#003865']
    }
  ]
};

const config = {
    type: 'polarArea',
    data: data,
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
      }
    },
};

const ctx = document.getElementById('live-monitoring');

const chartConfig = {config, ctx}

function updateChartValue(chart, value, label='MQ-2') {
    const position = chart.data.labels.indexOf(label)

    console.log({position, label }, chart.data.labels);

    if ( position === -1 || !isFinite(value)) return

    chart.data.datasets.forEach((dataset) => {
        dataset.data[position] = Number(value);
    });

    chart.update()
}

export {updateChartValue, chartConfig}