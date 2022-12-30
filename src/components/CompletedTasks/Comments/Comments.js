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
        <div>
            {
                comments.length ?
                    comments.map(comment => <div key={comment._id}>
                        <div className='w-75 p-4 mx-auto fw-semibold bg-warning my-3 border border-success border-2 rounded-2'>{comment.commentBody}</div>
                    </div>)
                    :
                    <h3 className='text-center my-5 '>You have not added any comment in this Task</h3>
            }
        </div>
    );
};

export default Comments;