import React from "react";
import {Leaf,Truck,ShieldCheck,Users,ShoppingBag,Target,Eye,ArrowRight,} from "lucide-react";
import { Link } from "react-router-dom";
import {heroSectionData} from "../assets/assets";
import CountUp from '../Components/Animation/CountUp'

const stats = [
  { value: 50, suffix: "K+", label: "Happy Customers" },
  { value: 10, suffix: "K+", label: "Products" },
  { value: 100, suffix: "+", label: "Partner Stores" },
  { value: 99, suffix: "%", label: "Customer Satisfaction" },
];

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Fresh Products",
    description:
      "We carefully source fresh fruits, vegetables, dairy, and essentials every day.",
  },
  {
    icon: <Truck className="h-8 w-8 text-orange-500" />,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery so your groceries arrive fresh and on time.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
    title: "Secure Shopping",
    description:
      "Your payments and personal information are always protected.",
  },
  {
    icon: <Users className="h-8 w-8 text-orange-500" />,
    title: "Customer First",
    description:
      "Our support team is always ready to help with your shopping experience.",
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-orange-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-orange-500 py-28 text-white">
         <img src={heroSectionData.hero_image} alt="Fresh Groceries" className="absolute inset-0 w-full h-full object-cover rounded-lg"/>
          <div className='absolute bg-black/60 inset-0'/>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            About InstaCart
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight md:text-6xl">
            Fresh Groceries.
            <br />
            Delivered Faster.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
            InstaCart makes grocery shopping simple by connecting customers with
            fresh products, trusted local stores, and lightning-fast delivery.
          </p>

          <Link
            to="/products"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-700 shadow-lg transition hover:scale-105"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Fresh groceries"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <span className="font-semibold text-orange-500">
              OUR STORY
            </span>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Making grocery shopping effortless.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              We believe everyone deserves quick access to fresh, healthy, and
              affordable groceries. That's why InstaCart partners with trusted
              local stores to bring thousands of products directly to your
              doorstep.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              From fresh produce to household essentials, we focus on quality,
              speed, and convenience—so you spend less time shopping and more
              time enjoying life.
            </p>
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <Target className="mb-5 h-12 w-12 rounded-xl bg-green-100 p-3 text-green-600" />

          <h3 className="text-2xl font-bold">
            Our Mission
          </h3>

          <p className="mt-4 leading-7 text-gray-600">
            To simplify grocery shopping through technology while delivering
            fresh products with exceptional customer service.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <Eye className="mb-5 h-12 w-12 rounded-xl bg-orange-100 p-3 text-orange-500" />

          <h3 className="text-2xl font-bold">
            Our Vision
          </h3>

          <p className="mt-4 leading-7 text-gray-600">
            To become the most trusted online grocery platform by combining
            convenience, affordability, and sustainability.
          </p>
        </div>

      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-24">

        <div className="grid gap-6 md:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 outline outline-gray-200"
            >
             
              <h2 className="text-4xl font-bold text-green-600">
                 <CountUp from={0} to={item.value} separator="," direction="up" duration={1} className="count-up-text" delay={0}/>{item.suffix}
              </h2>

              <p className="mt-3 text-gray-500">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">

        <div className="text-center">

          <span className="font-semibold text-orange-500">
            WHY CHOOSE US
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Everything you need in one place
          </h2>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="pb-24 px-6">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px]  px-8 py-20 text-center  shadow-2xl outline outline-gray-100">

          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

          <ShoppingBag className="mx-auto mb-6 h-16 w-16" />

          <h2 className="text-4xl font-bold">
            Ready to shop fresh?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Browse thousands of fresh groceries, daily essentials, and exclusive
            deals—all delivered straight to your home.
          </p>

          <Link
            to="/products"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gray-200 px-8 py-4 font-semibold text-green-700 transition hover:scale-105"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
};

export default About;

