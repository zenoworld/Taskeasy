import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Context'
import DataCard from '../components/DataCard'
import ViewTaskDetails from '../components/ViewTaskDetails'
import FilterPart from '../components/FilterPart'

const Pending = () => {
  const [details, dispatch, editDetailCard] = useContext(AuthContext);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [openDetailCard, setOpenDetailCard] = useState([]);
  useEffect(() => {
    setPendingTasks(details.filter((detail) => detail.pending === true));
  }, [details])


  const sortByLatest = () => {
    setPendingTasks(
      [...details].sort((a, b) =>
        new Date(b.deadlineDate) - new Date(a.deadlineDate)
      ));
  }
  const sortByOldest = () => {
    setPendingTasks(
      [...details].sort((a, b) =>
        new Date(a.deadlineDate) - new Date(b.deadlineDate)
      ));
  }

  return (
    <div className='data_container '>
      <FilterPart
        sortByLatest={sortByLatest}
        sortByOldest={sortByOldest}
      />
      <div className='card_container'>
        {
          pendingTasks.length > 0 ?
          (
            pendingTasks.map((detail) => (
              <DataCard
                key={detail.id}
                data={detail}
                setOpenDetailCard={setOpenDetailCard}
              />
            ))
          ) :
          <h2 className='text-gray-400 italic font-medium text-xl'>No Pending Tasks</h2>
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

export default Pending