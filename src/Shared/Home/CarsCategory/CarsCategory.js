import React from 'react';
import CarsList from './CarsList';

const CarsCategory = () => {
    const carsBrand = [
        {
            id: 1,
            company: 'Toyota',
            description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer founded in 1937 by Kiichiro Toyoda. It is one of the largest and most reliable car manufacturers in the world, known for producing a wide variety of vehicles, from economical cars to luxury models."
        },
        {
            id: 2,
            company: 'Mazda',
            description: "Mazda Motor Corporation, or simply Mazda, is a Japanese automaker established in 1920. Known for its commitment to innovation and design, Mazda produces a range of vehicles characterized by their sporty performance and stylish looks."
        },
        {
            id: 3,
            company: 'Lamborghini',
            description: "Automobili Lamborghini S.p.A., commonly referred to as Lamborghini, is an Italian brand known for its high-performance luxury sports cars and SUVs. Founded in 1963 by Ferruccio Lamborghini."
        },
        {
            id: 4,
            company: 'Mercedes-Benz',
            description: "Mercedes-Benz, a division of the German company Daimler AG, is synonymous with luxury, performance, and innovation in the automotive industry. Founded in 1926, the brand is renowned for its premium cars, trucks, and buses."
        },
        {
            id: 5,
            company: 'Ford',
            description: "Ford Motor Company, commonly known as Ford, is an American multinational automaker founded by Henry Ford in 1903. It is renowned for revolutionizing the automotive industry with the introduction of assembly line manufacturing techniques."
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