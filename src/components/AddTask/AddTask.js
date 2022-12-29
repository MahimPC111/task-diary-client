import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const handleAddTask = data => {
        const imgHostingKey = process.env.REACT_APP_imgbb_key;

        const title = data.title;
        const details = data.details;
        const image = data.image[0];

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
                        title,
                        details,
                        task_image: imgData.data.url,
                        status: 'incomplete',
                    }
                    console.log(newTask)
                    fetch('http://localhost:5000/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newTask)
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success('Task added successfully!')
                        })
                }
            })
    }
    return (
        <div className='container px-0 pt-5 row mx-auto'>
            <form onSubmit={handleSubmit(handleAddTask)} className="form-bg w-75 w-sm-50 mx-auto border border-info rounded-3 p-3 p-sm-4 p-md-5">
                <h2 className="text-center form-title">Add Task</h2>

                <div className="w-100 mt-3">
                    <input {...register("title", { required: "Task title is required" })} type="text" className="w-100 text-input" placeholder='Task title' />
                    {errors.title && <p className='text-danger fw-semibold'>{errors.title?.message}</p>}
                </div>

                <div className="w-100 mt-3">
                    <textarea {...register("details", { required: "Task details is required" })} type="text" className="w-100 text-input" />
                    {errors.details && <p className='text-danger fw-semibold'>{errors.details?.message}</p>}
                </div>

                <div className="w-100 mt-3">
                    <input {...register("image", { required: "Image is required" })} type="file" className="w-100 text-input" required />
                    {errors.image && <p className='text-danger fw-semibold'>{errors.image?.message}</p>}
                </div>

                <input value='ADD TASK' className='button' type="submit" />
            </form>
        </div>
    );
};

export default AddTask;