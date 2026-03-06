"use client"

import React, { useEffect, useState } from "react"
import { Github, Linkedin } from "lucide-react"

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showBurger, setShowBurger] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (!isOpen) {
        setShowBurger(lastScrollY > currentScrollY || currentScrollY < 10)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  const scrollToSection = (id) => {
    const targetId = id === "home" ? "home" : id
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed z-40 inset-y-0 right-0 w-full md:w-1/2 bg-black text-white/80 px-10 py-28 uppercase flex flex-col justify-between gap-y-10 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col text-3xl gap-y-3 md:text-4xl lg:text-6xl">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left transition-all duration-300 cursor-pointer hover:text-white tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-row items-start justify-between gap-6 md:gap-8 text-sm md:text-base">
          <div className="font-light">
            <p className="tracking-wider text-white/60">Resume</p>
            <a
              href="https://drive.google.com/file/d/1n3Bujec0YJdu7Yafxj9stb6bSiMb2PMM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg tracking-widest hover:text-white transition-colors duration-200"
            >
              View
            </a>
          </div>

          <div>
            <p className="tracking-wider text-white/60">Socials</p>
            <div className="flex items-center gap-4 md:gap-6">
              <a
                href="https://github.com/BhavyaOmar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label="GitHub profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/bhavya-omar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed z-50 flex flex-col items-center justify-center gap-1 rounded-full w-14 h-14 md:w-16 md:h-16 top-4 right-6 md:right-10 transition-all duration-300 ${
          isOpen ? "bg-black" : "bg-white"
        }`}
        style={
          showBurger
            ? { clipPath: "circle(50.3% at 50% 50%)", mixBlendMode: isOpen ? "normal" : "difference" }
            : { clipPath: "circle(0% at 50% 50%)", mixBlendMode: isOpen ? "normal" : "difference" }
        }
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-8 h-0.5 rounded-full transition-transform duration-300 origin-center ${
            isOpen ? "bg-white translate-y-1.5 rotate-45" : "bg-black"
          }`}
        />
        <span
          className={`block w-8 h-0.5 rounded-full transition-transform duration-300 origin-center ${
            isOpen ? "bg-white -translate-y-1.5 -rotate-45" : "bg-black"
          }`}
        />
      </button>
    </>
  )
}

export default Navbar