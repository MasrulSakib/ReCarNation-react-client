import React, { useContext } from 'react';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom'
import Spinner from '../LoadingSpinner/Spinner';

const PrivateRoutes = ({ children }) => {
    const { loader, user } = useContext(AuthContext)
    const location = useLocation()

    if (loader) {
        return <Spinner></Spinner>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;