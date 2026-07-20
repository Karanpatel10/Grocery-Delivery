import { Link } from "react-router-dom";
import { assets, heroSectionData} from "../../assets/assets";
import { Leaf, MoveRight,Van } from "lucide-react";

const Hero = () => {
  return (
    <>
     <div className="relative flex items-center min-h-screen">
  <img
    src={assets.groceryMain}
    alt="Fresh Grocery"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r  from-black/80 via-black/50 via-40% to-transparent"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-2xl px-6 md:px-20 text-white">
    <span className="inline-flex justify-center items-center text-orange-400 border border-orange-500 px-4 py-2 rounded-full text-sm font-bold mb-5 gap-2">
      <Van/> Fresh Groceries Delivered
    </span>

    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Fresh Groceries <br />
      <span className="text-orange-400">Delivered to Your Doorstep</span>
    </h1>

    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
      Shop fresh fruits, vegetables, dairy, snacks, and everyday essentials
      at unbeatable prices. Fast delivery, premium quality, and hassle-free
      shopping.
    </p>

    <div className="mt-8 flex flex-wrap gap-4">
      <Link to="/products">
        <button  className="bg-orange-500 hover:bg-orange-600 transition-colors px-8 py-4 rounded-full font-semibold flex items-center gap-2 active:scale-90 duration-150 transition-transform">
        Shop Now <MoveRight />
        </button>
      </Link>
    </div>
  </div>
</div>
    
    {/* <section className="relative flex flex-row items-center h-[70vh] md:rounded-2xl overflow-hidden max-w-7xl mx-auto my-15">    
        <img src={heroSectionData.hero_image} alt="Fresh Groceries" className="absolute inset-0 w-full h-full object-cover rounded-lg"/>
         <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/75 to-transparent"/>

         <div className=" absolute flex flex-col items-start max-w-4xl px-15 md:px-25   text-white gap-3">
          <p className="text-orange-400 bg-white/10 px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm"><Leaf/>Farm Fresh & Organic</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Nourish your home with <span className="text-orange-400">Earth's finest</span></h1>
            <p className="text-lg md:text-xl mb-8">Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <Link to="/products" className="bg-orange-500 rounded-full px-6 py-4 hover:bg-orange-600 transition-colors text-center flex flex-row  gap-3">Shop Now<MoveRight/></Link>
                <Link to="/products" className="bg-white/20 text-white px-6 py-4 rounded-full hover:bg-white/35 transition-colors text-center flex flex-row items-end gap-3">Browse Categories</Link>
            </div>
        </div>
          
    </section> */}
   
    </>
  )
}

export default Hero