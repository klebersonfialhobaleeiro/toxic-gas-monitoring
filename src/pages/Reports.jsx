import React from 'react'
import { database as db } from './../utils/firebase';
import { onValue, ref } from 'firebase/database';
import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';
import ReportsTable from '../components/ReportsTable';
import { useLocation } from 'react-router-dom'

function Reports() {

    return (

        <>
        <Sidebar active={ useLocation().pathname }/>

            <main className="content">
                <Navbar />
                <h1>Reports</h1>
                < ReportsTable />
            </main>

        </>

        

    )
}

export default Reports