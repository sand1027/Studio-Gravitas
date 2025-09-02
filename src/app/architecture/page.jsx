"use client";

import { useState, useEffect, useRef } from "react";
import { Info, X, ChevronLeft, ChevronRight, Menu } from "lucide-react";

function ArchitectureSidebar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50">
        <a href="/" className="text-base font-thin tracking-wider whitespace-nowrap studio-title text-black" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
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
          <a href="/architecture" className="block py-1 text-sm font-normal transition-colors text-black no-underline" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="/arts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Arts</a>
          <a href="/objects" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Objects</a>
          <a href="/thoughts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Thoughts</a>
          <div className="mt-4 space-y-3">
            <a href="/about" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>


    </>
  );
}
export default function Architecture() {
  const [projects, setProjects] = useState([]);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        // Show all projects (architecture, thoughts, arts, objects)
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const openFullscreen = (project) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setShowFullscreen(true);
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentProject) {
      const allImages = [currentProject.coverImage, ...(currentProject.galleryImages || [])].filter(Boolean);
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (currentProject) {
      const allImages = [currentProject.coverImage, ...(currentProject.galleryImages || [])].filter(Boolean);
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // Scroll-based image navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !currentProject) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const imageHeight = windowHeight;
      
      const newIndex = Math.floor(scrollTop / imageHeight);
      const allImages = [currentProject.coverImage, ...(currentProject.galleryImages || [])].filter(Boolean);
      if (newIndex !== currentImageIndex && newIndex < allImages.length) {
        setCurrentImageIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container && showFullscreen) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentImageIndex, currentProject, showFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showFullscreen) {
        switch (e.key) {
          case 'Escape':
            closeFullscreen();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreen, currentProject]);



  return (
    <>
      <ArchitectureSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={`min-h-screen bg-white p-4 lg:p-8 lg:ml-80 lg:pt-24 pt-16 transition-all duration-300 ease-in-out ${
        menuOpen ? 'mt-[220px] lg:mt-0' : 'mt-0'
      }`}>
        <div className="max-w-full mx-auto">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.category?.toLowerCase() === 'architecture').sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((project) => (
              <div
                key={project.id}
                className="bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
                onClick={() => {
                  window.location.href = `/projects/${project.category}/${project.subcategory}/${project.slug}`;
                }}
              >
                <div className="w-full h-48 lg:h-64 bg-gray-200">
                  <img
                    src={project.coverImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-light tracking-wide text-black uppercase">{project.title}</h3>
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-light">Loading architecture projects...</p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Project View */}
      {showFullscreen && currentProject && (
        <>
          {/* Desktop View */}
          <div className="hidden lg:block fixed inset-0 z-40">
            <div 
              ref={containerRef}
              className="w-full h-full overflow-y-auto snap-y snap-mandatory"
            >
              {(() => {
                const allImages = [currentProject.coverImage, ...(currentProject.galleryImages || [])].filter(Boolean);
                return allImages.map((img, idx) => (
                  <div key={idx} className="w-full h-screen snap-start relative">
                    <img
                      src={img}
                      alt={`${currentProject.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <div className="absolute top-8 left-72 z-10 text-white max-w-md">
                        <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">{currentProject.title}</h1>
                        <div className="text-base opacity-90 mb-6">
                          {currentProject.metadata?.location} • {currentProject.metadata?.year}
                        </div>
                        <p className="text-lg font-light leading-relaxed mb-6">
                          {currentProject.detailedDescription || currentProject.description}
                        </p>
                        <a
                          href={`/projects/${currentProject.category}/${currentProject.subcategory}/${currentProject.slug}`}
                          className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 text-sm font-light tracking-wide hover:bg-opacity-30 transition-all inline-block"
                        >
                          VIEW PROJECT
                        </a>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
            
            <div className="absolute top-0 left-0 w-64 h-full z-50">
              <aside className="w-64 h-full overflow-hidden">
                <div className="pt-8 pb-6 px-6">
                  <a href="/" className="text-4xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100 !important', fontFamily: 'Montserrat, sans-serif !important'}}>STUDIO GRAVITAS</a>
                </div>
                
                <nav className="overflow-hidden">
                  <a href="/" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Home</a>
                  <a href="/architecture" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-100 no-underline">Architecture</a>
                  <a href="/art" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Art</a>
                  <a href="/objects" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
                  <a href="/thoughts" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
                  <a href="/about" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About us</a>
                  <a href="/contact" className="block py-2 px-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
                </nav>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-xs text-white opacity-60 space-y-1">
                    <p>Designed and developed by</p>
                    <a href="https://www.linkedin.com/in/sandeep-v-a6aaa529b/" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 transition-opacity">
                      Sandeep
                    </a>
                  </div>
                </div>
              </aside>
            </div>
            
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 z-60 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 hover:bg-opacity-30 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0">
              <div className="text-lg font-light tracking-wider">STUDIO GRAVITAS</div>
              <button
                onClick={closeFullscreen}
                className="p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <h1 className="text-2xl font-light tracking-wide mb-2">{currentProject.title}</h1>
                <div className="text-sm text-gray-600 mb-4">
                  {currentProject.metadata?.location} • {currentProject.metadata?.year}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentProject.detailedDescription || currentProject.description}
                </p>
                
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <div className="font-medium text-black">Area</div>
                    <div className="text-gray-600">{currentProject.metadata?.area}</div>
                  </div>
                  <div>
                    <div className="font-medium text-black">Status</div>
                    <div className="text-gray-600">{currentProject.metadata?.status}</div>
                  </div>
                  {currentProject.metadata?.client && (
                    <div>
                      <div className="font-medium text-black">Client</div>
                      <div className="text-gray-600">{currentProject.metadata.client}</div>
                    </div>
                  )}
                  {currentProject.metadata?.team && (
                    <div>
                      <div className="font-medium text-black">Team</div>
                      <div className="text-gray-600">{currentProject.metadata.team}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {(() => {
                  const allImages = [currentProject.coverImage, ...(currentProject.galleryImages || [])].filter(Boolean);
                  return allImages.map((img, idx) => (
                    <div key={idx} className="w-full">
                      <img
                        src={img}
                        alt={`${currentProject.title} ${idx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}