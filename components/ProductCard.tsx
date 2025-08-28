"use client";

import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/store/cartSlice";
import { Product } from "@/types/product";
import { Star, ShoppingCart, DollarSign } from "lucide-react";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="relative w-full">
        <div className=" w-full h-[34vh] flex flex-col bg-white rounded-2xl shadow-md transition-all duration-300 group relative ">
          {/* Image with gradient overlay section */}
          <div className="h-[55%] w-full overflow-hidden rounded-t-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={handleAddToCart}
                className={`bg-white/90 p-2 rounded-full shadow-md transition-all duration-300  ${
                  isInCart ? "bg-yellow-500 text-white" : "bg-white/90"
                }`}
                title="Add to cart"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>

          {/* Content section with improved styling */}
          <div className="flex flex-col h-[40%] px-4 py-3">
            {/* University info section */}
            <div className="mb-2 flex-1">
              <div className="flex items-start justify-between">
                <div className="relative flex-1">
                  <div className=" ">
                    <h1 className="text-lg font-bold text-[#283841] line-clamp-1 cursor-pointer transition-colors duration-300">
                      {product.title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <span className="font-medium text-sm  text-[#283841]/70">
                  {product.description.substring(0, 50)}...
                </span>
              </div>
            </div>

            {/* Location and menu section with a subtle separator */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1.5 overflow-hidden">
                  <DollarSign size={18} className="flex-shrink-0" />
                  <span className="font-medium text-sm text-[#283841] truncate">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
