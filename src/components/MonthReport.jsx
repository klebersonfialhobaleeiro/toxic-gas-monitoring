import React, { useState } from 'react'
import temperatura from  '../assets/gas-mask.svg'
import heart from  '../assets/gas-mask.svg'
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import HistoryRecord from './HistoryRecord';
import './MonthReport.scss'

function MonthReport({data}) {
    
    const [isExpanded, setIsExpanded] = useState(false)
    const statistics = useStatistics(data);
    const handleExpande = () => {
        setIsExpanded(!isExpanded);
    }

    return (

        <div className="month_report" onClick={(e) => { handleExpande() }}>
            <h2>{statistics.date}</h2>

            <div className="statistics">
                { isExpanded ? <MdExpandLess className='action' size={20}/> : <MdExpandMore className='action' size={20}/>}
                <div className="card">
                    <div className="header">
                        <img src={heart} alt="" className="icon mask-icon" />
                        <h3 className="title">MQ-2</h3>
                        <a href="https://www.google.com/search?q=metano+GAS" title='Metano' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">CH4</span>
                        </a>
                        <a href="https://www.google.com/search?q=C4H10+GAS" title='Butano' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">C4H10</span>
                        </a>
                        <a href="https://www.google.com/search?q=H2+GAS" title='Propano' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">C3H8</span>
                        </a>
                        <a href="https://www.google.com/search?q=H2+GAS" title='Hidrogênio' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">H2</span>
                        </a>
                        <a href="https://www.google.com/search?q=fumaca+GAS" title='Fumaça' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">Fumaça</span>
                        </a>

                    </div>
                    <div className="body">
                        <div className="insight">
                            <h4 className='label'>Minímo</h4>
                            <span className="value">{statistics.mq2Min} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Média</h4>
                            <span className="value">{statistics.mq2Media} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Maxímo</h4>
                            <span className="value">{statistics.mq2Max} pm</span> 
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="header">
                        <img src={heart} alt="" className="icon mask-icon" />
                        <h3 className="title">MQ-8</h3>
                        <a href="https://www.google.com/search?q=H2+GAS" title='Hidrogênio' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">H2</span>
                        </a>
                    </div>
                    <div className="body">
                        <div className="insight">
                            <h4 className='label'>Minímo</h4>
                            <span className="value">{statistics.mq8Min} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Média</h4>
                            <span className="value">{statistics.mq8Media} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Maxímo</h4>
                            <span className="value">{statistics.mq8Max} pm</span> 
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="header">
                        <img src={heart} alt="" className="icon mask-icon" />
                        <h3 className="title">MQ-9</h3>
                        <a href="https://pt.wikipedia.org/wiki/Mon%C3%B3xido_de_carbono" title='Monóxido de carbono' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">CO</span>
                        </a>
                        <a href="https://www.google.com/search?q=GLP+GAS" title='Gás de cozinha' className="badge" target="_blank" rel="noopener noreferrer">
                            <span className="badge-text">GLP</span>
                        </a>
                    </div>
                    <div className="body">
                        <div className="insight">
                            <h4 className='label'>Minímo</h4>
                            <span className="value">{statistics.mq9Min} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Média</h4>
                            <span className="value">{statistics.mq9Media} pm</span> 
                        </div>
                        <div className="insight">
                            <h4 className='label'>Maxímo</h4>
                            <span className="value">{statistics.mq9Max} pm</span> 
                        </div>
                    </div>
                </div>
            </div>
            { !isExpanded ? '' : 

                data.map((record, index) => {
                    return (
                        <HistoryRecord data={record} key={index}/>
                    )
                })
            
            }
        </div>

    )
}

export default MonthReport;


function useStatistics(data) {
        let info = {
            countChama : 0,
            countMq2 : 0,

            mq2Max: Number.MIN_SAFE_INTEGER,
            mq8Max: Number.MIN_SAFE_INTEGER,
            mq9Max: Number.MIN_SAFE_INTEGER,

            mq2Min: Number.MAX_SAFE_INTEGER,
            mq8Min: Number.MAX_SAFE_INTEGER,
            mq9Min: Number.MAX_SAFE_INTEGER,

            mq2Media: 0,
            mq8Media: 0,
            mq9Media: 0,

            date: data[0].date
        }
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            const { mq2, mq8, mq9 } = data[index];
          
            info.countMq2 = mq2 ? info.countMq2 + 1 : info.countMq2;
            console.log(info.mq2Media);
            info.mq2Media = !mq2 ? info.mq2Media : info.mq2Media ? info.mq2Media + mq2 : mq2;
            info.mq8Media = !mq8 ? info.mq8Media : info.mq8Media ? info.mq8Media + mq8 : mq8;
            info.mq9Media = !mq9 ? info.mq9Media : info.mq9Media ? info.mq9Media + mq9 : mq9;
          
            if (mq2 >= info.mq2Max) info.mq2Max = mq2;
            if (mq2 < info.mq2Min) info.mq2Min = mq2;
          
            if (mq8 >= info.mq8Max) info.mq8Max = mq8;
            if (mq8 < info.mq8Min) info.mq8Min = mq8;
          
            if (mq9 >= info.mq9Max) info.mq9Max = mq9;
            if (mq9 < info.mq9Min) info.mq9Min = mq9;
          }
          
          console.log(info.countMq2);
          
          info.mq2Media = Math.floor(info.mq2Media / info.countMq2);
          info.mq8Media = Math.floor(info.mq8Media / info.countMq2);
          info.mq9Media = Math.floor(info.mq9Media / info.countMq2);
          
        
        const meses = new Map([  
            [1, 'Janeiro'],
            [2, 'Fevereiro'],
            [3, 'Março'],
            [4, 'Abril'],
            [5, 'Maio'],
            [6, 'Junho'],
            [7, 'Julho'],
            [8, 'Agosto'],
            [9, 'Setembro'],
            [10, 'Outubro'],
            [11, 'Novembro'],
            [12, 'Dezembro']
        ]);

          

        const [day, month, year] = info.date.split('-');

        info.date = `${meses.get(Number(month))} de ${year}`

        return info
}