import ProductsCard from '../Components/ProductsCard'
import type {Product} from "../types"
import {useState} from 'react'
import {dummyProducts,categoriesData} from '../assets/assets'
import {useSearchParams } from 'react-router-dom'

const Products = () => {
  const [products]=useState<Product[]>(dummyProducts)

    
    const [searchParams,setSearchParams]=useSearchParams();
    const [sortOption,setSortOption]=useState("Newest")
    const [priceRange,setPriceRange]=useState({min: 0,max: 500,})
    const category = searchParams.get("category");
    const filterProduct=products.filter((prod)=>(!category||prod.category?.toLowerCase()===category?.toLowerCase()) && prod.price>=priceRange.min && prod.price<=priceRange.max)

    
    const categoriesWithAll=[{slug:'All Categories',name:'All Categories'},...categoriesData];

    const sortProduct=[...filterProduct].sort((a,b)=>{
      switch(sortOption){
      case "price-asc":
      return a.price-b.price;
      case "price-dsc":
      return b.price-a.price;
      case "az":
      return a.name.localeCompare(b.name);
      case "Newest":
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
      }
    })

   
  return (
    <div className='flex min-h-screen py-20'>
      {/* Filter for Desktop view */}
      <aside className='hidden xl:block w-95 shrink-0 py-20'>
        <div className='sticky  bg-white top-24 rounded-lg max-w-[15rem] ml-auto shadow-md outline-1 outline-gray-300'>
          <h2 className='bg-app-green text-white px-5 py-5 rounded-t'>Categories</h2>
          <div>
            {categoriesWithAll.map((cat:any)=>(
              <button key={cat.slug} className={`flex flex-row px-5 py-1 text-gray-600 ${((!category && cat.slug === "All Categories"))||cat.slug === category ? "text-orange-500" : "bg-white hover:text-black"}`} onClick={() =>setSearchParams(cat.slug === "All Categories"? {}: { category: cat.slug })}>
                {cat.name}
               </button> 
            ))}
           </div> 
           <div className="grid grid-cols-2 gap-4 p-3">
                <div >
                  <label className="block text-sm font-medium text-gray-700">Min</label>
                  <input type="number" value={priceRange.min} onChange={(e) =>setPriceRange((prev) => ({...prev,min: Number(e.target.value),}))} className="w-full border border-gray-400 p-2"/>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max</label>
                  <input type="number" value={priceRange.max}onChange={(e) =>setPriceRange((prev) => ({...prev,max: Number(e.target.value),}))} className="w-full border border-gray-400 p-2"/>
                </div>
          </div>
          <button className='bg-app-green text-center px-4 py-2 text-white rounded-lg m-3 hover:bg-app-green-light' onClick={()=>{setPriceRange({ min: 0, max: 500 });setSearchParams({})}}>Clear Filter</button>
        </div>
       </aside>



       <main className=' flex-1 max-w-7xl mx-auto px-15'> 
          <div>

            {/* Filter for mobile view */}
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{category?.toUpperCase() || "All Products"}</h1>
              <div className='flex items-center justify-between mb-10'>
                  <p className='text-gray-600'>{category ? `(${filterProduct.length}) products found` : "Explore our wide range of products"}</p>
                    <select value={sortOption} onChange={(e)=>setSortOption(e.target.value)} className='border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
                      <option value="Newest">Newest Arrivals</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-dsc">Price: High to Low</option>
                      <option value="popularity">Popularity</option>
                      <option value="az">A → Z</option>
                    </select>
              </div>
            </div>
            
              {/* All product show with filter */}
              {filterProduct.length>0?(
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15'>
                {sortProduct.map((prod)=><ProductsCard prod={prod} showDiscountTag={true}/>)}
                </div>
                ):(
                  <div className='flex flex-col justify-center items-center gap-3'>
                      <h1 className='text-2xl font-bold'>No Product found</h1>
                      <button className='bg-app-green text-white rounded-md px-5 py-2 hover:scale-95' onClick={()=>{setPriceRange({ min: 0, max: 500 });setSearchParams({})}}>Clear Filter</button>
                  </div>
              )}   
            </div>
      </main>
    </div>
  )
}

export default Products