import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

import './ChartHistory.scss';
import './Panel.scss';

import temperaturaIcon from '../assets/gas-mask.svg';
import heart from '../assets/gas-mask.svg';
import mq9Icon from '../assets/gas-mask.svg';

function ChartComponent({ data }) {
  const [selectedDate, setSelectedDate] = useState(formatDate2(new Date().toLocaleDateString(), "/"));

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
  };

  function formatDate(inputDate, split) {
    const [day, month, year] = inputDate.split(split);
    return `${year}-${month}-${day}`;
  }

  function formatDate2(inputDate, split) {
    const [month, day, year] = inputDate.split(split);
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day: day}`;
  }

  const filteredData = data.filter((item) => {
    const formattedDate = formatDate(item.date, '-');
    return formattedDate === selectedDate;
  });

  return (
    <div className='card'>
      <h2 className='title'>Selecione um dia para visualizar</h2>
      <input 
        type="date" 
        value={selectedDate} 
        min="2023-06-30"
        className='date-picker'
        max={formatDate2(new Date().toLocaleDateString(), "/")} 
        onChange={handleDateChange} />
      <div className="historicos">
        <div className="statistics">
          <div className="card">
            <div className="header">
              <img src={heart} alt="" className="icon" />
              <h3 className="title">Gases</h3>
            </div>
            <Line
              className='historyChart'
              data={{
                labels: filteredData.map((data) => data.time),
                datasets: [
                  {
                    label: 'MQ-2',
                    data: filteredData.map((data) => data.mq2),
                    color: '#009957',
                    backgroundColor: '#009957',
                    borderColor: '#009957',
                  },
                  {
                    label: 'MQ-8',
                    data: filteredData.map((data) => data.mq8),
                    color: '#159ffc',
                    backgroundColor: '#159ffc',
                    borderColor: '#159ffc',
                  },
                  {
                    label: 'MQ-9',
                    data: filteredData.map((data) => data.mq9),
                    color: '#000000',
                    backgroundColor: '#000000',
                    borderColor: '#fffff',
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: `Gases`,
                  },
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return ' ' + context.parsed.y;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      callback: function (value, index, values) {
                        return value;
                      },
                    },
                    min: 0,
                    max: 1024, // Ajuste o valor máximo conforme necessário
                  },
                  x: {
                    ticks: {
                      display: false,
                    },
                  },
                },
                responsive: true,
                interaction: {
                  intersect: false,
                },
                parsing: {
                  xAxisKey: 'x',
                  yAxisKey: 'y',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartComponent;
