import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Context'
import { NavLink } from 'react-router-dom';

const DataCard = ({ data, setOpenDetailCard }) => {
    const [details, dispatch, editDetailCard] = useContext(AuthContext);

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_DATA',
            payload: data.id
        });
    }

    const handleCheck = () => {
        dispatch(
            {
                type: 'TOGGLE_COMPLETE',
                payload: data.id
            })
    }

    return (
        <div className="card">
            <div
                className='w-full flex justify-between items-start'>
                {
                    data.failed === true
                        ?
                        <span className='bg-red-600 text-white px-2 py-1 rounded font-medium text-sm'>Failed</span>
                        :
                        data.complete === true
                            ?
                            <span className='bg-green-600 text-white px-2 py-1 rounded font-medium text-sm'>Completed</span>
                            :
                            <div
                                className={`card_label
                 ${data.importance === 'high' ? 'bg-[#E63946]'
                                        : data.importance === 'medium' ? 'bg-[#f59e0b]'
                                            : 'bg-[#24a019]'}
                `} />
                }


                <div className='flex flex-col text-sm text-white'>
                    <span>{data.deadlineDate}</span>
                    <span className='flex justify-end'>{data.deadlineTime}</span>
                </div>
            </div>

            <div className='h-1/2 w-full overflow-y-auto scrollbar flex items-center gap-2'>
                {
                    !data.failed &&
                    <input
                        type="checkbox"
                        checked={data.complete}
                        onChange={handleCheck}
                        className='checkbox'
                    />}
                <h2 className='text-lg font-medium text-gray-100 italic'>
                    {data.title}
                </h2>
            </div>




            <div className='w-full flex justify-center gap-4 sm:gap-0 sm:justify-between items-center relative '>
                <button
                    className={`
                    bg-[#17A2B8] text-[#000000] button
                    `}
                    onClick={() => setOpenDetailCard(data)}>
                    View
                    <img src="/research.png" alt="edit" className='w-5 h-5' />
                </button>


                <button className='bg-[#DC3545] text-[#FFFFFF] button' onClick={handleDelete}>
                    Delete
                    <img src="/bin.png" alt="bin" className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export default DataCard