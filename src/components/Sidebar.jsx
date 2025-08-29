import React, { useContext, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/Context'
import { useEffect } from 'react'

const Sidebar = () => {
    const [details, dispatch] = useContext(AuthContext);
    const [dropdown, setDropDown] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [failedTasks, setFailedTasks] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setAllTasks(details);
        setPendingTasks(details.filter((detail) => detail.pending === true));
        setCompletedTasks(details.filter((detail) => detail.complete === true));
        setFailedTasks(details.filter((detail) => detail.failed === true))
    }, [details])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropDown(false);
            }
        }

        if (dropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropdown])


    return <>
        <div className='sidebar'>
            <h2 className='sidebar_header'><img src="/icon.png" alt='icon' className='w-8 h-8' />Taskeasy</h2>
            <div className='sidebar_menu '>

                <NavLink to="/addTodo">
                    <div className='sidebar_content'>
                        Add Todo
                        <img src="/add.png" alt='add' className='sidebar_content_img' />
                    </div>
                </NavLink>

                <div
                    className='sidebar_content flex-col'
                    onClick={() => setDropDown(!dropdown)}
                    ref={dropdownRef}
                >
                    <div className='flex items-center justify-between w-full'>
                        Tasks
                        <img src="/down.png" alt='down' className={`sidebar_content_img ${dropdown ? 'rotate-180' : ''}`} />
                    </div>
                    {
                        dropdown &&
                        <div className='dropdown_menu'>
                            <NavLink to="/allTasks" className="dropdown_item">
                                {"All Tasks" + " (" + allTasks.length + ")"} <img src='/task.png' className='h-5 w-5' />
                            </NavLink>

                            <NavLink to="/pendingTasks" className="dropdown_item">
                                {"Pending Tasks" + " (" + pendingTasks.length + ")"} <img src='/load.png' className='h-5 w-5' />
                            </NavLink>

                            <NavLink to="/completeTasks" className="dropdown_item">
                                {"Completed Tasks" + " (" + completedTasks.length + ")"} <img src='/checked.png' className='h-5 w-5' />
                            </NavLink>

                            <NavLink to="/failedTasks" className="dropdown_item">
                                {"Failed Tasks" + " (" + failedTasks.length + ")"} <img src='/cancel.png' className='h-5 w-5' />
                            </NavLink>

                        </div>
                    }
                </div>


            </div>
        </div>
    </>
}

export default Sidebar