"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Define the slide data structure
// interface SlideData {
//   id: number
//   title: string
//   subtitle: string
//   description: string
//   price: string
//   image: string
//   background: string
// }

const Banner = () => {
  // Sample data for the slider
  const slides = [
    {
      id: 1,
      title: "Buy New Trend Woman Black Cotton Blend Top | Top for Women | Women top...",
      description: "Quality Freshness Guaranteed!",
      price: "from $14.35",
      image: "https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg",
      background: "bg-gradient-to-r from-blue-50 to-gray-100",
    },
    {
      id: 2,
      title: "Apple iphone 13 128 GB,Pink",
      description: "ROASTED for extra flavor",
      price: "from $14.35",
      image: "https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg",
      background: "bg-gradient-to-r from-amber-50 to-gray-100",
    },
  ]
  

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg my-9">
      {/* Promotional banner */}
      <div className="absolute top-0 left-0 z-10 px-4 py-2 text-white bg-rose-600 rounded-br-lg">
        <p className="text-sm font-bold">EXCLUSIVE OFFER -40% OFF</p>
      </div>

      {/* Slider container */}
      <div className="relative h-[500px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            } ${slide.background}`}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Text content */}
              <div className="flex flex-col justify-center p-8 md:w-1/2">
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-gray-500">Big Saving days Sale </h2>
                  <h1 className="text-4xl font-bold text-gray-800">{slide.title}</h1>
                  <p className="mt-1 text-lg text-gray-600">{slide.subtitle}</p>
                </div>

                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">{slide.description}</h3>
                  <p className="text-sm text-gray-600">Only this week. Don't miss...</p>
                  <p className="mt-4 text-2xl font-bold text-gray-800">{slide.price}</p>
                </div>

                <button className="flex items-center px-6 py-3 text-white transition-colors bg-rose-600 rounded-full w-fit hover:bg-rose-700">
                  Shop Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Image content */}
              <div className="relative flex items-center justify-center md:w-1/2">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={`Alpro ${slide.title} product`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md z-20 hover:bg-gray-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md z-20 hover:bg-gray-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-rose-600 w-4" : "bg-gray-300"
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner