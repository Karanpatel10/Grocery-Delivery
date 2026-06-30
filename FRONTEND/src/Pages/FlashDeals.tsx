import ProductsCard from '../Components/ProductsCard' 
import {ZapIcon } from "lucide-react";
import {dummyProducts} from '../assets/assets'

const FlashDeals = () => {

  
  return (
    <section>
      <div className='bg-linear-to-r from-app-orange to-app-orange-dark flex justify-center items-center text-center text-white flex-col gap-2 py-20'>
        <h1 className='font-extrabold text-3xl flex gap-5 items-center'><ZapIcon className='fill-white'/>Flash Deals<ZapIcon className='fill-white'/></h1>
        <p className='max-w-md max-auto leading-relaxed'>Limited time offers on your favorite products. Grab them before they are gone !</p>
       </div> 
       <div className='flex flex-wrap gap-15 justify-center items-center container mx-auto py-20'>
       {
       dummyProducts.map((prod)=> <ProductsCard prod={prod} showDiscountTag={false}/>)
      }
       </div>
    </section>
  )
}

export default FlashDeals