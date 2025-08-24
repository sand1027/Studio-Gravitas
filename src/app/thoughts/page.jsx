"use client";

import { useState, useEffect } from "react";

function ThoughtsSidebar() {
  return (
    <aside className="w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <a href="/" className="text-4xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/architecture" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
        <a href="/arts" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Arts</a>
        <a href="/objects" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
        <a href="/thoughts" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-100 no-underline">Thoughts</a>
        <div className="mt-4 space-y-0">
          <a href="/about" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About</a>
          <a href="/contact" className="block py-0 pl-6 text-base font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
        </div>
      </nav>
    </aside>
  );
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const thoughtProjects = data.projects?.filter(p => p.category?.toLowerCase() === 'thoughts') || [];
        setThoughts(thoughtProjects);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };

    fetchThoughts();
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      <ThoughtsSidebar />
      <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
        {thoughts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((thought) => (
          <div key={thought.id} className="w-full h-screen snap-start relative">
            <img
              src={thought.coverImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
              alt={thought.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}