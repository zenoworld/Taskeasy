import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Context'

const AddLinks = ({ id }) => {
    const [details, dispatch, editDetailCard] = useContext(AuthContext);
    const [link, setLink] = useState({
        linkTitle: "",
        hyperlink: ""
    })

    const handleChange = (e) => {
        setLink((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_LINK',
            payload: {
                todoId: id,
                id: Date.now(),
                title: link.linkTitle,
                hyperlink: link.hyperlink
            }
        })

        setLink(
            {
                linkTitle : "",
                hyperlink :""
            }
        )
    }

    return (
        <form
            className='linkForm'
            onSubmit={handleSubmit}
        >
            <div className='w-full md:w-[80%] flex flex-col md:flex-row justify-center md:justify-between gap-2'>
                <input
                    type='text'
                    placeholder='enter the link title'
                    id='linkTitle'
                    value={link.linkTitle}
                    onChange={handleChange}
                    className='input'
                />
                <input
                    type='text'
                    placeholder='enter the link'
                    id='hyperlink'
                    value={link.hyperlink}
                    onChange={handleChange}
                    className='input'
                    required
                />
            </div>
            <button type='submit' className='cursor-pointer hover:scale-115 transition-all duration-300 ease-in-out'>
                <img src='/link.png' alt='link' className='w-8 h-8' />
            </button>
        </form>
    )
}

export default AddLinks