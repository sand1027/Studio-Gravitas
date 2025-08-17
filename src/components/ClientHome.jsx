"use client";

import { useState, useEffect } from "react";
import { Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SimpleImage from "@/components/SimpleImage";

export default function ClientHome() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        console.log('Client fetched projects:', data.projects?.length);
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Debug: Log all project categories
  console.log('All projects with categories:', projects.map(p => ({ title: p.title, category: p.category })));
  
  // Filter to only show Projects and Arts categories (case-insensitive)
  const filteredProjects = projects.filter((p) => {
    const category = p.category?.toLowerCase();
    return category === 'projects' || category === 'arts' || category === 'project' || category === 'art' || category === 'architecture';
  });
  
  console.log('Filtered projects:', filteredProjects.map(p => ({ title: p.title, category: p.category })));
  
  const featuredProjects = filteredProjects.filter((p) => p.id <= 3);
  const recentProjects = filteredProjects.slice(-2);
  
  console.log('Featured projects:', featuredProjects.length);
  console.log('Recent projects:', recentProjects.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Studio Gravitas Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-light tracking-wider">
              STUDIO GRAVITAS
            </h1>
            <div className="w-24 h-px bg-white mx-auto"></div>
            <p className="text-lg lg:text-xl font-light max-w-2xl mx-auto px-6">
              Architecture rooted in phenomenology, driven by collaborative spirit and timeless design
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 space-y-20">

        {/* About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-black">About Studio Gravitas</h2>
              <div className="w-16 h-px bg-black"></div>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-light">
                Studio Gravitas was established in 2016, with their inaugural project <em>The House of Memories</em> in India. 
                Gravitas represents a collective spirit, a process, and an investigation into architecture and design—driven 
                by the past, present, and future.
              </p>
              <p>
                For Gravitas, it is a process rather than a product. It is the idea of making rather than building. 
                It is about the atmosphere than mere aesthetics. As a practice, Gravitas firmly believes in the 
                collaborative spirit and a holistic approach to design.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 p-8">
              <h3 className="text-lg font-light text-black mb-6">Our Approach</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm">Contextual design that responds to site and climate</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm">Sustainable materials and construction methods</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm">Collaborative process with clients and communities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm">Integration of interior and exterior spaces</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-black">
              Featured Projects
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of architectural projects that embody our design philosophy
            </p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((proj) => {
              console.log("Rendering featured project:", proj.title, "Image:", proj.coverImage);
              return (
                <div key={proj.id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                  <div className="relative">
                    <a href={`/projects/${proj.category}/${proj.subcategory}/${proj.slug}`} className="block">
                      <div className="w-full h-64 lg:h-72 bg-gray-200">
                        <img
                          src={proj.coverImage || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3'}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          onLoad={() => console.log('✅ Featured image loaded:', proj.title)}
                          onError={(e) => {
                            console.log('❌ Featured image failed:', proj.title);
                            e.target.src = 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
                          }}
                        />
                      </div>
                    </a>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowInfo(proj.id);
                        setCurrentImageIndex(0);
                      }}
                      className="absolute top-3 right-3 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Info size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <a href={`/projects/${proj.category}/${proj.subcategory}/${proj.slug}`} className="block p-6">
                    <h3 className="text-base font-light tracking-wide text-black mb-3 uppercase">{proj.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No featured projects found</p>
            </div>
          )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16 -mx-8">
          <div className="max-w-4xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-light text-black">50+</h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-light text-black">2</h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">Countries</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-light text-black">8+</h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-black">
              Recent Work
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentProjects.length > 0 ? (
            recentProjects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                <div className="relative">
                  <a href={`/projects/${proj.category}/${proj.subcategory}/${proj.slug}`} className="block">
                    <div className="w-full h-64 lg:h-72 bg-gray-200">
                      <img
                        src={proj.coverImage || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3'}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onLoad={() => console.log('✅ Recent image loaded:', proj.title)}
                        onError={(e) => {
                          console.log('❌ Recent image failed:', proj.title);
                          e.target.src = 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
                        }}
                      />
                    </div>
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowInfo(proj.id);
                      setCurrentImageIndex(0);
                    }}
                    className="absolute top-3 right-3 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <Info size={18} className="text-gray-700" />
                  </button>
                </div>
                <a href={`/projects/${proj.category}/${proj.subcategory}/${proj.slug}`} className="block p-6">
                  <h3 className="text-base font-light tracking-wide text-black mb-3 uppercase">{proj.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No recent projects found</p>
            </div>
          )}
          </div>
        </section>
      </div>

      {/* Modal */}
      {showInfo && (() => {
        const project = filteredProjects.find(p => p.id === showInfo);
        if (!project) return null;
        
        const allImages = [project.coverImage, ...(project.galleryImages || [])].filter(Boolean);
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white w-[1200px] h-[500px] flex shadow-xl">
              {/* Left Side - Image */}
              <div className="w-1/2 relative bg-gray-100">
                {allImages.length > 0 && (
                  <>
                    <img
                      src={allImages[currentImageIndex] || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {allImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentImageIndex 
                                  ? 'bg-white' 
                                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              
              {/* Right Side - Details */}
              <div className="w-1/2 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-light text-black">{project.title}</h2>
                  <button
                    onClick={() => setShowInfo(null)}
                    className="bg-black text-white hover:bg-gray-800 transition-colors p-2 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.detailedDescription || project.description}
                  </p>
                  
                  {project.metadata && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      {project.metadata.location && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location</div>
                          <div className="text-gray-900">{project.metadata.location}</div>
                        </div>
                      )}
                      {project.metadata.year && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Year</div>
                          <div className="text-gray-900">{project.metadata.year}</div>
                        </div>
                      )}
                      {project.metadata.area && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Area</div>
                          <div className="text-gray-900">{project.metadata.area}</div>
                        </div>
                      )}
                      {project.metadata.status && (
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status</div>
                          <div className="text-gray-900">{project.metadata.status}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}