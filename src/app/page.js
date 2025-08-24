"use client";

import { useState, useEffect } from "react";

function MainSidebar() {
  return (
    <aside className="w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <a href="/" className="text-4xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/architecture" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
        <a href="/arts" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Arts</a>
        <a href="/objects" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
        <a href="/thoughts" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
        <div className="mt-6 space-y-0">
          <a href="/about" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About</a>
          <a href="/contact" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
        </div>
      </nav>
    </aside>
  );
}

export default function MainPage() {
  const [projects, setProjects] = useState([]);
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
    <div className="min-h-screen bg-black relative">
      <MainSidebar />
      <div className="w-full h-screen">
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