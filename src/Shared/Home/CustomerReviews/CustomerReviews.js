import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from './ReviewCard';
import Spinner from '../../../LoadingSpinner/Spinner';

const CustomerReviews = () => {
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await fetch('https://recarnation-react-server.vercel.app/reviews');
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        }
    });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="py-10">
            <h2 className="text-3xl my-6 text-center text-error font-semibold">Customer Reviews</h2>
            <div className="flex overflow-x-auto hover:overflow-x-scroll p-4">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-center">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerReviews;
