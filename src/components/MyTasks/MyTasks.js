import React, { useState } from 'react';
import { useEffect } from 'react';
import MyTask from './MyTask';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
    }, [])
    return (
        <div className='row gap-3 p-5'>
            {
                tasks.map(task => <MyTask key={task._id} task={task}></MyTask>)
            }
        </div>
    );
};

export default MyTasks;