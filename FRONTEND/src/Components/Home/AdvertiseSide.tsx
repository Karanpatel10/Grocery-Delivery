import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import FreeMeggi from "../../assets/Free-MaggiAdvertise.webp"
import Dawaat from "../../assets/DawaatAdvertise.webp"
import Fortune_Atta from "../../assets/Fortune-Atta-Promo.jpg"
import Heer_Sona_Moosuri from "../../assets/Heer-Sona-Masoori.jpg"

const AdvertiseSide = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper rounded-2xl"
      >
        <SwiperSlide><img src={FreeMeggi} alt="Meggi-image"/></SwiperSlide>
        <SwiperSlide><img src={Dawaat} alt="Dawaat-image"/></SwiperSlide>
        <SwiperSlide><img src={Fortune_Atta} alt="Fortune-image"/></SwiperSlide>
        <SwiperSlide><img src={Heer_Sona_Moosuri} alt="Herr-Sona_Masoori-image"/></SwiperSlide>
      </Swiper> 
    </>
  )
}

export default AdvertiseSide
