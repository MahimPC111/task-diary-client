import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MyTask from './MyTask';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/tasks?status=incomplete')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
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
                    const remainingTasks = tasks.filter(task => task._id !== id);
                    setTasks(remainingTasks)
                })
        }
    }

    const handleCompleted = id => {
        fetch(`http://localhost:5000/completedTasks/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: 'completed' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    navigate('/completedTasks');
                }
            })
    }

    return (
        <div className='row p-5'>
            {
                tasks && tasks.map(task => <MyTask
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                    handleCompleted={handleCompleted}
                ></MyTask>)
            }
        </div>
    );
};

export default MyTasks;