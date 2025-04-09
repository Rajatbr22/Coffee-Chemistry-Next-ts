"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useCart } from "@/src/context/cart-context"
import { Checkbox } from "@/src/components/ui/checkbox"
import BackButton from "@/src/components/back-button"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, subtotal, clearCart } = useCart()
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process order
    clearCart()
    router.push("/checkout/success")
  }

  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BackButton
        className="text-3xl"
        text="Check Out"
      />

      <div className="flex flex-col lg:flex-row gap-8 mx-auto max-w-6xl py-10">
        <div className="lg:w-2/3">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Shipping Information */}
            <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-normal">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 text-black/50">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="firstName">First Name<span className="text-red-300">*</span></Label>
                  <Input id="firstName" required  className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pinCode">Pincode</Label>
                  <Input id="pinCode" required className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="streetAddress">Street Address<span className="text-red-300">*</span></Label>
                  <Input id="streetAddress" required className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Apartment, floor, etc. (optional)</Label>
                  <Input id="address" className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="townCity">Town/City<span className="text-red-300">*</span></Label>
                  <Input id="townCity" required className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phoneNumber">Phone Number<span className="text-red-300">*</span></Label>
                  <Input id="phoneNumber" type="phone" required className="w-full md:w-3/4"/>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address<span className="text-red-300">*</span></Label>
                  <Input id="email" required className="w-full md:w-3/4"/>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked)}
                />
                <p>Save this information for faster check-out next time</p>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="p-6 md:mt-20">

            <div className="space-y-4 mb-4 text-black">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex justify-between items-center gap-4">
                    <Image
                      src={item.product.foreground_image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="border border-transparent h-14 w-14 object-cover"
                    />
                    <span className="">
                      {item.product.name}
                    </span>
                  </div>
                  <span className="font-medium">₹{(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="">Subtotal:</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex border-t border-t-black pt-4 justify-between">
                <span className="">Shipping:</span>
                <span className="font-medium">Free</span>
              </div>

              <div className="border-t border-t-black pt-4 flex justify-between">
                <span className="font-semibold ">Total:</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>

              <div>
                <Button 
                    size='lg'                  
                    className="mt-6 w-full py-6 px-10 bg-[#DB4444] hover:bg-primary/90 text-white rounded"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

