import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/buyers')
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <p className='flex justify-center items-center min-h-screen'><span className="loading loading-infinity loading-lg "></span></p>
    }

    return (
        <div>
            <h2 className="text-3xl my-6 ms-5 text-left">All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.usertype}</td>
                                    <td><button className='btn btn-xs btn-ghost btn-outline'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;