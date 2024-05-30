import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Spinner from '../LoadingSpinner/Spinner';


const PrivateAdmin = ({ children }) => {
    const { loader, user } = useContext(AuthContext)
    const [isAdmin, adminLoader] = useAdmin(user?.email)
    const location = useLocation();

    if (loader || adminLoader) {
        return <Spinner></Spinner>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;

