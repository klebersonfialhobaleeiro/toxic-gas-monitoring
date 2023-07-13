import React, { useRef } from 'react';
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import moment from 'moment/moment';
import { MdOutlineUpdate, Md123 } from 'react-icons/md';

import './LineChartFC.scss';

let data = {
  datasets: [
    {
      data: [],
    },
  ],
};

function LineChartFC({ firebasePath, name, unity, valorAtual, min, max }) {
  const history = useRef();

  const query = ref(db, firebasePath);
  (function () {
    onValue(query, (firebaseData) => {
      const value = firebaseData.val() || '';

      if (!data || !history.current) return;
      updateChart(value);
    });
  })();

  (function () {
    onValue(ref(db, firebasePath), (firebaseData) => {
      const value = firebaseData.val() || '';

      if (!valorAtual.current) {
        valorAtual.current.innerText = value.valor;
        updateChart(valorAtual);
      }
    });
  })();

  function updateChart(value) {
    const chart = history.current;
    valorAtual.current.innerText = value;

    let dataset = [...chart.data.datasets[0].data];
    dataset.push({
      x: moment().format('YYYY/MM/DD HH:mm:ss'),
      y: value,
    });

    chart.data.datasets[0].data = dataset;

    chart.update();
  }

  return (
    <div className='chart-container'>
      <Line
        ref={history}
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${name} (${unity})`,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ' ' + context.parsed.y + ' ' + unity;
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value, index, values) {
                  return value + ' ' + unity;
                },
              },
              min: min, // Valor mínimo do eixo x
              max: max, // Valor máximo do eixo x
            },
            x: {
              ticks: {
                display: false,
              },
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y',
          },
        }}
      />
    </div>
  );
}

export default LineChartFC;
