import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';


const PrivateAdmin = ({ children }) => {
    const { loader, user } = useContext(AuthContext)
    const [isAdmin, adminLoader] = useAdmin(user?.email)
    const location = useLocation();

    if (loader || adminLoader) {
        return <p className='flex justify-center items-center min-h-screen'><span className="loading loading-infinity loading-lg "></span></p>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;

