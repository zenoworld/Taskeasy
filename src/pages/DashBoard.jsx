import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Router from '../router/Router'
import { AuthContext } from '../context/Context'
import { useEffect,useContext } from 'react'

const DashBoard = () => {
    const [details , dispatch , smallSideBar] = useContext(AuthContext);
    const [smallSideBarOpen, setSmallSideBarOpen] = useState(false);
    useEffect(() => {
      if (smallSideBar) {
        setSmallSideBarOpen(true);
      } else {
        setSmallSideBarOpen(false);
      }
    }, [smallSideBar])
    
    return <>
        <div className='dashboard'>
            <Sidebar />
            <div className={`home_container ${smallSideBarOpen ? 'w-[calc(100%-64px)]' : 'w-[calc(100%-256px)]'}`}>
                <Router/>
            </div>
        </div>
    </>
}

export default DashBoard