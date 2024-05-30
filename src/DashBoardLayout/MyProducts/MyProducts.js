import React, { useContext } from 'react';
import { AuthContext } from '../../UserValidation/Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['myproducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/dashboard/seller/myproducts?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const deleteProduct = (product) => {
        fetch(`http://localhost:5000/dashboard/seller/myproducts/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.company} ${product.name} is removed successfully`);
                }
            });
    };

    if (isLoading) {
        return <p className='flex justify-center items-center min-h-screen'><span className="loading loading-infinity loading-lg "></span></p>;
    }

    return (
        <div>
            <h2 className='text-3xl my-6 ms-5 text-left'>My Products</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Action</th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Boost Ad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) => {
                            const status = product.booked ? (product.paid ? 'Sold' : 'Available') : 'Available';

                            return (
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <button onClick={() => deleteProduct(product)} className="btn btn-circle btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 md:w-32 rounded">
                                                <img src={product.picture} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.company} {product.name}</td>
                                    <td><p>${product.resale_price}</p></td>
                                    <td>{status}</td>
                                    <td>
                                        {
                                            status === "Available" &&
                                            <button className='btn-sm btn btn-outline'>Advertise</button>
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
