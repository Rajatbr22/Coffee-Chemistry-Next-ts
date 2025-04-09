"use client"

import { Button } from "@/src/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist } from "@/src/context/wishlist-context"
import type { Product } from "@/src/lib/types"
import { cn } from "@/src/lib/utils"

interface LikeButtonProps {
    product: Product
    size?: "default" | "sm" | "lg" | "icon"
    variant?: "default" | "outline" | "ghost"
    className?: string
}

export default function LikeButton({ product, size = "icon", variant = "ghost", className }: LikeButtonProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const isLiked = isInWishlist(product.id)

    const toggleLike = () => {
        if (isLiked) {
        removeFromWishlist(product.id)
        } else {
        addToWishlist(product)
        }
    }

return (
    <Button
        variant={variant}
        size={size}
        onClick={toggleLike}
        className={cn(
            "transition-colors",
            isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500",
            className,
        )}
        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
        <Heart className={cn("h-5 w-5", isLiked ? "fill-current" : "")} />
    </Button>
)
}

