import { Smartphone, Download } from "lucide-react";
import { appPromoBannerData, assets } from "../../assets/assets";
import { motion } from "motion/react";

const AppPromoBanner = () => {

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15, }, }, }; 
  const fadeUp = { hidden: { opacity: 0, y: 30, }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], }, }, };

  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto my-24 rounded-3xl bg-app-green px-8 py-12 md:px-16 md:py-20">

      {/* Decorative Background */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* Left */}
        <motion.div className="text-white" variants={containerVariants} initial="hidden" whileInView="visible">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Smartphone className="h-4 w-4" />
            Grocery App
          </div>

          <motion.h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight" variants={fadeUp}>
            {appPromoBannerData.title}
          </motion.h2>

          <motion.p className="mt-5 max-w-xl text-sm md:text-lg text-green-50 leading-8" variants={fadeUp}>
            {appPromoBannerData.description}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-5" variants={fadeUp}>

            <motion.img
              src={appPromoBannerData.googleapp}
              alt="Google Play"
              className="h-14 cursor-pointer rounded-xl bg-white p-2 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105" whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.25)", }} whileTap={{ scale: 0.95, }}
            />

            <motion.img
              src={appPromoBannerData.appleapp}
              alt="App Store"
              className="h-14 cursor-pointer rounded-xl bg-white p-2 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105" whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.25)", }} whileTap={{ scale: 0.95, }}
            />

          </motion.div>

          <div className="mt-8 flex items-center gap-3 text-sm text-green-100">
            <Download className="h-5 w-5" />
            <span>Available on Android & iOS</span>
          </div>

        </motion.div>

        {/* Right */}
        <motion.div className="flex justify-center" initial={{ opacity: 0, x: 80, scale: 0.9, }} whileInView={{ opacity: 1, x: 0, scale: 1, }} viewport={{ once: true, amount: 0.3, }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], }}>
          <motion.img
            src={assets.delivery_truck}
            alt="Delivery Truck"
            className="max-h-[420px] w-full object-contain drop-shadow-2xl transition duration-500 hover:scale-105" animate={{ y: [0, -10, 0], }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", }} whileHover={{ scale: 1.05, }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default AppPromoBanner;