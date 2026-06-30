import React from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import type{Product} from '../types';
import {dummyProducts} from '../assets/assets'
import DummyReviewsSection from '../assets/DummyReviewsSection.tsx'
import { MoveLeft,ShoppingCart,Plus,Minus, LeafyGreenIcon, LeafIcon, Leaf} from 'lucide-react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ProductsCard from '../Components/ProductsCard'
import { useCart } from '../Context/CartContext.tsx';

const ProductPage = () => {

  const currency=import.meta.env.VITE_CURRENCY_SYMBOL||"$";
  const {id}=useParams();
  const navigate=useNavigate()
  const {isCartOpen,setIsCartOpen,addToCart,items,updateQuantity}=useCart()

  

  const [products,setProducts]=useState<Product|null>(null);
  const [relatedProducts,setRelatedProducts]=useState<Product[]>([])
   const rating = products?.rating || 0;

   const cartItem = items.find(item => item.product._id === products?._id);

  useEffect(()=>{
    window.scrollTo(0,0)
    const product=dummyProducts.find((p)=>p._id===id)
    if(product){
    setProducts(product!)
    }
    setRelatedProducts(dummyProducts.filter((p)=>p._id !== id))
  },[id,navigate])

  return (
    <div className='max-w-7xl mx-auto py-20'>
      <button onClick={()=>navigate(-1)} className='flex gap-5 hover:text-app-green hover:scale-95 pb-10'>
        <MoveLeft />Back
       </button> 

       {/* Prouduct Details */}
       <div className='grid grid-cols-2 gap-10'>
            {/* left side */}
            <div className='bg-white relative'>
              {products?.discount>0 && <div className='inline-flex gap-3 bg-app-orange text-white py-1 px-2 rounded-xl text-sm absolute left-4 top-4'>{products?.discount}% OFF</div>}
              {products?.isOrganic == true && <div className='inline-flex gap-3 bg-app-green text-white py-1 px-2 rounded-xl text-sm absolute left-22 top-4'><Leaf className='size-5'/>Organic</div>}
              <img src={products?.image} alt={products?.name} className='mx-auto'/>
            </div>
            {/* Right side */}
            <div className='flex flex-col gap-5'>
                  <p>{products?.category}</p>
                  <h1 className='text-xl text-app-green font-semibold'>{products?.name}</h1>
                  <div className='inline-flex text-yellow-400'>
                    {
                      Array.from({length:5},(_,i)=>(
                        rating>=i+1?(<StarOutlinedIcon key={i} fill='currentColor'/>):rating>=i+0.5?(<StarHalfOutlinedIcon key={i} fill='currentColor'/>):(<StarOutlineOutlinedIcon key={i}/>)
                      ))
                    }
                    <p className='text-black'><span className='font-bold'>{products?.rating}</span>&nbsp;({products?.reviewCount} reviews)</p>
                  </div>  
                  <div className='flex flex-row gap-2 items-end'>
                    <span className='text-2xl font-bold'>{currency}{products?.price.toFixed(2)??0.00}</span><span className='text-sm line-through'>{currency}{products?.originalPrice.toFixed(2)??0.00}</span><span className='text-sm'>/{products?.unit}</span>
                  </div> 
                    <p className='text-sm text-app-text-light'>{products?.description}</p>
                    <div>
                      {
                        products?.stock>0?(<span className='text-sm text-app-success'>✓ In Stock {products?.stock} Avalible</span>):(<span className='text-sm text-app-error'>Out of Stock</span>)
                      }
                     </div> 
                     <div className="flex items-center  gap-5">
                               {cartItem?.quantity>0 &&<><button onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem.product._id,cartItem.quantity-1)}}><Minus/></button>
                                <span className="font-medium">{cartItem?.quantity}</span>
                                <button onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem.product._id,cartItem.quantity+1)}} ><Plus/></button></>}
                                <button className='bg-app-orange flex text-white py-3 px-7 gap-7 rounded-md' onClick={()=>{cartItem?setIsCartOpen(!isCartOpen):addToCart(products!)}}>{cartItem?(`Go to Cart`):(<><ShoppingCart /> Add to Cart</>)}</button>
                      </div>
            </div>
           
        </div>
       {/* Review Section */}
          {
            products?.reviewCount>0 && <DummyReviewsSection product={products}/>
          }
       {/* Related Products section */}
       <div className='py-10'>
        <h1 className='font-bold'>Related Products</h1>
        <p className='text-sm text-app-text-light'>More Product from {products?.category}</p>
          <div className='grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 py-10 gap-5'>
            {
            relatedProducts.slice(0,5).map((prod)=>(
              <ProductsCard prod={prod} showDiscountTag={false}/>
            ))
            }
          </div>
        </div>
    </div>
  )
}

export default ProductPage