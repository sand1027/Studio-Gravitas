"use client";

import { useState, useEffect } from "react";

function ObjectsSidebar() {
  return (
    <aside className="w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <h1 className="text-3xl font-normal tracking-wide text-white studio-title whitespace-nowrap">STUDIO GRAVITAS</h1>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/architecture" className="block py-0.5 pl-6 text-xs font-normal transition-colors text-white opacity-100 no-underline mb-3">Architecture</a>
        <div className="space-y-0">
          <a href="/about" className="block py-0.5 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About us</a>
          <a href="/contact" className="block py-0.5 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
        </div>
      </nav>
    </aside>
  );
}

export default function ObjectsPage() {
  const [objectProjects, setObjectProjects] = useState([]);

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
    <div className="min-h-screen bg-white relative">
      <ObjectsSidebar />
      <div className="w-full">
        {objectProjects.length > 0 ? (
          objectProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((object) => (
            <div key={object.id} className="w-full h-screen">
              <img
                src={object.coverImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                alt={object.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Objects Demo 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Objects Demo 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Objects Demo 3"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}