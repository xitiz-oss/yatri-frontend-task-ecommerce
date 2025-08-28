"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/lib/store/cartSlice";
import ProtectedRoute from "@/lib/utils/ProtectedRoute";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    setProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(clearCart());
    setOrderPlaced(true);
    setProcessing(false);
    toast.success("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center py-16">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Order #: 2025-{Date.now().toString().slice(-6)}
              </p>
              <p className="text-sm text-gray-600">
                You will receive an email confirmation shortly.
              </p>
            </div>
            <a
              href="/"
              className="inline-block bg-[#283841] text-white px-6 py-3 rounded-lg hover:bg-[#283841]/80 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before checkout.
            </p>
            <a
              href="/"
              className="inline-block bg-[#283841] text-white px-6 py-3 rounded-lg hover:bg-[#283841]/80 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment Details
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-yellow-800">
                  <strong>Demo Mode:</strong> This is a demonstration checkout.
                  No actual payment will be processed.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full bg-[#283841] text-white py-3 px-4 rounded-lg hover:bg-[#283841]/80 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing
                  ? "Processing..."
                  : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
