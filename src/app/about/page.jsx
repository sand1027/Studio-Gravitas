"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

function AboutSidebar({ menuOpen, setMenuOpen, containerRef }) {
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [menuOpen, setMenuOpen, containerRef]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50">
        <a href="/" className="block text-3xl studio-title text-gray-800">
          Studio Gravitas
        </a>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-gray-50/50 rounded-md transition-colors z-50 text-black"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-16 left-0 right-0 z-40 transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <nav className="p-6 space-y-1">
          <a href="/architecture" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="/thoughts" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Thoughts</a>
          <a href="/objects" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Objects</a>
          <a href="/arts" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Arts</a>
          <div className="mt-2 space-y-1">
            <a href="/about" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 no-underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
        <div className="pt-8 pb-3 pl-6 pointer-events-auto">
          <a href="/" className="block text-4xl studio-title text-gray-300">
            Studio Gravitas
          </a>
        </div>
        
        <nav className="overflow-hidden pointer-events-auto">
          <a href="/architecture" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-60 hover:opacity-100 no-underline">Architecture</a>
          <a href="/thoughts" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-60 hover:opacity-100 no-underline">Thoughts</a>
          <a href="/objects" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-60 hover:opacity-100 no-underline">Objects</a>
          <a href="/arts" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-60 hover:opacity-100 no-underline">Arts</a>
          <div className="mt-4 space-y-0">
            <a href="/about" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-100 no-underline">About</a>
            <a href="/contact" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-300 opacity-60 hover:opacity-100 no-underline">Contact</a>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-white relative pt-16 lg:pt-0">
      <AboutSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} containerRef={containerRef} />
      {/* Mobile Content Only */}
      <div className={`lg:hidden p-6 transition-all duration-300 ease-in-out ${
        menuOpen ? 'mt-[180px]' : 'mt-0'
      }`}>
        <div className="text-base font-light leading-relaxed space-y-4 text-gray-800">
          <p>
            Studio Gravitas was established in 2016, with their inaugural project The House of Memories in India. Gravitas represents a collective spirit, a process, and an investigation into architecture and design—driven by the past, present, and future. Gravitas aims to find new meaning and interpretation in their work through a philosophy rooted in phenomenology and timeless architecture.
          </p>
          <p>
            For Gravitas, it is a process rather than a product. It is the idea of making rather than building. It is about the atmosphere than mere aesthetics. As a practice, Gravitas firmly believes in the collaborative spirit and a holistic approach to design and a creative process driven by 'we' rather than 'I'.
          </p>
          <p>
            Beyond the program, client needs and contextual forces, every project is a journey—an investigation into design rooted in the spirit of a place, history and memory.
          </p>
          <p>
            At times, it is a typological exploration that seeks to redefine the idea of home and living and an opportunity to make a difference.
          </p>
          <p>
            Currently, Gravitas is involved in collaborative projects within India and abroad, partnering with design firms and clients who align with this ideology and philosophy.
          </p>
        </div>
      </div>

      {/* Desktop Image with Content */}
      <div 
        ref={containerRef}
        className="hidden lg:block w-full h-screen overflow-y-auto snap-y snap-mandatory">
        <div className="w-full h-screen snap-start relative">
          <img
            src="https://res.cloudinary.com/dsaud4cri/image/upload/v1758454445/About_rrytqo.jpg"
            alt="About Studio Gravitas"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-6 z-10 text-gray-300 max-w-lg">
            <div className="text-base font-light leading-relaxed space-y-3">
              <p>
                Studio Gravitas was established in 2016, with their inaugural project The House of Memories in India. Gravitas represents a collective spirit, a process, and an investigation into architecture and design—driven by the past, present, and future. Gravitas aims to find new meaning and interpretation in their work through a philosophy rooted in phenomenology and timeless architecture.
              </p>
              <p>
                For Gravitas, it is a process rather than a product. It is the idea of making rather than building. It is about the atmosphere than mere aesthetics. As a practice, Gravitas firmly believes in the collaborative spirit and a holistic approach to design and a creative process driven by 'we' rather than 'I'.
              </p>
              <p>
                Beyond the program, client needs and contextual forces, every project is a journey—an investigation into design rooted in the spirit of a place, history and memory.
              </p>
              <p>
                At times, it is a typological exploration that seeks to redefine the idea of home and living and an opportunity to make a difference.
              </p>
              <p>
                Currently, Gravitas is involved in collaborative projects within India and abroad, partnering with design firms and clients who align with this ideology and philosophy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
