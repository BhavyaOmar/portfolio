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

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side - Image with decorative circles */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* Large decorative circles - positioned outside the profile */}
            <div 
              className="absolute -left-8 sm:-left-12 lg:-left-16 top-0 sm:top-4 w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 rounded-full animate-float-1 z-30"
              style={{ backgroundColor: currentColor }}
            />
            <div 
              className="absolute left-12 sm:left-16 lg:left-20 -top-6 sm:-top-8 lg:-top-10 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full animate-float-2 z-30"
              style={{ backgroundColor: currentColor }}
            />
            
            {/* Medium circles - positioned at various angles */}
            <div 
              className="absolute -left-4 sm:-left-6 lg:-left-8 bottom-20 sm:bottom-28 lg:bottom-32 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 rounded-full animate-float-3 z-30"
              style={{ backgroundColor: currentColor }}
            />
            <div 
              className="absolute left-16 sm:left-24 lg:left-28 bottom-2 sm:bottom-4 lg:bottom-6 w-14 sm:w-18 lg:w-20 h-14 sm:h-18 lg:h-20 rounded-full animate-float-1 z-30"
              style={{ backgroundColor: currentColor }}
            />
            
            {/* Small decorative circles */}
            <div 
              className="absolute left-20 sm:left-28 lg:left-36 top-2 sm:top-4 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-full animate-float-2 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.8 }}
            />
            <div 
              className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/3 w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 rounded-full animate-float-3 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.7 }}
            />
            <div 
              className="absolute left-4 sm:left-6 lg:left-8 bottom-8 sm:bottom-10 lg:bottom-12 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 rounded-full animate-float-1 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.9 }}
            />
            
            {/* Extra tiny circles for depth */}
            <div 
              className="absolute left-28 sm:left-36 lg:left-44 top-12 sm:top-16 w-3 sm:w-4 h-3 sm:h-4 rounded-full animate-float-2 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.6 }}
            />
            <div 
              className="absolute -left-6 sm:-left-10 bottom-36 sm:bottom-44 lg:bottom-52 w-3 sm:w-4 h-3 sm:h-4 rounded-full animate-float-3 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.5 }}
            />
            <div 
              className="absolute left-24 sm:left-32 lg:left-40 bottom-16 sm:bottom-20 lg:bottom-24 w-4 sm:w-5 h-4 sm:h-5 rounded-full animate-float-1 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.7 }}
            />
            <div 
              className="absolute left-6 sm:left-10 top-8 sm:top-12 w-2 sm:w-3 h-2 sm:h-3 rounded-full animate-float-2 z-30"
              style={{ backgroundColor: currentColor, opacity: 0.5 }}
            />

            {/* Profile image container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 z-10">
              {/* Coral ring */}
              <div className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 border-coral" />
              {/* Blue partial ring */}
              <div
                className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 border-electric-blue"
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                }}
              />
              {/* White circle background */}
              <div className="absolute inset-2 sm:inset-3 lg:inset-4 rounded-full bg-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
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
              <h2 className="font-impact text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-none">
                ABOUT
              </h2>
              <span 
                className="font-cursive text-3xl sm:text-4xl lg:text-5xl xl:text-6xl -mt-2 sm:-mt-4 inline-block transition-colors duration-300"
                style={{ color: currentColor }}
              >
                Me
              </span>
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
