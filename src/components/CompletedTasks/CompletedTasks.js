import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CompletedTask from './CompletedTask';

const CompletedTasks = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/tasks?status=completed')
            .then(res => res.json())
            .then(data => {
                setCompletedTasks(data)
            })
    }, [])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this task?');

        if (proceed) {
            fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Task deleted successfully')
                    }
                    const remainingTasks = completedTasks.filter(task => task._id !== id);
                    setCompletedTasks(remainingTasks)
                })
        }
    }

    const handleNotCompleted = id => {
        fetch(`http://localhost:5000/completedTasks/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: 'incomplete' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    navigate('/myTasks');
                }
            })
    }


    return (
        <div className='container'>
            <div className='row p-5'>
                {
                    completedTasks && completedTasks.map(task => <CompletedTask
                        key={task._id}
                        task={task}
                        handleDelete={handleDelete}
                        handleNotCompleted={handleNotCompleted}
                    ></CompletedTask>)
                }
            </div>
        </div>
    );
};

export default CompletedTasks;