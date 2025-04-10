"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/src/lib/types"

interface WishlistContextType {
    wishlistItems: Product[]
    addToWishlist: (product: Product) => void
    removeFromWishlist: (productId: string) => void
    isInWishlist: (productId: string) => boolean
    clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([])

    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
        try {
            setWishlistItems(JSON.parse(savedWishlist))
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage:", error)
        }
        }
    }, [])

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }, [wishlistItems])

    const addToWishlist = (product: Product) => {
        setWishlistItems((prevItems) => {
        if (prevItems.some((item) => item.id === product.id)) {
            return prevItems
        } else {
            return [...prevItems, product]
        }
        })
    }

    const removeFromWishlist = (productId: string) => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    }

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId)
    }

    const clearWishlist = () => {
        setWishlistItems([])
    }

    return (
        <WishlistContext.Provider
        value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
        }}
        >
        {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}

