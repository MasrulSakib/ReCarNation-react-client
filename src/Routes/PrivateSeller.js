import React, { useContext } from 'react';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useSeller from '../Hooks/useSeller';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateSeller = ({ children }) => {

    const { loader, user } = useContext(AuthContext)
    const [isSeller, sellerLoader] = useSeller(user?.email)
    const location = useLocation();

    if (loader || sellerLoader) {
        return <p className='flex justify-center items-center min-h-screen'><span className="loading loading-infinity loading-lg "></span></p>
    }

    if (user && isSeller) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateSeller;