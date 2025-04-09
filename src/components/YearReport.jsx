import React from 'react'
import MonthReport from './MonthReport'

import './YearReport.scss'


function YearReport({month}) {
  return (
    <div className='yearReport'>
        {
            month.map((data, index) => {
                return (
                    <MonthReport data={data} key={index}/>
                )
            })
        }
    </div>
  )
}

export default YearReport