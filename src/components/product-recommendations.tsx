import { products } from "@/src/lib/data"
import ProductCard from "@/src/components/product-card"

interface ProductRecommendationsProps {
  currentProductId: string
}

export default function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  // Get products from the same category as the current product
  const currentProduct = products.find((p) => p.id === currentProductId)
  const recommendedProducts = products
    .filter((p) => p.id !== currentProductId && p.category === currentProduct?.category)
    .slice(0, 4)

  if (recommendedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="product-grid">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

