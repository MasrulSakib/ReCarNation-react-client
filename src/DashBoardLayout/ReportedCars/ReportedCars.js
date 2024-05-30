import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../LoadingSpinner/Spinner';

const ReportedCars = () => {


    const { data: reportedCars = [], isLoading, refetch } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/dashboard/reportedcars/post', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const deletePost = (reportedCar) => {
        fetch(`http://localhost:5000/dashboard/reportedcars/post/${reportedCar._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${reportedCar?.company} ${reportedCar?.name} is removed successfully`);
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h2 className='text-3xl my-6 ms-5 text-left'>Reported Products</h2>

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
                        </tr>
                    </thead>
                    <tbody>
                        {reportedCars.map((reportedCar, i) => {
                            const status = reportedCar.booked ? (reportedCar.paid ? 'Sold' : 'Available') : 'Available';

                            return (
                                <tr key={reportedCar._id}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <button onClick={() => deletePost(reportedCar)} className="btn btn-circle btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 md:w-32 rounded">
                                                <img src={reportedCar.picture} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{reportedCar.company} {reportedCar.name}</td>
                                    <td><p>${reportedCar.resale_price}</p></td>
                                    <td>{status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ReportedCars;