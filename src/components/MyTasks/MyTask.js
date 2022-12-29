import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { AiFillFile } from 'react-icons/ai';
import './Task.css'
import { Link } from 'react-router-dom';

const MyTask = ({ task, handleDelete }) => {
    const { _id, title, details, task_image } = task;
    return (
        <div className='task-card col-4 p-0 mx-auto'>
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
                    <Link to={`/myTask/${_id}`}><AiFillFile className='task-button' /></Link>
                    <Link to={`/editTask/${_id}`}><AiFillEdit className='task-button' /></Link>
                    <FaTrash onClick={() => handleDelete(_id)} className='task-button' />
                    <MdAssignmentTurnedIn className='task-button' />
                </div>
            </div>
        </div>
    );
};

export default MyTask;