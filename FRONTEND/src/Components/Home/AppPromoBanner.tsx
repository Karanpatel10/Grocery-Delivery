import { Smartphone, Download } from "lucide-react";
import { appPromoBannerData, assets } from "../../assets/assets";

const AppPromoBanner = () => {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto my-24 rounded-3xl bg-app-green px-8 py-12 md:px-16 md:py-20">

      {/* Decorative Background */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* Left */}
        <div className="text-white">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Smartphone className="h-4 w-4" />
            Grocery App
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            {appPromoBannerData.title}
          </h2>

          <p className="mt-5 max-w-xl text-lg text-green-50 leading-8">
            {appPromoBannerData.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <img
              src={appPromoBannerData.googleapp}
              alt="Google Play"
              className="h-14 cursor-pointer rounded-xl bg-white p-2 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105"
            />

            <img
              src={appPromoBannerData.appleapp}
              alt="App Store"
              className="h-14 cursor-pointer rounded-xl bg-white p-2 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105"
            />

          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-green-100">
            <Download className="h-5 w-5" />
            <span>Available on Android & iOS</span>
          </div>

        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={assets.delivery_truck}
            alt="Delivery Truck"
            className="max-h-[420px] w-full object-contain drop-shadow-2xl transition duration-500 hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default AppPromoBanner;