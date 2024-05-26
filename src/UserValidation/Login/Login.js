import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import backgroundImg from '../../Assets/BG/Login.jpg'
import { AuthContext } from '../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import toast from 'react-hot-toast';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userSignIn } = useContext(AuthContext)
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = data => {
        console.log(data)
        setError('')
        userSignIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                if (user?.uid) {
                    navigate(from, { replace: true })
                    toast.success('Login Successful')
                }
                // setUserLoginEmail(data?.email)

            })
            .catch(error => {
                console.error(error)
                setError(error.message)
                toast.error(error.message)
            })


    }

    return (
        <section
            className='min-h-screen flex items-center justify-center relative'

            style={
                {
                    background: `url(${backgroundImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }
            }>

            <form className='w-72 md:w-96 grid grid-cols-1 gap-3 border border-error bg-base-300 shadow-lg p-4 md:p-6 relative z-10 m-4'
                onSubmit={handleSubmit(handleLogin)}>
                <h2 className='text-3xl text-center'>LOGIN</h2>
                <label>
                    <div className="label">
                        <span className="label-text">User Name</span>
                    </div>
                    <input {...register("username",
                        { required: "User name is required" }
                    )}
                        type="text" placeholder="username"
                        className="input input-bordered input-error w-full" />
                    {errors.username && <p className='text-error' role="alert">{errors.username.message}</p>}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input {...register("email", { required: "Email Address is required" })}
                        type="text" placeholder="Your Email"
                        className="input input-bordered input-error w-full" />
                    {errors.email && <p className='text-error' role="alert">{errors.email.message}</p>}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: 'Password must be 6 charecters or longer' },

                    })}
                        type="password" placeholder="Your Password"
                        className="input input-bordered input-error w-full" />
                    {errors.password && <p className='text-error' role="alert">{errors.password.message}</p>}
                </label>
                <button type='submit' className='btn btn-error'>LOGIN</button>
                <p className='text-red-600 text-center'>
                    {
                        error &&
                        <span>{error}</span>
                    }
                </p>
                <p className='text-center'>New to ReCarNation? <Link to='/signup' className='text-error font-semibold'>Create New Account</Link></p>
                <div className="divider divider-error text-error mb-4">OR</div>
                <GoogleLogin></GoogleLogin>
            </form>
        </section>
    );
};

export default Login;