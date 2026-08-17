import { useNavigate } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon , MoveRight} from "lucide-react"


const CardSidebar=()=>{

    const currency=import.meta.env.VITE_CURRENCY_SYMBOL||"$"
    const {items,removeFromCart,updateQuantity,cartCount,cartTotal,isCartOpen,setIsCartOpen}=useCart()
    const navigate=useNavigate();

    if(!isCartOpen) return null;

    const deliveryFee=cartTotal>40?0:2.99;

    const grandTotal=cartTotal+deliveryFee;

    return(
        <>
            {/* overlay */}
            <div onClick={()=>setIsCartOpen(false)} className='fixed inset-0 bg-black/50 z-[9999] transition-opacity'/>

            {/*CardSidebar*/}
            <div className='flex flex-col fixed w-full h-full max-w-md bg-white z-[9999] right-0 top-0 animate-in slide-in-from-right duration-300'>
                {/* Cart Header */}
                <div className='flex items-center justify-between p-4 border-b border-app-border'>
                    <div className='flex items-center gap-2'>
                        <ShoppingBagIcon className="size-5"/>
                        <h2 className="text-lg font-medium">Your Cart</h2>
                        <span className="px-2 py-0.5 text-xs font-semibold bg-orange-400 text-white rounded-full">{cartCount} items</span>
                    </div>
                    <button onClick={()=>setIsCartOpen(false)} className=" p-2 rounded-xl hover:bg-app-cream transition-color"><XIcon/></button>
                </div>  

                {/* Cart Items */}
                <div className='p-4 flex-1 overflow-y-auto'>
                    {items.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.product.id} className="flex bg-app-cream/60 rounded-xl gap-4">
                                    <img src={item.product.image} alt={item.product.name} className="size-25 object-cover rounded-lg shrink-0"/>
                                    <div className="flex-1 p-2 flex flex-col justify-between">
                                        <h4 className="font-semibold truncate text-sm">{item.product.name}</h4>
                                        <p className="text-sm text-app-text-light">{currency}{item.product.price.toFixed(2)}/<span className="text-app-text-light text-[10px]">{item.product.unit}</span></p>
                                        
                                        {/* Add & remove product */}
                                        <div className='inline-flex justify-between items-end w-full mt-2'>
                                            <div className="flex items-center justify-between gap-4 shadow-2xl outline outline-gray-300 rounded-full p-1">
                                                <button onClick={()=>updateQuantity(item.product.id,item.quantity-1)} className="p-1 text-app-text-light bg-gray-100 rounded-full transition-all duration-200 active:scale-85 active:bg-gray-300"><MinusIcon/></button>
                                                <span className="font-medium">{item.quantity}</span>
                                                <button onClick={()=>updateQuantity(item.product.id,item.quantity+1)} className="p-1 text-app-text-light bg-gray-100 rounded-full transition-all duration-200 active:scale-85 active:bg-gray-300"><PlusIcon/></button>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-md font-bold'>{currency}{(item.product.price * item.quantity).toFixed(2)}</span>
                                                <button onClick={()=>removeFromCart(item.product.id)} className="p-1 text-app-error rounded-xl hover:bg-app-error hover:text-white transition-color"><Trash2Icon/></button>
                                            </div>   
                                         </div>
                                    </div>
                                    
                                </li>       
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer*/}
                {items.length>0 && <div className='p-4 border-t border-app-border'>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm text-gray-500'>Subtotal</span>
                        <span className='font-semibold'>{currency}{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm text-gray-500'>Delivery Fee</span>
                        <span className={`font-semibold ${deliveryFee===0 ?"text-green-500":"text-app-text-light"}`}>
                            {deliveryFee===0?"Free":currency+deliveryFee.toFixed(2)}
                        </span>
                    </div>
                    <div className='flex items-center justify-between mb-4'>    
                        <span className='text-lg font-bold'>Total</span>
                        <span className='text-lg font-bold'>{currency}{grandTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={()=>{navigate("/checkout");setIsCartOpen(false)}} className='w-full bg-app-orange text-white py-3 rounded-md hover:bg-app-green/90 transition-color duration-150 active:scale-95 inline-flex gap-5 justify-center'>Proceed to Checkout<MoveRight/></button>
                </div>}
            </div>
        </>
    )
}

export default CardSidebar