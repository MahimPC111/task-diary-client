import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import 'animate.css';

const CompletedTask = ({ task, handleDelete, handleNotCompleted }) => {
    const { _id, title, details } = task;
    const { theme } = useContext(AuthContext)

    const bgTheme = theme ? 'task-card2' : 'task-card';

    const handleSubmit = event => {
        event.preventDefault();
        const taskId = _id;
        const body = event.target.body.value;

        const comment = {
            taskId,
            commentBody: body,
        }

        fetch('https://task-diary-server.vercel.app/comments', {
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
        <div className={`${bgTheme} p-0 mx-auto my-3 animate__animated animate__fadeInLeft`}>
            <div className={`task-body ${theme ? 'text-white' : 'text-black'}`}>
                <div className='task-title'>{title}</div>
                <div className='task-details'>{
                    details.length > 100 ?
                        details.slice(0, 100) + '...'
                        :
                        details
                }</div>
                <div className='d-flex justify-content-around'>
                    <FaTrash title='Delete task' onClick={() => handleDelete(_id)} className={`${theme ? 'task-button2' : 'task-button'}`} />

                    <BsFileEarmarkExcelFill title='Incomplete task' onClick={() => handleNotCompleted(_id)} className={`${theme ? 'task-button2' : 'task-button'}`} />

                    <Link to={`/myComment/${_id}`}><FaCommentAlt title='View comments' className={`${theme ? 'task-button2' : 'task-button'}`} /></Link>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='mx-auto mt-4'>
                        <textarea name='body' className="w-100 text-input" placeholder='Drop your comment...'></textarea>
                        <button className='button'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompletedTask;