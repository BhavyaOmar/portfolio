"use client"

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left - BHAVYA OMAR */}
        <div className="font-impact text-xl sm:text-2xl lg:text-3xl text-coral tracking-wider">
          BHAVYA OMAR
        </div>

    
        {/* Right - Social Icons */}
        </div>
    </header>
  )
}

