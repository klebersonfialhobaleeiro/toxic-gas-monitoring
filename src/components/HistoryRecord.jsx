import React from 'react'
import mask from  '../assets/gas-mask.svg'
import chama from  '../assets/chama.svg'

import './HistoryRecord.scss'

function HistoryRecord({data}) {
    

  return (
    <div className="record">
      <div className="header">
          <h3 className="title">{ data.date } às {data.time}</h3>
      </div>
      <div className="body">
        
          <div className="insight">
               <span className="small">mq2:</span> 
               <span className="value">  { !data.mq2 ? 'Não informado' : data.mq2 + "pm" } </span> 
          </div>
          <div className="insight">
              <span className="small">mq8</span> 
              <span className="value">{ !data.mq8 ? 'Não informado' : data.mq8 + "pm" }</span> 
          </div>
          <div className="insight">
              <span className="small">mq9</span> 
              <span className="value">{ !data.mq9 ? 'Não informado' : data.mq9 + "pm" }</span> 
          </div>
          <div className="insight">
            <span className="small">chamas</span>
              <span className="value"> { !data.chama ? 'Não' : 'Sim' }</span> 
          </div>
      </div>
  </div>
  )
}

export default HistoryRecord