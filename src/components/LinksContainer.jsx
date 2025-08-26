import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Context';
import Links from './Links';

const LinksContainer = ({ id }) => {
    const [details, dispatch, editDetailCard] = useContext(AuthContext);
    const [linksData, setLinksData] = useState([]);

    useEffect(() => {
        const data = details.find((detail) => detail.id === id);
        setLinksData(data ? data.links : []);
    }, [details, id])


    return <>
        <div className='linkContainer gap-2'>
            {
                linksData.length == 0 ?
                    <h2 className='text-gray-400 italic font-medium text-md text-center'>links not available</h2>
                    :
                    linksData.map((link, index) => (
                        <Links key={index} linkData={link} />
                    ))
            }
        </div>
    </>
}

export default LinksContainer