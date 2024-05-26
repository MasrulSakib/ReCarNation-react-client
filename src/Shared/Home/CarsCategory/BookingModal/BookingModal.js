import React, { useContext } from 'react';
import { AuthContext } from '../../../../UserValidation/Context/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BookingModal = ({ products, setProducts }) => {
    const { name, resale_price } = products;
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    const handleBooked = data => {
        data.name = user?.displayName;
        data.email = user?.email;
        data.model = name;
        data.selling_price = resale_price;
        console.log(data)
        storeBookedData(data.name, data.email, data.model, data.selling_price, data.phone, data.meet_location)
    }

    const storeBookedData = (name, email, model, sellingPrice, phone, meetLocation) => {
        const bookedData = {
            name,
            email,
            model,
            sellingPrice,
            phone,
            meetLocation
        };
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bookedData),
        })
            .then(res => res.json())
            .then(data => {
                console.log('modal:', data)
                if (data.acknowledged) {
                    toast.success('Successfully Booked')
                    setProducts(null)
                }

            })
            .catch(error => {
                console.error(error)
                toast.error(error.message)
            })

    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-error btn-outline absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleBooked)} className='grid gap-3 grid-cols-1 my-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input {...register("name")} type="text" disabled placeholder="Type here" value={user?.displayName} className="input input-bordered input-error text-black w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input {...register("email")} type="email" disabled placeholder="Type here" value={user?.email} className="input input-bordered input-error text-black w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Model</span>
                            </div>
                            <input {...register("model")} disabled type="text" placeholder="location" value={name} className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Selling Price</span>
                            </div>
                            <input {...register("selling_price")} disabled type="text" placeholder="Selling Price" value={resale_price} className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone No.</span>
                            </div>
                            <input {...register("phone", { required: 'Phone number is required' })} type="phone" placeholder="Your phone number" className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Meeting Location</span>
                            </div>
                            <input {...register("meet_location", { required: 'Meeting Location is required' })} type="text" placeholder="Your location" className="input input-bordered input-error w-full" />
                        </label>

                        <input type="submit" value="Submit" className='btn btn-error w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;