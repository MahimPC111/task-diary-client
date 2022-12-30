import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Loader from '../Loader/Loader';

const Media = () => {
    useTitle('Media');
    const { user } = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    useEffect(() => {
        fetch(`https://task-diary-server.vercel.app/allTasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setAllTasks(data))
    }, [user?.email])

    return (
        <div>
            {
                allTasks ?
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
                                                    <h3 className='m-0 fs-3 fw-semibold'>{task.title}</h3>
                                                    <p className='m-0 fw-semibold'>{task.status}</p>
                                                    <p className='m-0 fw-semibold'>{task.published_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    );
};

export default Media;