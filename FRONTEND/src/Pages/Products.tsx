import ProductsCard from '../Components/ProductsCard'
import type {Product} from "../types"
import {useEffect, useState} from 'react'
import {categoriesData} from '../assets/assets'
import {useSearchParams } from 'react-router-dom'
import api from '../config/api'
import toast from 'react-hot-toast';
import { SlidersHorizontal } from "lucide-react";
// import Loading from '../Components/Loading'
import { useLoading } from "../Context/LoadingContext";

const Products = () => {
  const [products,setProducts]=useState<Product[]>([])
  // const [loading,setLoading]=useState(true);
  const {setLoading}=useLoading();

  useEffect(()=>{
    setLoading(true)
    api.get('/products').then((res)=>{
      setProducts(res.data.products||[])
    }).catch((error)=>{
      toast.error(error.response.data.message||error?.message)
    }).finally(()=>setLoading(false))
  },[])
    
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

  //  if(loading) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 lg:flex-row lg:px-8">
      {/* Filter for Desktop view */}
      <aside className="hidden xl:block w-72 shrink-0 py-17">
  <div className="sticky top-25 rounded-2xl border border-gray-100 bg-white shadow-sm">

    {/* Header */}
    <div className="bg-app-green px-6 py-5 rounded-t-2xl">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        Categories
      </h2>
    </div>


    {/* Categories */}
    <div className="p-5 space-y-2">
      {categoriesWithAll.map((cat) => (
        <button
          key={cat.slug}
          onClick={() =>
            {setSearchParams(
              cat.slug === "All Categories"
                ? {}
                : { category: cat.slug }   
            );
              window.scrollTo({
                  top:0,
                  behavior:"smooth"
                });
            }}
          className={`
            w-full flex items-center justify-between rounded-xl px-4 py-2.5
            text-sm font-medium transition-all duration-200
            ${
              ((!category && cat.slug === "All Categories") ||
              cat.slug === category)
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
        >
          {cat.name}

          {((!category && cat.slug === "All Categories") ||
            cat.slug === category) && (
            <span className="h-2 w-2 rounded-full bg-orange-500" />
          )}
        </button>
      ))}
    </div>


    {/* Price Filter */}
    <div className="border-t border-gray-100 p-5">

      <h3 className="mb-4 font-semibold text-gray-800">
        Price Range
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm text-gray-500">
            Minimum
          </label>

          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({...prev,min: Number(e.target.value),}))
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>


        <div>
          <label className="mb-1 block text-sm text-gray-500">
            Maximum
          </label>

          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>


      {/* Clear Button */}
      <button
        onClick={() => {
          setPriceRange({min: 0,max: 500,});
          setSearchParams({});
        }}
        className="mt-5 w-full rounded-xl bg-app-green py-3 text-sm font-semibold text-white transition-transform duration-150 active:scale-90 active:bg-app-green-light"
      >
        Clear Filters
      </button>

    </div>

  </div>
</aside>



       <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-10">

  {/* Header */}
  <div className="mb-10">

    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
    {category?.toUpperCase() || "All Products"}
  </h1>

  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
    {filterProduct.length}
  </span>
</div>


      {/* Sort */}
      <div className="flex items-center gap-3">

            
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="
            appearance-none rounded-xl border border-gray-200 
            bg-white px-5 py-3 pr-10 text-sm font-medium text-gray-700
            shadow-sm cursor-pointer outline-none
            transition hover:border-orange-300
            focus:border-orange-400 focus:ring-4 focus:ring-orange-100
          "
        >
          <option value="Newest">
            Newest Arrivals
          </option>
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-dsc">
            Price: High to Low
          </option>
          <option value="popularity">
            Popularity
          </option>
          <option value="az">
            A → Z
          </option>
        </select>
      </div>

    </div>

  </div>


  {/* Products */}
  {filterProduct.length > 0 ? (

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
      {sortProduct.map((prod) => (
        <ProductsCard
          key={prod.id}
          prod={prod}
          showDiscountTag={true}
        />
      ))}
    </div>

  ) : (

    /* Empty State */
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl bg-gray-50 border border-gray-100">

      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
        🛒
      </div>


      <h2 className="text-xl font-semibold text-gray-800">
        No Products Found
      </h2>

      <p className="mt-2 text-gray-500 text-center">
        Try changing your filters or explore all products.
      </p>


      <button
        className="mt-6 rounded-xl bg-app-green px-6 py-3 text-white font-medium transition active:bg-app-green-light transition-transform duration-150 active:scale-95"
        onClick={() => {
          setPriceRange({min: 0,max: 500,});
          setSearchParams({});
        }}>
        Clear Filters
      </button>

    </div>

  )}

</main>
    </div>
    </div>
  )
}

export default Products