import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import MyTask from './MyTask';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
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


    return (
        <div className='row gap-3 p-5'>
            {
                tasks.map(task => <MyTask
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                ></MyTask>)
            }
        </div>
    );
};

export default MyTasks;