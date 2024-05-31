import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../../LoadingSpinner/Spinner';
import { Link } from 'react-router-dom';

const AdvertisedCars = () => {
    const { data: advertisedCars = [], isLoading } = useQuery({
        queryKey: ['advertisedCars'],
        queryFn: async () => {
            const res = await axios.get('https://recarnation-react-server.vercel.app/dashboard/advertisedCars');
            return res.data;
        }
    });

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (

        advertisedCars.length > 0 &&
        <div>
            <h2 className='text-3xl mt-20 mb-10 font-semibold text-error'>Advertised Cars</h2>
            < div className="grid grid-cols-1 gap-10 md:container md:mx-auto mx-4" >
                {
                    advertisedCars.map(car => (
                        <div key={car._id} className="card lg:card-side bg-error shadow-xl ">
                            <figure className='lg:w-1/2 lg:h-full'><img src={car.picture} alt="Album" /></figure>
                            <div className="card-body lg:w-1/2">
                                <h2 className="card-title text-2xl">{car.company} {car.name}</h2>
                                <div className="divider divider-neutral"></div>
                                <p className='text-left'><span className='font-bold'>Original Price:</span> ${car.original_price} <br />
                                    <span className='font-bold'>Selling Price:</span> ${car.resale_price} <br />
                                    <span className='font-bold'>For Sale:</span> {car.description}
                                </p>
                                <div className="card-actions justify-end">
                                    <Link to={`/categorizedcars/${car.company}`}>
                                        <button className="btn-sm md:btn-md btn-outline btn-ghost rounded-none">See More</button></Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </div>
    );
};

export default AdvertisedCars;