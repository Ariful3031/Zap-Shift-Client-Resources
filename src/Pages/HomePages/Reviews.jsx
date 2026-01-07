import React, { use } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import customerTopImg from '../../assets/customer-top.png'
import ReviewsCard from './ReviewsCard';

export default function Reviews({ reviewsPromise }) {
  const rewiews = use(reviewsPromise);
  // console.log(rewiews)
  return (
    <div className='mb-5'>
      <div className='text-center'>
        <img className='block mx-auto' src={customerTopImg} alt="" />
        <div className='my-10'>
          <h1 className='text-3xl dark:text-black font-bold mb-4'>What our customers are sayings</h1>
          <p className='text-center text-[#606060]'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
        </div>
      </div>

      <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {
          rewiews.map(reviewData =>
            <SwiperSlide key={reviewData.id}>
              <ReviewsCard reviewData={reviewData}></ReviewsCard>
            </SwiperSlide>)
        }

      </Swiper>



    </div>
  )
}
