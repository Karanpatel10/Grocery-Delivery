import {useNavigate,useParams,Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import type{Product} from '../types';
import DummyReviewsSection from '../assets/DummyReviewsSection.tsx'
import { MoveLeft,ShoppingCart,Plus,Minus, Leaf,ChevronLeft, ChevronRight,MoveRight} from 'lucide-react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ProductsCard from '../Components/ProductsCard'
import { useCart } from '../Context/CartContext.tsx';
import api from '../config/api.ts';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Loading from '../Components/Loading.tsx';


const ProductPage = () => {

  const currency=import.meta.env.VITE_CURRENCY_SYMBOL||"$";
  const {id}=useParams();
  const navigate=useNavigate()
  const {isCartOpen,setIsCartOpen,addToCart,items,updateQuantity}=useCart()
  const [loading,setLoading]=useState(true);

  

  const [product,setProduct]=useState<Product|null>(null);
  const [relatedProducts,setRelatedProducts]=useState<Product[]>([])
   const rating = product?.rating || 0;
   const cartItem = items.find(item => item.product.id === product?.id);

  useEffect(()=>{
    window.scrollTo(0,0);
    const fetchData=async()=>{
       try{
      const productRes=await api.get(`/products/${id}`)
      setProduct(productRes.data)
      const relatedRes=await  api.get('/products')
      setRelatedProducts(relatedRes.data.products.filter((p)=>p.id !== id))
    }catch(error:any){
      toast.error(error.response.data.message||error?.message)
    }finally{
      setLoading(false)
    }
    }
    fetchData()
  },[id,navigate])

  if(loading) return <Loading/>

  return (
    <div className='max-w-7xl mx-auto py-35'>
      <button onClick={()=>navigate(-1)} className='flex gap-5 hover:text-app-green hover:scale-95 pb-10'>
        <MoveLeft />Back
       </button> 

       {/* Prouduct Details */}
       <div className='grid grid-cols-2 gap-10'>
            {/* left side */}
            <div className='bg-white relative'>
              {product?.discount > 0 && <div className='inline-flex gap-3 bg-app-orange text-white py-1 px-2 rounded-xl text-sm absolute left-4 top-4'>{product?.discount}% OFF</div>}
              {product?.isOrganic == true && <div className='inline-flex gap-3 bg-app-green text-white py-1 px-2 rounded-xl text-sm absolute left-22 top-4'><Leaf className='size-5'/>Organic</div>}
              <img src={product?.image} alt={product?.name} className='mx-auto'/>
            </div>
            {/* Right side */}
            <div className='flex flex-col gap-5'>
                  <p>{product?.category}</p>
                  <h1 className='text-xl text-app-green font-semibold'>{product?.name}</h1>
                  <div className='inline-flex text-yellow-400'>
                     {
                      Array.from({length:5},(_,i)=>(
                        rating>=i+1?(<StarOutlinedIcon key={i} fill='currentColor'/>):rating>=i+0.5?(<StarHalfOutlinedIcon key={i} fill='currentColor'/>):(<StarOutlineOutlinedIcon key={i}/>)
                      ))
                    } 
                    <p className='text-black'><span className='font-bold'>{product?.rating}</span>&nbsp;({product?.reviewCount} reviews)</p>
                  </div>  
                  <div className='flex flex-row gap-2 items-end'>
                    <span className='text-2xl font-bold'>{currency}{product?.price.toFixed(2)??0.00}</span><span className='text-sm line-through'>{currency}{product?.originalPrice.toFixed(2)??0.00}</span><span className='text-sm'>/{product?.unit}</span>
                  </div> 
                    <p className='text-sm text-app-text-light'>{product?.description}</p>
                    <div>
                      {
                        product?.stock>0?(<span className='text-sm text-app-success'>✓ In Stock {product?.stock} Available</span>):(<span className='text-sm text-app-error'>Out of Stock</span>)
                      }
                     </div> 
                     <div className="flex items-center gap-5">
                               {cartItem?.quantity>0 &&<div className='bg-white inline-flex justify-center items-center gap-5 p-2 rounded-full shadow-2xl outline outline-gray-300 '><button className='bg-gray-200 p-2 rounded-full transition-all duration-200 active:scale-95 active:bg-gray-300' onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem.product.id,cartItem.quantity-1)}}><Minus/></button>
                                <span className="font-medium">{cartItem?.quantity}</span>
                                <button className='bg-gray-200 p-2 rounded-full transition-all duration-200 active:scale-85 active:bg-gray-300' onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem.product.id,cartItem.quantity+1)}} ><Plus/></button></div>}
                                <button className='bg-app-orange flex text-white py-3 px-7 gap-7 rounded-md transition-all duration-200 active:scale-85 active:bg-app-orange-dark' onClick={()=>{cartItem?setIsCartOpen(!isCartOpen):addToCart(product!)}}>{cartItem?(`Go to Cart`):(<><ShoppingCart /> Add to Cart</>)}</button>
                      </div>
            </div>
           
        </div>
       {/* Review Section */}
           {
            product?.reviewCount>=0 && <DummyReviewsSection product={product}/>
          } 
       {/* Related Products section */}
       <div className='py-10'>
        <div className='flex justify-between py-10'>
            <div>
              <h1 className='font-bold'>Related Products</h1>
              <p className='text-sm text-app-text-light'>More Product from {product?.category}</p>
            </div>

            <div className="flex gap-3">
              <button className="category-prev flex h-11 w-11 items-center justify-center rounded-full border text-orange-500 bg-white active:scale-85 transition">
                <MoveLeft />
              </button>

              <button className="category-next flex h-11 w-11 items-center justify-center rounded-full border text-orange-500 bg-white active:scale-85 transition">
                <MoveRight/>
              </button>
        </div>
        </div>
          
          
          <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".category-prev",
                    nextEl: ".category-next",
                  }}
                  slidesPerView={4}
                  spaceBetween={25}
                  grabCursor={true}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 16 },
                    640: { slidesPerView: 3, spaceBetween: 18 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                  }}
        
                >
                {relatedProducts.slice(0, 10).map((prod) => (
                  <SwiperSlide key={prod.id}  className='py-10'>
                    <ProductsCard
                      prod={prod}
                      showDiscountTag={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

        </div>
    </div>
  )
}

export default ProductPage