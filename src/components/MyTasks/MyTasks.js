import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import MyTask from './MyTask';

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://task-diary-server.vercel.app/tasks?email=${user?.email}&status=incomplete`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this task?');

        if (proceed) {
            fetch(`https://task-diary-server.vercel.app/tasks/${id}`, {
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
        fetch(`https://task-diary-server.vercel.app/completedTasks/${id}`, {
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
        <div className='container'>
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
        </div>
    );
};

export default MyTasks;