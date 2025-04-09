"use client"

import { useState, useCallback } from "react"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button"
import { categories } from "@/src/lib/data"
import type { FilterOptions } from "@/src/lib/types"

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  initialFilters?: FilterOptions
}

export default function ProductFilter({ onFilterChange, initialFilters }: ProductFilterProps) {
  // Initialize state directly from props
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialFilters?.categories || [],
    featured: initialFilters?.featured || false,
    newArrivals: initialFilters?.newArrivals || false,
    onSale: initialFilters?.onSale || false,
  });

  // Handle category checkbox changes
  const handleCategoryChange = useCallback((categoryId: string, checked: boolean) => {
    setFilters(prev => {
      const newCategories = checked 
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId);
      
      const newFilters = {
        ...prev,
        categories: newCategories
      };
      
      // Call the parent's filter change handler directly
      onFilterChange(newFilters);
      
      return newFilters;
    });
  }, [onFilterChange]);

  // Handle boolean filter changes
  const handleBooleanFilterChange = useCallback((filterName: 'featured' | 'newArrivals' | 'onSale', checked: boolean) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterName]: checked
      };
      
      // Call the parent's filter change handler directly
      onFilterChange(newFilters);
      
      return newFilters;
    });
  }, [onFilterChange]);

  // Reset all filters
  const handleReset = useCallback(() => {
    const resetFilters = {
      categories: [],
      featured: false,
      newArrivals: false,
      onSale: false,
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  }, [onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset} 
          className="text-sm text-coffee hover:text-coffee-dark"
        >
          Reset
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked === true)
                }
              />
              <Label 
                htmlFor={`category-${category.id}`} 
                className="ml-2 text-sm font-medium"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Other filters */}
      <div>
        <h3 className="font-medium mb-2">Other</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="filter-featured"
              checked={filters.featured}
              onCheckedChange={(checked) => 
                handleBooleanFilterChange('featured', checked === true)
              }
            />
            <Label 
              htmlFor="filter-featured" 
              className="ml-2 text-sm font-medium"
            >
              Featured Items
            </Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="filter-new"
              checked={filters.newArrivals}
              onCheckedChange={(checked) => 
                handleBooleanFilterChange('newArrivals', checked === true)
              }
            />
            <Label 
              htmlFor="filter-new" 
              className="ml-2 text-sm font-medium"
            >
              New Arrivals
            </Label>
          </div>
          <div className="flex items-center">
            <Checkbox 
              id="filter-sale" 
              checked={filters.onSale} 
              onCheckedChange={(checked) => 
                handleBooleanFilterChange('onSale', checked === true)
              }
            />
            <Label 
              htmlFor="filter-sale" 
              className="ml-2 text-sm font-medium"
            >
              On Sale
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}