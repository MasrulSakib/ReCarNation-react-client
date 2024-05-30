import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../../LoadingSpinner/Spinner';
import { Link } from 'react-router-dom';

const AdvertisedCars = () => {
    const { data: advertisedCars = [], isLoading } = useQuery({
        queryKey: ['advertisedCars'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/dashboard/advertisedCars');
            return res.data;
        }
    });

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h2 className='text-3xl mt-20 mb-10 font-semibold text-error'>Advertised Cars</h2>
            <div className="grid grid-cols-1 gap-10 md:container md:mx-auto mx-4">
                {advertisedCars.map(car => (
                    <div className="card lg:card-side bg-error shadow-xl ">
                        <figure><img className='md:h-full md:w-full' src={car.picture} alt="Album" /></figure>
                        <div className="card-body md:w-1/2">
                            <h2 className="card-title text-2xl">{car.company} {car.name}</h2>
                            <div className="divider divider-neutral"></div>
                            <p className='text-left'><span className='font-bold'>Original Price:</span> {car.original_price} <br />
                                <span className='font-bold'>Selling Price:</span> {car.resale_price} <br />
                                <span className='font-bold'>For Sale:</span> Well-Maintained Car in Excellent Condition
                                Looking to sell my car, which is in great condition with all parts functioning perfectly.
                                This vehicle has been meticulously cared for and regularly serviced. It offers a smooth and reliable driving experience,
                                making it a fantastic option for anyone in the market for a dependable car.
                            </p>
                            <div className="card-actions justify-end">
                                <Link to={`/categorizedcars/${car.company}`}>
                                    <button className="btn-sm md:btn-md btn-outline btn-ghost rounded-none">See More</button></Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default AdvertisedCars;