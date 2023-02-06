import React, {useEffect, useRef} from 'react'
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js';
import { enUS } from 'date-fns/locale'

let data = {
  datasets: [{
      data: [{
          x: '2016-2-11',
          y: 0
      }, {
          x: '2016-1-11',
          y: 0
      }, {
          x: '2016-1-11',
          y: 0
      }]
  }],
};

const option = {
  scales: {
    y: {
      title: {display: true, text: 'Weight in lbs'}
    },
    x: {
      display: false,
      adapters: {
        date: {locale: enUS},
        type: 'time',
        distribution: 'linear',
        time: {
          parser: 'yyyy-MM-dd',
          unit: 'month'
        },
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  },
  responsive: true,
  plugins: {
      legend: {
          display: false // This hides all text in the legend and also the labels.
      }
  },
}

function HistoryGasLeak() {
  
  function getCleanData(data) {
    let dataset = []

    if (!data || !history.current) return

    for (let month in data) {
      const monthValue = data[month];
      
      for ( let day in monthValue) {
        const daysValue = monthValue[day];
        
        for ( let hours in daysValue) {
          
          const cleanData = { 
            x : `${day[3]+day[4]}-${month} ${hours[0]+hours[1]}:${daysValue[hours].MINUTOS}`, 
            y : daysValue[hours].VALOR
          }
          dataset.push(cleanData);

        }

      }

    }
    const chart = history.current;
    chart.data.datasets[0].data = dataset;

    chart.update()
    
  }
  const history = useRef()

  
  const query = ref(db, '/VAZAMENTO/');
  (function () {
    onValue(query, (firebaseData) => {
      const value = firebaseData.val() || '';
      getCleanData(value)
    })
  })()
  
  return (
     <Line ref={history}  data={data} options={option} />  
  )
}

export default HistoryGasLeak