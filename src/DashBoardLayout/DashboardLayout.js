import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const DashboardLayout = () => {
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
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><Link to={'/dashboard'}>My Orders</Link></li>
                    </ul>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;