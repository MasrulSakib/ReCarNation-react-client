import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import backgroundImg from '../../Assets/BG/Login.jpg'
import { FaGoogle } from 'react-icons/fa';





const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const handleLogin = data => {
        console.log(data)
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
                <div className="divider divider-error text-error mb-4">OR</div>
                <button className='w-full btn btn-outline btn-ghost'><FaGoogle className='text-xl'></FaGoogle> LOGIN WITH GOOGLE</button>
            </form>
        </section>
    );
};

export default Login;