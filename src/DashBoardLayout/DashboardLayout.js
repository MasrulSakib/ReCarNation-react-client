import React, { useContext } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useBuyer from '../Hooks/useBuyer';
import { AuthContext } from '../UserValidation/Context/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import { RiMenuUnfold3Line } from "react-icons/ri";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div className='min-h-screen'>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="flex m-4">
                        <label
                            htmlFor="dashboard-drawer"
                            role="button"
                            className="btn btn-sm btn-outline rounded-lg btn-error drawer-button lg:hidden"
                        >
                            Menu
                            <RiMenuUnfold3Line className='text-xl' />
                        </label>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side" style={{ top: 'auto' }}>
                    <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-30">
                        <li className="lg:hidden flex items-end mb-4">
                            <label htmlFor="dashboard-drawer" role='button' className="btn btn-sm btn-circle btn-outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </label>
                        </li>
                        {isBuyer && <li><Link to={'/dashboard/myorders'}>My Orders</Link></li>}
                        {isSeller && (
                            <>
                                <li><Link to={'/dashboard/addproduct'}>Add a Product</Link></li>
                                <li><Link to={'/dashboard/myproducts'}>My Products</Link></li>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
                                <li><Link to={'/dashboard/users/buyers'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/users/sellers'}>All Sellers</Link></li>
                                <li><Link to={'/dashboard/reportedcars/post'}>Reported Post</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
