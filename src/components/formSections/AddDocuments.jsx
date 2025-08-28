import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/Context"
import axios from 'axios'

const AddDocuments = ({ id }) => {
  const [details, dispatch] = useContext(AuthContext)
  const CLOUD_NAME = 'dcmvcpeox';
  const UPLOAD_PRESET = 'TaskEasy';

  const [fileChosen, setFileChosen] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [openAddDocsForm, setOpenAddDocsForm] = useState(false);

  const [docsData, setDocsData] = useState({
    title: '',
    todoId: id,
    url: null,
    public_id: null,
    name: ''
  });

  const handleFileChange = (e) => {
    setUploaded(false);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileChosen(selectedFile.name);
    } else {
      setFile(null);
      setFileChosen("No file chosen");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData
      );

      const resData = {
        url: res.data.url,
        public_id: res.data.public_id,
        name: file.name
      };

      setDocsData((prev) => ({
        ...prev,
        url: resData.url,
        public_id: resData.public_id,
        name: resData.name
      }));

      setUploaded(true);
    }
    catch (error) {
      console.error("Upload failed", error);
      alert('Failed to add Document');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDocs = () => {
    console.log("Final Docs Data:", docsData);
    if (docsData) {
      dispatch({
        type: 'ADD_DOCUMENT',
        payload: {
          todoId:docsData.todoId,
          id: Date.now(),
          title: docsData.title,
          url: docsData.url,
          public_id: docsData.public_id,
          name: docsData.name
        }
      })
    } else {
      alert('Failed to add the Document')
    }

    setFile(null);
    setUploaded(false);
    setOpenAddDocsForm(false);
    setFileChosen("No file chosen");
    setDocsData({
      title: '',
      todoId: id,
      url: null,
      public_id: null,
      name: ''
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full h-2/6 flex items-center justify-center rounded-md border-2 border-gray-700 p-4'
    >
      <div className='flex flex-col justify-between items-center gap-4 cursor-pointer'>
        {
          loading && !openAddDocsForm ? (
            <img src='/loading.png' alt='loading' className='w-8 h-8 animate-spin' />
          ) : !loading && !openAddDocsForm ? (
            <img src='/upload.png' alt='upload' className='w-8 h-8' />
          ) : (
            <input
              type='text'
              placeholder='enter the title'
              id='docsTitle'
              value={docsData.title}
              onChange={(e) => setDocsData({ ...docsData, title: e.target.value })}
              className='input'
            />
          )
        }

        <span className={`${uploaded ? 'text-green-500' : 'text-gray-400'}  text-sm flex items-center gap-2`}>
          {fileChosen} {uploaded && <img src='/tick.svg' className='w-4 h-4' />}
        </span>

        <input
          type='file'
          onChange={handleFileChange}
          id='fileInput'
          className='hidden'
          required
        />

        <div className='flex gap-4 w-auto'>
          <label
            htmlFor='fileInput'
            className='bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-blue-700 transition'
          >
            {file == null ? "Choose File" : "Choose Another File"}
          </label>

          {file && !uploaded && (
            <button
              type='submit'
              className='text-white px-4 py-1 rounded-md border-2 border-gray-600 hover:border-blue-600 hover:bg-blue-600 transition cursor-pointer'
            >
              {loading ? "Uploading..." : "Upload & Next"}
            </button>
          )}

          {file && uploaded && !openAddDocsForm && (
            <button
              type="button"
              onClick={() => setOpenAddDocsForm(true)}
              className='text-white px-4 py-1 rounded-md border-2 border-gray-600 hover:border-blue-600 hover:bg-blue-600 transition cursor-pointer'
            >
              Add Title
            </button>
          )}

          {openAddDocsForm && (
            <button
              type="button"
              onClick={handleSubmitDocs}
              className='text-white px-4 py-1 rounded-md border-2 border-green-600 hover:bg-green-600 hover:border-green-700 transition cursor-pointer'
            >
              Save Document
            </button>
          )}
        </div>

      </div>
    </form>
  )
}

export default AddDocuments;
