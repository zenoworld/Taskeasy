import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const [dropdown, setDropDown] = useState(false)
    return <>
        <div className='sidebar'>
            <h2 className='sidebar_header'><img src="/icon.png" alt='icon' className='w-8 h-8' />Taskeasy</h2>
            <div className='sidebar_menu'>

                <NavLink to="/addTodo"><div className='sidebar_content'>
                    Add Todo
                    <img src="/add.png" alt='add' className='sidebar_content_img' />
                </div></NavLink>

                <div className='sidebar_content flex-col' onClick={() => setDropDown(!dropdown)}>
                    <div className='flex items-center justify-between w-full'>
                        Tasks
                        <img src="/down.png" alt='down' className={`sidebar_content_img ${dropdown ? 'rotate-180' : ''}`} />
                    </div>
                    {
                        dropdown &&
                        <div className='dropdown_menu'>

                            <NavLink to="/pending" className="dropdown_item">
                                Pending <img src='/load.png' className='h-5 w-5' />
                            </NavLink>

                            <NavLink to="/complete" className="dropdown_item">
                                Completed <img src='/checked.png' className='h-5 w-5' />
                            </NavLink>

                            <NavLink to="/failed" className="dropdown_item">
                                Failed <img src='/cancel.png' className='h-5 w-5' />
                            </NavLink>
                            
                            <NavLink to="/allTasks" className="dropdown_item">
                                All Tasks <img src='/task.png' className='h-5 w-5 bg-amber-100 rounded-full' />
                            </NavLink>
                        </div>
                    }
                </div>


            </div>
        </div>
    </>
}

export default Sidebar