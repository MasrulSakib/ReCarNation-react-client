import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CarData from './CarData';


const CategorizedCars = () => {
    const carsData = useLoaderData()

    return (
        <div>
            <h2 className='md:text-3xl text-2xl font-semibold mt-20 text-error'>Total Cars Available in this Category: {carsData.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-20 mx-auto' >
                {
                    carsData.map(carData => <CarData
                        key={carData._id}
                        carData={carData}
                    ></CarData>)
                }
            </div>
        </div>
    );
};

export default CategorizedCars;