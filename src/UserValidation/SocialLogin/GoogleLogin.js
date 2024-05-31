import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const GoogleLogin = () => {
    const { googleLogIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [userGoogleEmail, setGoogleEmail] = useState('');
    const [token] = useToken(userGoogleEmail);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
            toast.success('Login Successful');
        }
    }, [token, from, navigate]);

    const handleGoogleLogin = () => {
        googleLogIn()
            .then(result => {
                const user = result.user;
                saveGoogleUser(user.displayName, user.email);
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    const saveGoogleUser = (name, email) => {
        const user = { name, email, usertype: 'Buyer' };
        fetch('https://recarnation-react-server.vercel.app/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setGoogleEmail(email);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <button onClick={handleGoogleLogin} className='w-full btn btn-outline btn-ghost'>
            <FaGoogle className='text-xl' /> LOGIN WITH GOOGLE
        </button>
    );
};

export default GoogleLogin;
