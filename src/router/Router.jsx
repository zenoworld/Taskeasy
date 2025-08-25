import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AddTodo from '../pages/AddTodo'
import AllTasks from '../pages/AllTasks'
import Pending from '../pages/Pending'
import Completed from '../pages/Completed'
import Failed from '../pages/Failed'
const Router = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addTodo" element={<AddTodo />} />
            <Route path="/allTasks" element={<AllTasks />} />
            <Route path="/pendingTasks" element={<Pending />} />
            <Route path="/completeTasks" element={<Completed />} />
            <Route path="/failedTasks" element={<Failed />} />

            <Route path="/:id" element={<></>}/>
        </Routes>
    </>
}

export default Router