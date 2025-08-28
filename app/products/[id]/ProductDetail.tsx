"use client";

import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/store/cartSlice";
import { Product } from "@/types/product";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Shield,
  RotateCcw,
  Truck,
  Check
} from "lucide-react";
import { toast } from "react-toastify";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  console.log(product);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#283841]/70 hover:text-[#283841] mb-8 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Products</span>
        </Link>

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image Section */}
            <div className="relative bg-gradient-to-br from-gray-50/50 to-gray-100/30 flex items-center justify-center p-12 lg:p-16">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-8 lg:p-12 space-y-8">
              {/* Category Badge */}
              <div className="inline-block bg-[#283841]/5 text-[#283841] text-sm font-medium px-4 py-2 rounded-full border border-[#283841]/10">
                {product.category}
              </div>

              {/* Title & Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-[#283841] leading-tight">
                    {product.title}
                  </h2>
                  <h2 className="text-2xl font-bold text-[#283841]">
                    ${product.price}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#283841]/60 font-medium">
                    {product.rating.rate} · {product.rating.count} reviews
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-[#283841]/70 leading-relaxed text-md">
                  {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className="w-full bg-[#283841] text-white py-5 px-8 rounded-2xl hover:bg-[#283841]/90 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg shadow-[#283841]/20  hover:-translate-y-0.5"
                >
                  {isInCart ? <Check size={24} /> : <ShoppingCart size={24} />}
                  {isInCart ? "Added " : "Add to Cart"}
                </button>
              </div>

              {/* Features Grid */}
              <div className="pt-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-[#283841]/5 rounded-2xl flex items-center justify-center mx-auto">
                      <Truck size={20} className="text-[#283841]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#283841] text-sm">
                        Free Shipping
                      </p>
                      <p className="text-[#283841]/50 text-xs">
                        On orders over $50
                      </p>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-[#283841]/5 rounded-2xl flex items-center justify-center mx-auto">
                      <RotateCcw size={20} className="text-[#283841]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#283841] text-sm">
                        Easy Returns
                      </p>
                      <p className="text-[#283841]/50 text-xs">30-day policy</p>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-[#283841]/5 rounded-2xl flex items-center justify-center mx-auto">
                      <Shield size={20} className="text-[#283841]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#283841] text-sm">
                        Warranty
                      </p>
                      <p className="text-[#283841]/50 text-xs">
                        2 year coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
