import React from 'react'

const Close = ({ setOpenDetailCard, clearEditItemData }) => {

    const handleClick = () => {
        setOpenDetailCard([]);
        if (clearEditItemData) {
            clearEditItemData();
        }
    }

    return (
        <div className='w-full flex justify-end mb-2'>
            <button onClick={handleClick}>
                <img
                    src="/close.png"
                    alt="close"
                    className='w-8 h-8 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400'
                />
            </button>
        </div>
    )
}

export default Close