import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {text: "PrebuiltUI helped us move faster without sacrificing design quality. The components feel production-ready.",name: "Cristofer Levin",role: "Frontend engineer",image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",},
    {text: "The attention to detail in PrebuiltUI is impressive. Saved me hours of repetitive work and time. Highly recommended.",name: "Rohan Mehta",role: "Startup founder",image:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",},
    {text: "We were able ship faster using PrebuiltUI. The consistency across components made UI feel polished.",name: "Jason Kim",role: "Product designer",image:"https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",},
    {text: "PrebuiltUI feels like it was built by people who actually ship products. Components are clean and easy to use.",name: "Alex Turner",role: "Full stack developer",image:"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",},
    {text: "PrebuiltUI helped us maintain design consistency across multiple projects. It's now a core part of design.",name: "Sofia Martinez",role: "UX designer",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",},
    {text: "Our team productivity improved noticeably after adopting PrebuiltUI. It reduced design handoff friction.",name: "Daniel Wong",role: "UI designer",image:"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",},
  ];

  const rows = [
    {items: testimonials,direction: "left",},
    {items: [...testimonials].reverse(),direction: "right",},
  ];

  const renderCard = (testimonial, index) => (
  <div
    key={index}
    className="w-[360px] shrink-0 rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-md p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
  >
    {/* Quote */}
    <div className="text-5xl leading-none text-orange-300">“</div>

    {/* Rating */}
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>

    {/* Review */}
    <p className="text-gray-600 leading-7 text-[15px] mb-8">
      {testimonial.text}
    </p>

    {/* User */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-100"
        />

        <div>
          <h4 className="font-semibold text-gray-900">
            {testimonial.name}
          </h4>

          <p className="text-sm text-gray-500">
            {testimonial.role}
          </p>
        </div>
      </div>

      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        ✓ Verified
      </span>
    </div>
  </div>
);

  return (
    <section className="bg-[#FAFAFA] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

       <div className="text-center mb-16">
  <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
    ⭐ Customer Reviews
  </span>

  <h2 className="mt-6 text-5xl font-bold text-gray-900">
    Loved by Thousands of
    <span className="text-app-orange"> Happy Customers</span>
  </h2>

  <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
    See why families trust us for fresh groceries, quick delivery,
    and exceptional service every day.
  </p>
</div>


        <div className="space-y-6">
          {rows.map((row, index) => (
            <div key={index} className="relative overflow-hidden">

              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />


              <motion.div
                className="flex w-max gap-6"
                animate={{
                  x:
                    row.direction === "left"
                      ? ["0%", "-50%"]
                      : ["-50%", "0%"],
                }}
                transition={{duration: 60,ease: "linear",repeat: Infinity,}}
              >

                {[...row.items, ...row.items].map(
                  (testimonial, i) =>
                    renderCard(testimonial, i)
                )}

              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;