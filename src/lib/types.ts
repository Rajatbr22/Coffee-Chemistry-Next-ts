export interface Product {
  id: string
  name: string
  description: string
  price: number
  background_image: string
  foreground_image: string
  category: string
  featured?: boolean
  rating: number
  in_stock: boolean
  reviews: number
  milk_percentage: number
  coffee_percentage: number
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface FilterOptions {
  priceRange?: [number, number]
  categories?: string[]
  featured?: boolean
  newArrivals?: boolean
  onSale?: boolean
}

