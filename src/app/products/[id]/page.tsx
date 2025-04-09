"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { products } from "@/src/lib/data"
import { Button } from "@/src/components/ui/button"
import { Heart, Minus, Plus, Truck, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/src/context/cart-context"
import { useWishlist } from "@/src/context/wishlist-context"
import { cn } from "@/src/lib/utils"
import BackButton from "@/src/components/back-button"
import { use } from "react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const product = products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use the id here as well
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== id)
  const hasMoreThanFourProducts = relatedProducts.length > 4
  
  const productViews = [
    { background: product?.background_image, foreground: product?.foreground_image },
    { background: product?.background_image, foreground: product?.foreground_image },
    { background: product?.background_image, foreground: product?.foreground_image },
    { background: product?.background_image, foreground: '' },
  ]

  if (!product) {
    notFound()
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleNext = () => {
    if (currentIndex < relatedProducts.length - 4) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mb-20">
      
      <BackButton
        className="text-3xl"
        text=" "
      />

      <div className="flex flex-col md:flex-row gap-8 mb-12 mt-10 max-w-6xl mx-auto">

        <div className="md:w-[85%] flex">
        
          <div className="hidden md:flex flex-col gap-4 mr-4 h-full justify-start">
            {productViews.map((view, index) => (
              <div 
                key={index} 
                className={cn(
                  "w-28 h-1/4 border overflow-hidden relative cursor-pointer transition-all duration-200",
                  activeImage === index ? "border-coffee shadow-md" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setActiveImage(index)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={`${view.background}`}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                {view.foreground ? (
                  <Image
                    src={view.foreground}
                    alt={`${product.name} view ${index + 1}`}
                    width={50}
                    height={50}
                    className="w-3/4 h-3/4 object-contain"
                  />
                ) : null}
                </div>
              </div>
            ))}
          </div>


          <div className="flex-1 bg-white overflow-hidden relative h-full">
            <div className="absolute inset-0">
              <Image
                src={`${productViews[activeImage].background}`}
                alt={`${product.name} background`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative flex items-center justify-center h-full p-6">
            {productViews[activeImage].foreground ? (
              <Image
                src={productViews[activeImage].foreground}
                alt={`${product.name} view ${activeImage + 1}`}
                width={400}
                height={400}
                className="max-w-full max-h-full object-contain"
              />
            ) : null}
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-black mb-2">{product.name}</h1>

          <div className="flex items-center mb-2 gap-0.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
              let starType = "text-gray-300"; 

              if (product.rating >= star) {
                starType = "text-yellow-400"; 
              } else if (product.rating >= star - 0.5) {
                starType = "text-yellow-400 half-star"; 
              }

              return (
                <svg
                  key={star}
                  className={cn("w-4 h-4", starType)}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {product.rating >= star - 0.5 && product.rating < star ? (
                    
                    <path d="M10 2l2.39 6.94h7.29l-5.89 4.46 2.25 6.94-5.88-4.42-5.89 4.42L5.5 13.4.59 8.94h7.29L10 2z" />
                  ) : (
                    
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  )}
                </svg>
              );
            })}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews} Reviews)</span>
          <span className={`text-sm ml-4 ${product.in_stock ? "text-green-500" : "text-red-500"}`}>
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

          {/* Price */}
          <p className="text-2xl font-bold text-black mb-4">₹{product.price}</p>

          {/* Description */}
          <p className="text-black mb-6">
            {product.description}
          </p>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Size Selection */}
          <div className="mb-6 flex items-center gap-4">
            <p className="font-medium">Size:</p>
            <div className="flex gap-2">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-10 h-10 rounded border flex items-center justify-center",
                    selectedSize === size
                      ? "bg-[#DB4444] text-white"
                      : "border-black text-black",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-black rounded">
              <button onClick={decreaseQuantity} className="px-3 py-3 text-black hover:text-white hover:bg-[#DB4444] border-r">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-3 text-black hover:text-white  hover:bg-[#DB4444] border-l">
                <Plus className="h-4 w-4" />
              </button>
            </div>

              <Button onClick={handleAddToCart} className=" bg-primary h-11 w-1/3 hover:bg-primary/90 text-white" size='lg'>
                Buy Now
              </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleWishlist}
              className={cn("border-black ", isInWishlist(product.id) ? "text-red-500" : "text-black")}
            >
              <Heart className={cn("h-5 w-5", isInWishlist(product.id) ? "fill-current" : "")} />
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="rounded p-5 border border-black">
            <div className="flex items-start mb-4 gap-2">
              <Truck className="h-10 w-10 text-black mt-0.5 mr-3" />
              <div className="space-y-2">
                <h3 className="font-medium text-black">Free Delivery</h3>
                <p className="text-sm text-black underline">Enter your postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="border-t border-black -mx-5 my-4"/>

            <div className="flex items-start gap-2">
              <RefreshCcw  className="h-10 w-10 text-black mt-0.5 mr-3" />
              <div className="space-y-2">
                <h3 className="font-medium text-black">Return Delivery</h3>
                <p className="text-sm text-black">
                  Free 30 Days Delivery Returns. <span className="text-black underline">Details</span>
                </p>
              </div>
            </div>
          </div>


            </div>
          </div>

      {/* Related Products */}
      <div className="mt-20 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="relative pl-8 text-sm text-[#DB4444] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-3 before:rounded before:bg-[#DB4444]">
            Related Item
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
                disabled={currentIndex === 0}
                className={cn(
                  "absolute -left-4 md:-left-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                  currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                )}
                aria-label="Previous products"
              >
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center transition-all duration-200",
                  currentIndex === 0 ? "text-gray-400" : "text-black hover:text-coffee-light hover:shadow-lg hover:rounded-full"
                )}>
                  <ChevronLeft className="h-10 w-10" />
                </div>
              </button>
            )}

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(currentIndex, currentIndex + 4).map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="mb-3 relative overflow-hidden">
                      {/* Background image */}
                      <div className="w-full h-48">
                        <Image
                          src={relatedProduct.background_image}
                          alt={`${relatedProduct.name} background`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Foreground image overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={relatedProduct.foreground_image}
                          alt={relatedProduct.name}
                          width={200}
                          height={200}
                          className="max-w-2/3 max-h-2/3 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-center mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {relatedProduct.coffee_percentage}% | Milk {relatedProduct.milk_percentage}%</p>
                    <p className="font-bold text-center mb-6">₹{relatedProduct.price}</p>
                  </Link>
                  
                  {/* Button positioned half inside, half outside */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                    <Button
                      variant="outline"
                      className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                      onClick={() => addToCart(relatedProduct, 1)}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* for mobile devices only */}
            <div className="grid grid-cols-1 sm:hidden gap-y-10">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-[#FFF9F1] border border-[#F9C06A] pb-8 relative">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="mb-3 relative overflow-hidden">
                      {/* Background image */}
                      <div className="w-full h-48">
                        <Image
                          src={relatedProduct.background_image}
                          alt={`${relatedProduct.name} background`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Foreground image overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={relatedProduct.foreground_image}
                          alt={relatedProduct.name}
                          width={200}
                          height={200}
                          className="max-w-2/3 max-h-2/3 object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-center mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-center text-gray-600 mb-2">Coffee {relatedProduct.coffee_percentage}% | Milk {relatedProduct.milk_percentage}%</p>
                    <p className="font-bold text-center mb-6">₹{relatedProduct.price}</p>
                  </Link>
                  
                  {/* Button positioned half inside, half outside */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-1/2">
                    <Button
                      variant="outline"
                      className="rounded-full p-6 bg-[#F9C06A] hover:bg-amber-200 text-black border-[#F9C06A]"
                      onClick={() => addToCart(relatedProduct, 1)}
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
                disabled={currentIndex >= relatedProducts.length - 4}
                className={cn(
                  "absolute -right-4 md:-right-24 top-0 bottom-0 my-auto flex items-center justify-center w-10 h-full md:w-16 z-10 hidden md:flex",
                  currentIndex >= relatedProducts.length - 4 ? "cursor-not-allowed" : "cursor-pointer"
                )}
                aria-label="Next products"
              >
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center transition-all duration-200",
                  currentIndex >= relatedProducts.length - 4 ? "text-gray-400" : "text-black hover:text-coffee-light hover:rounded-full hover:shadow-lg"
                )}>
                  <ChevronRight className="h-10 w-10" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}