import { MailIcon } from 'lucide-react'
import React from 'react'

const Newsletter = () => {
  return (
    <section className='max-w-7xl mx-auto text-center bg-white rounded-2xl p-20 my-30'>
        <div className='flex flex-col items-center  gap-5'>
            <span className='bg-app-cream p-5 rounded-full'><MailIcon className='size-8'/></span>
            <h2 className='text-4xl font-semibold max-w-xl'>Subscribe to  out Newsletter</h2>
            <p className='text-app-text-light text-base max-w-2xl'>Get weekly updates on fresh products,seasonal offers and exclusive discounts right to your inbox.</p>
            <form className='flex gap-10 flex-wrap justify-center' onSubmit={(e)=>e.preventDefault}>
                <input type='email' className='bg-app-cream p-2 rounded-lg min-w-sm focus:border-app-green focus:ring' placeholder='enter your email-ID' required/>
                <button type='submit' className='bg-app-orange hover:bg-app-orange-dark text-white rounded-lg px-5 py-2'>Subscribe</button>
            </form>
        </div>
    </section>
  )
}

export default Newsletter