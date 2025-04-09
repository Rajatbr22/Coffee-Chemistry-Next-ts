"use client"

import { useWishlist } from "@/src/context/wishlist-context"
import BackButton from "@/src/components/back-button"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/src/context/cart-context"
import { products } from "@/src/lib/data"
import { use } from "react"
import { cn } from "@/src/lib/utils"

interface WhishlistProps {
    params: {
        id: string
    }
}

export default function Wishlist({ params }: WhishlistProps) {
    const unwrappedParams = use(params)
    const id = unwrappedParams.id

    const { wishlistItems, clearWishlist, removeFromWishlist } = useWishlist()
    const [bagItems, setBagItems] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const { addToCart } = useCart()

    const hasMoreThanFourProducts = wishlistItems.length > 4
    const itemsPerPage = 4;
    
    const moveAllToBag = () => {
        // Add all wishlist items to cart
        wishlistItems.forEach(item => {
            addToCart(item, 1)
        })
        
        setBagItems((prevBag) => [...prevBag, ...wishlistItems])
        clearWishlist()
    }

    const handleAddToCart = (product) => {
        addToCart(product, 1)
    }

    const handleNext = () => {
        if (startIndex + itemsPerPage < wishlistItems.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    }
    
    const handlePrev = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <BackButton 
                className="text-3xl"
                text="Favorite"
            />
            <div className="py-10 max-w-6xl mx-auto">
                {wishlistItems.length > 0 ? (
                    <div className="">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="">
                            Wishlist ({wishlistItems.length})
                        </h2>

                        <button onClick={moveAllToBag} className="text-sm text-black border border-black px-6 py-2 rounded hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]">
                            Move All to Bag
                        </button>
                    </div>
            
                    <div className="">
                        <div className="relative group">
                        <div className="relative">
                            {hasMoreThanFourProducts && wishlistItems.length > itemsPerPage && (
                            <button
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className={cn(
                                "absolute -left-4 md:-left-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                                startIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                                )}
                                aria-label="Previous products"
                            >
                                <div className={cn(
                                "w-10 h-10 flex items-center justify-center transition-all duration-200",
                                startIndex === 0 ? "text-gray-400" : "text-black hover:text-coffee-light hover:shadow-lg hover:rounded-full"
                                )}>
                                <ChevronLeft className="h-10 w-10" />
                                </div>
                            </button>
                            )}

                            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistItems.slice(startIndex, startIndex + itemsPerPage).map((product) => (
                                <div key={product.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                                <Link href={`/products/${product.id}`}>
                                    <div className="mb-3 relative overflow-hidden">
                                    {/* Background image */}
                                    <div className="w-full h-48">
                                        <Image
                                        src={product.background_image}
                                        alt={`${product.name} background`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Foreground image overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                        src={product.foreground_image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="max-w-2/3 max-h-2/3 object-contain"
                                        />
                                    </div>
                                    </div>
                                    <h3 className="font-bold text-center mb-1">{product.name}</h3>
                                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {product.coffee_percentage}% | Milk {product.milk_percentage}%</p>
                                    <p className="font-bold text-center mb-6">₹{product.price}</p>
                                </Link>
                                
                                {/* Button positioned half inside, half outside */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                                    <Button
                                    variant="outline"
                                    className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                                    onClick={() => addToCart(product, 1)}
                                    >
                                    Add To Cart
                                    </Button>
                                </div>
                                </div>
                            ))}
                            </div>

                            {/* for mobile devices only */}
                            <div className="grid grid-cols-1 sm:hidden gap-y-10">
                            {wishlistItems.map((product) => (
                                <div key={product.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                                <Link href={`/products/${product.id}`}>
                                    <div className="mb-3 relative overflow-hidden">
                                    {/* Background image */}
                                    <div className="w-full h-48">
                                        <Image
                                        src={product.background_image}
                                        alt={`${product.name} background`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Foreground image overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                        src={product.foreground_image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="max-w-2/3 max-h-2/3 object-contain"
                                        />
                                    </div>
                                    </div>
                                    <h3 className="font-bold text-center mb-1">{product.name}</h3>
                                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {product.coffee_percentage}% | Milk {product.milk_percentage}%</p>
                                    <p className="font-bold text-center mb-6">₹{product.price}</p>
                                </Link>
                                
                                {/* Button positioned half inside, half outside */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                                    <Button
                                    variant="outline"
                                    className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                                    onClick={() => addToCart(product, 1)}
                                    >
                                    Add To Cart
                                    </Button>
                                </div>
                                </div>
                            ))}
                            </div>

                            {hasMoreThanFourProducts && wishlistItems.length > itemsPerPage && (
                            <button
                                onClick={handleNext}
                                disabled={startIndex >= products.length - 4}
                                className={cn(
                                "absolute -right-4 md:-right-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                                startIndex >= wishlistItems.length - 4 ? "cursor-not-allowed" : "cursor-pointer"
                                )}
                                aria-label="Next products"
                            >
                                <div className={cn(
                                "w-10 h-10 flex items-center justify-center transition-all duration-200",
                                startIndex >= products.length - 4 ? "text-gray-400" : "text-black hover:text-coffee-light hover:rounded-full hover:shadow-lg"
                                )}>
                                <ChevronRight className="h-10 w-10" />
                                </div>
                            </button>
                            )}
                        </div>
                        </div>
                    </div>

                    <div className="mt-20 max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                        <h2 className="relative pl-8 text-sm text-[#DB4444] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-3 before:rounded before:bg-[#DB4444]">
                            Just For You
                        </h2>
                        <Link href="/products" className="text-sm text-black border border-black px-6 py-2 rounded hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]">
                            See All
                        </Link>
                        </div>

                        <div className="relative group">
                        <div className="relative">
                            {hasMoreThanFourProducts && (
                            <button
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className={cn(
                                "absolute -left-4 md:-left-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                                startIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                                )}
                                aria-label="Previous products"
                            >
                                <div className={cn(
                                "w-10 h-10 flex items-center justify-center transition-all duration-200",
                                startIndex === 0 ? "text-gray-400" : "text-black hover:text-coffee-light hover:shadow-lg hover:rounded-full"
                                )}>
                                <ChevronLeft className="h-10 w-10" />
                                </div>
                            </button>
                            )}

                            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.slice(startIndex, startIndex + 4).map((product) => (
                                <div key={product.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                                <Link href={`/products/${product.id}`}>
                                    <div className="mb-3 relative overflow-hidden">
                                    {/* Background image */}
                                    <div className="w-full h-48">
                                        <Image
                                        src={product.background_image}
                                        alt={`${product.name} background`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Foreground image overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                        src={product.foreground_image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="max-w-2/3 max-h-2/3 object-contain"
                                        />
                                    </div>
                                    </div>
                                    <h3 className="font-bold text-center mb-1">{product.name}</h3>
                                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {product.coffee_percentage}% | Milk {product.milk_percentage}%</p>
                                    <p className="font-bold text-center mb-6">₹{product.price}</p>
                                </Link>
                                
                                {/* Button positioned half inside, half outside */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                                    <Button
                                    variant="outline"
                                    className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                                    onClick={() => addToCart(product, 1)}
                                    >
                                    Add To Cart
                                    </Button>
                                </div>
                                </div>
                            ))}
                            </div>

                            {/* for mobile devices only */}
                            <div className="grid grid-cols-1 sm:hidden gap-y-10">
                            {products.map((product) => (
                                <div key={product.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                                <Link href={`/products/${product.id}`}>
                                    <div className="mb-3 relative overflow-hidden">
                                    {/* Background image */}
                                    <div className="w-full h-48">
                                        <Image
                                        src={product.background_image}
                                        alt={`${product.name} background`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Foreground image overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                        src={product.foreground_image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="max-w-2/3 max-h-2/3 object-contain"
                                        />
                                    </div>
                                    </div>
                                    <h3 className="font-bold text-center mb-1">{product.name}</h3>
                                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {product.coffee_percentage}% | Milk {product.milk_percentage}%</p>
                                    <p className="font-bold text-center mb-6">₹{product.price}</p>
                                </Link>
                                
                                {/* Button positioned half inside, half outside */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                                    <Button
                                    variant="outline"
                                    className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                                    onClick={() => addToCart(product, 1)}
                                    >
                                    Add To Cart
                                    </Button>
                                </div>
                                </div>
                            ))}
                            </div>

                            {hasMoreThanFourProducts && (
                            <button
                                onClick={handleNext}
                                disabled={startIndex >= products.length - 4}
                                className={cn(
                                "absolute -right-4 md:-right-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                                startIndex >= products.length - 4 ? "cursor-not-allowed" : "cursor-pointer"
                                )}
                                aria-label="Next products"
                            >
                                <div className={cn(
                                "w-10 h-10 flex items-center justify-center transition-all duration-200",
                                startIndex >= products.length - 4 ? "text-gray-400" : "text-black hover:text-coffee-light hover:rounded-full hover:shadow-lg"
                                )}>
                                <ChevronRight className="h-10 w-10" />
                                </div>
                            </button>
                            )}
                        </div>
                        </div>
                    </div>

                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8">Save your favorite items to your wishlist to find them easily later.</p>
                        <Button asChild className="bg-coffee hover:bg-coffee-dark text-white">
                            <Link href="/products">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Browse Products
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}