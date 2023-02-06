import React, {useState, useEffect} from 'react'
import { database as db } from './../utils/firebase';
import { onValue, ref, get } from 'firebase/database';
import './ReportsTable.scss'
function ReportsTable() {

    const [reports, setReports] = useState([])
    
    function getCleanData(data) {
        let dataset = []
    
        if (!data ) return
    
        for (let month in data) {
          const monthValue = data[month];
          
          for ( let day in monthValue) {
            const daysValue = monthValue[day];
            
            for ( let hours in daysValue) {
            //   day = day[3]+day[4]
            const cleanData = {
                sensor: 'mq-2' ,
                date : `${day[3]+day[4]}-${month} ${hours[0]+hours[1]}:${daysValue[hours].MINUTOS}`, 
                value : daysValue[hours].VALOR
            }
              dataset.push(cleanData);
            }
          }
          
        }
        setReports(dataset.reverse())
    }

    useEffect(() => {
        
        const query = ref(db, '/VAZAMENTO/')
        get(query).then((snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val() || '';
                getCleanData(value)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        })
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Sensor</th>
                    <th>Date</th>
                    <th>Concentration (ppm)</th>
                </tr>
            </thead>
            <tbody >
                {
                    reports.map( (report, index) => {
                        return (
                            <tr key={index}>
                                <td data-label="Sensor">{report.sensor}</td>
                                <td data-label="Date">{report.date}</td>
                                <td data-label="Value">{report.value}</td>
                            </tr>
                        )
                    })
                }
                

            </tbody>
        </table>
    )
}

export default ReportsTable