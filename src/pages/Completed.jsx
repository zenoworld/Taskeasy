import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Context'
import DataCard from '../components/DataCard'
import ViewTaskDetails from '../components/ViewTaskDetails'
import FilterPart from '../components/FilterPart'

const Completed = () => {
  const [details, dispatch, editDetailCard] = useContext(AuthContext);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [openDetailCard, setOpenDetailCard] = useState([]);


  useEffect(() => {
    setCompleteTasks(details.filter((detail) => detail.complete === true));
  }, [details])

  const sortByLatest = () => {
    setCompleteTasks(
      [...completeTasks].sort((a, b) =>
        new Date(b.deadlineDate) - new Date(a.deadlineDate)
      ));

  }
  const sortByOldest = () => {
    setCompleteTasks(
      [...completeTasks].sort((a, b) =>
        new Date(a.deadlineDate) - new Date(b.deadlineDate)
      ));
  }

  return (
    <div className='data_container'>
      <FilterPart
        sortByLatest={sortByLatest}
        sortByOldest={sortByOldest}
      />
      <div className='card_container'>
        {
          completeTasks.length > 0 ?
            (
              completeTasks.map((detail) => (
                <DataCard
                  key={detail.id}
                  data={detail}
                  setOpenDetailCard={setOpenDetailCard}
                />
              ))
            ) :
            <h2 className='text-gray-400 italic font-medium text-xl'>No Completed Tasks</h2>
        }
      </div>
      {
        openDetailCard.length != 0
        &&
        <ViewTaskDetails
          data={openDetailCard}
          setOpenDetailCard={setOpenDetailCard}
        />
      }
    </div>
  )
}

export default Completed