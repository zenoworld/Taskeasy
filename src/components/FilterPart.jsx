import React from 'react'

const FilterPart = ({sortByLatest,sortByOldest}) => {
    return (
        <div className='filter_part'>
            <button className='filter_btn' onClick={sortByLatest}>
                Sort by Latest
            </button>
            <button className='filter_btn' onClick={sortByOldest}>
                Sort by Oldest
            </button>
        </div>
    )
}

export default FilterPart