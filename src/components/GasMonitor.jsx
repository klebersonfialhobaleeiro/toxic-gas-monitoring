import React, { useRef } from 'react'
import HalfPieChart from '../components/HalfPieChart';
import { TfiDashboard } from 'react-icons/tfi'
import useGetDataFirebase from './../hooks/getDataFirebase'
import './GasMonitor.scss'
import Badge from './Badge';
import gasmask from '../assets/gas-mask.svg';


function GasMonitor({ name, icon,  data, callbackUpdate, path, badges ,date}) {
    const max = useGetDataFirebase(path);
    const dataRef = useRef()

    return (
            <div className="GasMonitor">
                <div className="GasMonitor__header">
                    <img src={gasmask} alt="" className="icon mask-icon" />

                    <h3 className="GasMonitor__header__title"> {name} </h3> 
                        <div className="badges">
                            {badges.map((badge, index) => (
                                <Badge
                                key={index}
                                href={badge.href}
                                title={badge.title}
                                className={badge.className}
                                >
                                {badge.text}
                                </Badge>
                            ))}
                        </div>
                </div>
                <div className="GasMonitor__content">
                    <span className="GasMonitor__content__data" > 
                        <span ref={dataRef} className='GasMonitor__content__data'> </span>  
                        <span className="text-muted">ppm</span>
                    </span>
                </div>
                <div className="GasMonitor__graph">

                    { !max ? "" : 

                        <HalfPieChart
                            initialData={data}
                            callbackUpdate={callbackUpdate}
                            path= {path+"valor_atual"}
                            dataRef={dataRef}
                            data={data}
                        />

                    }
                </div>
                <footer className="text-muted">Saiba mais</footer>
            </div>
    )
}

export default GasMonitor