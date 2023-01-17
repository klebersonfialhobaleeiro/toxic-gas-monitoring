import React from 'react'

import { useLocation } from 'react-router-dom'
import HistoryGasLeak from '../components/HistoryGasLeak';

import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';

function Analytics() {
  return (
    <>
    <Sidebar active={ useLocation().pathname }/>

    <main className="content">
        <Navbar />
        <h1>Analytics</h1>
        <section>
          <HistoryGasLeak />
        </section>
    </main>

    </>
  )
}

export default Analytics