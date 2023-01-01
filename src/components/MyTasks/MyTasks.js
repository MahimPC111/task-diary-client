import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Loader from '../Loader/Loader';
import MyTask from './MyTask';

const MyTasks = () => {
    useTitle('My Tasks')
    const { user, loading, setLoading } = useContext(AuthContext);
    const [tasks, setTasks] = useState(null);;

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
            setLoading(true);
            fetch(`https://task-diary-server.vercel.app/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setLoading(false);
                        toast.success('Task deleted successfully')
                    }
                    const remainingTasks = tasks.filter(task => task._id !== id);
                    setTasks(remainingTasks)
                })
        }
    }

    const handleCompleted = id => {
        setLoading(true);
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
                    toast.success('Task counted as completed');
                    setLoading(false);
                }
            })
    }

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='container min-vh-100'>
            {
                tasks ?
                    <div className='card-grid py-5'>
                        {
                            tasks && tasks.map(task => <MyTask
                                key={task._id}
                                task={task}
                                handleDelete={handleDelete}
                                handleCompleted={handleCompleted}
                            ></MyTask>)
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    );
};

export default MyTasks;