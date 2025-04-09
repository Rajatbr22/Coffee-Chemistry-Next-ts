"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import BackButton from "@/src/components/back-button"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form submission
    setFormSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BackButton
        className="text-3xl"
        text="Contact Us"
      />
      <div className="flex flex-col lg:flex-row py-10 max-w-6xl mx-auto">

        {/* Contact Information */}
        <div className="w-full lg:w-[30%] mb-6 lg:mb-0 lg:pr-6">
          <div className="p-6">
            <div className="space-y-4">
              
              <div className="flex items-start">
                <div className="space-y-4 mb-4">
                  <div className="flex items-center">
                    <Phone className="h-10 w-10 text-white p-2 rounded-full bg-[#DB4444] mr-3" />
                    <h3 className="font-medium">Call To Us</h3>
                  </div>
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>

              <div className="bg-gray-500 h-[1px] w-full"/>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-10 w-10 text-white p-2 rounded-full bg-[#DB4444] mr-3" />
                  <h3 className="font-medium">Write To US</h3>
                </div>

                <p className="">Fill out our form and we will contact you within 24 hours.</p>
                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
              </div>

            </div>
          </div>
        </div>


        {/* Contact Form */}
        <div className="w-full lg:w-[70%]">
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h2>
              <p className="text-green-700 mb-4">
                Your message has been sent successfully. We'll get back to you as soon as possible.
              </p>
              <Button onClick={() => setFormSubmitted(false)} className="bg-coffee hover:bg-coffee-dark text-white">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                    <Input 
                      id="name" 
                      required
                      placeholder="Your Name *" 
                      className="h-12"
                    />
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="Your Email *"
                      className="h-12"
                    />
                  
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      placeholder="Your Phone *"
                      className="h-12"
                    />
                </div>

                <div className="md:py-4">
                  <Textarea 
                    id="message" 
                    rows={10} 
                    required 
                    placeholder="Your Message"
                    className="bg-gray-100 border-none rounded h-48"
                  />
                </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="h-12 w-full md:w-[30%]  bg-[#DB4444] text-white rounded-sm">
                      Send Message
                    </Button>
                  </div>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}