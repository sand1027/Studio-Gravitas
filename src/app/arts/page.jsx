"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

function ArtsSidebar({ menuOpen, setMenuOpen, containerRef }) {
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
        <a href="/" className="font-thin tracking-wider whitespace-nowrap studio-title text-black" style={{fontWeight: '100', fontSize: '16px'}}>STUDIO GRAVITAS</a>
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
        <nav className="p-6 space-y-3">
          <a href="/architecture" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="/arts" className="block py-1 text-sm font-normal transition-colors text-black no-underline" onClick={() => setMenuOpen(false)}>Arts</a>
          <a href="/objects" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Objects</a>
          <a href="/thoughts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Thoughts</a>
          <div className="mt-4 space-y-3">
            <a href="/about" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
        <div className="pt-8 pb-3 pl-6 pointer-events-auto">
          <a href="/" className="text-3xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
        </div>
        
        <nav className="overflow-hidden pointer-events-auto">
          <a href="/architecture" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
          <a href="/arts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-100 no-underline">Arts</a>
          <a href="/objects" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
          <a href="/thoughts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
          <div className="mt-6 space-y-0">
            <a href="/about" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About</a>
            <a href="/contact" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
          </div>
        </nav>
      </aside>


    </>
  );
}

export default function ArtsPage() {
  const [arts, setArts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const artProjects = data.projects?.filter(p => p.category?.toLowerCase() === 'art' || p.category?.toLowerCase() === 'arts') || [];
        setArts(artProjects);
      } catch (error) {
        console.error('Error fetching arts:', error);
      }
    };

    fetchArts();
  }, []);

  return (
    <div className="min-h-screen bg-white lg:bg-black relative pt-16 lg:pt-0">
      <ArtsSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} containerRef={containerRef} />
      <div 
        ref={containerRef}
        className={`w-full h-screen overflow-y-auto snap-y snap-mandatory transition-all duration-300 ease-in-out lg:transform-none ${
        menuOpen ? 'mt-[275px] lg:mt-0' : 'mt-0'
      }`}>
        {arts.length > 0 ? (
          arts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((art) => (
            <div key={art.id} className="w-full h-auto lg:h-screen snap-start relative mb-6 lg:mb-0">
              <img
                src={art.coverImage || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                alt={art.title}
                className="w-[95%] mx-auto lg:w-full h-auto lg:h-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-auto lg:h-screen snap-start relative mb-6 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Arts Demo 1"
                className="w-[95%] mx-auto lg:w-full h-auto lg:h-full object-cover"
              />
            </div>
            <div className="w-full h-auto lg:h-screen snap-start relative mb-6 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Arts Demo 2"
                className="w-[95%] mx-auto lg:w-full h-auto lg:h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}