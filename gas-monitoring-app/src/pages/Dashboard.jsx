import React from 'react';
import { useLocation } from 'react-router-dom'

import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';
import Insight from './../components/Insight';
import PolarAreaChart from '../components/PolarAreaChart';
import GasMonitor from '../components/GasMonitor';

import { GiGasMask, GiDiceFire, GiBoneGnawer } from 'react-icons/gi';
import { TbAlertTriangle } from 'react-icons/tb';

import { leakLPGData, sensorsData, sensorsOptions } from './../utils/chartsData';
import { updateGasChart, updateChartSensorsValue } from './../utils/chartsFunctions';


import './pages.scss';


function Dashboard() {

    const iconClass = 'insight__header__icon'

    const insights = [
      {
        title: 'Leaks', icon: <GiGasMask className={`${iconClass} bg-primary`} />,
        value: '30', date: 'Last 30 day',
      },
      {
        title: 'Alerts', icon: <TbAlertTriangle className={`${iconClass} bg-warning`} />,
        value: '10', date: 'Last weak',
      }
    ]

    return (
        <>
        <Sidebar active={ useLocation().pathname }/>
        <main className="content">
          <Navbar />

          <h1>Dashboard</h1>

          <Insight insights={insights} />

          <section className="section">
            <header className="section__header">
              <h2 className="section__header__title">Monitoramento dos gases do sensor MQ-2</h2>
            </header>

            <PolarAreaChart 
              initialData={sensorsData}
              options={sensorsOptions}
              callbackUpdate={updateChartSensorsValue}
            />

            <section className="section__content">
                  <GasMonitor
                    name='Smoke'
                    icon={<GiDiceFire className={`icon danger`} />}
                    data={leakLPGData}
                    callbackUpdate={updateGasChart}
                    path= '/MQ2 Sensor/SMOKE'
                  />
                  <GasMonitor
                    name='CO'
                    icon={<GiGasMask className={`icon danger`} />}
                    data={leakLPGData}
                    callbackUpdate={updateGasChart}
                    path= '/MQ2 Sensor/CO'
                  />
                  <GasMonitor
                    name='LPG'
                    icon={<GiGasMask className={`icon danger`} />}
                    data={leakLPGData}
                    callbackUpdate={updateGasChart}
                    path= '/MQ2 Sensor/LPG'
                  />
            </section>

              
          </section>
        </main>
        </>
    )
}

export default Dashboard