import React, { useContext } from 'react';
import { AuthContext } from '../../UserValidation/Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    console.log('user', user)

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    const deleteBooked = (booking) => {
        fetch(`http://localhost:5000/bookings/${booking._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${booking.model} is removed successfully`);
                }
            })
    }

    if (isLoading) {
        return <p className='flex justify-center items-center min-h-screen'><span className="loading loading-infinity loading-lg "></span></p>
    }
    return (
        <div>
            <h2 className='text-3xl my-6 ms-5 text-left'>My Orders</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Action</th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) =>

                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        {
                                            <button onClick={() => deleteBooked(booking)} className="btn btn-circle btn-outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        }

                                    </th>

                                    <td>
                                        {
                                            <div className="avatar">
                                                <div className="w-24 md:w-32 rounded">
                                                    <img src={booking.picture} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        }
                                    </td>
                                    <td>{booking.model}</td>
                                    <td>{<p>${booking.sellingPrice}</p>}</td>
                                    <td>
                                        {
                                            booking.sellingPrice && !booking.paid && <Link to={`/dashboard/bookings/${booking._id}`}>
                                                <button
                                                    className='btn btn-ghost btn-sm btn-outline'>
                                                    Purchase
                                                </button></Link>
                                        }
                                        {
                                            booking.sellingPrice && booking.paid && <button
                                                className='btn btn-error btn-sm btn-outline'>
                                                Purchased
                                            </button>
                                        }

                                    </td>


                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;