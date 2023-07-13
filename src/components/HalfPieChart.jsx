import React , { useEffect, useRef}  from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs} from 'chart.js/auto';
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import './HalfPieChart.scss'


function HalfPieChart({initialData, path, size, data, callbackUpdate , dataRef, options = {}}) {
    
    const chartOption = {
        cutout: '70%',
        rotation : -90,
        circumference : 180,
        responsive: true,
        events: [],
        plugins: {
            legend: {
                display: false // This hides all text in the legend and also the labels.
            }
        },
        ...options, 
    }

    const chartReference = useRef()
    
    useEffect(() => {
        
        
        const query = ref(db, path);
        return onValue(query, (firebaseData) => {
            const value = firebaseData.val()
            updateData(value)
        });
        

    }, []);
    

    function updateData(value) {
        
        
        if (dataRef.current) {
            dataRef.current.innerText = Math.trunc(value);
        }
        if (chartReference.current) {
            const chart = chartReference.current;
            if (callbackUpdate) {
                callbackUpdate(chart, value, data.verde, data.amarelo, data.vermelho);
            }
        }
    }

    return (
        <>
        <Doughnut ref={chartReference} data={initialData} options={chartOption} className={`${size} chart`}/>
        </>
    )
    
}


export default HalfPieChart;