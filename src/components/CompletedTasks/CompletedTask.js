import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CompletedTask = ({ task, handleDelete, handleNotCompleted }) => {
    const { _id, title, details, task_image } = task;

    const handleSubmit = event => {
        event.preventDefault();
        const taskId = _id;
        const body = event.target.body.value;

        console.log(body)

        const comment = {
            taskId,
            commentBody: body,
        }

        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(() => {
                event.target.reset();
                toast.success('Comment added successfully')
            })
    }

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
                    <FaTrash title='Delete task' onClick={() => handleDelete(_id)} className='task-button' />
                    <BsFileEarmarkExcelFill title='Incomplete task' onClick={() => handleNotCompleted(_id)} className='task-button' />
                    <Link to={`/myComment/${_id}`}><FaCommentAlt title='Load comments' className='task-button' /></Link>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='mx-auto my-5'>
                        <textarea name='body' className="w-100 text-input" placeholder='Drop your comment'></textarea>
                        <button className='button'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;