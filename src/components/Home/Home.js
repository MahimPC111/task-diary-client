import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import img from '../../assets/home-image.jpg'
import { AuthContext } from '../../context/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Loader from '../Loader/Loader';

const Home = () => {
    const { theme } = useContext(AuthContext)
    useTitle('Home')
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className='min-vh-100'>
            <div className='w-100 row py-5 mx-0'>
                <div className='col-lg-6 col-md-12 mb-5 px-0 ps-5 d-flex align-items-center'>
                    <h1 className={`fw-bold ms-sm-5 mb-0 ${theme ? 'text-white' : 'text-dark'}`}>
                        <span className='span'>Hi!</span> <br />
                        <span className='span'>Welcome to</span>  <br />
                        <div className='section-title'>
                            <TypeAnimation
                                sequence={[
                                    'Task',
                                    2000,
                                    'Diary',
                                    2000,
                                    'Task Diary',
                                    2000,
                                ]}
                                wrapper="div"
                                cursor={true}
                                repeat={Infinity}
                                className="animation-text"
                            />
                        </div>
                    </h1>
                </div>
                <div className='col-lg-6 col-md-12 text-center p-0'>
                    <img className='img-fluid w-75' src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;