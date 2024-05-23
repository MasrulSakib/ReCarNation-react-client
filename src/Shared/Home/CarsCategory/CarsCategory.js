import React from 'react';
import CarsList from './CarsList';

const CarsCategory = () => {
    const carsBrand = [
        {
            id: 1,
            brand: 'Toyota',
            available_cars: 2,
        },
        {
            id: 1,
            brand: 'Mazda',
            available_cars: 2,
        },
        {
            id: 1,
            brand: 'Lamborghini',
            available_cars: 2,
        },
        {
            id: 1,
            brand: 'Mercedes-Benz',
            available_cars: 2,
        },
        {
            id: 1,
            brand: 'Ford',
            available_cars: 2,
        },
    ]


    return (
        <section className='md:container md:mx-auto mx-5 my-20'>
            <h2 className='text-3xl font-semibold text-error text-center mb-10'>Select a Category</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    carsBrand.map(car => <CarsList
                        key={car.id}
                        car={car}
                    ></CarsList>)
                }
            </div>
        </section>
    );
};

export default CarsCategory;