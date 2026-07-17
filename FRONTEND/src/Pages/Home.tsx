import Features from "../Components/Home/Features";
import Hero from "../Components/Home/Hero";
import HomeCategories from "../Components/Home/HomeCategories";
import PopularProduct from "../Components/Home/PopularProduct";
import AppPromoBanner from "../Components/Home/AppPromoBanner";
import Newsletter from "../Components/Home/Newsletter";
import BottomCover from "../Components/Home/BottomCover";
import AdvertiseSide from "../Components/Home/AdvertiseSide";
import BrandLogo from "../Components/Home/BrandLogo"
import Testimonial from "../Components/Home/Testimonial";


const Home = () => {
  return (
    <div>
       <Hero/>
          <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Features/>
            <HomeCategories/>
            <AdvertiseSide/>
            <PopularProduct/>
            <AppPromoBanner/>
            <BrandLogo/>
            <Newsletter/>  
          </div>
      <Testimonial/>
      <BottomCover/>
    </div>
  )
}

export default Home