import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/banner/banner1.png';
import bannerImg2 from '../../assets/banner/banner2.png';
import bannerImg3 from '../../assets/banner/banner3.png';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

export default function Banner() {
    return (
        <div className='mt-8'>
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            >
                <div className='relative'>
                    <img className='' src={bannerImg1} />
                    <div className='flex gap-5 items-center absolute top-112 left-23 '>
                        <div className='flex gap-1 items-center'>
                            <div className='-gap-1 bg-primary px-5 py-1 rounded-2xl'>
                                <button>Track Your Parcel</button>
                            </div>
                            <div className='text-3xl'>
                                <BsFillArrowUpRightCircleFill />
                            </div>
                        </div>
                        <button className='btn'>Be A Rider</button>
                    </div>

                </div>
                <div>
                    <img src={bannerImg2} />

                </div>
                <div>
                    <img src={bannerImg3} />

                </div>
            </Carousel>
        </div>
    )
}
