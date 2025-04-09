"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Info } from "lucide-react"
import { useCart } from "@/src/context/cart-context"
import type { Product } from "@/src/lib/types"

interface ProductCardProps {
  product: Product;
}

function splitTitle(title: string) {
  const words = title.split(" "); // Convert string into array of words
  if (words.length > 2) {
    return (
      <>
        {words.slice(0, 2).join(" ")} <br /> {words.slice(2).join(" ")}
      </>
    );
  }
  return title; // Return original title if it has 2 or fewer words
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <div className="w-full mx-auto max-w-[250px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[400px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      <Link href={`/products/${product.id}`} className="block relative h-[300px] sm:h-[300px] md:h-[350px] lg:h-[350px]">
        {/* Main product image */}
        <Image
          src={product.background_image}
          alt={product.name}
          width={500}
          height={400}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with product details */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex justify-between items-center top-1/2 p-2">
            <p className="font-bold text-white text-lg">₹{product.price}</p>
            
            {/* Info Icon with Tooltip - Improved for all devices */}
            <div className="relative group">
              <Info className="text-white/75 h-8 w-8 cursor-pointer" />
              
              {/* Improved tooltip positioning for all devices */}
              <div className="absolute z-10 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white text-gray-800 text-sm p-3 rounded-md shadow-lg transition-all duration-300 right-0 sm:right-0 md:right-0 lg:right-0 top-full sm:top-full md:top-full bottom-auto sm:bottom-auto transform-none sm:transform-none
              max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
                
                <div className="relative">
                  {/* Tooltip arrow */}
                  <div className="absolute top-0 right-3 -mt-2 w-4 h-4 bg-white transform rotate-45"></div>
                  {/* Tooltip content */}
                  <p className="text-gray-800 text-sm relative z-10">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-1 sm:mt-2 p-1 -mb-2 sm:-mb-0">
            <h3 className="font-semibold text-lg text-white mb-1">
              {splitTitle(product.name)}
            </h3>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              size="sm"
              className="bg-[#933C24] hover:bg-coffee text-white flex items-center justify-center rounded-none"
            >
              Add
            </Button>
          </div>
        </div>
        
        {/* Product image overlay in center */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[150px] sm:w-[180px] md:w-[200px] h-auto">
          <Image
            src={product.foreground_image}
            alt={`${product.name} thumbnail`}
            width={200}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
      </Link>
    </div>
  );
}