import React from 'react';

const CarsList = ({ car }) => {
    const { brand, available_cars } = car;
    return (
        <div className="card w-96 bg-error shadow-2xl mx-auto">
            <div className="card-body">
                <div className='flex flex-col justify-center items-center my-3 '>
                    <h2 className="card-title text-2xl">Brand: {brand}</h2>
                    <p>Available Cars: {available_cars}</p>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-ghost rounded-none">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarsList;