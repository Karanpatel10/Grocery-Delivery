import React from 'react'
import { appPromoBannerData, assets } from '../../assets/assets'


const AppPromoBanner = () => {
  return (
    <section className='bg-app-green-light rounded-xl grid grid-cols-1 md:grid-cols-2 p-10 md:p-20 gap-10  max-w-7xl mx-auto'>
      {/* left side */}
        <div className='text-white flex flex-col items-start gap-7'>
            <h1 className='text-3xl font-semibold'>{appPromoBannerData.title}</h1>
            <p className='text-sm  p-2 rounded-lg'>{appPromoBannerData.description}</p>
            <div className='flex flex-row flex-wrap w-full gap-5 md:gap-10'>
              <img src={appPromoBannerData.googleapp} alt='app promo banner' className='w-45 h-25 object-contain cursor-pointer  hover:scale-95 transition-all duration-200 ' />
              <img src={appPromoBannerData.appleapp} alt='app promo banner' className='w-45 h-25 object-contain cursor-pointer  hover:scale-95 transition-all duration-200' />
            </div>
        </div>
        {/* right side */}
        <div>
            <img src={assets.delivery_truck} alt='app picture truck' className='w-full h-full object-contain' />
          </div>   
    </section>
  )
}

export default AppPromoBanner