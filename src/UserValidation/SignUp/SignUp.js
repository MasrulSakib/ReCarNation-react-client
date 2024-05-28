import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import backgroundImg from '../../Assets/BG/SignUp.jpg'
import { AuthContext } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../../Shared/Navbar/Navbar';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignUp = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const userProfile = {
                    displayName: data.name,
                }
                updateUser(userProfile)
                    .then(() => {
                        saveUsers(data.name, data.email, data.usertype)
                        navigate('/');
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message)
            });

    }

    const saveUsers = (name, email, usertype) => {
        const user = { name, email, usertype };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })

            .then(res => res.json())
            .then(data => {
                console.log('Data:', data)
                if (data.acknowledged) {
                    toast.success('User Created Successfully')
                }
            })

    }

    return (
        <section>
            <Navbar></Navbar>
            <div
                className='min-h-screen flex items-center justify-center relative'
                style={
                    {
                        background: `url(${backgroundImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }
                }
            >


                <form onSubmit={handleSubmit(handleSignUp)}
                    className='w-72 md:w-96 grid grid-cols-1 gap-3 border border-error bg-base-300 shadow-lg p-4 md:p-6 relative z-10 m-4'>
                    <h2 className='text-2xl text-center font-semibold'>REGISTER</h2>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input {...register("name", { required: "Username is required" })}
                            type="text" placeholder="Your Name"
                            className="input input-bordered input-error w-full" />
                        {errors.name && <p className='text-error' role="alert">{errors.name.message}</p>}
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
                            pattern: { value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: 'Password must be strong' }
                        })}
                            type="password" placeholder="Your Password"
                            className="input input-bordered input-error w-full " />
                        {errors.password && <p className='text-error' role="alert">{errors.password.message}</p>}
                    </label>

                    <label>
                        <div className="label">
                            <span className="label-text">User Type</span>
                        </div>
                        <select {...register("usertype")} placeholder="usertype" className="select select-error w-full">
                            <option disabled>Admin(Access Denied)</option>
                            <option selected>Buyer</option>
                            <option>Seller</option>
                        </select>

                    </label>
                    <button type='submit' className='btn btn-error'>SIGN UP</button>
                    <p className='text-center'>Already Registered? Please <Link to='/login' className='text-error font-semibold'>Login</Link></p>
                </form>

            </div>
        </section>
    );
};

export default SignUp;