import React, { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../../context/Context'
import Docs from './Docs';

const DocumentContainer = ({ id }) => {
  const [details, dispatch] = useContext(AuthContext);
  const [docsData, setDocsData] = useState([]);

  useEffect(() => {
    const data = details.find((detail) => detail.id === id);
    setDocsData(data ? data.documents : []);
  }, [details, id])

  return (
    <div className='documentContainer'>
      {
        (docsData == 0) ?
          <h2 className='text-gray-600 italic font-medium text-md text-center'>docs not added</h2>
          :
          docsData.map((doc,index) => (
            <Docs key={index} docData={doc} />
          ))
      }
    </div>
  )
}

export default DocumentContainer