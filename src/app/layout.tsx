import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/src/components/header"
import Footer from "@/src/components/footer"
import { CartProvider } from "@/src/context/cart-context"
import { WishlistProvider } from "@/src/context/wishlist-context"
import { AuthProvider } from "@/src/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coffee Chemistry - Premium Coffee Shop",
  description: "Discover the best coffee experience with our premium coffee selection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

