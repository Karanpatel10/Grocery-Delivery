import { useNavigate} from 'react-router-dom'
import { Star } from 'lucide-react';
import { CirclePlus,CircleMinus } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import type { Product } from '../types';


const ProductsCard = ({prod,showDiscountTag}:{prod:Product;showDiscountTag:boolean}) => {

    const currency=import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const navigate=useNavigate()
    const {items,addToCart,updateQuantity}=useCart();
    const cartItem = items.find(item => item.product.id === prod.id);
    const quantity = cartItem?.quantity || 0;

    
  return (
       
  <div key={prod.id}
  onClick={() => navigate(`/products/${prod.id}`)}
  className="relative group w-48 md:w-64 rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-300">
  {/* Discount Badge */}
  
    <div className="absolute top-3 left-3 z-20 inline-flex flex-row gap-2">
        {prod.discountPercentage > 0 && (
          <div className=" bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {prod.discountPercentage}% OFF
          </div>
        )}
        {prod.isOrganic && (
          <div className=" bg-app-green-light text-white text-xs font-semibold px-3 py-1 rounded-full">
            Organic
          </div>
        )}
      </div>



  

  {/* Image */}
  <div className="h-45 md:h-56 bg-gray-100 flex items-center justify-center p-5">
    <img
      src={prod.image}
      alt={prod.name}
      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
    />
  </div>

  {/* Content */}
  <div className="p-4 space-y-1 relative">

    {/* Add to Cart */}
    {showDiscountTag && (
      <div className="absolute -top-8 right-4 bg-white rounded-full shadow-lg p-1 flex justify-center item-center">
        {quantity === 0 ? (
          <button disabled={prod.stock === 0}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(prod, 1);
            }}
          >
            <CirclePlus className={`size-8 text-white  transition-all duration-200  ${prod.stock ===0 ?'fill-gray-400':'fill-app-orange active:scale-95 active:fill-app-orange-dark'}`} />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-white rounded-full px-2 py-1 shadow">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(cartItem!.product.id, cartItem!.quantity - 1);
              }}
            >
              <CircleMinus className="size-8 fill-red-600 text-white transition-all duration-200 active:scale-95 active:fill-red-700" />
            </button>

            <span className="font-semibold text-lg w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(cartItem!.product.id, cartItem!.quantity + 1);
              }}
            >
              <CirclePlus className="size-8 fill-green-600 text-white transition-all duration-200 active:scale-95 active:fill-green-700" />
            </button>
          </div>
        )}
      </div>
    )}

    {/* Product Name */}
    <h3 className="text-lg font-semibold text-gray-800 h-12 group-hover:text-orange-500 transition-colors">
      {prod.name}
    </h3>

    {/* Rating */}
    {prod.rating >=0 && (
      <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-sm">
        <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
        <span>{prod.rating}</span>
        <span className="text-gray-500">({prod.reviewCount})</span>
      </div>
    )}

    {/* Price */}
    <div className="flex items-end justify-between">

        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-green-800">
            {currency}
            {prod.price.toFixed(2)}
          </span>

          {prod.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              {currency}
              {prod.originalPrice.toFixed(2)}
            </span>
          )}
          <p className="text-sm text-gray-500">/&nbsp;{prod.unit}</p>
        </div>
    </div>
  </div>
</div>
    
  )
}

export default ProductsCard