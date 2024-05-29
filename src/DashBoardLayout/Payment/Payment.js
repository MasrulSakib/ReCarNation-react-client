import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const bookedCars = useLoaderData();

    return (
        <div className='md:container md:mx-auto mx-5'>
            <h2 className='md:text-3xl text-xl my-6 md:ms-5 text-center md:text-left'>Payment Process for {bookedCars.model}</h2>
            <div className='max-w-lg py-10 mx-auto border-2 border-ghost shadow-lg p-6 bg-base-300 md:my-20 my-10 '>
                <Elements stripe={stripePromise}>
                    <CheckOut bookingsData={bookedCars} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
