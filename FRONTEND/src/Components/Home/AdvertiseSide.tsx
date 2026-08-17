import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from "motion/react";
// import './styles.css';
import { Autoplay } from 'swiper/modules';
import FreeMeggi from "../../assets/Free-MaggiAdvertise.webp"
import Dawaat from "../../assets/DawaatAdvertise.webp"
import Fortune_Atta from "../../assets/Fortune-Atta-Promo.jpg"
import Heer_Sona_Moosuri from "../../assets/Heer-Sona-Masoori.jpg"

const AdvertiseSide = () => {
  return (
    <motion.div className="w-full overflow-hidden rounded-2xl" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" as const, }} >
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
        <SwiperSlide><img src={FreeMeggi} alt="Meggi-image" className='h-50 md:h-auto'/></SwiperSlide>
        <SwiperSlide><img src={Dawaat} alt="Dawaat-image" className='h-50 md:h-auto'/></SwiperSlide>
        <SwiperSlide><img src={Fortune_Atta} alt="Fortune-image" className='h-50 md:h-auto'/></SwiperSlide>
        <SwiperSlide><img src={Heer_Sona_Moosuri} alt="Herr-Sona_Masoori-image" className='h-50 md:h-auto'/></SwiperSlide>
      </Swiper> 
    </motion.div>
  )
}

export default AdvertiseSide
