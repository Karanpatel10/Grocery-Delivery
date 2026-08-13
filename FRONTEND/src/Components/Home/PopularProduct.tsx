import { MoveRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsCard from "../ProductsCard";
import type { Product } from "../../types";
import { toast } from "react-hot-toast";
import api from "../../config/api";

const PopularProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((error:any) => {
        toast.error(error.response?.data?.message || error.message);
      })
  }, []);

  return (
    <section className="pt-20 md:py-20">
      <div className="max-w-7xl mx-auto md:px-5">

        {/* Header */}
        <div className="flex flex-row items-center justify-between md:gap-6 mb-12">
          <div>
            <span className="inline-block bg-orange-100 text-orange-600 font-semibold px-4 py-1 rounded-full text-sm mb-3">
              Popular Picks
            </span>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Best Selling Products
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-lg">
              Discover our customers' favorite groceries at great prices.
            </p>
          </div>

          <Link
            to="/products"
            className="group  flex-flex-nowrap items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 rounded-2xl md:rounded-full hover:bg-orange-500 hover:text-white transition-transform duration-150 active:scale-90"
          >
            View All
            <MoveRightIcon className="transition-transform group-hover:translate-x-1 hidden md:block" />
          </Link>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div>
           {/* Mobile / sm */}
              <div className="grid justify-items-center grid-cols-2 gap-x-3 gap-y-5 md:hidden">
                {products.slice(0, 4).map((prod) => (
                  <ProductsCard key={prod.id} prod={prod} showDiscountTag={false} />
                ))}
              </div>

              {/* md+ */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((prod) => (
                  <ProductsCard key={prod.id} prod={prod} showDiscountTag={false} />
                ))}
              </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">
              No popular products available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProduct;