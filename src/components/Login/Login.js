import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../Loader/Loader';
import img from '../../assets/authentication-image.jpg'
import { BsGoogle } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import { useTitle } from '../../hooks/useTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import 'animate.css';

const Login = () => {
    useTitle('Login');
    const { logInUser, signInWithGoogle, loading, setLoading, theme } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const googleProvider = new GoogleAuthProvider();
    const from = location?.state?.from?.pathname || '/';
    const [state, setState] = useState(false)

    const bgTheme = theme ? 'form-bg2' : 'form-bg';

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [setLoading])

    if (loading) {
        return <Loader></Loader>
    }


    if (loading) {
        return <Loader></Loader>
    }

    const handleLogIn = data => {

        logInUser(data.email, data.password)
            .then(() => {
                setLoading(false)
                navigate(from, { replace: true });
                toast.success('Successfully logged in!');
            })
            .catch(e => {
                setLoading(false);
                toast.error(e.message)
            })
    }

    const handleGoogleLogin = () => {
        signInWithGoogle(googleProvider)
            .then(() => {
                setLoading(false)
                navigate(from, { replace: true });
                toast.success('Successfully logged in!');
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message)
            })
    }

    const togglePassword = () => {
        if (state) {
            document.getElementById('password').setAttribute('type', 'password');
            setState(false)
        }
        else {
            document.getElementById('password').setAttribute('type', 'text');
            setState(true)
        }
    }

    return (
        <div className='min-vh-100'>
            <div className="container px-3 py-5 p-sm-5 row mx-auto animate__animated animate__fadeIn">
                <div className='col-lg-6 col-md-12 mb-5 mb-lg-0'>
                    <img src={img} alt='' className="img-fluid my-lg-3" />
                </div>
                <div className={`col-lg-6 col-md-12 rounded-3 p-5 ${bgTheme}`}>
                    <form onSubmit={handleSubmit(handleLogIn)}>
                        <h2 className="text-center form-title">Log In now!</h2>

                        <div className="w-100">
                            <label className="label">
                                <span className={`label-text ${theme ? 'text-white' : 'text-dark'}`}>Email</span>
                            </label>
                            <input {...register("email", { required: "Email Address is required" })} type="email" className="w-100 text-input" placeholder='Enter your email' />
                            {errors.email && <p className={theme ? 'text-white' : 'text-dark'}>{errors.email?.message}</p>}
                        </div>

                        <div className="w-100 position-relative">
                            <label className="label">
                                <span className={`label-text ${theme ? 'text-white' : 'text-dark'}`}>Password</span>
                            </label>
                            <input {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 8, message: 'Password should be at least six or more characters' },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, message: 'Password must be strong' }
                                }
                            )} type="password" id='password' className="w-100 text-input" placeholder='Enter your password' /><FaRegEye onClick={togglePassword} className='eye-icon' />
                            {errors.password && <p className={theme ? 'text-white' : 'text-dark'}>{errors.password?.message}</p>}
                        </div>

                        <input value='Log in' className='button' type="submit" />
                        <p className={`text-xs text-center mt-4 ${theme ? 'text-white' : 'text-dark'}`}>Don't have account? <Link to='/register' className=''>Register</Link></p>
                    </form>
                    <button onClick={handleGoogleLogin} className='button d-flex align-items-center justify-content-center'><BsGoogle className='me-1' /><span>Sign in with Google</span></button>
                </div>
            </div>
        </div>
    );
};

export default Login;