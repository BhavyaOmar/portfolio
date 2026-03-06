"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

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

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const fullText = "Turning Ideas Into Real Web Products"
  const [isTyping, setIsTyping] = useState(true)

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 lg:p-8 z-30 w-full">
        <h1 className="font-impact  text-xl sm:text-2xl lg:text-3xl text-electric-blue tracking-wider">
          BHAVYA OMAR
        </h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-impact text-3xl sm:text-4xl lg:text-5xl text-white hover:text-coral transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Decorative scratches - Left - positioned at center */}
      <div className="absolute left-2 sm:left-6 lg:left-12 xl:left-20 top-1/2 -translate-y-1/2 opacity-60 z-0">
        <ScratchVector className="w-24 sm:w-32 md:w-40 lg:w-52 xl:w-60 h-auto" />
      </div>
      
      
      {/* Main content - PORTFOLIO text centered and large */}
      <div className="relative z-10 text-center w-full px-4">
        {/* Typewriter text - positioned top right */}
        <div className="absolute right-4 sm:right-8 lg:right-16 top-0 sm:-top-16 lg:-top-20">
          <p className="text-white text-xs sm:text-sm lg:text-base font-sans text-right whitespace-nowrap">
            <span>{displayText}</span>
            <span className="inline-block w-[2px] h-[1em] bg-white ml-[1px] animate-pulse align-middle" />
          </p>
        </div>

        {/* PORTFOLIO SVG - Large and centered, overlapping vectors */}
        <img
          src="/PORTFOLIO.svg"
          alt="Portfolio"
          className="w-full max-w-4xl h-auto mx-auto"
        />

        {/* Black rectangle with subtitle - now overlapping the PORTFOLIO text */}
        <div className="relative inline-block -mt-2 sm:-mt-4 lg:-mt-6">
          <div className="bg-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              <span className="font-cursive text-white">Web</span>
              <span className="font-cursive text-coral">Designer</span>
              <span className="font-cursive text-white">and</span>
              <span className="font-cursive text-electric-blue">Developer</span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-14 lg:mt-20">
          <a
            href="#about"
            className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 border-2 border-electric-blue text-white rounded-full font-sans text-sm sm:text-base lg:text-lg hover:bg-electric-blue transition-colors min-w-[160px] sm:min-w-[180px]"
          >
            WHOamI
          </a>
          <a
            href="#services"
            className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-coral text-white rounded-full font-sans text-sm sm:text-base lg:text-lg border-2 border-coral hover:bg-coral/0 transition-colors min-w-[160px] sm:min-w-[180px]"
          >
            whatIdo
          </a>
        </div>
      </div>

      {/* Decorative bottom scratches */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 lg:right-16 opacity-60 z-0 hidden sm:block">
        <ScratchVector className="w-20 sm:w-28 lg:w-36 h-auto" flip />
      </div>
    </section>
  )
}
