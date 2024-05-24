import React from 'react';

const CarData = ({ carData }) => {
    const { name, location, seller_name, picture, resale_price, original_price, years_of_use, posted_time } = carData;
    return (
        <div className='md:container md:mx-auto mx-4'>
            <div className="card md:w-[850px] md:h-[500px] lg:card-side bg-error shadow-xl mx-auto">
                <figure><img className='w-[600px] h-full' src={picture} alt="Album" /></figure>
                <div className="flex flex-col py-4 ps-4 justify-between">

                    <div className=' text-left gap-0 p-0'>
                        <h2 className="card-title mb-6">Model: {name}</h2>
                        <p>Name: {seller_name}</p>
                        <p>Location: {location}</p>
                        <p>Selling Price: ${resale_price}</p>
                        <p>Original Price: ${original_price}</p>
                        <p>Used Around: {years_of_use} years</p>
                        <p>Posted Time: {posted_time}</p>
                    </div>

                    <div className="flex justify-end me-5 mt-2 md:mt-0">
                        <button className='btn btn-outline btn-ghost rounded-none'>PURCHASE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarData;