import React from 'react';
import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';
import { useLocation } from 'react-router-dom'


import useFirebaseDataHistory from '../hooks/history'
import YearReport from '../components/YearReport'

import ChartComponent from '../components/ChartHistory'

function Reports() {

    const data = useFirebaseDataHistory('/historico/')
    const info = separateByMonth( data )

    function separateByMonth (data) {
        if ( !data ) return;
        let d = {}
        
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const [day, month, year] = element.date.split('-');

            if ( d[year] ) {
                if ( d[year][month] ){
                    d[year][month].push(element);
                    continue;
                }

                d[year][month] = [element]
                continue;
                
            } else {
                
                d[year] = {
                    [month] : [element]
                }
            }
        }
        
        d = Object.values(d);

        for (let index = 0; index < d.length; index++) {
            const element = d[index];
            d[index] = Object.values(element)     
        }
        
        return d
    }

    return (
        <>
            <Sidebar active={ '/reports' }/>
            <main className="content">
                <Navbar />
                <ChartComponent data={data} />
                { 
                    info.reverse().map((data, index) => {
                        return (
                        <YearReport month={data} key={index}/>
                        )
                    })
                }
            </main>
        </>
    )
}

export default Reports

