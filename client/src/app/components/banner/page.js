import React from 'react'
import { Image } from "@nextui-org/react";
import bannerData from '@/app/data/bannerData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
const Banner = () => {
    return (
        <>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                loop={true}
                // navigation={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                  }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {bannerData.map((item) => (
                    <SwiperSlide><Image className="w-[1400px] h-[10rem] lg:h-[35rem] " src={item.bannerImage} /></SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Banner
