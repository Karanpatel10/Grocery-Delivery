import { MailIcon, Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-24 px-4">

      <div
        className="
          relative mx-auto max-w-6xl overflow-hidden
          rounded-3xl
          border border-gray-300
          bg-app-cream-dark
          px-8 py-16
          shadow-lg
          md:px-20
        "
      >

        {/* Decorative shapes */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-app-green/90"/>

        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-app-orange/90"/>


        <div className="relative z-10 flex flex-col items-center text-center">


          {/* Icon */}
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-app-orange/40 shadow-md">
            <MailIcon className="h-11 w-11"/>
          </div>


          {/* Title */}
          <h2
            className="mt-8 text-3xl md:text-5xl font-medium text-gray-800">
            Subscribe to Our Newsletter
          </h2>


          <p className="mt-5 max-w-xl text-lg text-gray-600 leading-relaxed">
            Stay updated with fresh arrivals, seasonal offers,
            exclusive discounts, and healthy grocery tips.
          </p>


          {/* Input Box */}
          <form
            className="
              mt-10
              flex w-full max-w-2xl
              rounded-full
              border border-gray-200
              bg-white
              p-2
              shadow-md
              flex-col
              sm:flex-row
            "
          >

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                flex-1
                rounded-full
                px-6 py-4
                text-gray-700
                outline-none
              "
            />


            <button
              className="
                flex items-center justify-center
                gap-2
                rounded-full
                bg-green-800
                px-8 py-4
                font-semibold
                text-white
                transition
                hover:bg-app-green-light
              "
            >
              Subscribe
              <Send size={19}/>
            </button>

          </form>


          <p className="mt-5 text-sm text-gray-500">
            No spam • Unsubscribe anytime
          </p>

        </div>

      </div>

    </section>
  );
};

export default Newsletter;