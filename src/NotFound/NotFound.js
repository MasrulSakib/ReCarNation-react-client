import React from 'react';
import error from '../Assets/404/2.jpg'

const NotFound = () => {
    return (
        <div>
            <div
                style={
                    {
                        background: `url(${error})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }
                }>
                <div className='text-center min-h-screen flex flex-col items-center justify-center'>
                    <div className='bg-base-100 rounded-2xl shadow-2xl p-4 md:p-6 m-4 md:m-0'>
                        <h1 className='text-3xl md:text-4xl text-error font-bold '>404 - Page Not Found</h1>
                        <p className='text-xl md:text-2xl text-error font-light'>Sorry, the page you are looking for does not exist.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;