import React, { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

const GoogleLogin = () => {
    const { googleLogIn } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [userGoogleEmail, setGoogleEmail] = useState('')
    const [token] = useToken(userGoogleEmail);

    if (token) {
        navigate(from, { replace: true })
        toast.success('Login Successful')

    }

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
                    setGoogleEmail(email)
                }
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message)
            })
    }

    return (
        <button onClick={handleGoogleLogin} className='w-full btn btn-outline btn-ghost'><FaGoogle className='text-xl'></FaGoogle> LOGIN WITH GOOGLE</button>
    );
};

export default GoogleLogin;