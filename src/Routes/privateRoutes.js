import React, { useContext } from 'react';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
    const { loader, user } = useContext(AuthContext)
    const location = useLocation()

    if (loader) {
        return <p className='flex justify-center'><span className="loading loading-infinity loading-lg "></span></p>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default PrivateRoutes;