import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/Context';
import AddTodoForm from './formSections/AddTodoForm';
import Close from './Close';
import { cardDataAssignOptions } from "../data/index"
import AddLinks from './formSections/AddLinks';
import AddDocuments from './formSections/AddDocuments';

const ViewTaskDetails = ({ data, setOpenDetailCard }) => {
  const [details, dispatch, editDetailCard] = useContext(AuthContext);
  const [remainingTime, setRemainingTime] = useState(null);
  const [viewTaskData, setViewTaskData] = useState(
    {
      id: data.id,
      title: data.title,
      todo: data.todo,
      deadlineDate: data.deadlineDate,
      deadlineTime: data.deadlineTime,
      importance: data.importance
    }
  )
  const [threeDotsOpen, setThreeDotsOpen] = useState(false);
  const [openViewLinksSection, setOpenViewLinksSection] = useState(false);
  const [openDocumentSection, setOpenDocumentSection] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const changedData = details.find((detail) => detail.id === viewTaskData.id);
    setViewTaskData({
      id: changedData.id,
      title: changedData.title,
      todo: changedData.todo,
      deadlineDate: changedData.deadlineDate,
      deadlineTime: changedData.deadlineTime,
      importance: changedData.importance
    })
  }, [details])

  useEffect(() => {
    const updateRemainingTime = () => {
      const deadLine = new Date(`${viewTaskData.deadlineDate}T${viewTaskData.deadlineTime ? viewTaskData.deadlineTime : '23:59:59'}`);
      const now = new Date();
      const diff = deadLine - now;
      if (diff <= 0) {
        setRemainingTime("Expired");
        dispatch(
          {
            type: 'MARK_FAILED',
            payload: viewTaskData.id
          }
        )
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (days <= 2) {
        dispatch({
          type: "UPDATE_IMPORTANCE",
          payload: { id: viewTaskData.id, importance: "high" }
        });
      } else if (days <= 8) {
        dispatch({
          type: "UPDATE_IMPORTANCE",
          payload: { id: viewTaskData.id, importance: "medium" }
        });
      } else {
        dispatch({
          type: "UPDATE_IMPORTANCE",
          payload: { id: viewTaskData.id, importance: "low" }
        });
      }
    }
    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [viewTaskData.deadlineDate, viewTaskData.deadlineTime, viewTaskData.id, dispatch])

  const handleEdit = () => {
    setThreeDotsOpen(false);
    if (editDetailCard) {
      dispatch({
        type: 'SET_EDIT_ITEM',
        payload: null
      })
    } else {
      dispatch(
        {
          type: 'SET_EDIT_ITEM',
          payload: viewTaskData
        }
      )
    }
  }

  const clearEditItemData = () => {
    dispatch(
      {
        type: 'SET_EDIT_ITEM',
        payload: null
      }
    )
  }

  const handleAdditionalDataClick = (name) => {
    if (name === "Add Links") setOpenViewLinksSection(true);
    else setOpenDocumentSection(true);
  }

  const closeAll = () => {
    setThreeDotsOpen(false);
    setOpenViewLinksSection(false);
    setOpenDocumentSection(false);
  }


  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/50 text-gray-200 flex items-center justify-center z-50'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-2xl h-11/12 overflow-y-auto relative '>

        <Close setOpenDetailCard={setOpenDetailCard} clearEditItemData={clearEditItemData} />


        {
          editDetailCard != null ?
            (
              <div className='w-full flex items-center justify-center relative py-4 px-4'>
                <AddTodoForm />
              </div>
            ) :
            editDetailCard == null && openViewLinksSection && !openDocumentSection ?
              (
                <div className='w-full h-[80%] flex flex-col items-center justify-between relative'>
                  <AddLinks />
                  <div className='linkContainer'>
                    {
                      data.links == 0 ?
                        <h2 className='text-gray-400 italic font-medium text-lg text-center'>links not available</h2>
                        : <div>
                          
                        </div>
                    }
                  </div>
                </div>
              )
              :
              editDetailCard == null && !openViewLinksSection && openDocumentSection ?
                (
                  <div className='w-full flex items-center justify-center relative py-4 px-4'>
                    <AddDocuments />
                  </div>
                )
                :
                (
                  <div className='w-full h-5/6 flex flex-col justify-between relative gap-1'>

                    <div
                      className='h-3/5 py-2 w-full bg-gray-700/60 rounded-lg text-gray-300 shadow-md shadow-gray-950 relative transition-all duration-500 ease-in-out'
                    >

                      <div
                        className=' flex justify-end items-center px-2'
                      >
                        <button
                          className='cursor-pointer rounded-full' onClick={() => setThreeDotsOpen(!threeDotsOpen)}
                        >
                          <img
                            src='/dots.png'
                            alt='dots'
                            className='w-6 h-6'
                          />
                        </button>
                      </div>

                      <div
                        className={`absolute right-5 top-10 w-40 h-auto rounded-md bg-gray-900/90 text-[#ffffff] flex flex-col ${threeDotsOpen ? 'block' : 'hidden'} py-2`}
                      >
                        {
                          cardDataAssignOptions.map((option, index) => (
                            <div
                              key={index}
                              className='p-4 hover:bg-gray-600 transition-all duration-200 ease-in-out cursor-pointer'
                              onClick={() => handleAdditionalDataClick(option.name)}
                            >
                              {option.name}
                            </div>
                          ))
                        }
                      </div>

                      <div
                        className='px-4 h-[90%] overflow-y-auto scrollbar'
                        onClick={() => setThreeDotsOpen(false)}
                      >
                        {
                          viewTaskData.todo ?
                            viewTaskData.todo
                            :
                            <p
                              className='text-gray-400 italic'
                            >
                              No details provided.
                            </p>
                        }
                      </div>

                    </div>

                    <div
                      className='flex justify-between items-center w-full'
                      onClick={() => setThreeDotsOpen(false)}
                    >
                      <div
                        className='bg-[url("/calendar.png")] bg-no-repeat w-full h-50 bg-center bg-contain flex justify-center items-end text-black'
                      >
                        <div
                          className='flex flex-col justify-center items-center  py-4 font-bold gap-2'
                        >
                          <div>
                            <h1>Deadline</h1>
                            <h1>{viewTaskData.deadlineDate + "  " + viewTaskData.deadlineTime}</h1>
                          </div>

                          <div>
                            <h1>Time Left</h1>
                            <h1>{remainingTime}</h1>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                )
        }

        {
          !data.failed && !data.complete &&
          <div className='flex justify-between items-center absolute bottom-0 right-0 p-4 gap-2 w-full'>
            {
              !openViewLinksSection && !openDocumentSection &&
              <button
                className='bg-[#28A745] button text-[#000000]'
                onClick={handleEdit}>
                Edit
                <img src="/edit.png" alt="edit" className='w-4 h-4' />
              </button>
            }
            {
              (openViewLinksSection || openDocumentSection) &&
              <button
                className='button text-[#ffffff] bg-red-600'
                onClick={closeAll}
              >
                Close
              </button>
            }

          </div>
        }


      </div>
    </div>
  );
};

export default ViewTaskDetails;
