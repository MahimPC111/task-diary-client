import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Loader from '../Loader/Loader';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Media = () => {
    useTitle('Media');
    const { user, theme } = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    useEffect(() => {
        fetch(`https://task-diary-server.vercel.app/allTasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setAllTasks(data))
    }, [user?.email])

    return (
        <div className='min-vh-100'>
            {
                allTasks ?
                    <div className='py-5'>
                        {
                            allTasks.map(task => {
                                return (
                                    <div key={task._id}>
                                        <div className='border border-1 rounded-2 my-3 media-card'>
                                            <div className='media-card-image'>
                                                <PhotoProvider>
                                                    <div>
                                                        <PhotoView src={task.task_image}>
                                                            <img className='img-fluid' src={task.task_image} alt="" />
                                                        </PhotoView>
                                                    </div>
                                                </PhotoProvider>
                                            </div>
                                            <div className={`media-card-details ${theme ? 'text-white' : 'text-dark'}`}>
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