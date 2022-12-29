import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='text-center my-10 h-screen'>
            <ScaleLoader
                color="#414141"
                width={5}
            />
        </div>
    );
};

export default Loader;