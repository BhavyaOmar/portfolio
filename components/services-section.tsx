"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Service {
  title: string
  description: string
  skills: string
  color: "coral" | "blue"
}

const services: Service[] = [
  {
    title: "Frontend Developer",
    description:
      "I develop fast, responsive, and user-friendly interfaces with a focus on clarity, smooth navigation, and engaging experiences.",
    skills:
      "React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, Material UI, Prime React, Bootstrap, GSAP, HTML, Vanilla CSS",
    color: "coral",
  },
  {
    title: "Backend Developer",
    description:
      "I develop structured server-side systems, APIs, and integrations that support scalable web applications.",
    skills: "PHP, MySQL, LLM Integration, REST API Integration",
    color: "blue",
  },
  {
    title: "MVP & SaaS Developer",
    description:
      "I could turn your product ideas into functional web applications, helping founders quickly test and launch their concepts.",
    skills:
      "React.js, Next.js, Tailwind CSS, PHP, MySQL, LLM Integration, REST API Integration",
    color: "coral",
  },
  {
    title: "AI-Assisted Development",
    description:
      "I use modern AI tools to accelerate designing and development while maintaining code quality and system clarity.",
    skills:
      "Grok, ChatGPT, Github Copilot, Cursor AI, Gemini, V0, Claude, Stich Beta",
    color: "blue",
  },
]

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("right")
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1))
      setSlideDirection(null)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("left")
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1))
      setSlideDirection(null)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  const currentService = services[currentIndex]

  return (
    <section
      id="services"
      className="relative min-h-screen bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      {/* Title */}
      <h2 className="font-impact text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight text-center mb-8 sm:mb-12 lg:mb-16">
        SERVICES
      </h2>

      {/* Service Card Container */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center gap-4 sm:gap-6 lg:gap-8">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 border-2 border-white rounded-lg flex items-center justify-center hover:-translate-y-1.5 hover:scale-110 transition duration-300"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
        </button>

        {/* Service Card - Border stays fixed, only content animates */}
        <div className="relative flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border-2 border-dashed border-white/70 min-h-[360px] sm:min-h-[420px]">
          <div 
            ref={contentRef}
            className={`relative p-6 sm:p-8 lg:p-12 transition-all duration-300 ease-out ${
              slideDirection === "left" 
                ? "opacity-0 -translate-x-8" 
                : slideDirection === "right" 
                ? "opacity-0 translate-x-8" 
                : "opacity-100 translate-x-0"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              {/* Left content */}
              <div className="lg:w-1/2">
                <h3 className="font-impact text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 italic">
                  {currentService.title}
                </h3>
                <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                  {currentService.description}
                </p>
              </div>

              {/* Right content - Skills box with cropped corner */}
              <div className="lg:w-1/2 flex items-center justify-center">
                <div
                  className={`relative w-full max-w-sm aspect-[4/3] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
                    currentService.color === "coral" ? "bg-coral" : "bg-electric-blue"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                  }}
                >
                  <p className="text-white text-center text-sm sm:text-base lg:text-lg font-semibold leading-relaxed">
                    {currentService.skills}
                  </p>
                  {/* Shadow/3D effect */}
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 bg-black"
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 border-2 border-white rounded-lg flex items-center justify-center hover:-translate-y-1.5 hover:scale-110 transition duration-300"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6 sm:mt-8">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentIndex) {
                setIsAnimating(true)
                setSlideDirection(index > currentIndex ? "left" : "right")
                setTimeout(() => {
                  setCurrentIndex(index)
                  setSlideDirection(null)
                  setTimeout(() => setIsAnimating(false), 50)
                }, 300)
              }
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-coral" : "bg-white/30"
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
