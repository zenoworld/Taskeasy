import React, { useState } from 'react'
import axios from 'axios'

const AddDocuments = () => {

  const CLOUD_NAME = 'dcmvcpeox';
  const UPLOAD_PRESET = 'TaskEasy';

  const [fileChosen, setFileChosen] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false)

  const handleFileChange = (e) => {
    setUploaded(false);
    const selectedFile = e.target.files[0];
    console.log(e.target.files[0]);

    if (selectedFile) {
      setFile(selectedFile);
      setFileChosen(selectedFile.name);
    } else {
      setFile(null);
      setFileChosen("No file chosen");
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData
      );

      const newDoc = {
        url: res.data.url,
        public_id: res.data.public_id,
        name: file.name
      };
      console.log(newDoc.url);

    }
    catch (error) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
      setUploaded(true);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full h-2/6  flex items-center justify-center rounded-md border-2 border-gray-700 '
    >
      <div className='flex flex-col justify-between items-center gap-4 cursor-pointer'>
        {
          loading ?
            <img src='/loading.png' alt='loading' className='w-8 h-8 animate-spin transition-all duration-500 ease-in-out' />
            :
            <img src='/upload.png' alt='upload' className='w-8 h-8 ' />
        }

        <span className='text-gray-400 text-sm flex justify-center items-center gap-2'>
          {fileChosen} {uploaded && <img src='/tick.svg' className='w-4 h-4' />}
        </span>


        <input
          type='file'
          onChange={handleFileChange}
          id='fileInput'
          className='hidden'
          required
        />

        <div className='flex gap-4 w-auto transition-all duration-1000 ease-in-out'>
          <label
            htmlFor='fileInput'
            className='bg-blue-600 flex justify-center items-center text-white px-4 py-1 rounded-md cursor-pointer hover:bg-blue-700 transition'
          >
            {
              file == null ? "Choose File" : "Choose Another File"
            }
          </label>
          {
            file != null &&
            <button
              type='submit'
              className={`text-white px-4 py-1 rounded-md cursor-pointer border-2 border-gray-600 hover:border-blue-600 hover:bg-blue-600 transition `}
            >
              {
                loading ? "Uploading..." : "save & next"
              }
            </button>
          }
          {/* {
            loading ?
              <span className='flex justify-center items-center gap-2'>
                <img src='/loading.png' alt='loading' className='w-5 h-5 animate-spin transition-all duration-500 ease-in-out' /> 
              </span>
              :
              <span>Choose File</span>
          } */}
        </div>

      </div>
    </form>
  )
}

export default AddDocuments