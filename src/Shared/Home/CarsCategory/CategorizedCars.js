import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CarData from './CarData';
import BookingModal from './BookingModal/BookingModal';


const CategorizedCars = () => {
    const carsData = useLoaderData()
    const [products, setProducts] = useState(null)

    return (
        <div>
            <h2 className='md:text-3xl text-2xl font-semibold mt-20 text-error'>Total Cars Available in this Category: {carsData.length}</h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 my-20  mx-4' >
                {
                    carsData.map(carData => <CarData
                        key={carData._id}
                        carData={carData}
                        setProducts={setProducts}
                    ></CarData>)
                }

                {
                    products &&
                    <BookingModal
                        products={products}
                        setProducts={setProducts}
                    ></BookingModal>
                }
            </div>
        </div>
    );
};

export default CategorizedCars;