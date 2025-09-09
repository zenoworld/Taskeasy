import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/Context'

const AddTodoForm = () => {

    const [newDetails, setnewDetails] = useState({
        title: '',
        todo: '',
        deadlineDate: '',
        deadlineTime: '',
        importance: ''
    })

    const [details, dispatch,sidebarClose, editDetailCard] = useContext(AuthContext);

    useEffect(() => {
        if (editDetailCard) {
            setnewDetails(
                {
                    title: editDetailCard.title,
                    todo: editDetailCard.todo,
                    deadlineDate: editDetailCard.deadlineDate,
                    deadlineTime: editDetailCard.deadlineTime,
                    importance: editDetailCard.importance
                }
            )
        }
    }, [editDetailCard])

    const handleChange = (e) => {
        setnewDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editDetailCard) {
            dispatch(
                {
                    type: 'UPDATE_DETAIL',
                    payload: {
                        id: editDetailCard.id,
                        title: newDetails.title,
                        todo: newDetails.todo,
                        deadlineDate: newDetails.deadlineDate,
                        deadlineTime: newDetails.deadlineTime,
                        importance: newDetails.importance,
                        complete: false,
                        failed: false,
                        pending: true,
                        links:newDetails.links,
                        documents :newDetails.documents
                    }
                }
            )
            dispatch(
                {
                    type: 'SET_EDIT_ITEM',
                    payload: null
                }
            )
        }
        else {
            const deadline = new Date(newDetails.deadlineDate);
            const diffDays = Math.ceil((deadline - new Date()) / (24 * 60 * 60 * 1000));
            dispatch(
                {
                    type: 'ADD_DATA',
                    payload: {
                        id: Date.now(),
                        title: newDetails.title,
                        todo: newDetails.todo,
                        deadlineDate: newDetails.deadlineDate,
                        deadlineTime: newDetails.deadlineTime,
                        importance: diffDays <= 2 ? 'high'
                            : diffDays <= 8 ? 'medium'
                                : 'low',
                        complete: false,
                        failed: false,
                        pending: true,
                        links:[],
                        documents :[]
                    }
                }
            );
        }
        setnewDetails({
            title: '',
            todo: '',
            deadlineDate: '',
            deadlineTime: '',
            importance: ''
        })
    }

    return (

        <form
            onSubmit={handleSubmit}
            className='todoForm'>
            <label className='label'>
                Title
                <input
                    type='text'
                    placeholder='enter the title'
                    id='title'
                    value={newDetails.title}
                    onChange={handleChange}
                    className='input'
                    required
                />
            </label>
            <label className='label'>
                Content
                <textarea
                    type='text'
                    placeholder='enter the todo'
                    id='todo'
                    rows={3}
                    value={newDetails.todo}
                    onChange={handleChange}
                    className='input'
                />
            </label>
            <label className='label'>
                Deadline
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 w-full relative'>
                    <input
                        type='date'
                        placeholder='enter the deadline'
                        id='deadlineDate'
                        value={newDetails.deadlineDate}
                        onChange={handleChange}
                        className='inputDateTime'
                        required
                    />
                    <input
                        type='time'
                        placeholder='enter the deadline'
                        id='deadlineTime'
                        value={newDetails.deadlineTime}
                        onChange={handleChange}
                        className='inputDateTime'
                    />
                </div>
            </label>
            {
                editDetailCard != null ?
                    <button
                        type='submit'
                        className='bg-yellow-400 text-[#000000] font-medium w-full h-full py-1 rounded-md cursor-pointer flex justify-center items-center gap-4'>
                        Update Task
                        <img src="/save.png" alt="file" className='w-5 h-5' />
                    </button>
                    :
                    <button
                        type='submit'
                        className='bg-sky-500 text-[#000000] font-medium w-full py-1 rounded-md cursor-pointer'>
                        Submit Task
                    </button>
            }
        </form>

    )
}

export default AddTodoForm