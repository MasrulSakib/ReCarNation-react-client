import React from 'react';
import { Link } from 'react-router-dom';


const CarsList = ({ car }) => {

    const { company, description } = car;

    return (
        <div className="card lg:max-w-96 bg-error shadow-2xl mx-4 xl:mx-auto">
            <div className="card-body flex items-end justify-between">
                <div className='flex flex-col justify-center items-center my-3 '>
                    <h2 className="card-title text-2xl mb-3">{company}</h2>
                    <p className='text-left'>Details: {description}</p>
                </div>
                <div className="card-actions">
                    <Link to={`/categorizedcars/${company}`}>
                        <button className="btn-sm md:btn-md btn-outline btn-ghost rounded-none">Proceed</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CarsList;