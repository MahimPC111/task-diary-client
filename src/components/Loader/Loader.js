import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='text-center mt-5 pt-5'>
            <ScaleLoader
                color="#414141"
                width={5}
            />
        </div>
    );
};

export default Loader;