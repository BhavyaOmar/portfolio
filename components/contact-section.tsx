"use client"

import { useState, useEffect, useRef } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Calculate diverging offsets for the colored circles based on mouse position
  const calculateDiverge = (baseX: number, baseY: number, strength: number = 50) => {
    if (!isHovering) return { x: 0, y: 0 }
    
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400
    
    // Direction from base position toward the mouse (so circles feel "sticky" to the cursor)
    const dirX = mousePosition.x - baseX
    const dirY = mousePosition.y - baseY
    
    // Distance from mouse
    const distance = Math.sqrt(dirX * dirX + dirY * dirY)
    
    // Only diverge if mouse is close enough
    if (distance > 350) return { x: 0, y: 0 }
    
    // Normalize and scale by proximity
    const factor = ((350 - distance) / 350) * strength
    const normalizedX = distance > 0 ? (dirX / distance) * factor : 0
    const normalizedY = distance > 0 ? (dirY / distance) * factor : 0
    
    return { x: normalizedX, y: normalizedY }
  }

  const pinkOffset = calculateDiverge(200, 150, 80)
  const blueOffset = calculateDiverge(800, 650, 80)

  const [result, setResult] = useState("");

  const onSubmit = async (event:any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "521c5615-a858-4202-8178-1170761df5f8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Thank you for reaching out. Your message has been successfully submitted. Please allow 24–48 hours for a response.");
      event.target.reset();
      // Reset form state
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setResult("Error");
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Main white circle - softly follows the mouse */}
        <div
          className="absolute w-[296px] h-[296px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[590px] lg:h-[590px] rounded-full bg-white/90 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${(mousePosition.x - 300) * 0.03}px, ${(mousePosition.y - 300) * 0.03}px)`,
          }}
        />
        
        {/* Pink glow circle - attracted to mouse */}
        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full bg-coral/60 blur-3xl transition-transform duration-300 ease-out animate-float-pink"
          style={{ 
            top: "10%", 
            left: "20%",
            transform: `translate(${pinkOffset.x}px, ${pinkOffset.y}px)`
          }}
        />
        
        {/* Blue glow circle - attracted to mouse */}
        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full bg-electric-blue/60 blur-3xl transition-transform duration-300 ease-out animate-float-blue"
          style={{ 
            bottom: "10%", 
            right: "20%",
            transform: `translate(${blueOffset.x}px, ${blueOffset.y}px)`
          }}
        />

        {/* Additional smaller glow orbs that react to mouse */}
        <div
          className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full bg-coral/40 blur-2xl transition-transform duration-200 ease-out"
          style={{ 
            top: "30%", 
            right: "30%",
            transform: `translate(${calculateDiverge(600, 300, 60).x}px, ${calculateDiverge(600, 300, 60).y}px)`
          }}
        />
        <div
          className="absolute w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] rounded-full bg-electric-blue/40 blur-2xl transition-transform duration-200 ease-out"
          style={{ 
            bottom: "30%", 
            left: "30%",
            transform: `translate(${calculateDiverge(300, 500, 60).x}px, ${calculateDiverge(300, 500, 60).y}px)`
          }}
        />
        {/* Extra vivid blurry circles for depth */}
        <div
          className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full bg-coral/35 blur-3xl transition-transform duration-200 ease-out"
          style={{ 
            top: "15%", 
            right: "10%",
            transform: `translate(${calculateDiverge(700, 220, 70).x}px, ${calculateDiverge(700, 220, 70).y}px)`
          }}
        />
        <div
          className="absolute w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-electric-blue/35 blur-3xl transition-transform duration-200 ease-out"
          style={{ 
            bottom: "12%", 
            left: "12%",
            transform: `translate(${calculateDiverge(260, 540, 70).x}px, ${calculateDiverge(260, 540, 70).y}px)`
          }}
        />
      </div>

      {/* Contact form */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="border border-white/50 bg-black/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 lg:p-12">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="inline-block py-10">
              <span className="font-cursive text-3xl sm:text-4xl lg:text-5xl text-white italic">
                {"Let's "}
              </span>
              <span className="font-cursive text-3xl sm:text-4xl lg:text-5xl text-electric-blue italic">
                Collab !
              </span>
            </h2>
            <p className="text-blue-200">{result}</p>
          </div>
          

          <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-sm sm:text-base mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full bg-black border border-white rounded-md px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-electric-blue transition-colors"
                  required
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm sm:text-base mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full bg-black border border-white rounded-md px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-electric-blue transition-colors"
                  required
                />
              </div>
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-white text-sm sm:text-base mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                placeholder="Share a bit about your project, idea, or question..."
                className="w-full bg-black border border-white rounded-md px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-electric-blue transition-colors resize-none"
                required
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-10 sm:px-16 py-3 sm:py-4 bg-coral text-white rounded-full text-base sm:text-lg font-medium hover:bg-coral/90 transition-colors"
              >
                Send !
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
