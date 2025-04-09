"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ChevronDown , ChevronUp , Trash2 } from "lucide-react"
import { useCart } from "@/src/context/cart-context"
import BackButton from "@/src/components/back-button"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart()
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Button asChild className="bg-coffee hover:bg-coffee-dark text-white">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BackButton
        className="text-3xl"
        text="Order Summary"
      />

      <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto sm:px-6 py-10">

        <div className="lg:w-full hidden sm:block">
          <div className="space-y-4">

            {/* Header Row - Separate */}
            <div className="rounded shadow p-4 grid grid-cols-4 gap-8 text-black">
              <div className="text-xs font-medium tracking-wider">
                Product
              </div>
              <div className="text-xs font-medium tracking-wider">
                Price
              </div>
              <div className="text-xs font-medium tracking-wider">
                Quantity
              </div>
              <div className="text-xs font-medium tracking-wider">
                Subtotal
              </div>
              {isUpdateMode && (
                <div className="sr-only">Remove</div>
              )}
            </div>
            
            
            {cartItems.map((item) => (
              <div 
                key={item.product.id} 
                className="rounded shadow p-4 grid grid-cols-4 gap-6 items-center"
              >
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.foreground_image}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-900">₹{item.product.price}</div>
                
                  <div className="w-1/3 h-8 py-6 px-2 -ml-4 flex items-center justify-between border bg-background rounded">
                    <span className="mx-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-8 w-8 flex flex-col items-center justify-center"
                    >
                    <ChevronUp className="h-5 w-5 hover:bg-[#F9C06A]" />
                    <ChevronDown
                      className="h-5 w-5 mt-1 hover:bg-[#F9C06A]"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.product.id, item.quantity - 1);
                      }}
                    />
                    </button>
                  </div>

                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-900 ml-4">₹{(item.product.price * item.quantity)}</div>
                  
                  {isUpdateMode && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Items - Mobile View */}
        <div className="sm:hidden">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="bg-white rounded shadow p-4">
                <div className="flex items-start space-x-6">
                  <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.product.foreground_image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.product.name}</div>
                    <div className="text-sm text-gray-600 mt-1">₹{item.product.price}</div>
                    
                    <div className="flex justify-between items-center mt-3">

                      <div className="w-1/3 h-8 py-5 px-1 md:py-6 md:px-2 flex items-center justify-between border bg-background rounded">
                        <span className="mx-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 flex flex-col items-center justify-center"
                        >
                        <ChevronUp className="h-4 w-4 md:h-5 md:w-5 hover:bg-[#F9C06A]" />
                        <ChevronDown
                          className="h-4 w-4 md:h-5 md:w-5 mt-1 hover:bg-[#F9C06A]"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.product.id, item.quantity - 1);
                          }}
                        />
                        </button>
                      </div>
                      
                      <div className="font-medium">₹{(item.product.price * item.quantity)}</div>
                    </div>
                    
                    {isUpdateMode && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-6 md:gap-2">
          <Button 
            asChild 
            variant="outline" 
            size='lg'
            className="w-2/3 sm:w-1/5 py-6 rounded text-black hover:border-none"
          >
            <Link href="/products">Return To Shop</Link>
          </Button>

          <Button 
            variant="outline" 
            size='lg'
            className="w-2/3 sm:w-1/5 py-6 rounded text-black hover:border-none"
            onClick={() => setIsUpdateMode(!isUpdateMode)}
          >
            {isUpdateMode ? "Done" : "Update Cart"}
          </Button>
        </div>

        {/* Order Summary */}
        <div className="flex justify-end">
          <div className="w-full sm:w-2/3 lg:w-1/3">
            <div className="bg-white rounded border border-black p-6">
              <h2 className="text-lg font-semibold mb-4">Cart Total</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="border-t border-t-black flex justify-between">
                  <span className="text-gray-600 mt-4">Shipping</span>
                  <span className="font-medium mt-4">Free</span>
                </div>

                <div className="border-t border-t-black pt-4 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">₹{(subtotal)}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  asChild 
                  size='lg'                  
                  className="mt-6 py-6 px-10 bg-[#DB4444] hover:bg-primary/90 text-white rounded"
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}