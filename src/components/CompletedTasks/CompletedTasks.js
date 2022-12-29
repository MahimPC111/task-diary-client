import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CompletedTasks = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

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

    console.log(completedTasks)
    return (
        <div className='row p-5'>
            {
                completedTasks && completedTasks.map(task => <CompletedTasks
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                ></CompletedTasks>)
            }
        </div>
    );
};

export default CompletedTasks;