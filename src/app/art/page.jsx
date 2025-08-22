"use client";

import { useState, useEffect } from "react";

function ArtSidebar() {
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

export default function ArtPage() {
  const [artProjects, setArtProjects] = useState([]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const artItems = data.projects?.filter(p => p.category?.toLowerCase() === 'art') || [];
        setArtProjects(artItems);
      } catch (error) {
        console.error('Error fetching art:', error);
      }
    };

    fetchArt();
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <ArtSidebar />
      <div className="w-full">
        {artProjects.length > 0 ? (
          artProjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((art) => (
            <div key={art.id} className="w-full h-screen">
              <img
                src={art.coverImage || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Art Demo 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Art Demo 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-screen">
              <img
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Art Demo 3"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}