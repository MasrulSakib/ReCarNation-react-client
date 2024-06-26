import React, { useContext } from 'react';
import useBuyer from '../Hooks/useBuyer';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import Spinner from '../LoadingSpinner/Spinner';

const PrivateBuyer = ({ children }) => {

    const { loader, user } = useContext(AuthContext)
    const [isBuyer, buyerLoader] = useBuyer(user?.email)
    const location = useLocation();

    if (loader || buyerLoader) {
        return <Spinner></Spinner>
    }

    if (user && isBuyer) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateBuyer;