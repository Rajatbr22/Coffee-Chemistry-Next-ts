"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { products } from "@/src/lib/data"
import ProductCard from "@/src/components/product-card"
import ProductFilter from "@/src/components/product-filter"
import type { Product, FilterOptions } from "@/src/lib/types"

export default function Search() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: [0, 20],
        categories: [],
        featured: false,
        newArrivals: false,
        onSale: false,
    })

    // Filter products based on search query
    useEffect(() => {
        if (query) {
        const searchResults = products.filter(
            (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        setFilteredProducts(searchResults)
        } else {
        setFilteredProducts([])
        }
    }, [query])

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters)
    }

    // Apply additional filters
    useEffect(() => {
        if (query) {
        let result = [...products].filter(
            (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )

        // Filter by price range
        // if (filters.priceRange) {
        //     result = result.filter(
        //     (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
        //     )
        // }

        // Filter by categories
        if (filters.categories && filters.categories.length > 0) {
            result = result.filter((product) => filters.categories.includes(product.category))
        }

        // Filter by featured
        if (filters.featured) {
            result = result.filter((product) => product.featured)
        }

        // For demo purposes
        if (filters.newArrivals) {
            result = result.filter((product) => ["1", "2", "3", "4"].includes(product.id))
        }

        if (filters.onSale) {
            result = result.filter((product) => ["5", "6", "7", "8"].includes(product.id))
        }

        setFilteredProducts(result)
        }
    }, [filters, query])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 mb-8">
            {filteredProducts.length} results for "{query}"
        </p>

        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
            <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} />
            </div>

            <div className="md:w-3/4">
            {filteredProducts.length > 0 ? (
                <div className="product-grid">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products match your search criteria.</p>
                </div>
            )}
            </div>
        </div>
        </div>
    )
}

