import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Context';

const Links = ({ linkData }) => {

    const [details,dispatch,editDetailCard] = useContext(AuthContext);
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        setHasCopied(true);
        navigator.clipboard.writeText(linkData.hyperlink);
        setTimeout(() => {
            setHasCopied(false);
        }, 2000)
    }

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_LINK',
            payload : linkData
        })
    }

    return (
        <div
            className='flex justify-between bg-gray-700/40 p-2 rounded-md'
        >
            <div className='flex justify-between items-center gap-2'>
                <h1 className='text-white'>{linkData.title}</h1>
                <a href={linkData.hyperlink} target='blank'>
                    <img src='/url.png' alt='click' className='w-6 h-6 cursor-pointer hover:scale-115 transition-all duration-300 ease-in-out' />
                </a>
            </div>
            <div className='flex justify-between gap-4'>
                {
                    hasCopied ?
                        <button className='px-2 py-1 rounded-sm bg-gray-400 text-black flex gap-2 justify-center items-center font-medium cursor-pointer'>
                            <img src='/tick.svg' alt='copy' className='w-5 h-5' />
                        </button>
                        :
                        <button
                            className='px-2 py-1 rounded-sm bg-gray-400 text-black flex gap-2 justify-center items-center font-medium cursor-pointer'
                            onClick={handleCopy}
                        >
                            <img src='/copy.png' alt='copy' className='w-5 h-5' />
                        </button>
                }

                <button
                    className='px-2 py-1 rounded-sm bg-red-600'
                    onClick={handleDelete}
                >
                    <img src='/bin.png' alt='bin' className='w-5 h-5 cursor-pointer' />
                </button>
            </div>
        </div>
    )
}

export default Links