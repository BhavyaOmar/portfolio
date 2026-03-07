"use client"

import { useEffect, useState, useRef } from "react"

export default function AboutSection() {
  const [colorProgress, setColorProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the section is visible
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Progress from 0 to 1 as we scroll through the section
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
      setColorProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Interpolate between blue (#0066FF) and coral (#F26B8A)
  const interpolateColor = (progress: number) => {
    const blueR = 0, blueG = 102, blueB = 255
    const coralR = 242, coralG = 107, coralB = 138
    
    const r = Math.round(blueR + (coralR - blueR) * progress)
    const g = Math.round(blueG + (coralG - blueG) * progress)
    const b = Math.round(blueB + (coralB - blueB) * progress)
    
    return `rgb(${r}, ${g}, ${b})`
  }

  const currentColor = interpolateColor(colorProgress)

  // Glitch animation for profile image source (no rotation on the image itself)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGlitch(true)
      window.setTimeout(() => setGlitch(false), 250)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

 
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
 
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side - Image centered in the left half */}
          <div className="relative w-full lg:w-1/2 flex justify-center group">
            {/* Profile image container (no rotation on the image itself) */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 z-10">
              {/* Coral ring - full ring that rotates on hover */}
              <div className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 border-coral ring-outer" />
              {/* Blue partial ring - clipped half ring that counter-rotates on hover */}
              <div
                className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 border-electric-blue ring-inner"
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                }}
              />
              {/* White circle background */}
              <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-full bg-white overflow-hidden">
                <img
                  src={glitch ? "/G2.jpg" : "/G1.jpeg"}
                  alt="Bhavya Omar - Web Designer and Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tight leading-none inline-block">
                ABOUT
                <span className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-coral inline-block -ml-8 align-baseline">
                  Me
                </span>
              </h2>
            </div>

            {/* Bio text */}
            <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed">
              I'm a web{" "}
              <span className="bg-coral px-1">designer</span> and{" "}
              <span className="bg-coral px-1">developer</span>{" "}
              who enjoys building clean, fast, and user-focused web applications. I focus on turning ideas into functional products, especially{" "}
              <span className="underline decoration-coral underline-offset-4">MVPs and modern SaaS platforms</span>. I'm interested in working with{" "}
              <span className="bg-coral px-1">founders and teams</span>{" "}
              who want to build practical, well-designed{" "}
              <span className="underline decoration-coral underline-offset-4">digital products</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
