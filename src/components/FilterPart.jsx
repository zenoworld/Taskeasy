import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { } from 'react';

const FilterPart = ({ sortByLatest, sortByOldest, sortByStatus }) => {
    const [searchInput, setSearchInput] = useState("");
    const [openFilterMenu, setOpenFilterMenu] = useState(false);

    const location = useLocation();
    const currentRoute = location.pathname.split('/').filter(Boolean).pop();

    const filterRef = useRef();
    useEffect(() => {
        const handleOutSideClick = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setOpenFilterMenu(false);
            }
        }

        if (openFilterMenu) {
            window.addEventListener('mousedown', handleOutSideClick);
        } else {
            window.removeEventListener('mousedown', handleOutSideClick);
        }

        return () => {
            window.removeEventListener('mousedown', handleOutSideClick);
        }
    }, [openFilterMenu])


    return (
        <div className='filter_part'>
            <input
                type='text'
                id='searchInput'
                placeholder='search by title'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='py-1 px-4 rounded-4xl border-2 border-gray-500'
            />

            <div
                className='relative'
                onClick={() => setOpenFilterMenu(!openFilterMenu)}
                ref={filterRef}
            >
                <div
                    className='py-1 pl-4 pr-1 cursor-pointer rounded-4xl flex justify-between items-center gap-4 border-2 border-gray-500 hover:bg-gray-600'>
                    filter
                    <img
                        src='/filterDown.png'
                        alt='filter'
                        className={`w-6 h-6 transition-all duration-300 ease-in-out  ${openFilterMenu ? 'rotate-180' : ''}`}
                    />
                </div>

                {
                    openFilterMenu &&
                    <div className=' bg-slate-900 py-1 rounded-md w-[150%] h-auto absolute z-50 left-0 top-10 flex flex-col gap-2 transition-all duration-500 ease-in-out'>
                        <div className='py-3 px-4 hover:bg-gray-700 cursor-pointer' onClick={sortByLatest}>
                            Sort by Latest
                        </div>
                        <div className='py-3 px-4 hover:bg-gray-700 cursor-pointer' onClick={sortByOldest}>
                            Sort by Oldest
                        </div>

                        {currentRoute == "allTasks" &&
                            <div className='py-2 px-4 hover:bg-gray-700 cursor-pointer' onClick={sortByStatus}>
                                Sort by Status
                            </div>}

                    </div>
                }
            </div>
        </div>
    )
}

export default FilterPart