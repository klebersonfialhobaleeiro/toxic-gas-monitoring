
import React from 'react'

import './Insight.scss'

function Insight({insights}) {
    return (
        <div className="insights-container">
            { insights.map(({icon, title, value, date}, index) => {
                return (
                    <div className="insight" key={index}>
                        <div className="insight__header">
                            {icon ? icon : ''}
                            <h3 className="insight__header__title"> {title} </h3>
                        </div>
                        <div className="insight__content">
                            <span className="insight__content__data"> {value} </span>
                            { date ? <footer className="text-muted">{date}</footer> : ''}
                            
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default Insight