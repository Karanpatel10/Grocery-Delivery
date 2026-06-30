import Features from "../Components/Home/Features";
import Hero from "../Components/Home/Hero";
import HomeCategories from "../Components/Home/HomeCategories";
import PopularProduct from "../Components/Home/PopularProduct";
import AppPromoBanner from "../Components/Home/AppPromoBanner";
import Newsletter from "../Components/Home/Newsletter";


const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero/>
      <Features/>
      <HomeCategories/>
      <PopularProduct/>
      <AppPromoBanner/>
      <Newsletter/>
    </div>
  )
}

export default Home