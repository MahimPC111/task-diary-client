import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { AiFillFile } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const MyTask = ({ task, handleDelete, handleCompleted }) => {
    const { _id, title, details } = task;
    return (
        <div className='task-card col-lg-6 p-0 mx-auto my-3'>
            <div className='task-body'>
                <div className='task-title'>{title}</div>
                <div className='task-details'>{
                    details.length > 100 ?
                        details.slice(0, 100) + '...'
                        :
                        details
                }</div>

                <div className='d-flex justify-content-around'>
                    <Link title='Task details' to={`/myTask/${_id}`}><AiFillFile className='task-button' /></Link>

                    <Link title='Task edit' to={`/editTask/${_id}`}><AiFillEdit className='task-button' /></Link>

                    <FaTrash title='Delete Task' onClick={() => handleDelete(_id)} className='task-button' />

                    <MdAssignmentTurnedIn title='Complete task' onClick={() => handleCompleted(_id)} className='task-button' />
                </div>
            </div>
        </div>
    );
};

export default MyTask;