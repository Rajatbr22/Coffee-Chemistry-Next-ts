"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/context/auth-context"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import BackButton from "@/src/components/back-button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push("/products")
    } catch (err) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-8">
      <BackButton
        className="text-3xl"
        text="Login"
      />

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button type="submit" className="w-full bg-coffee hover:bg-coffee-dark text-white">
            Login
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p>Admin credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: admin123</p>
          <p className="mt-4">User credentials:</p>
          <p>Email: user@example.com</p>
          <p>Password: user123</p>
        </div>
      </div>
    </div>
  )
} 