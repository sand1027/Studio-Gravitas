"use client";

import { useState, useEffect } from "react";

function ArtsSidebar() {
  return (
    <aside className="w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <a href="/" className="text-4xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/architecture" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
        <a href="/arts" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-100 no-underline">Arts</a>
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

export default function ArtsPage() {
  const [arts, setArts] = useState([]);

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
    <div className="min-h-screen bg-black relative">
      <ArtsSidebar />
      <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
        {arts.length > 0 ? (
          arts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((art) => (
            <div key={art.id} className="w-full h-screen snap-start relative">
              <img
                src={art.coverImage || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-screen snap-start relative">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Arts Demo 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-screen snap-start relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Arts Demo 2"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}