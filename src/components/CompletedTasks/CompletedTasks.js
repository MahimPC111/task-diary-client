import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Loader from '../Loader/Loader';
import CompletedTask from './CompletedTask';

const CompletedTasks = () => {
    useTitle('Completed Tasks')
    const { user, loading, setLoading } = useContext(AuthContext);
    const [completedTasks, setCompletedTasks] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://task-diary-server.vercel.app/tasks?email=${user?.email}&status=completed`)
            .then(res => res.json())
            .then(data => {
                setCompletedTasks(data)
            })
    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this task?');

        if (proceed) {
            setLoading(true)
            fetch(`https://task-diary-server.vercel.app/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setLoading(false)
                        toast.success('Task deleted successfully')
                    }
                    const remainingTasks = completedTasks.filter(task => task._id !== id);
                    setCompletedTasks(remainingTasks)
                })
        }
    }

    const handleNotCompleted = id => {
        fetch(`https://task-diary-server.vercel.app/completedTasks/${id}`, {
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

    if (loading) {
        return <Loader></Loader>
    }


    return (
        <div className='container min-vh-100'>
            {
                completedTasks ?
                    <div className='card-grid py-5'>
                        {
                            completedTasks && completedTasks.map(task => <CompletedTask
                                key={task._id}
                                task={task}
                                handleDelete={handleDelete}
                                handleNotCompleted={handleNotCompleted}
                            ></CompletedTask>)
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    );
};

export default CompletedTasks;