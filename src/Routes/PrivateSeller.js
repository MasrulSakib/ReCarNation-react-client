import React, { useContext } from 'react';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useSeller from '../Hooks/useSeller';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../LoadingSpinner/Spinner';

const PrivateSeller = ({ children }) => {

    const { loader, user } = useContext(AuthContext)
    const [isSeller, sellerLoader] = useSeller(user?.email)
    const location = useLocation();

    if (loader || sellerLoader) {
        return <Spinner></Spinner>
    }

    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateSeller;