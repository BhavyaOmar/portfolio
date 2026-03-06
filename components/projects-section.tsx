"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

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

interface Project {
  title: string
  description: string
  image: string
  github?: string
  website?: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: "Charity Trust Website",
    description:
      "A minimal PHP website built with a dedicated admin panel for manually editing and adding contents like works, blogs, photos, videos, YT videos etc.",
      image: "/1.png",
      website: "http://sonalcharitabletrust.in/#",
      technologies: ["PHP", "MySQL", "Vanilla CSS"],
  },
  {
    title: "foodie-eyes",
    description:
      "An intelligent decision-support system designed leveraging Generative AI, Natural Language Understanding and Google Maps data to streamline the dining discovery process; Provides features like bookmarks and manual strict dietary filters.",
    image: "/2.png",
    github: "https://github.com/BhavyaOmar/foodie-eyes",
    website: "https://foodie-eyes.vercel.app/",
    technologies: ["Next.js", "Typescript", "Firebase", "REST API", "TailwindCSS"],
  },
  {
    title: "Artwork Table",
    description:
      "React + TypeScript application that fetches artwork data from the Art Institute of Chicago API, renders it in a PrimeReact DataTable with server-side pagination, and supports persistent row selection across pages without preloading data.",
    image: "/3.png",
    github: "https://github.com/BhavyaOmar/react_assignment",
    website: "https://bhavya-react-assignment-001.netlify.app/",
    technologies: ["React.js", "TypeScript", "PrimeReact", "API Integration"],
  },
  {
    title: "Student Management System",
    description:
      "A simple and minimal application using PHP and MySQL, implementing CRUD functionality with modular code structure",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    github: "https://github.com/BhavyaOmar/Student_Details",
    technologies: ["PHP", "MySQL", "HTML", "CSS"],
  },
  {
    title: "Telegram Channel CTA Website",
    description:
      "A lightweight CTA landing page focused on converting visitors into Telegram channel members through a clear, minimal user interface.",
      image: "/4.png",
      website: "https://techalumni.netlify.app/",
      technologies: ["HTML", "Vanilla CSS"],
  },
]

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("right")
    setTimeout(() => {
      setCurrentIndex((prev: number) => (prev === 0 ? projects.length - 1 : prev - 1))
      setSlideDirection(null)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection("left")
    setTimeout(() => {
      setCurrentIndex((prev: number) => (prev === projects.length - 1 ? 0 : prev + 1))
      setSlideDirection(null)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  const currentProject = projects[currentIndex]

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        
      </div>

      {/* Decorative scratches */}
      <div className="absolute left-0 top-1/4 opacity-60 hidden md:block">
        <ScratchVector className="w-20 lg:w-32 h-auto" />
      </div>
      <div className="absolute right-0 bottom-1/4 opacity-60 hidden md:block">
        <ScratchVector className="w-20 lg:w-32 h-auto" flip />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-impact text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-none">
            PROJECTS
          </h2>
          <span className="font-cursive text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-coral -mt-2 sm:-mt-4 inline-block">
            Showcase
          </span>
        </div>

        {/* Project Card Container */}
        <div className="relative flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-coral flex items-center justify-center hover:-translate-y-1.5 hover:scale-110 transition duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-coral" />
          </button>

          {/* Project Card - Border stays fixed, content animates */}
          <div className="flex-1 border-2 border-coral rounded-lg overflow-hidden bg-white/5 backdrop-blur-2xl">
            <div 
              className={`p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-out ${
                slideDirection === "left" 
                  ? "opacity-0 -translate-x-8" 
                  : slideDirection === "right" 
                  ? "opacity-0 translate-x-8" 
                  : "opacity-100 translate-x-0"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Project images */}
                <div className="lg:w-1/2 relative">
                  <div className="relative">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-48 sm:h-56 lg:h-72 object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Project details */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h3 className="font-impact text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4 italic">
                    {currentProject.title}
                  </h3>
                  <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                    {currentProject.description}
                  </p>

                  {/* Links */}
                  {(currentProject.github || currentProject.website) && (
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {currentProject.github && (
                        <a
                          href={currentProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 border border-white text-white rounded-md text-sm sm:text-base hover:bg-white/10 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Github</span>
                        </a>
                      )}
                      {currentProject.website && (
                        <a
                          href={currentProject.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 border border-white text-white rounded-md text-sm sm:text-base hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {currentProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 bg-coral text-white rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-coral flex items-center justify-center hover:-translate-y-1.5 hover:scale-110 transition duration-300"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-coral" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {projects.map((_, index) => (
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
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
