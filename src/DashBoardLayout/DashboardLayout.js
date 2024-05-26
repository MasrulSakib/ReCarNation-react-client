import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import useBuyer from '../Hooks/useBuyer';
import { AuthContext } from '../UserValidation/Context/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isBuyer] = useBuyer(user?.email)

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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;