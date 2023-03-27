import React, { useRef } from 'react'
import HalfPieChart from '../components/HalfPieChart';
import { TfiDashboard } from 'react-icons/tfi'
import './GasMonitor.scss'

function GasMonitor({ name, icon,  data, callbackUpdate, path, date}) {

    const dataRef = useRef()
  return (
        <div className="GasMonitor">
            <div className="GasMonitor__header">
                {icon}
                <h3 className="GasMonitor__header__title"> {name} </h3>
            </div>
            <div className="GasMonitor__content">
                <span className="GasMonitor__content__data" > 
                    <span ref={dataRef} className='GasMonitor__content__data'> </span>  
                    <span className="text-muted">ppm</span>
                </span>
            </div>
            <div className="GasMonitor__graph">
                <HalfPieChart
                    initialData={data}
                    callbackUpdate={callbackUpdate}
                    path= {path+"Valor"}
                    dataRef={dataRef}
                    maxValue={10}
                  />
            </div>
            <footer className="text-muted">Saiba mais</footer>
        </div>
  )
}

export default GasMonitor