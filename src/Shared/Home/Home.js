import React from 'react';
import Banner from './Banner/Banner';
import CarsCategory from './CarsCategory/CarsCategory';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import AdvertisedCars from '../../DashBoardLayout/MyProducts/AdvertisedCars';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisedCars></AdvertisedCars>
            <CarsCategory></CarsCategory>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;