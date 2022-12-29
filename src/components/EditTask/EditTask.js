import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const EditTask = () => {
    const storedTask = useLoaderData();
    const [task, setTask] = useState(storedTask);
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const details = form.details.value;

        const updatedTask = {
            title: title,
            details: details
        }

        fetch(`https://eat-well-server.vercel.app/reviews/${task._id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setTask(updatedTask)
                    toast.success('Task updated successfully')
                    navigate('/myTasks');
                }
            })
    }
    return (
        <form onSubmit={handleSubmit} className='form-bg w-75 w-sm-50 mx-auto border border-info rounded-3 p-3 p-sm-4 p-md-5'>
            <input name='title' type="text" className="w-100 text-input" defaultValue={task.title} />

            <textarea name='details' className="w-100 text-input" defaultValue={task.details}></textarea>

            <button className='btn btn-success btn-sm mt-1'>Post</button>
        </form>
    );
};

export default EditTask;