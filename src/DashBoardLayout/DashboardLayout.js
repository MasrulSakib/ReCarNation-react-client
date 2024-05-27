import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useBuyer from '../Hooks/useBuyer';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isBuyer] = useBuyer(user?.email)
    const [isAdmin] = useAdmin(user?.email)

    return (
        <div className='min-h-screen'>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashborad-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side" style={{ top: 'auto' }}>
                    <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-30">
                        {
                            isBuyer &&
                            <li><Link to={'/dashboard/myorders'}>My Orders</Link></li>
                        }
                        {
                            isAdmin &&
                            <>
                                <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
                                <li><Link to={'/dashboard/users/buyers'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/users/sellers'}>All Sellers</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;