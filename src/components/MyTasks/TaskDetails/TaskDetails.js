import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './TaskDetails.css'

const TaskDetails = () => {
    const data = useLoaderData();
    const { title, details, task_image } = data;
    return (
        <div className='task-details-card p-5 mt-5'>
            <div className='d-flex justify-content-between'>
                <img className='task-details-image img-fluid w-50' src={task_image} alt='' />
                <div className='w-50 p-2'>
                    <div className='task-details-title'>
                        <p>{title}</p>
                    </div>
                    <div className='task-details-details'>{details}</div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;