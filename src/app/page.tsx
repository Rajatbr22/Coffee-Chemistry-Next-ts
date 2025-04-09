"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import ProductCard from "@/src/components/product-card";
import { products } from "@/src/lib/data";
import CoffeeBlast from "@/public/images/coffee_blast.webp";
import TestimonialSlider from "./testinomials/page";
import { useState, useEffect } from "react";
import Hero from "../components/hero";

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [displayedProducts, setDisplayedProducts] = useState(products);

  const categories = [
    { id: "coffee", name: "Coffee" },
    { id: "honey", name: "Honey" },
    // { id: "tea", name: "Tea" },
    // { id: "coffee", name: "Coffee" },
    // { id: "honey", name: "Honey" },
    // { id: "tea", name: "Tea" },
    // { id: "coffee", name: "Coffee" },
    // { id: "honey", name: "Honey" },
    // { id: "tea", name: "Tea" },
    // { id: "food", name: "Food" },
    // { id: "beans", name: "Beans" },
  ];

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.category.toLowerCase() === activeCategory.toLowerCase()
    );
    setDisplayedProducts(filtered);
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-full flex items-center justify-center text-center">
        {/* <div className="hero-section absolute inset-0"></div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Coffee</h1>
          <p className="text-xl text-white mb-8">Discover the best coffee experience</p>
          <Button asChild size="lg" className="bg-coffee-dark hover:bg-coffee text-white">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div> */}
        <Hero />
      </section>

      {/* Top Products Section */}
      <section className="py-20 px-4 md:px-6 max-w-full relative">
        {/* Section Heading */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold font-playfair mb-4">
            Top Products
          </h2>
        </div>

        {/* Coffee Blast Image - Positioned on left side */}
        <div className="absolute left-0 h-auto w-auto overflow-hidden pointer-events-none z-0 mt-20">
          <Image
            src={CoffeeBlast}
            alt="coffee blast"
            height={500}
            width={500}
            className="h-full object-left-top"
          />
        </div>

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20 relative z-10">
          <Link
            href="/products"
            className="text-[#1E1E1E] hover:text-coffee bg-[#F9C06A] text-2xl font-bold border-2 py-2 px-10 md:py-2 md:px-14 md:text-4xl rounded-xl font-playfair"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-12 px-4 md:px-6">
        <div className="absolute right-0 md:h-2/3 md:w-1/3 h-1/2 w-2/3 overflow-hidden pointer-events-none md:z-0 md:-mt-96 mt-16">
          <Image
            src={CoffeeBlast}
            alt="coffee blast"
            height={500}
            width={500}
            className="h-full w-auto object-cover object-right scale-x-[-1]"
          />
        </div>
        <div className="max-w-7xl md:mx-auto mx-2 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 font-playfair">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#603809]">
              Discover the best coffee
            </h2>
            <p className="mb-6 text-gray-700 text-balance">
              Bean Scene is a coffee shop that provides you with quality coffee
              that helps boost your productivity and helps build your mood.
              Having a cup of coffee is good, but having a cup of real coffee is
              greater. There is no doubt that you will enjoy this coffee more
              than others you have ever tasted.
            </p>
            <Button
              asChild
              className="bg-[#F9C06A] hover:bg-coffee text-black hover:text-white rounded-full"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/coffee-cup.webp"
              alt="Coffee beans"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-10 px-4 md:px-6 max-w-full relative">
        {/* Section Heading */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair">
            Categories
          </h2>
        </div>

        {/* Categories Buttons */}
        <div className="flex justify-evenly items-center md:mt-20 my-10 md:mb-20 md:text-5xl text-xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-xl font-medium whitespace-nowrap ${
                activeCategory === category.id
                  ? "text-coffee border-b-2 border-coffee"
                  : "text-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {featuredProducts.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {displayedProducts.length > 0 ? (
            displayedProducts
              .slice(0, 12)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-20 relative z-10">
          <Link
            href="/products"
            className="text-[#1E1E1E] hover:text-coffee bg-[#F9C06A] text-2xl font-bold border-2 py-2 px-10 md:py-2 md:px-14 md:text-4xl rounded-xl font-playfair"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 md:max-w-7xl mx-auto font-playfair">
        <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center text-coffee">
          Why are we different?
        </h2>
        <p className="text-center mt-2 md:mt-4 text-[#707070] px-4 sm:text-base">
          We don't just make your coffee, we make your day!
        </p>

        <div className="flex justify-center mt-6 md:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-xs sm:max-w-xl lg:max-w-5xl xl:max-w-6xl">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center bg-[#FFEED8] py-8 px-6 md:py-10 md:px-6 lg:py-12 lg:px-8 w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                <Image
                  src="/images/coffee-beans1.webp"
                  alt="Supreme coffee beans"
                  height={500}
                  width={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-xl sm:text-2xl mb-1 md:mb-2 text-coffee-light">
                Supreme Beans
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Beans that provides great taste
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center bg-[#FFF9F1] border-2 border-[#FFEED8] py-8 px-6 md:py-10 md:px-6 lg:py-12 lg:px-8 w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                <Image
                  src="/images/badge1.webp"
                  alt="High quality badge"
                  height={500}
                  width={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-xl sm:text-2xl mb-1 md:mb-2 text-coffee-light">
                High Quality
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We provide the highest quality
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center bg-[#FFF9F1] border-2 border-[#FFEED8] py-8 px-6 md:py-10 md:px-6 lg:py-12 lg:px-8 w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                <Image
                  src="/images/coffee-cup1.webp"
                  alt="Extraordinary coffee cup"
                  height={500}
                  width={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-xl sm:text-2xl mb-1 md:mb-2 text-coffee-light">
                Extraordinary
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Coffee like you have never tasted
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center bg-[#FFF9F1] border-2 border-[#FFEED8] py-8 px-6 md:py-10 md:px-6 lg:py-12 lg:px-8 w-full">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
                <Image
                  src="/images/best-price1.webp"
                  alt="Affordable price tag"
                  height={500}
                  width={500}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-xl sm:text-2xl mb-1 md:mb-2 text-coffee-light">
                Affordable Price
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our Coffee prices are easy to afford
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 md:mt-10 text-[#707070] px-4 sm:text-base">
          Great ideas start with great coffee, Lets help you achieve that
        </p>
        <h2 className="text-2xl md:text-3xl mt-2 font-bold text-center text-coffee">
          Get started today.
        </h2>
      </section>

      {/* Feedback section */}
      <section className="py-12 px-4 md:px-6 font-playfair">
        <TestimonialSlider />
      </section>

      {/* Newsletter Section */}
      <section className="py-10 md:py-16 px-4 md:px-6 text-white relative font-playfair">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
          <Image
            src="/images/Group-46.webp"
            alt="footer background"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Coffee Cup Overlay - responsive positioning */}
        <div className="absolute right-0 -bottom-20 md:-bottom-32 transform -translate-y-1/4 md:translate-y-0 overflow-hidden pointer-events-none z-10 w-1/4 md:w-auto">
          <Image
            src="/images/coffee-cup2.webp"
            alt="coffee cup right"
            width={200}
            height={200}
            className="w-full md:w-auto"
          />
        </div>

        {/* Left Coffee Cup Overlay - responsive positioning */}
        <div className="absolute left-0 -bottom-20 md:-bottom-32 transform -translate-y-1/4 md:translate-y-0 overflow-hidden pointer-events-none z-10 w-1/4 md:w-auto">
          <Image
            src="/images/coffee-cup2.webp"
            alt="coffee cup left"
            width={200}
            height={200}
            className="scale-x-[-1] w-full md:w-auto"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-20 pt-1 md:pt-0">
          {/* Subscription Content */}
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 relative">
            Subscribe to get the Latest News
          </h2>
          <p className="text-sm md:text-base mb-4 md:mb-6 relative">
            Don't miss out on our latest news, updates, tips and special offers
          </p>

          <div className="mb-6 md:mb-10 relative">
            <form className="flex flex-row max-w-md mx-auto gap-0">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="px-4 py-2 h-10 md:h-12 text-coffee-black focus:outline-none focus:ring-2 focus:ring-coffee-accent w-2/3"
                required
              />
              <Button
                type="submit"
                className="h-10 md:h-12 bg-secondary hover:bg-secondary/90 text-coffee-dark rounded-none font-bold w-1/3 md:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
