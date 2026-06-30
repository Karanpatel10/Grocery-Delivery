import { MoveRightIcon } from "lucide-react";
import { useState } from "react";
import { Link} from "react-router-dom";
import ProductsCard from "../ProductsCard";
import {dummyProducts} from '../../assets/assets'
import type {Product} from "../../types"

const PopularProduct=()=>{
     const [products]=useState<Product[]>(dummyProducts)

    return(
        <section className="my-20">
         <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
                    <p className="text-gray-600">Top-rated products this session</p>
                </div>
            <Link to='/products' className="text-app-orange hover:text-app-orange-dark flex items-center gap-4 cursor-pointer ">
                View All <MoveRightIcon />
            </Link>    
            </div>

            
                <div className="flex flex-wrap gap-5 justify-between py-8">
                    {(products.length > 0)? (
                        products.slice(0,8).map((prod)=><ProductsCard prod={prod} showDiscountTag={false}/>)
                        
                    ) : (
                        <p>No popular products available.</p>
                    )}
                </div>
            
        </div>
        </section>
    )
}

export default PopularProduct