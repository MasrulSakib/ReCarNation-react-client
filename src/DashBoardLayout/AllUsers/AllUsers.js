import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Spinner from '../../LoadingSpinner/Spinner';

const AllUsers = () => {


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

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
            <h2 className="text-3xl my-6 ms-5 text-left">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
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
                                    <td><button onClick={() => deleteUser(user)} className='btn btn-xs btn-ghost btn-outline'>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;