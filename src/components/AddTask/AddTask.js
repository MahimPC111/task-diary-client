import { format } from 'date-fns';
import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../Loader/Loader';

const AddTask = () => {
    const { user, loading, setLoading } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    if (loading) {
        <Loader></Loader>
    }

    const handleAddTask = data => {
        const imgHostingKey = process.env.REACT_APP_imgbb_key;
        const title = data.title;
        const details = data.details;
        const image = data.image[0];
        const email = user.email;
        const date = format(new Date(), 'PPP');

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostingKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    reset();
                    const newTask = {
                        published_date: date,
                        email,
                        title,
                        details,
                        task_image: imgData.data.url,
                        status: 'incomplete',
                    }
                    fetch('https://task-diary-server.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newTask)
                    })
                        .then(res => res.json())
                        .then(() => {
                            setLoading(false)
                            toast.success('Task added successfully!')
                        })
                }
            })
    }
    return (
        <div className='container px-0 pt-5 pb-5 row mx-auto'>
            <h2 className='mb-4 text-center'>Add your task here</h2>
            <form onSubmit={handleSubmit(handleAddTask)} className="form-bg w-75 w-sm-50 mx-auto border border-info rounded-3 p-3 p-sm-4 p-md-5">
                <div className="w-100 mt-3">
                    <input {...register("title", { required: "Task title is required" })} type="text" className="w-100 text-input" placeholder='Task title' />
                    {errors.title && <p className='fw-semibold'>{errors.title?.message}</p>}
                </div>

                <div className="w-100 mt-3">
                    <textarea {...register("details", { required: "Task details is required" })} type="text" className="w-100 text-input" placeholder='Task details' />
                    {errors.details && <p className='fw-semibold'>{errors.details?.message}</p>}
                </div>

                <div className="w-100 mt-3">
                    <input {...register("image", { required: "Image is required" })} type="file" id='file' accept='image/' className="d-none w-100 text-input bg-white" required />
                    <label className='file-label' htmlFor='file'><MdOutlineAddAPhoto className='me-1' />Upload Photo</label>
                </div>

                <input value='ADD TASK' className='button' type="submit" />
            </form >
        </div >
    );
};

export default AddTask;