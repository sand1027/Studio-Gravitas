"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

function ObjectsSidebar({ menuOpen, setMenuOpen, containerRef }) {
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
          <a href="/objects" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 no-underline" onClick={() => setMenuOpen(false)}>Objects</a>
          <a href="/arts" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Arts</a>
          <div className="mt-2 space-y-1">
            <a href="/about" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" className="block py-0.5 text-sm font-normal transition-colors text-gray-800 hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
        <div className="pt-8 pb-3 pl-6 pointer-events-auto">
          <a href="/" className="block text-4xl studio-title text-gray-800">
            Studio Gravitas
          </a>
        </div>
        
        <nav className="overflow-hidden pointer-events-auto">
          <a href="/architecture" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-60 hover:opacity-100 no-underline">Architecture</a>
          <a href="/thoughts" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-60 hover:opacity-100 no-underline">Thoughts</a>
          <a href="/objects" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-100 no-underline">Objects</a>
          <a href="/arts" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-60 hover:opacity-100 no-underline">Arts</a>
          <div className="mt-4 space-y-0">
            <a href="/about" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-60 hover:opacity-100 no-underline">About</a>
            <a href="/contact" className="block py-0 pl-6 text-sm font-normal transition-colors text-gray-800 opacity-60 hover:opacity-100 no-underline">Contact</a>
          </div>
        </nav>
      </aside>


    </>
  );
}

export default function ObjectsPage() {
  const [objectProjects, setObjectProjects] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const objectItems = data.projects?.filter(p => p.category?.toLowerCase() === 'objects') || [];
        setObjectProjects(objectItems);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    fetchObjects();
  }, []);

  return (
    <div className="min-h-screen bg-white relative pt-16 lg:pt-0">
      <ObjectsSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} containerRef={containerRef} />
      <div 
        ref={containerRef}
        className={`w-full h-screen overflow-y-auto snap-y snap-mandatory transition-all duration-300 ease-in-out lg:transform-none flex items-center justify-center ${
        menuOpen ? 'mt-[275px] lg:mt-0' : 'mt-0'
      }`}>
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-light text-gray-600">In Works</h1>
        </div>
      </div>
    </div>
  );
}