import React from 'react'
import Sidebar from '../components/Sidebar'
import Router from '../router/Router'

const DashBoard = () => {
    return <>
        <div className='dashboard'>
            <Sidebar />
            <div className='home_container'>
                <Router/>
            </div>
        </div>
    </>
}

export default DashBoard