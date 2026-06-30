import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const HomeCategories = () => {
  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
          <p className="text-gray-600">Find exactly what you need in each category</p>
        </div>

        <div className="mt-10">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            grabCursor={true}
            breakpoints={{
                      320: { slidesPerView: 2 },
                      640: { slidesPerView: 3 },
                      768: { slidesPerView: 4 },
                      1024: { slidesPerView: 5 },
                        }}
            className="mySwiper">
            {categoriesData.map((category) => (
              <SwiperSlide key={category.slug}>
                <Link to={`/products?category=${category.slug}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex flex-col items-center gap-4">
                  <div className="w-50 h-50 rounded-2xl bg-orange-100 group-hover:bg-orange-200 transition-colors overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-contain p-4"/>
                  </div>
                  <span>{category.name}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default HomeCategories;