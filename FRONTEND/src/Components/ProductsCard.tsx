import { useNavigate} from 'react-router-dom'
import { Star } from 'lucide-react';
import { CirclePlus,CircleMinus } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import type { Product } from '../types';


const ProductsCard = ({prod,showDiscountTag}:{prod:Product;showDiscountTag:boolean}) => {

    const currency=import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const navigate=useNavigate()
    const {items,addToCart,updateQuantity}=useCart();

    const cartItem = items.find(item => item.product._id === prod._id);
    const quantity = cartItem?.quantity || 0;

    
  return (
       
              <div key={prod._id} className="rounded-xl bg-white p-4 w-60 h-auto group shadow-md outline-1 outline-gray-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer transition duration-300" onClick={()=>navigate(`/products/${prod._id}`)}>
                {prod.discount>0 && <div className='inline-block gap-3 bg-app-orange text-white py-1 px-2 rounded-xl text-sm'>{prod.discount}% OFF</div>}
                <div className="h-52 flex items-center justify-center overflow-hidden"><img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-115 transition"/></div>
                    <div className="p-2 flex flex-col gap-2 relative">
                                    {showDiscountTag && (<div className='flex  absolute -top-6 right-1'>
                                    {quantity === 0?<button  onClick={(e)=>{e.stopPropagation();addToCart(prod,1)}}><CirclePlus className='text-white fill-orange-500 cursor-pointer'/></button>
                                            :<div className="flex items-center  gap-2">
                                                    <button onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem!.product._id,cartItem!.quantity-1)}}><CircleMinus className='fill-red-800 text-white'/></button>
                                                    <span className="font-medium">{quantity}</span>
                                                    <button onClick={(e)=> {e.stopPropagation();updateQuantity(cartItem!.product._id,cartItem!.quantity+1)}} ><CirclePlus className='text-white fill-green-800'/></button>
                                            </div>}
                                     </div>) }      
                                    <h3 className="text-md font-medium text-gray-900">{prod.name}</h3>
                                    {prod.rating > 0 && (
                                        <p className='inline-flex gap-2 text-sm items-center'>
                                            <Star className='fill-yellow-500 stroke-yellow-500 size-4'/>
                                            {prod.rating}&nbsp;({prod.reviewCount})
                                        </p>
                                    )}
                                     { prod.discount > 0 && (
                                        <div className='inline-flex justify-between'>
                                            <p>
                                                <span className='text-lg text-gray-900'>{currency}{prod.price.toFixed(1)}</span>/
                                                <span className='text-gray-500 text-[12px]'>{prod.unit}</span>
                                                <span className='text-gray-500 font-semibold text-md ml-3 line-through'>{currency}{prod.originalPrice.toFixed(1)}</span>
                                            </p>
                                        
                                    </div>)}
                    </div>
                </div> 
    
  )
}

export default ProductsCard