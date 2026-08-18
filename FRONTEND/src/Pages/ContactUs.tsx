import React from 'react'

const ContactUs = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                *{ font-family: "Geist", sans-serif; }
            `}</style>
            
          
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-25 lg:grid-cols-2 py-25 md:py-40 bg-app-cream px-4 lg:px-8">

    {/* Left */}
    <div className="flex flex-col justify-center">
      <span className="mb-4 inline-flex w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
        Contact Us
      </span>

      <h1 className="mb-6 text-4xl md:text-5xl font-bold leading-tight text-gray-900">
        We'd love to hear
        <span className="block bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
          from you.
        </span>
      </h1>

      <p className="mb-10 max-w-lg text-lg leading-8 text-gray-600">
        Have a question, feedback, or need support? Our team is always ready to
        help. We'll get back to you as soon as possible.
      </p>

      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl outline outline-gray-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            📧
          </div>

          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <p className="text-gray-500">support@instacart.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl outline outline-gray-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
            📍
          </div>

          <div>
            <p className="font-semibold text-gray-900">Address</p>
            <p className="text-gray-500">
              123 Grocery Street, New York
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Right */}
    <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl lg:p-10">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Send us a message
      </h2>

      <form className="space-y-6">
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Message
          </label>

          <textarea
            rows={6}
            placeholder="Tell us how we can help..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-green-600 to-orange-500 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
          Send Message
        </button>
      </form>
    </div>

  </div>

    </>
  )
}

export default ContactUs


