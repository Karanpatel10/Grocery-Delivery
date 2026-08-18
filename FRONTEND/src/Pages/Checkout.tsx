import { MoveLeft,MapPin,CreditCard,Check,ChevronRight} from 'lucide-react';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCart} from '../Context/CartContext'
import type { LucideIcon } from 'lucide-react';
import CheckoutAddress from '../Checkout/CheckoutAddress';
import CheckoutPayment from '../Checkout/CheckoutPayment';
import CheckoutReview from '../Checkout/CheckoutReview';
import type { Address } from '../types';
import api from '../config/api'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'

const Checkout = () => {

  const navigate=useNavigate()
  const currency=import.meta.env.VITE_CURRENCY_SYMBOL||'$';
  
  const {items,cartTotal,clearCart}=useCart();
  const {user}=useAuth();
  const [loading,setLoading]=useState(false);
  const [address,setAddress]=useState<Address>({
    id:"",label:"Home",address:"",city:"",state:"",zip:"",isDefault:false,lat:0,lng:0
  });

  const [paymentMethod,setPaymentMethod]=useState('card');
  const [activeStep, setActiveStep] = useState('address');

  const deliveryFee=cartTotal>20?0:2;
  const tax=cartTotal*0.05;
  const Total=cartTotal+deliveryFee+tax;

  const steps: { key: string; label: string; icon: LucideIcon }[] = [
    {key:"address",label:"Address",icon:MapPin},
    {key:"payment",label:"Payment",icon:CreditCard},
    {key:"review",label:"Review",icon:Check},
  ]

  const handlePlaceOrder=async()=>{
    setLoading(true);
    try{
      const orderData={
        items:items.map((item)=>({
          product:item.product.id,
          quantity:item.quantity,
        })),
        shippingAddress:address,
        paymentMethod
      }

      const {data}=await api.post('/orders',orderData)
      console.log(data);
      if(data.url){
        window.location.href=data.url;
        console.log("Redirecting to Stripe checkout:", data.url);
        return;
      }

      // For non-card payments, clear the cart and navigate to orders page
      clearCart();
      toast.success("Order Placed Successfully");
      navigate('/orders');
    }catch(error:any){
      toast.error(error.response?.data?.message||error.message);
    }
  }

  useEffect(()=>{
    if(user?.addresses?.length){
      const defAddr=user.addresses.find((a)=>a.isDefault)||setAddress(user.addresses[0]);
        setAddress({id:defAddr?.id,label:defAddr?.label,address:defAddr?.address,city:defAddr?.city,state:defAddr?.state,zip:defAddr?.zip,isDefault:defAddr?.isDefault,lat:defAddr?.lat,lng:defAddr?.lng})
    }
     },[user])

  return (
    <div className='bg-app-cream min-h-screen py-24 px-4 sm:px-6 md:px-20'>
      <div className='max-w-7xl mx-auto'>
        {items.length<=0?
          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='font-bold'>Your cart is empty</h1>
            <p>Add some products to checkout</p>
            <button className='bg-app-green text-white rounded-lg py-2 px-3' onClick={()=>navigate('/products')}>Browse Products</button>
          </div> 
          :
          <div className='space-y-5'>
            <button onClick={()=>navigate(-1)} className='flex gap-5 hover:text-app-green hover:scale-95 pb-5 transition-all duration-300'>
              <MoveLeft />Back
            </button> 
            <h1 className='text-2xl font-semibold text-app-green'>Checkout</h1>
            {/* Steps */}
            <div className="flex flex-row items-center gap-1 md:gap-3">
                {steps.map((step, i) => (
                  <div key={step.key} className="flex-1">
                    <button onClick={() => setActiveStep(step.key)} className={`flex flex-row items-center gap-2
                        ${activeStep === step.key? "bg-app-green text-white": "bg-white text-black"} outline-1 outline-gray-300 py-3 px-2 md:py-4 md:px-7 rounded-sm w-full text-sm md:text-base`}>
                      <step.icon size={18} />
                      <span>{step.label}</span>
                      {i !== steps.length - 1 && (
                        <ChevronRight className="ml-auto size-4 md:size-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
 

            {/* Main Form */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mt-8 md:mt-15'>
              <div>
              {activeStep ==='address' && <CheckoutAddress address={address} setAddress={setAddress} setStep={setActiveStep} user={user}/>}
              {activeStep ==='payment' && <CheckoutPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setStep={setActiveStep}/>}
              {activeStep ==='review' && <CheckoutReview address={address} items={items} handlePlaceOrder={handlePlaceOrder} total={Total} loading={loading}/>}
              </div>

              {/* Order Summary Sidebar */}
              <div className='grid grid-cols-1 bg-white rounded-2xl p-5 h-fit md:sticky md:top-24'>
              <h3>Order Summary</h3>
              
              <div className='border-t border-gray-300 mt-4 pt-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>{currency}{cartTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Delivery Fee</span>
                  <span>{currency}{deliveryFee.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tax</span>
                  <span>{currency}{tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold text-lg mt-2'>
                  <span>Total</span>
                  <span>{currency}{Total.toFixed(2)}</span>
                </div>
              </div>
               </div> 

            </div>

            
          </div>
        }
       </div> 
    </div>
  )
}

export default Checkout