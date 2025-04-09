"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { products } from "@/src/lib/data"
import ProductCard from "@/src/components/product-card"
import ProductFilter from "@/src/components/product-filter"
import AdminProductManager from "@/src/components/admin-product-manager"
import type { Product, FilterOptions } from "@/src/lib/types"
import BackButton from "@/src/components/back-button"
import { useAuth } from "@/src/context/auth-context"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAdmin } = useAuth()
  const [allProducts, setAllProducts] = useState<Product[]>(products)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  
  const getInitialFilters = useCallback((): FilterOptions => {
    const categoryParam = searchParams.get("category")
    return {
      categories: categoryParam ? [categoryParam] : [],
      featured: false,
      newArrivals: false,
      onSale: false,
    }
  }, [searchParams]);
  
  const [filters, setFilters] = useState<FilterOptions>(getInitialFilters());

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const handleAddProduct = useCallback((product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: (allProducts.length + 1).toString(),
    }
    setAllProducts([...allProducts, newProduct])
    setFilteredProducts([...filteredProducts, newProduct])
  }, [allProducts, filteredProducts])

  const handleUpdateProduct = useCallback((id: string, updatedProduct: Partial<Product>) => {
    setAllProducts(allProducts.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ))
    setFilteredProducts(filteredProducts.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ))
  }, [allProducts, filteredProducts])

  const handleDeleteProduct = useCallback((id: string) => {
    setAllProducts(allProducts.filter(product => product.id !== id))
    setFilteredProducts(filteredProducts.filter(product => product.id !== id))
  }, [allProducts, filteredProducts])


  useEffect(() => {
    let result = [...allProducts]
    
    if (filters?.categories && filters.categories.length > 0) {
      result = result.filter((product) => filters.categories?.includes(product.category))
    }
    
    if (filters?.featured) {
      result = result.filter((product) => product.featured)
    }

    if (filters?.newArrivals) {
      result = result.filter((product) => ["1", "2", "3", "4"].includes(product.id))
    }
    
    if (filters?.onSale) {
      result = result.filter((product) => ["5", "6", "7", "8"].includes(product.id))
    }
    
    setFilteredProducts(result)
  }, [filters, allProducts]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      categories: [],
      featured: false,
      newArrivals: false,
      onSale: false,
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BackButton
        className="text-3xl"
        text="All Products"
      />
      
      {isAdmin ? (
        <div className="py-10">
          <AdminProductManager
            products={allProducts}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <div className="md:w-1/4">
            <ProductFilter 
              onFilterChange={handleFilterChange} 
              initialFilters={filters} 
            />
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
                <p className="text-gray-500 mb-4">No products match your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="text-coffee hover:text-coffee-dark underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}