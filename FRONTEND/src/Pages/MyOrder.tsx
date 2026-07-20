import {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import type {Order} from "../types";
import {dummyDashboardOrdersData,statusColors} from '../assets/assets'
import { Package,Calendar1,ChevronRight} from 'lucide-react';
import api from '../config/api';


const MyOrder = () => {

  const currency=import.meta.env.VITE_CURRENCY_SYMBOL||"$";
  const [orders,setOrders] = useState<Order[]>([]);
  const [activeTab,setActiveTab]=useState('all');


  const fetchOrders = async () => {
    const {data}=await api.get("/orders");
    console.log(data);
     setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  },[]);

  return (
    <div className='bg-app-cream py-25 min-h-screen'>
       <div className='mx-auto max-w-7xl'>
        <h1 className="text-3xl font-bold text-app-green">My Orders</h1>
        <div className="mt-6">
            
                {/* Tab */}
                <div className='flex gap-5'>
                    {
                        ["all","placed","Out for Delivery","Delivered"].map((tab)=>(
                            <button key={tab} onClick={()=>setActiveTab(tab)} className={`text-sm font-medium py-2 px-3 rounded-lg ${activeTab === tab ?'bg-app-green text-white':'text-app-text-light bg-white hover:bg-gray-100'}`}>
                                {tab ==='all'?'All orders':tab}
                             </button>   
                        ))
                    }
                 </div> 

                 {orders.length === 0 ? (
                    <div className='flex flex-col justify-center items-center gap-3 mt-40'>
                        <Package className='size-25 text-gray-300'/>
                        <h1 className='text-app-text-light'>You have no orders yet.</h1>
                        <p className="text-app-text-light">start shopping to see you ordering here</p>
                        <Link to='/products'><button className='bg-app-green text-white py-2 px-3 rounded-lg'>Start Shopping</button></Link>
                    </div>
                    ) : (  
                        <div className='space-y-5 my-10'>
                            {orders.filter(order =>activeTab === 'all'||order.status.toLowerCase()===activeTab.toLowerCase()).map((order)=>(
                                // order id,date & status
                                <Link key={order.id} to={`${order.id}`} className='flex flex-col'>
                                    <div className='flex justify-between bg-white p-7'>
                                        {/* left */}
                                        <div className='flex flex-col gap-3'>
                                            <p>Order #{order.id.slice(-8).toUpperCase()}</p>
                                            <div className='inline-flex gap-3 text-app-text-light text-sm'>
                                                <Calendar1 className='size-5'/>
                                                <span>{new Date(order.createdAt).toLocaleDateString("en-US", {month: "short",day: "numeric",year: "numeric",})}</span>
                                            </div>
                                            <div className='inline-flex gap-5'>
                                                {
                                                    order.items.slice(0,4).map((item,i)=>(
                                                        <img key={i} src={item.image} alt={item.name} className='size-12 md:size-16'/>
                                                    ))
                                                }
                                            </div>
                                            <p>{order.items.length} items</p>     
                                        </div>   
                                        {/* Right */}
                                        <div className='flex flex-col justify-around'>
                                            <div className={`inline-flex ${statusColors[order.status] ||"bg-gray-100 text-gray-700"} p-2 rounded-lg`}>
                                                <span>
                                                    {order.status} 
                                                </span>   
                                                <ChevronRight />
                                            </div> 
                                            <p className='text-app-green text-xl font-medium text-right'>{currency}{order.total.toFixed(2)}</p>
                                        </div>     
                                    </div>
                                 </Link>   
                            ))}
                         </div>   
                    )
                }
        </div>
        </div> 
    </div>
  )
}

export default MyOrder