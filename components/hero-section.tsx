"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"

const ScratchVector = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg
    className={className}
    width="233"
    height="369"
    viewBox="0 0 233 369"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    <path
      d="M232.451 128.28L160.726 45.7509L226.548 199.052L81.6217 32.1498L232.451 295.182L20.2273 45.7509L196.589 367.106L203.82 51.5141L160.726 367.106L173.861 0.106445L104.349 319.157L136.522 60.7352L0.451176 241.238L104.349 24.0813L32.6242 97.3891"
      stroke="#808080"
    />
  </svg>
)

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const fullText = "Turning Ideas Into Real Web Products"
  const [isTyping, setIsTyping] = useState(true)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    if (isTyping) {
      if (cursorPosition < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, cursorPosition + 1))
          setCursorPosition(cursorPosition + 1)
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        // Pause at end, then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (cursorPosition > 0) {
        const timeout = setTimeout(() => {
          setCursorPosition(cursorPosition - 1)
          setDisplayText(fullText.slice(0, cursorPosition - 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        // Pause at start, then start typing again
        const timeout = setTimeout(() => {
          setIsTyping(true)
        }, 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [cursorPosition, isTyping, fullText])

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden pt-20 mb-24 lg:mb-32"
    >
      <Header />
      {/* Typewriter text - positioned below header, top left */}
      <div className="absolute top-10 left-4 sm:left-8 lg:left-16 z-10">
        <p className="text-white text-xs sm:text-sm lg:text-base font-sans whitespace-nowrap">
          <span>{displayText}</span>
          <span className="inline-block w-[2px] h-[1em] bg-white ml-[1px] animate-pulse align-middle" />
        </p>
      </div>
      
      {/* Main content - PORTFOLIO text centered and large */}
      <div className="relative z-10 text-center w-full px-4">
        {/* PORTFOLIO SVG - with hidden P1/P2 behind (revealed on hover) */}
        <div className="relative w-full max-w-6xl h-auto mx-auto py-4 sm:py-6 lg:py-10 group">
          {/* P1 (pink/coral) behind - hidden until hover */}
          <img
            src="/P1.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-auto opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-9"
          />
          {/* P2 (blue) behind - hidden until hover */}
          <img
            src="/P2.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-auto opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-8"
          />
          {/* Main svg */}
          <img
            src="/PORTFOLIO.svg"
            alt="Portfolio"
            className="relative w-full h-auto"
          />
        </div>

        {/* Black rectangle with subtitle - full page width, translated up */}
        <div className="relative -mt-2 sm:-mt-4 lg:-mt-6 -translate-y-4 sm:-translate-y-6 lg:-translate-y-56">
          <div className="w-screen bg-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              <span className="font-cursive text-white">Web</span>
              <span className="font-cursive text-coral">Designer</span>
              <span className="font-cursive text-white">and</span>
              <span className="font-cursive text-electric-blue">Developer</span>
            </div>
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 lg:mt-10">
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 border-2 border-electric-blue text-white rounded-full font-sans text-sm sm:text-base lg:text-lg hover:bg-electric-blue hover:cursor-pointer transition-colors min-w-[160px] sm:min-w-[180px]"
          >
            Let's Collab
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("services")}
            className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-coral text-white rounded-full font-sans text-sm sm:text-base lg:text-lg border-2 border-coral hover:cursor-pointer hover:bg-coral/0 transition-colors min-w-[160px] sm:min-w-[180px]"
          >
            What I Offer
          </button>
        </div>
      </div>
    </section>
  )
}
