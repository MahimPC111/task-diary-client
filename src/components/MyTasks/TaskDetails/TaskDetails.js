import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

const TaskDetails = () => {
    useTitle('Task Details')
    const data = useLoaderData();
    const { title, published_date, details } = data;
    return (
        <div className='p-3 p-md-4 p-lg-4 mt-4 mt-lg-5 w-75 mx-auto bg-warning rounded-3 border border-2 border-success'>
            <h2 className='text-center'>{title}</h2>
            <p className='fw-semibold'>Published date: {published_date}</p>
            <p>{details}</p>
        </div>
    );
};

export default TaskDetails;