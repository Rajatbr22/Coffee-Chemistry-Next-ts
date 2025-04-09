"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { ShoppingCart, Menu, X, Search, User, Heart, LogOut } from "lucide-react"
import { useCart } from "@/src/context/cart-context"
import { useWishlist } from "@/src/context/wishlist-context"
import { useAuth } from "@/src/context/auth-context"
import { cn } from "@/src/lib/utils"
import SearchBar from "@/src/components/search-bar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { user, logout } = useAuth()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-coffee-dark">Coffee Chemistry</span>
            </Link>
          </div>

          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(true)}
              className="rounded-md p-2 inline-flex items-center justify-center text-coffee-dark hover:text-coffee hover:bg-coffee-light"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-semibold font-playfair hover:text-coffee",
                  pathname === link.href ? "text-coffee" : "text-coffee-dark",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop right section */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <div className="w-64">
              <SearchBar />
            </div>
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="text-coffee-dark hover:text-white hover:bg-coffee-light"
              >
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative text-coffee-dark hover:text-white hover:bg-coffee-light"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative text-coffee-dark hover:text-white hover:bg-coffee-light"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-coffee-dark">Coffee Chemistry</span>
                </div>
                <div className="-mr-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md p-2 inline-flex items-center justify-center text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-coffee-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="ml-3 text-base font-medium text-coffee-dark">{link.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="flex items-center justify-around">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                >
                  <Search className="h-5 w-5" />
                </Button>
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogout}
                      className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                >
                  <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="h-5 w-5" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative text-coffee-dark hover:text-coffee hover:bg-coffee-light"
                >
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

