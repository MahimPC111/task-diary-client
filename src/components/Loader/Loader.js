import React from 'react';
import { useContext } from 'react';
import { ScaleLoader } from 'react-spinners';
import { AuthContext } from '../../context/AuthProvider';

const Loader = () => {
    const { theme } = useContext(AuthContext)
    return (
        <div className='text-center mt-5 pt-5 min-vh-100'>
            <ScaleLoader
                color={theme ? '#FFFFFF' : "#414141"}
                width={5}
            />
        </div>
    );
};

export default Loader;