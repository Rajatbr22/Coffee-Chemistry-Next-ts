import { notFound } from "next/navigation"
import { categories, products } from "@/src/lib/data"
import ProductCard from "@/src/components/product-card"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.id)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.category === params.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      {categoryProducts.length > 0 ? (
        <div className="product-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-gray-500">No products found in this category.</p>
      )}
    </div>
  )
}

