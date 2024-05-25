import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import backgroundImg from '../../Assets/BG/29.jpeg'





const Login = () => {

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

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
                onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <h2 className='text-3xl text-center'>LOGIN</h2>
                <label>
                    <div className="label">
                        <span className="label-text">User Name</span>
                    </div>
                    <input {...register("username")}
                        type="text" placeholder="username"
                        className="input input-bordered input-error w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input {...register("email", { required: "Email Address is required" })}
                        type="text" placeholder="Your Email"
                        className="input input-bordered input-error w-full" />
                    {/* {errors.email && <p className='text-error' role="alert">{errors.email.message}</p>} */}
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
                    {/* {errors.password && <p className='text-error' role="alert">{errors.password.message}</p>} */}
                </label>
                {/* <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">User Type</span>
                    </div>
                    <input {...register("usertype")}
                        type="text" placeholder="usertype"
                        className="input input-bordered input-error w-full max-w-xs" />
                </label> */}
                <label>
                    <div className="label">
                        <span className="label-text">User Type</span>
                    </div>
                    <select {...register("usertype")} placeholder="usertype" className="select select-error w-full">
                        <option disabled>Admin(Access Denied)</option>
                        <option>Buyer</option>
                        <option>Seller</option>
                    </select>
                    <p>{data}</p>
                </label>
                <button type='submit' className='btn btn-error'>LOGIN</button>
            </form>
        </section>
    );
};

export default Login;