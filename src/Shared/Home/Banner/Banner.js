import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';



const Banner = () => {
    const slides = [
        {
            url: "https://a.d-cd.net/UE6uG2xh_Nz74mc4KmTBQwdfjZY-1920.jpg", title: "Marcedes Benz",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Toyota_GR_Supra_SZ-R_%283BA-DB82-ZSRW%29.jpg/1200px-Toyota_GR_Supra_SZ-R_%283BA-DB82-ZSRW%29.jpg", title: "toyota supra",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/8/88/Mazda_CX-5_Newground_1X7A6786_%28cropped%29.jpg", title: "Mazda",
        },

        {
            url: "https://cdn.motor1.com/images/mgl/zxQBp4/s1/2024-lamborghini-revuelto-exterior.jpg", title: "lamborghini",
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Shelby_Mustang_GT500_Goodwood_001.jpg", title: "Mustang",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='min-w-screen md:h-[1000px] h-[380px] w-full relative pb-16 group'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full bg-center bg-cover duration-500'
            ></div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute md:top-[50%] top-[40%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute md:top-[50%] top-[40%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;