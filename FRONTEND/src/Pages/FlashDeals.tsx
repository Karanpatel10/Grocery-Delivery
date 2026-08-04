import ProductsCard from '../Components/ProductsCard' 
import {ZapIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import api from '../config/api';
import toast from 'react-hot-toast';
import type { Product } from '../types';
// import Loading from '../Components/Loading';
import { useLoading } from "../Context/LoadingContext";

const FlashDeals = () => {
 const [products,setProducts]=useState<Product[]>([])
//  const [loading,setLoaidng]=useState(true)
const {setLoading}=useLoading();

  useEffect(()=>{
      setLoading(true);
      api.get('/products/flash-deals')
      .then((res)=>{
        setProducts(res.data.products)
      })
      .catch((error)=>{
          toast.error(error.response.data.message||error?.message)
      }).finally(()=>setLoading(false)) 
  },[])
  
  // if(loading) return <Loading/>;

  return (
    <section>
      <div className='bg-linear-to-r from-app-orange to-app-orange-dark flex justify-center items-center text-center text-white flex-col gap-2 py-20'>
        <h1 className='font-extrabold text-3xl flex gap-5 items-center'><ZapIcon className='fill-white'/>Flash Deals<ZapIcon className='fill-white'/></h1>
        <p className='max-w-md max-auto leading-relaxed'>Limited time offers on your favorite products. Grab them before they are gone !</p>
       </div> 
       <div className='flex flex-wrap gap-10 justify-center items-center container mx-auto py-20 bg-app-cream px-4 lg:px-8'>
       {
          products.map((prod)=> <ProductsCard prod={prod} showDiscountTag={false} key={prod.id}/>)
      }
       </div>
    </section>
  )
}

export default FlashDeals