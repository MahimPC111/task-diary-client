import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CompletedTask = ({ task, handleDelete }) => {
    const { _id, title, details, task_image } = task;
    return (
        <div className='task-card col-4 p-0 mx-auto my-4'>
            <img className='task-image img-fluid' src={task_image} alt='' />
            <div className='task-body'>
                <div className='task-title'>{title}</div>
                <div className='task-details'>{
                    details.length > 100 ?
                        details.slice(0, 100) + '...'
                        :
                        details
                }</div>
                <div className='d-flex justify-content-around'>
                    <FaTrash onClick={() => handleDelete(_id)} className='task-button' />
                    <Link to={`/myTask/${_id}`}><BsFileEarmarkExcelFill className='task-button' /></Link>
                    <Link to={`/completedTask/comments`}><FaCommentAlt className='task-button' /></Link>
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;