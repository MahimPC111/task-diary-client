import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import img from '../../assets/home-image.jpg'

const Home = () => {
    return (
        <div className='w-100 row py-5 mx-0'>
            <div className='col-lg-6 col-md-12 mb-5 px-0 ps-5 d-flex align-items-center'>
                <h1 className='fw-bold ms-sm-5 mb-0'>
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
    );
};

export default Home;