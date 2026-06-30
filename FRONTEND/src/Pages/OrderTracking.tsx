import React from 'react'
import {useState,useEffect} from 'react'
import { useParams,useNavigate} from "react-router-dom";
import type { Order } from "../types";
import {dummyDashboardOrdersData,statusColors} from '../assets/assets'
import { ArrowLeft,PhoneCall,MapPin  } from 'lucide-react';
import OrderOTP from '../Components/OrderTracking/OrderOTP'
import LiveMap from '../Components/OrderTracking/LiveMap'
import OrderTimeLine from '../Components/OrderTracking/OrderTimeLine'


const OrderTracking = () => {
  const {id}=useParams();
  const navigate=useNavigate();

  const currency=import.meta.env.VITE_CURRENCY_SYMBOL||"$";
  const[order,setOrder]=useState<Order | null>(null);
  const[liveLocation,setLivelocation]=useState<{lat:number,lng:number} | null>(null);

  useEffect(()=>{
      setOrder(dummyDashboardOrdersData.find((o)=>o._id === id)as any)
  },[id])

  return (
    <div className='bg-app-cream'>
      <div className='max-w-7xl mx-auto py-25'>
        {/* Top section */}
              <div className=' space-y-15'>
                <div>
                  <button onClick={()=>navigate('/orders')} className='inline-flex gap-5 items-center'>
                      <ArrowLeft /> Back to Orders
                  </button> 
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-app-dark'>Order #{order?._id.slice(-8).toUpperCase() || 'Order Tracking'}</h1>
                  <div className='flex flex-row justify-between gap-2'>
                      <p className='text-app-text-light'>Placed on {new Date(order?.createdAt).toLocaleDateString("en-US",{year: 'numeric', month: 'long', day: 'numeric'})}</p>
                      <p className={`${statusColors[order?.status]} p-3 rounded-lg`}>
                        {order?.status}
                      </p>
                  </div>
                </div>
              </div>

          <div className='grid lg:grid-cols-3 gap-6 my-10'>
            {/* Left site - Timeline + Map Area */}
              <div className='md:col-span-2 space-y-10'>
                {/* OTP Card */}
                {order && <OrderOTP order={order}/>}
                {/* LiveMap */}
                {order &&<LiveMap order={order} liveLocation={liveLocation}/>}
                {/* Order Tracking */}
                {order && <OrderTimeLine order={order}/>}

                  {/*Delivery Person  */}
               
                  {
                    order?.deliveryPartner && order.status !== "Delivered" && order.status !== "canclled" &&(
                    <div className='flex justify-between bg-white p-4 items-center'>
                          <div className='flex gap-4'>
                              <p className='size-10 bg-app-green text-white p-1 rounded-full items-center justify-center flex'>{order.deliveryPartner.name.charAt(0)}</p>
                              <div>
                                    <p>{order.deliveryPartner.name}</p>
                                    <p>{order.deliveryPartner?.vehicleType} • Delivery Partner</p>
                               </div> 
                           </div>
                           <a href={`tel:${order.deliveryPartner.phone}`}><PhoneCall className='p-3 size-12 rounded-full hover:bg-gray-300 bg-gray-200'/></a>  
                    </div>  
                    )
                  }  
             </div>

              {/*Right side - Order Details */}
              <div className='space-y-8'>
                    {/* Address */}
                      <div className='bg-white p-5 rounded-lg '>
                          <h3 className='inline-flex gap-3 font-bold'><MapPin className='font-bold'/> Delivery Address</h3>
                          <p className='text-app-text-light'>{order?.shippingAddress.label}</p>
                          <p className='text-app-text-light'>{order?.shippingAddress.city}&nbsp;{order?.shippingAddress.state}</p>
                          <p className='text-app-text-light'>{order?.shippingAddress.zip}</p>
                     </div> 

                     {/* item */}
                     <div className='bg-white p-5 rounded-lg'>
                        <h3 className='font-bold'>Items ({order?.items.length})</h3>

                        <div className='space-y-3'>
                          {order?.items.map((item,i)=>(
                            <div key={i} className='flex items-center'>
                              <img src={item.image} alt={item.name} className='size-20'/>
                                <div className='flex-1 '>
                                  <span>{item.name}</span>
                                      <div className='flex justify-between text-app-text-light'>
                                        <span>X{item.quantity}</span>
                                        <span>{currency}{(item.price*item.quantity).toFixed(2)}</span>
                                      </div>
                                </div>
                            </div>  
                          ))}

                          <hr className='border-t border-gray-400'/>

                          <div className='space-y-2'>
                            <div className='flex justify-between text-app-text-light'>
                                <span>Subtotal</span>
                                <p>{(order?.subtotal??0).toFixed(2)}</p>
                             </div> 
                             <div className='flex justify-between text-app-text-light'>
                                <span>Delivery</span>
                                <p>{order?.deliveryFee === 0 ?'Free':(order?.deliveryFee??0).toFixed(2)}</p>
                              </div>
                              <div className='flex justify-between text-bold'>
                                <span>Total</span>
                                <p>{(order?.total??0).toFixed(2)}</p>
                              </div>
                          </div>
                         </div> 
                    </div>
                 
              </div>
          </div>    
      </div>
    </div>
  )
}

export default OrderTracking