import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

const TaskDetails = () => {
    useTitle('Task Details')
    const data = useLoaderData();
    const { title, published_date, details } = data;
    return (
        <div className='min-vh-100'>
            <div className='p-3 p-md-4 p-lg-4 mt-4 mt-lg-5 w-75 mx-auto form-bg rounded-3'>
                <h2 className='text-center'>{title}</h2>
                <p className='fw-semibold'>Published date: {published_date}</p>
                <p>{details}</p>
            </div>
        </div>
    );
};

export default TaskDetails;