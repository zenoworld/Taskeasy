import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Context'
import DataCard from '../components/DataCard'
import ViewTaskDetails from '../components/ViewTaskDetails'
import FilterPart from '../components/FilterPart'

const Failed = () => {
    const [details] = useContext(AuthContext);
    const [failedTasks, setFailedTasks] = useState([])
    const [openDetailCard, setOpenDetailCard] = useState([]);
    useEffect(() => {
        setFailedTasks(details.filter((detail) => detail.failed === true));
    }, [details])

    const sortByLatest = () => {
        setFailedTasks(
            [...failedTasks].sort((a, b) =>
                new Date(b.deadlineDate) - new Date(a.deadlineDate)
            ));
    }
    const sortByOldest = () => {
        setFailedTasks(
            [...failedTasks].sort((a, b) =>
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
                    failedTasks.length > 0 ?
                    (
                        failedTasks.map((detail) => (
                            <DataCard
                                key={detail.id}
                                data={detail}
                                setOpenDetailCard={setOpenDetailCard}
                            />
                        ))
                    ) :
                    <h2 className='text-gray-400 italic font-medium text-xl'>No Failed Tasks</h2>
                }
            </div>
            {
                openDetailCard.length != 0
                &&
                <ViewTaskDetails data={openDetailCard} setOpenDetailCard={setOpenDetailCard} />
            }
        </div>
    )
}

export default Failed