import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserValidation/Context/AuthProvider';

const Navbar = () => {

    const { user, userSignOut } = useContext(AuthContext)

    const userLogOut = () => {
        userSignOut()
            .then({})
            .catch(error => console.error(error))
    }

    const menuItems = <React.Fragment>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/blog'}>Blog</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><button onClick={userLogOut} className=''>Sign Out</button></li>
                </>
                :
                <>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/signup'}>SignUp</Link></li>
                </>
        }

    </React.Fragment>


    return (
        <div className="navbar bg-base-100 border-b-2 border-red-500">
            <div className="navbar-start">
                <div className=" lg:hidden ">
                    <div className='dropdown'>
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-error rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>
                <Link to={'/'} className="btn btn-ghost md:text-2xl text-xl font-semibold"><button>Re<span className='text-error'>Car</span>Nation</button></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;