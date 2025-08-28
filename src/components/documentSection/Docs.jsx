import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Context'

const Docs = ({ docData }) => {
    const [details,dispatch] = useContext(AuthContext);
    const [viewDoc, setViewDoc] = useState(false);

    const handleDocumentView = () => {
        const url = docData.url;
        window.open(url , "_blank");
    }
    const handleDelete = () => {
        dispatch({
            type:'DELETE_DOCS',
            payload : docData
        })
    }
    return (
        <div
            className='flex justify-between bg-gray-700/40 p-2 rounded-md'
        >
            <div className='flex justify-between items-center gap-4'>
                <h1 className='text-white'>{docData.title != '' ? docData.title : docData.name}</h1>
            </div>
            <div className='flex justify-between gap-8'>

                <button
                    onClick={handleDocumentView}
                    className='cursor-pointer relative group transition-all duration-1000 ease-in-out'
                >
                    <img src='/folder.png' alt='copy' className='w-7 h-7' />
                    <div
                        className='absolute bottom-0 left-[-10px] bg-black z-10 py-1 px-2 text-white rounded-md  hidden group-hover:bottom-[-40px] group-hover:block'
                    >
                        open
                    </div>
                </button>
                <button
                    onClick={handleDelete}
                    className='cursor-pointer group relative transition-all duration-1000 ease-in-out'
                >
                    <img src='/bin1.png' alt='bin' className='w-7 h-7' />
                    <div
                        className='absolute bottom-0 left-[-10px] bg-black z-10 py-1 px-2 text-white rounded-md  hidden group-hover:bottom-[-40px] group-hover:block'
                    >
                        delete
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Docs