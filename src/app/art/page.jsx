"use client";

import { useState, useEffect, useRef } from "react";

// Custom sidebar for art pages
function ArtSidebar() {
  return (
    <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <h1 className="text-base font-normal tracking-wide text-white">STUDIO GRAVITAS</h1>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/home" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Home</a>
        <a href="/architecture" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
        <a href="/art" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-100 no-underline">Art</a>
        <a href="/objects" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
        <a href="/thoughts" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
        <a href="/about" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About us</a>
        <a href="/contact" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
      </nav>
    </aside>
  );
}

export default function Art() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const artProjects = data.projects?.filter(p => p.category === 'art') || [];
        const allImages = artProjects.flatMap(project => 
          [project.coverImage, ...(project.galleryImages || [])]
        ).filter(Boolean);
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching art:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, []);

  // Scroll-based image navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const imageHeight = windowHeight;
      
      const newIndex = Math.floor(scrollTop / imageHeight);
      if (newIndex !== currentImageIndex && newIndex < images.length) {
        setCurrentImageIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentImageIndex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black">
        <ArtSidebar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-center">
            <h2 className="text-2xl font-light mb-4">No Art Available</h2>
            <p className="text-gray-400">Upload some art to see it here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <ArtSidebar />
      
      {/* Desktop View */}
      <div className="hidden lg:block w-full h-screen">
        <div 
          ref={containerRef}
          className="w-full h-screen overflow-y-auto snap-y snap-mandatory"
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-screen snap-start relative">
              <img
                src={img}
                alt={`Art ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white overflow-y-auto">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0">
          <div className="text-lg font-light tracking-wider">STUDIO GRAVITAS</div>
        </div>

        <div className="space-y-4 p-4">
          {images.map((img, idx) => (
            <div key={idx} className="w-full">
              <img
                src={img}
                alt={`Art ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}