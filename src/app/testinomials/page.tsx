"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Define testimonial type
interface Testimonial {
  id: number;
  name: string;
  position: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jethalal",
    position: "Project Manager",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset...",
    image: "/images/manager.webp",
  },
  // {
  //   id: 2,
  //   name: "Dr Hathi",
  //   position: "Coffee Enthusiast",
  //   text: "The attention to detail in every cup is remarkable. I've never tasted coffee this perfect before. The rich aroma, the perfect balance of flavors, and the consistent quality make this my go-to coffee shop every morning.",
  //   image: "/images/manager.webp",
  // },
  // {
  //   id: 3,
  //   name: "Tarak Mehta",
  //   position: "Food Critic",
  //   text: "As someone who reviews food and beverages professionally, I can confidently say this coffee shop stands out from the competition. Their commitment to sourcing ethical beans and their precise brewing methods create an exceptional coffee experience.",
  //   image: "/images/manager.webp",
  // },
];

const TestimonialSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto slide functionality (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 50000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="mb-10">
      <h1 className="text-3xl md:text-5xl text-center font-bold text-[#5c3c10] mb-4">
        Our coffee perfection feedback
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Our customers has amazing things to say about us
      </p>

      {/* Coffee splashes */}
      <div className="absolute right-0 h-1/2 w-1/2 md:h-auto md:w-auto overflow-hidden pointer-events-none z-30 -mt-10 md:-mt-44">
        <Image
          src="/images/coffee_blast.webp"
          alt="coffee blast"
          height={500}
          width={500}
          className="scale-x-[-1]"
        />
      </div>

      <div className="absolute left-0 h-1/2 w-1/2 md:h-full md:w-full overflow-hidden pointer-events-none z-30 mt-80 md:mt-72">
        <Image
          src="/images/coffee_blast.webp"
          alt="coffee blast"
          height={500}
          width={500}
          className="scale-y-[-1]"
        />
      </div>

      <div className="relative h-[400px] md:h-[500px] max-w-5xl mx-auto">
        {/* Testimonial slides */}
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out 
              ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}
              bg-[#FFF9F1] border-2 border-[#FFEED8] p-6 md:p-10 flex flex-col items-center`}
          >
            <span className="text-8xl md:text-9xl font-bold text-[#5c3c10] font-serif absolute top-6 left-6 md:top-8 md:left-8">
              &ldquo;
            </span>

            <div className="mt-16 md:mt-24 ml-6 md:ml-8">
              <p className="text-center text-gray-700 text-balance line-clamp-5">
                {testimonial.text}
              </p>
            </div>

            <div className="flex flex-col items-center mt-20 md:mt-28">
              <h3 className="text-2xl font-semibold md:text-3xl md:font-bold text-[#5c3c10]">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 mb-4">{testimonial.position}</p>
              <div className="h-20 w-20 md:w-40 md:h-40 relative overflow-hidden border-[#5c3c10]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={500}
                  width={500}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="hidden absolute top-1/2 -translate-y-1/2 -left-9 w-10 h-10 md:w-16 md:h-16 
            bg-[#F9C06A] rounded-lg md:flex md:items-center md:justify-center text-white 
            shadow-md hover:bg-[#e9b260] transition-colors z-20 "
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="h-10 w-10" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden absolute top-1/2 -translate-y-1/2 -right-9 w-10 h-10 md:w-16 md:h-16 
            bg-[#F9C06A] rounded-lg md:flex md:items-center md:justify-center text-white 
            shadow-md hover:bg-[#e9b260] transition-colors z-20"
          aria-label="Next testimonial"
        >
          <ArrowRight className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
