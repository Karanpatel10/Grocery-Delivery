import React from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    const faqs = [
  {
    question: "What products can I buy from your grocery store?",
    answer: "We offer a wide range of products including fresh fruits, vegetables, dairy products, beverages, snacks, household essentials, personal care items, and daily grocery needs."
  },
  {
    question: "How do I place an order?",
    answer: "Simply browse products, add your favorite items to the cart, proceed to checkout, enter your delivery details, and complete your payment."
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we provide fast and reliable home delivery services directly to your doorstep."
  },
  {
    question: "How long does grocery delivery take?",
    answer: "Delivery time depends on your location, but most orders are delivered within a few hours or on the selected delivery slot."
  },
  {
    question: "Can I choose a delivery time slot?",
    answer: "Yes, you can select your preferred delivery time slot during checkout based on availability."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, same-day delivery is available for eligible locations and orders placed before the cutoff time."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order from your account dashboard or using the order tracking link sent after purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, debit cards, UPI, net banking, digital wallets, and cash on delivery where available."
  },
  {
    question: "Is cash on delivery available?",
    answer: "Yes, cash on delivery is available in selected areas depending on order value and location."
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, you can cancel your order before it is processed for delivery from your account or by contacting customer support."
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "You can request changes before your order is packed. Once shipped, modifications may not be possible."
  },
  {
    question: "What if an item is missing from my order?",
    answer: "If any item is missing, please contact our support team and we will help resolve the issue quickly."
  },
  {
    question: "What if I receive a damaged product?",
    answer: "If you receive a damaged or defective product, contact us with order details and we will arrange a replacement or refund."
  },
  {
    question: "Do you provide fresh fruits and vegetables?",
    answer: "Yes, we provide fresh fruits and vegetables sourced carefully to maintain quality and freshness."
  },
  {
    question: "How do you maintain product quality?",
    answer: "We follow strict quality checks, proper storage methods, and careful packaging to ensure products reach you fresh."
  },
  {
    question: "Do you offer discounts or promotions?",
    answer: "Yes, we regularly offer discounts, seasonal deals, coupons, and special offers on various products."
  },
  {
    question: "How can I apply a coupon code?",
    answer: "Enter your valid coupon code at checkout before completing your payment to apply the discount."
  },
  {
    question: "Do you have a minimum order value?",
    answer: "Minimum order requirements may vary depending on your location and delivery options."
  },
  {
    question: "Are there delivery charges?",
    answer: "Delivery charges depend on your location, order value, and available delivery offers."
  },
  {
    question: "Can I save products for later?",
    answer: "Yes, you can add products to your wishlist and purchase them whenever you need."
  },
  {
    question: "How do I create an account?",
    answer: "Click on the signup option, enter your details, verify your information, and your account will be created."
  },
  {
    question: "Can I order without creating an account?",
    answer: "Yes, you may place orders as a guest if the guest checkout option is available."
  },
  {
    question: "Do you sell organic products?",
    answer: "Yes, we offer a selection of organic and natural products for customers looking for healthier choices."
  },
  {
    question: "How are grocery items packaged?",
    answer: "Products are packed securely using suitable packaging methods to maintain freshness and prevent damage."
  },
  {
    question: "Can I return grocery products?",
    answer: "Returns are available for eligible products based on our return policy. Fresh items may have specific conditions."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our support team through phone, email, or the help section available on our website."
  },
  {
    question: "Do you deliver to my area?",
    answer: "Enter your location during checkout to check whether delivery is available in your area."
  },
  {
    question: "Can I reorder previous purchases?",
    answer: "Yes, you can quickly reorder your frequently purchased items from your order history."
  },
  {
    question: "Do you provide subscription options for regular groceries?",
    answer: "Yes, subscription options may be available for regularly used grocery items depending on the product."
  },
  {
    question: "Why should I choose your grocery store?",
    answer: "We provide quality products, convenient shopping, fast delivery, secure payments, and excellent customer service for a better grocery experience."
  }
]

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>
            
            <section className='w-full flex flex-col items-center justify-center py-30 px-14'>
                <div className='w-full max-w-5xl'>
                    <div className='mb-10'>
                        <h2 className='text-3xl font-semibold text-neutral-900 text-center md:text-start mb-4'>Most asked FAQ's</h2>
                        <p className='text-neutral-800  text-sm text-center md:text-start mx-auto md:mx-0'>We're here to help you and solve doubts. Find answers to the most common questions below.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-10'>
                        {faqs.map((faq, index) => (
                            <div key={index} onClick={() => toggleFAQ(index)} className={`bg-slate-50 p-3.5 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 ${openIndex === index ? 'row-span-2' : ''}`}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm font-medium text-neutral-800'>{faq.question}</span>
                                    <div className={`text-slate-400 p-1 rounded transition-colors ${openIndex === index ? 'bg-slate-200 text-slate-500' : 'hover:bg-slate-300 hover:text-slate-500'}`}>
                                        {openIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                        )}
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className='overflow-hidden'>
                                        <p className='text-sm text-neutral-600 leading-relaxed'>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQ