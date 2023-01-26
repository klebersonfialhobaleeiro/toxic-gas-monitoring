import React , { useState, useRef}  from 'react'
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJs} from 'chart.js/auto';
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import './HalfPieChart.scss'


function PolarAreaChart({initialData, callbackUpdate , size='big', options = {}}) {
    
    const chartOption = options.options
    const chartReference = useRef();

    const sensorsInfo = [
        {chartLabel:'MQ-2', firebasePath: '/MQ2 Sensor/Valor'}, 
        {chartLabel:'MQ-8', firebasePath: '/MQ8 Sensor/Valor'}, 
        {chartLabel:'MQ-9', firebasePath: '/MQ9 Sensor/Valor'},
    ];
      
      sensorsInfo.forEach((s) => {
      
        const path = ref(db,  s.firebasePath);
      
        onValue(path, (response) => {
          const data = response.val();
          updateData(data, s.chartLabel, chartReference )
        });
    });


    function updateData(value, label, ref) {
        
        if (ref) {
            const chart = ref.current;
            if (callbackUpdate) {
                callbackUpdate(chart, value, label);
            }
        }
        
    }

    return (
        <>
        <PolarArea ref={chartReference} data={initialData} options={chartOption}  className={`${size} chart`}/>
        </>
    )
    
}


export default PolarAreaChart;