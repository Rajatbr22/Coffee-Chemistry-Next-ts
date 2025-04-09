"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { Product } from "@/src/lib/types"

interface AdminProductManagerProps {
  products: Product[]
  onAddProduct: (product: Omit<Product, "id">) => void
  onUpdateProduct: (id: string, product: Partial<Product>) => void
  onDeleteProduct: (id: string) => void
}

export default function AdminProductManager({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: AdminProductManagerProps) {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    featured: false,
    in_stock: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
      })
      setEditingProduct(null)
    } else {
      onAddProduct({
        ...formData,
        price: Number(formData.price),
        rating: 0,
        reviews: 0,
        background_image: "/images/bgimage-products.png",
        foreground_image: "/images/product1.png",
      })
    }
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      featured: false,
      in_stock: true,
    })
    setIsAddingProduct(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      featured: product.featured || false,
      in_stock: product.in_stock,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button
          onClick={() => setIsAddingProduct(true)}
          className="bg-coffee hover:bg-coffee-dark text-white"
        >
          Add New Product
        </Button>
      </div>

      {(isAddingProduct || editingProduct) && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.in_stock}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
              />
              <span>In Stock</span>
            </label>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="bg-coffee hover:bg-coffee-dark text-white">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddingProduct(false)
                setEditingProduct(null)
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  featured: false,
                  in_stock: true,
                })
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm">₹{product.price} - {product.category}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteProduct(product.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 