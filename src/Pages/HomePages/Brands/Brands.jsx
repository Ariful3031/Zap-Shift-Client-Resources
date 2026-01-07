import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react'
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

export default function Brands() {
    return (
        <div className='pb-10 mb-10 px-10 border-b-2 border-dashed dark:border-black'>
            <h1 className='text-3xl dark:text-black font-bold my-6 text-center'>We've helped thousands of sales teams</h1>
            <Swiper
                loop={true}
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide><img src={amazon} alt="" /></SwiperSlide>
                <SwiperSlide><img src={amazon_vector} alt="" /></SwiperSlide>
                <SwiperSlide><img src={casio} alt="" /></SwiperSlide>
                <SwiperSlide><img src={moonstar} alt="" /></SwiperSlide>
                <SwiperSlide><img src={randstad} alt="" /></SwiperSlide>
                <SwiperSlide><img src={star} alt="" /></SwiperSlide>
                <SwiperSlide><img src={start_people} alt="" /></SwiperSlide>


            </Swiper>
        </div>

    )
}
