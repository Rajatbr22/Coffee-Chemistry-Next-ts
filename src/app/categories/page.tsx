"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { products } from "@/src/lib/data"
import BackButton from "@/src/components/back-button"
import ProductCard from "@/src/components/product-card"

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("coffee")
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedProducts, setDisplayedProducts] = useState(products)

  // Available categories
  const categories = [
    { id: "coffee", name: "Coffee" },
    { id: "honey", name: "Honey" },
    // { id: "tea", name: "Tea" },
    // { id: "food", name: "Food" },
    // { id: "beans", name: "Beans" },
  ]

  
  useEffect(() => {
    let filtered = products.filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    setDisplayedProducts(filtered)
  }, [activeCategory, searchQuery])


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <BackButton />

      <div className="flex items-center justify-center w-full mx-3 sm:mx-0 -mt-10 sm:-mt-14">
        <div className="relative flex items-center sm:w-1/2">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-3 rounded-full border border-black bg-gray-100 focus:border-none"
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>


      <div className="py-10 max-w-6xl mx-auto">
        {/* Categories title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>

        {/* Category tabs */}
        <div className="flex justify-evenly items-center md:mt-20 my-10 md:mb-20 md:text-5xl text-xl">
          {/* <div className="flex w-full justify-between font-clicker"> */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`text-xl font-medium whitespace-nowrap ${
                  activeCategory === category.id ? "text-coffee border-b-2 border-coffee" : "text-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          {/* </div> */}
        </div>

        {/* Products grid */}
        <div className="px-4 pb-12">
          {displayedProducts.length > 0 ? (
            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
              {displayedProducts.map((product) => (
                // <div key={product.id} className="bg-[#111111] rounded-lg overflow-hidden relative">
                //   <Link href={`/products/${product.id}`}>
                //     <div className="relative h-40 w-full">
                //       <Image src={product.background_image} alt={product.name} fill className="object-cover" />
                //     </div>
                //     <div className="p-3">
                //       <div className="flex justify-between items-start">
                //         <p className="text-white font-bold">₹{product.price.toFixed(0)}</p>
                //         <button className="rounded-full bg-white/20 p-1">
                //           <Info className="h-4 w-4 text-white" />
                //         </button>
                //       </div>
                //       <h3 className="text-white text-sm mt-1">{product.name}</h3>
                //     </div>
                //   </Link>
                //   <button
                //     onClick={() => addToCart(product)}
                //     className="absolute bottom-3 right-3 bg-[#933c24] hover:bg-[#7a3420] text-white text-xs px-3 py-1 rounded"
                //   >
                //     Add
                //   </button>
                // </div>
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No products found</p>
              <p className="text-gray-400 text-sm">
                {searchQuery
                  ? `No ${activeCategory} products match "${searchQuery}"`
                  : `No products available in ${activeCategory}`}
              </p>
              {searchQuery && (
                <button onClick={clearSearch} className="mt-4 text-coffee hover:text-coffee-dark underline">
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>    
    </div>
  )
}

