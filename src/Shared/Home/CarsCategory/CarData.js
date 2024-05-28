import React, { useContext } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { AuthContext } from '../../../UserValidation/Context/AuthProvider';
import useBuyer from '../../../Hooks/useBuyer';

const CarData = ({ carData, setProducts }) => {
    const { user } = useContext(AuthContext)
    const [isBuyer] = useBuyer(user?.email)

    const { name, location, seller_name, picture, resale_price, original_price, years_of_use, posted_time } = carData;
    return (
        <div className='lg:container lg:mx-auto mx-4'>
            <div className="card lg:w-[850px] lg:h-[500px] md:card-side bg-error shadow-xl mx-auto">
                <figure><img className='w-[600px] h-full' src={picture} alt="Album" /></figure>
                <div className="flex flex-col py-4 ps-4 justify-between">

                    <div className=' text-left gap-0 p-0'>
                        <h2 className="card-title mb-6">Model: {name}</h2>
                        {
                            carData.status &&
                            <p className='flex items-center whitespace-nowrap'>
                                Name: {seller_name}
                                <MdVerifiedUser className='text-xl ml-2 text-blue-600' />
                            </p>
                        }
                        {
                            !carData.status &&
                            <p>Name: {seller_name}</p>
                        }
                        <p className=' whitespace-nowrap'>Location: {location}</p>
                        <p className=' whitespace-nowrap'>Selling Price: ${resale_price}</p>
                        <p className=' whitespace-nowrap'>Original Price: ${original_price}</p>
                        <p className=' whitespace-nowrap'>Used Around: {years_of_use} years</p>
                        <p>Posted Time: {posted_time}</p>
                    </div>
                </div>
                <div className="flex justify-end items-end me-5 mt-2 md:mt-0 gap-2 md:gap-4">
                    {
                        isBuyer &&
                        <button className='btn-sm md:btn-md mb-5 whitespace-nowrap btn btn-neutral rounded-none'>Report to Admin</button>
                    }
                    <label htmlFor="booking-modal"
                        className="btn-sm md:btn-md mb-5 md:pt-3 pt-1 whitespace-nowrap btn-outline btn-ghost rounded-none"
                        onClick={() => setProducts(carData)}>
                        Book now
                    </label>

                </div>
            </div>
        </div>
    );
};

export default CarData;