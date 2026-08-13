import { useEffect, useState } from 'react'
import type { Product } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import ProductsCard from '../Components/ProductsCard';
import { useLoading } from '../Context/LoadingContext';
import api from '../config/api';

const SearchResults = () => {
  const {setLoading}=useLoading(); 
  const [products,setProducts]=useState<Product[]>([])
  const [searchParams]=useSearchParams()
  const query=searchParams.get('q')||'';

  useEffect(()=>{
    const fetchProducts=async()=>{
      setLoading(true,"content")
      try{
        const {data}=await api.get('/products');
        console.log(data);
      setProducts(data.products.filter((product: Product)=>product.name.toLowerCase().includes(query.toLowerCase())));
      }catch(error:any){
        console.log(error.message)
      }finally{
        setLoading(false)
      }
    }
    fetchProducts()
  },[query])

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto py-20'>

        {/* Header */}
        <div>
           <h1 className='text-3xl font-bold text-app-dark'>Result for {query}</h1> 
           <p>{products.length} products found</p>
           <div className='flex flex-wrap gap-5 my-15'>
           {products.length===0 ?(
            <div className='flex flex-col items-center justify-center gap-5 py-20 mx-auto'> 
              <p className='text-app-dark'>No products found. Try a different search term.</p>
              <Link to='/products' className='bg-app-green text-white py-2 px-4 rounded-md hover:bg-app-dark transition duration-300 cursor-pointer'>Browse all products</Link>
            </div>)
           :(
              products.map((product: Product) => (
                <ProductsCard key={product.id} prod={product} showDiscountTag={true}/>
              ))
          )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default SearchResults