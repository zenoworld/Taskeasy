import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Context';
import DataCard from '../components/DataCard';
import FilterPart from '../components/FilterPart';
import ViewTaskDetails from '../components/ViewTaskDetails';

const AllTasks = () => {
    const [details, dispatch] = useContext(AuthContext);
    const [fetchedDetails, setFetchedDetails] = useState([]);
    const [openDetailCard, setOpenDetailCard] = useState([]);

    useEffect(() => {
        setFetchedDetails(
            [...details].sort((a, b) =>
                new Date(b.deadlineDate) - new Date(a.deadlineDate)
            ));
    }, [details]);

    const sortByLatest = () => {
        setFetchedDetails(
            [...details].sort((a, b) =>
                new Date(b.deadlineDate) - new Date(a.deadlineDate)
            ));

    }
    const sortByOldest = () => {
        setFetchedDetails(
            [...details].sort((a, b) =>
                new Date(a.deadlineDate) - new Date(b.deadlineDate)
            ));
    }

    return (
        <div className='data_container'>
            <FilterPart sortByLatest={sortByLatest} sortByOldest={sortByOldest} />
            <div className='card_container'>
                {
                    fetchedDetails.length > 0 ?
                    (
                        fetchedDetails.map((detail) => (
                            <DataCard
                                key={detail.id}
                                data={detail}
                                setOpenDetailCard={setOpenDetailCard}
                            />
                        ))
                    ):
                    <h2 className='text-gray-400 italic font-medium text-xl'>No Tasks Available</h2>
                }

            </div>
            {
                openDetailCard.length != 0
                &&
                <ViewTaskDetails data={openDetailCard} setOpenDetailCard={setOpenDetailCard} />
            }
        </div>
    );
};

export default AllTasks;
