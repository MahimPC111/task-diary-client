import React from 'react';
import './Route404.css'
import img from '../../assets/route404/error-image.png'
import { Link } from 'react-router-dom';

const Route404 = () => {
    return (
        <div className='error-body'>

            <img src={img} alt="" />

            <svg viewBox="0 0 160 160" width="260" height="260" fill='#d84315'>
                <circle cx="80" cy="80" r="50" />
                <g transform=" matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
                    <path d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z" fill="#ffa000">
                        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="1s" repeatCount="indefinite" />
                    </path>
                </g>
                <path d="M 50,0 A 50,50 0 0,0 -50,0Z" transform="matrix(0.866, -0.5, 0.5, 0.866, 80, 80)" />
            </svg>

            <p>It's look like you're lost...<br />
                That's a trouble?</p>

            <Link to='/'> <button type="button">Go back to previous page</button></Link>
        </div>
    );
};

export default Route404;