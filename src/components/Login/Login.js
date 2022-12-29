import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../Loader/Loader';
import img from '../../assets/authentication-image.jpg'

const Login = () => {
    const { logInUser, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    if (loading) {
        return <Loader></Loader>
    }

    const handleLogIn = data => {

        logInUser(data.email, data.password)
            .then(() => {
                navigate('/')
                toast.success('User logged in successfully')
            })
            .catch(e => {
                toast.error(e.message)
            })
    }
    return (
        <div className="container px-3 py-5 p-sm-5 row mx-auto">
            <div className='col-lg-6 col-md-12 mb-5'>
                <img src={img} alt='' className="img-fluid" />
            </div>
            <div className='col-lg-6 col-md-12 border border-info rounded-3 p-5 form-bg'>
                <form onSubmit={handleSubmit(handleLogIn)}>
                    <h2 className="text-center form-title">Log In now!</h2>

                    <div className="w-100">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="email" className="w-100 text-input" placeholder='Enter your email' />
                        {errors.email && <p className='text-danger fw-semibold'>{errors.email?.message}</p>}
                    </div>

                    <div className="w-100">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 8, message: 'Password should be at least six or more characters' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, message: 'Password must be strong' }
                            }
                        )} type="password" className="w-100 text-input" placeholder='Enter your password' />
                        {errors.password && <p className='text-danger fw-semibold'>{errors.password?.message}</p>}
                    </div>

                    <input value='Log in' className='button' type="submit" />
                    <p className='text-xs text-center mt-4'>Already have account? <Link to='/register' className=''>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;