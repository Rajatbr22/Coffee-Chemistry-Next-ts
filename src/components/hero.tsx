"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/coffee_image.webp"
        alt="Coffee background"
        fill
        className="h-fit object-cover object-center"
        priority
        loading="eager"
      />

      <div className="relative z-10 h-full">
        <header className="px-4 md:px-8 py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* <Link href="/" className="text-white text-3xl md:text-4xl font-serif">
                Coffee
                </Link> */}

            {/* <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-white text-lg font-medium hover:text-[#f9c06a] transition-colors">
                    Home
                </Link>
                <Link href="/products" className="text-white text-lg font-medium hover:text-[#f9c06a] transition-colors">
                    Products
                </Link>
                <Link
                    href="/categories"
                    className="text-white text-lg font-medium hover:text-[#f9c06a] transition-colors"
                >
                    Categories
                </Link>
                <Link href="/contact" className="text-white text-lg font-medium hover:text-[#f9c06a] transition-colors">
                    Contact Us
                </Link>
                </nav>

                <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="bg-white rounded-full py-2 px-4 pl-10 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-[#f9c06a]"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button aria-label="Search" className="md:hidden text-white">
                    <Search className="h-6 w-6" />
                </button>
                <button aria-label="Account" className="text-white">
                    <User className="h-6 w-6" />
                </button>
                <button aria-label="Favorites" className="text-white relative">
                    <Heart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 bg-[#db4444] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                    </span>
                </button>
                <button aria-label="Cart" className="text-white">
                    <ShoppingCart className="h-6 w-6" />
                </button>
                </div> */}
          </div>
        </header>

        <div className="flex items-center h-[calc(100vh-100px)] px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-xl">
              <h1 className="text-6xl md:text-8xl font-playfair text-white mb-6 font-light text-left">
                Coffee
              </h1>
              <p className="text-white text-lg md:text-xl mb-8 max-w-md font-playfair text-left">
                It is best to start your day with a cup of coffee. Discover the
                best flavours coffee you will ever have. We provide the best for
                our customers.
              </p>
              <div className="text-left">
                <Button
                  asChild
                  className="bg-[#f9c06a] hover:bg-[#f9c06a]/90 text-[#1e1e1e] font-medium p-4 rounded-full text-lg"
                >
                  <Link href="/products">Order Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
