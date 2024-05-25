import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GoogleLogin = () => {
    const { googleLogIn } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleLogIn()
            .then(result => {
                const user = result.user;
                console.log("google:", user);
                saveGoogleUser(user.displayName, user.email)
            })
            .catch(error => console.error(error));
    }

    const saveGoogleUser = (name, email) => {
        const user = {
            name,
            email,
            usertype: "Buyer"
        };
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
                    toast.success('Login Successfull')
                }
                else {
                    toast.error('Login Failed. Please try again')
                }
            })

    }

    return (
        <button onClick={handleGoogleLogin} className='w-full btn btn-outline btn-ghost'><FaGoogle className='text-xl'></FaGoogle> LOGIN WITH GOOGLE</button>
    );
};

export default GoogleLogin;