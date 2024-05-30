import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div className="flex-shrink-0 w-96 md:w-[400px]">
            <div className="card shadow-lg shadow-error mx-4 bg-white p-4 transition-transform transform hover:scale-105">
                <div className="card-body">
                    <div className="flex items-center mb-4 avatar">
                        <div className="w-12 h-12 rounded-full mr-4 ring ring-error">
                            <img
                                src={review.photo}
                                alt={review.name}
                            />
                        </div>
                        <h3 className="card-title text-xl font-semibold text-error">{review.name}</h3>
                    </div>
                    <div className="rating rating-sm mb-2">
                        {Array.from({ length: 5 }, (_, index) => (
                            <input
                                key={index}
                                type="radio"
                                name={`rating-${review._id}`}
                                className={`mask mask-star-2 ${index < review.rating ? 'bg-yellow-500' : 'bg-gray-800'}`}
                                readOnly
                                checked={index < review.rating}
                            />
                        ))}
                    </div>
                    <p className="text-error">{review.comment}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
