import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight,ArrowUpRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const HomeCategories = () => {
  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto md:p-4">

        {/* Heading */}
        <div className="mb-10 flex justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <p className="mt-2 text-gray-500">
              Find exactly what you need in each category
            </p>
          </div>
           <div className="flex gap-3">
              <button className="category-prev flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-orange-500 hover:text-white transition-transform duration-150 active:scale-90">
                <ChevronLeft size={20} />
              </button>

              <button className="category-next flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-orange-500 hover:text-white transition-transform duration-150 active:scale-90">
                <ChevronRight size={20} />
              </button>
          </div>
        </div>

        <Swiper
         modules={[Navigation]}
          navigation={{
              prevEl: ".category-prev",
              nextEl: ".category-next",
            } }
          slidesPerView={5}
          spaceBetween={20}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 3, spaceBetween: 18 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {categoriesData.map((category) => (
            <SwiperSlide key={category.slug}>
              <Link
                to={`/products?category=${category.slug}`}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="group relative block"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                  {/* Arrow */}
                 <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5 text-orange-500" />
                </div>

                  {/* Image */}
                  <div className="flex h-44 items-center justify-center rounded-2xl bg-orange-100 transition-colors duration-300 group-hover:bg-orange-200">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Text */}
                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-orange-500 whitespace-nowrap">
                      {category.name}
                    </h3>

                    
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCategories;