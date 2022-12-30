import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Media = () => {
    const [allTasks, setAllTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setAllTasks(data))
    }, [])
    return (
        <div className='w-50 mx-auto my-5'>
            {
                allTasks.map(task => {
                    return (
                        <div key={task._id}>
                            <div className='border border-1 rounded-2 my-3 d-flex' style={{ height: '200px', overflow: 'hidden' }}>
                                <div className='w-25'>
                                    <img className='img-fluid w-100' style={{ height: '200px', }} src={task.task_image} alt="" />
                                </div>
                                <div className='w-75 ps-3 d-flex align-items-center'>
                                    <div>
                                        <h5>{task.title}</h5>
                                        <p>{task.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Media;