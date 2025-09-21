"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function MainSidebar({ open, setOpen }) {

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50">
        <a href="/" className="font-thin tracking-wider whitespace-nowrap studio-title text-black" style={{fontWeight: '100', fontSize: '16px'}}>STUDIO GRAVITAS</a>
        <button 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-gray-50/50 rounded-md transition-colors z-50 text-black"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-16 left-0 right-0 z-40 transform ${
          open ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <nav className="p-6 space-y-3">
          <a href="/architecture" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>Architecture</a>
          <a href="/arts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>Arts</a>
          <a href="/objects" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>Objects</a>
          <a href="/thoughts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>Thoughts</a>
          <div className="mt-4 space-y-3">
            <a href="/about" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>About</a>
            <a href="/contact" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
        <div className="pt-8 pb-3 pl-6 pointer-events-auto">
          <a href="/" className="text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontSize: '1.875rem', fontWeight: '100', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.025em'}}>STUDIO GRAVITAS</a>
        </div>
        
        <nav className="overflow-hidden pointer-events-auto">
          <a href="/architecture" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
          <a href="/arts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Arts</a>
          <a href="/objects" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
          <a href="/thoughts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
          <div className="mt-4 space-y-0">
            <a href="/about" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About</a>
            <a href="/contact" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
          </div>
        </nav>
      </aside>


    </>
  );
}

export default function MainPage() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Get the first project or use House of Balance as default
  const mainProject = projects.find(p => p.title.toLowerCase().includes('house of balance')) || projects[0];

  return (
    <div className="min-h-screen bg-white relative pt-16 lg:pt-0">
      <MainSidebar open={open} setOpen={setOpen} />
      <div className={`w-5/6 h-72 lg:w-full lg:h-screen mx-auto transition-all duration-300 ease-in-out lg:transition-none ${
        open ? 'mt-[280px] lg:mt-0' : 'mt-24 lg:mt-0'
      }`}>
        {mainProject ? (
          <a 
            href={`/projects/${mainProject.category}/${mainProject.subcategory}/${mainProject.slug}`}
            className="block w-full h-full cursor-pointer"
          >
            <img
              src={mainProject.coverImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
              alt={mainProject.title}
              className="w-full h-full object-cover"
            />
          </a>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}