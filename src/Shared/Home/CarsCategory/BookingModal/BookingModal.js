import React, { useContext } from 'react';
import { AuthContext } from '../../../../UserValidation/Context/AuthProvider';

const BookingModal = ({ products }) => {
    const { name, resale_price } = products;
    const { user } = useContext(AuthContext)

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-error btn-outline absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit} className='grid gap-3 grid-cols-1 my-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" disabled placeholder="Type here" value={user?.displayName} className="input input-bordered input-error text-black w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="email" disabled placeholder="Type here" value={user?.email} className="input input-bordered input-error text-black w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Model</span>
                            </div>
                            <input disabled type="text" name='location' placeholder="location" value={name} className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Selling Price</span>
                            </div>
                            <input disabled type="text" name='resalePrice' placeholder="location" value={resale_price} className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone No.</span>
                            </div>
                            <input type="phone" name='sellerName' placeholder="Your phone number" className="input input-bordered input-error w-full" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Meeting Location</span>
                            </div>
                            <input type="text" name='sellerName' placeholder="Your location" className="input input-bordered input-error w-full" />
                        </label>

                        <input type="submit" value="Submit" className='btn btn-error w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;