import React from 'react';

const BookingModal = ({ products }) => {
    const { name, location, seller_name, picture, resale_price, original_price, years_of_use, posted_time } = products;

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{products.name}</h3>
                    <form onSubmit={handleSubmit} className='grid gap-3 grid-cols-1 my-6'>
                        <input type="text" readOnly placeholder="Type here" value={name} className="input input-bordered input-error text-black w-full" />
                        <input type="text" name='location' placeholder="location" value={location} className="input input-bordered input-error w-full" />
                        <input type="text" name='sellerName' placeholder="location" value={seller_name} className="input input-bordered input-error w-full" />
                        <input type="text" name='resalePrice' placeholder="location" value={resale_price} className="input input-bordered input-error w-full" />
                        <input type="submit" value="Submit" className='btn btn-error' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;