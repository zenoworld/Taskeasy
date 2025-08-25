import React, { useState } from 'react'

const AddLinks = () => {
    const [link, setLink] = useState({
        linkTitle: "",
        hyperlink: ""
    })

    const handleChange = (e) => {
        setLink((prev) => ({ ...prev, [e.target.id]: [e.target.value] }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form
            className='linkForm'
            onSubmit={handleSubmit}
        >
            <div className=' w-[80%] flex justify-between'>
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