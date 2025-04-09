"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { products } from "@/src/lib/data"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<typeof products>([])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null)
    const pathName = usePathname();

    useEffect(() => {
        // Filter products based on search query
        if (searchQuery.trim().length > 1) {
        const filteredProducts = products.filter(
            (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setSearchResults(filteredProducts)
        setIsSearchOpen(true)
        } else {
        setSearchResults([])
        setIsSearchOpen(false)
        }
    }, [searchQuery])

    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchOpen(false)
        }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        setIsSearchOpen(false)
        }
    }

    if(pathName === '/categories') return null;

    return (
        <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative">
            <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery("")}
                >
                    {/* <X className="h-4 w-4" /> */}
                </Button>
            )}
        </form>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
            <div className="p-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
                <ul className="space-y-2">
                {searchResults.map((product) => (
                    <li key={product.id}>
                    <Link
                        href={`/products/${product.id}`}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <Image
                            src={product.background_image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md mr-3"
                        />
                        <div>
                        <p className="font-medium text-coffee-dark">{product.name}</p>
                        <p className="text-sm text-gray-500">₹{product.price.toFixed(2)}</p>
                        </div>
                    </Link>
                    </li>
                ))}
                </ul>
                <div className="mt-2 pt-2 border-t">
                <Button onClick={handleSearch} variant="ghost" className="w-full text-coffee hover:text-coffee-dark">
                    See all results
                </Button>
                </div>
            </div>
            </div>
        )}

        {isSearchOpen && searchQuery.trim().length > 1 && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50">
            <div className="p-4 text-center">
                <p className="text-gray-500">No products found for "{searchQuery}"</p>
            </div>
            </div>
        )}
        </div>
    )
}

