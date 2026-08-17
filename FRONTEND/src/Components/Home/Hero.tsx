import { Link } from "react-router-dom";
import { assets} from "../../assets/assets";
import { MoveRight,Van } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
  return (
     <section className="relative flex items-center min-h-screen">
   {/* Desktop */}
<motion.img
  src={assets.groceryMain}
  alt="Fresh Grocery"
  className="hidden md:block absolute inset-0 h-full w-full object-cover"
  initial={{ scale: 1.12 }}
  animate={{ scale: 1 }}
  transition={{
    duration: 1.8,
    ease: [0.22, 1, 0.36, 1],
  }}
/>

{/* Mobile */}
<img
  src={assets.groceryMain}
  alt="Fresh Grocery"
  className="block md:hidden absolute inset-0 h-full w-full object-cover"
/>
  {/* Dark Overlay */}
  <motion.div className="absolute inset-0 bg-gradient-to-r  from-black/80 via-black/50 via-40% to-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}></motion.div>

  {/* Hero Content */}
  <motion.div className="relative z-10 max-w-2xl px-6 md:px-20 text-white" initial="hidden"
        animate="visible"
        variants={{hidden: {},visible: {transition: {staggerChildren: 0.15,delayChildren: 0.3,},},}}>
    <motion.span className="inline-flex justify-center items-center text-orange-400 border border-orange-500 px-4 py-2 rounded-full text-sm font-bold mb-5 gap-2" variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {opacity: 1,y: 0,transition: {duration: 0.6,ease: "easeOut",},},
          }}
          whileHover={{scale: 1.05, borderColor: "rgba(251, 146, 60, 1)",
          }}>
      <Van/> Fresh Groceries Delivered
    </motion.span>

    <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight" variants={{
            hidden: { opacity: 0, y: 35 },
            visible: {opacity: 1,y: 0,transition: {duration: 0.8,ease: [0.22, 1, 0.36, 1],},},
          }}>
      Fresh Groceries <br />
      <span className="text-orange-400">Delivered to Your Doorstep</span>
    </motion.h1>

    <motion.p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl" variants={{
            hidden: { opacity: 0, y: 25 },
            visible: {opacity: 1,y: 0,transition: {duration: 0.7,ease: "easeOut",},},
          }}>
      Shop fresh fruits, vegetables, dairy, snacks, and everyday essentials
      at unbeatable prices. Fast delivery, premium quality, and hassle-free
      shopping.
    </motion.p>

    <motion.div className="mt-8 flex flex-wrap gap-4"variants={{
            hidden: { opacity: 0, y: 25 },
            visible: {opacity: 1,y: 0,transition: {duration: 0.7,ease: "easeOut",},},
          }}>
      <Link to="/products">
        <motion.button  className="bg-orange-500 hover:bg-orange-600 transition-colors px-8 py-4 rounded-full font-semibold flex items-center gap-2 active:scale-90 duration-150 transition-transform"
              whileHover={{scale: 1.05,backgroundColor: "#ea580c",boxShadow: "0 15px 35px rgba(249, 115, 22, 0.3)",}}
              whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 400,damping: 17,}}>
        Shop Now <MoveRight />
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>
   {/* Bottom Fade */}
     {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" /> */}
</section>
  )
}

export default Hero

