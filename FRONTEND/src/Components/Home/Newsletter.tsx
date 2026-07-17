import { MailIcon, Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden my-24">
      {/* Decorative Background */}
      

     <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-white to-orange-500 px-8 py-20 shadow-2xl outline outline-gray-300 md:px-16">
  {/* Decorative Background */}
  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
  <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

  {/* Optional grid pattern */}
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
            <MailIcon className="h-10 w-10" />
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-3xl md:text-5xl font-bold text-gray-900">
            Subscribe to Our Newsletter
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Get weekly updates on fresh groceries, seasonal offers,
            exclusive discounts, and healthy shopping tips delivered
            straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex w-full max-w-2xl flex-col sm:flex-row rounded-full bg-white p-2 shadow-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 rounded-full px-6 py-4 outline-none text-gray-700 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="mt-3 sm:mt-0 flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              Subscribe
              <Send className="h-5 w-5" />
            </button>
          </form>

          {/* Small Text */}
          <p className="mt-5 text-sm text-gray-500">
            No spam. Unsubscribe anytime.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;