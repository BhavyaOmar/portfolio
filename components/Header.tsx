"use client"

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="absolute top-0 left-0 right-0 w-full z-30 bg-black/80 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-start">
        {/* Left - BHAVYA OMAR */}
        <div className="font-impact text-xl sm:text-2xl lg:text-3xl text-coral tracking-wider">
          BHAVYA OMAR
        </div>
      </div>
    </header>
  )
}

