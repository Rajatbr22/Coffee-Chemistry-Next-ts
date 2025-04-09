"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { useCart } from "@/src/context/cart-context"
import type { Product } from "@/src/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          className="h-10 w-10 rounded-r-none border-r-0"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <div className="h-10 px-4 flex items-center justify-center border border-input bg-background">{quantity}</div>
        <Button
          variant="outline"
          size="icon"
          onClick={increaseQuantity}
          className="h-10 w-10 rounded-l-none border-l-0"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <Button onClick={handleAddToCart} className="bg-coffee hover:bg-coffee-dark text-white">
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
    </div>
  )
}

