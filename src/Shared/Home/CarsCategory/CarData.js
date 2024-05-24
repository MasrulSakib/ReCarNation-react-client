import React from 'react';

const CarData = ({ carData, setProducts }) => {
    const { name, location, seller_name, picture, resale_price, original_price, years_of_use, posted_time } = carData;
    return (
        <div className='lg:container lg:mx-auto mx-4'>
            <div className="card lg:w-[850px] lg:h-[500px] md:card-side bg-error shadow-xl mx-auto">
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
                        <label htmlFor="booking-modal"
                            className="btn-sm md:btn-md md:pt-3 pt-1 btn-outline btn-ghost rounded-none"
                            onClick={() => setProducts(carData)}>
                            Book now
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarData;