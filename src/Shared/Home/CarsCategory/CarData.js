import React, { useContext } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { AuthContext } from '../../../UserValidation/Context/AuthProvider';
import useBuyer from '../../../Hooks/useBuyer';
import toast from 'react-hot-toast';

const CarData = ({ carData, setProducts }) => {
    const { name, location, seller_name, picture, resale_price, original_price, years_of_use, posted_time, _id } = carData;
    const { user } = useContext(AuthContext)
    const [isBuyer] = useBuyer(user?.email)

    const handleReport = (id) => {
        fetch(`http://localhost:5000/reportedcars/${id}`, {
            method: 'PUT',

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Successfully Reported')
                }
            })

    }

    return (
        <div className='lg:container lg:mx-auto mx-4'>
            <div className="card lg:w-[850px] lg:h-[500px] md:card-side bg-error shadow-xl mx-auto">
                <figure><img className='w-[600px] h-full' src={picture} alt="Album" /></figure>
                <div className='flex flex-col justify-between text-left'>
                    <div className='card-body'>
                        <h2 className="card-title mb-6">Model: {name}</h2>
                        <div>
                            {
                                carData.status === "verified" &&
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
                    <div className="card-actions justify-end md:me-2 me-4">
                        {
                            isBuyer &&
                            <button onClick={() => handleReport(_id)} className='btn-sm md:btn mb-5 whitespace-nowrap btn btn-neutral rounded-none'>Report</button>
                        }
                        <label htmlFor="booking-modal"
                            className="btn-sm md:btn-md mb-5 md:pt-3 pt-1 whitespace-nowrap btn-outline btn-ghost rounded-none"
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