import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';

const Comments = () => {
    useTitle('Comments');
    const { _id } = useLoaderData();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch(`https://task-diary-server.vercel.app/allComments?taskId=${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
    }, [_id])


    return (
        <div className='min-vh-100'>
            {
                comments.length ?
                    comments.map((comment, i) => <div key={comment._id}>
                        <div className='p-3 p-md-4 p-lg-4 mt-2 mt-lg-3 w-75 mx-auto form-bg rounded-3 fw-semibold'>{i + 1}) {comment.commentBody}</div>
                    </div>)
                    :
                    <h3 className='text-center my-5 '>You have not added any comment in this Task</h3>
            }
        </div>
    );
};

export default Comments;