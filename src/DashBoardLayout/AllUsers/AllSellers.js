import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../LoadingSpinner/Spinner';

const AllSellers = () => {

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return Array.isArray(data) ? data : []; // Ensure data is an array
        }
    })


    const handleUserStatus = async (user) => {
        try {
            const res = await fetch(`http://localhost:5000/users/status/${user?.email}`, {
                method: 'PUT',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            if (data.carsResult.modifiedCount > 0 || data.usersResult.modifiedCount > 0) {
                toast.success('User status updated');
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const deleteUser = (user) => {
        fetch(`http://localhost:5000/user/${user?._id}`, {
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
                    toast.success(`${user?.name} is removed successfully`);
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <h2 className="text-3xl my-6 ms-5 text-left">All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
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
                                    <td>
                                        {!user?.status && (
                                            <button
                                                onClick={() => handleUserStatus(user)}
                                                className="btn btn-xs btn-outline btn-error"
                                            >
                                                Verify
                                            </button>
                                        )}
                                        {user?.status && (
                                            <span
                                                onClick={() => handleUserStatus(user)}
                                                className="text-sm text-error"
                                            >
                                                Verified
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleteUser(user)}
                                            className="btn btn-xs btn-ghost btn-outline"
                                        >
                                            Delete
                                        </button>
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

export default AllSellers;