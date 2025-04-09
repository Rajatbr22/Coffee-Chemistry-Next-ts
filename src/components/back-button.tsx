"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ButtonProps } from "@/src/components/ui/button"
import React from "react"

interface BackButtonProps extends Omit<ButtonProps, 'onClick'> {
    text?: string
    fallbackPath?: string
    showOnHome?: boolean
    customOnClick?: () => void
}

export default function BackButton({
    text = " ",
    fallbackPath = "/",
    showOnHome = false,
    customOnClick,
    ...props
}: BackButtonProps) {
    const router = useRouter()
    const pathname = usePathname()

    if (pathname === "/" && !showOnHome) {
        return null
    }

    const handleClick = () => {
        if (customOnClick) {
        customOnClick()
        } else {
        router.back()
        }
    }

    return (
        <div className="flex items-center gap-1 md:gap-4">
            <button
                onClick={handleClick}
                className="h-10 w-10 md:h-16 md:w-16 "
            >
                <svg width="" height="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L4 12L10 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="4" y1="12" x2="12" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <p className="text-xl md:text-2xl">{text}</p>
        </div>
    )
}