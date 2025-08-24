import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/Context';
import AddTodoForm from './AddTodoForm';
import Close from './Close';


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
            (
              <div className='w-full h-3/4 flex flex-col justify-between '>
                <div className='h-2/3 overflow-y-auto bg-gray-700/60 p-4 rounded-lg scrollbar my-2 text-gray-300 shadow-md shadow-gray-950'>
                  {viewTaskData.todo ? viewTaskData.todo : <p className='text-gray-400 italic'>No details provided.</p>}
                </div>

                <div className='flex justify-between items-center mb-4 w-full'>

                  <div className='bg-[url("/calendar.png")] bg-no-repeat w-full h-50 bg-center bg-contain flex justify-center items-end text-black '>
                    <div className='flex flex-col justify-center items-center  py-4 font-bold gap-2'>
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
            <button
              className='bg-[#28A745] button text-[#000000]'
              onClick={handleEdit}>
              Edit
              <img src="/edit.png" alt="edit" className='w-5 h-5' />
            </button>
          </div>
        }


      </div>
    </div>
  );
};

export default ViewTaskDetails;
