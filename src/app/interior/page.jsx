"use client";

import { useState, useEffect } from "react";
import { Info, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Interior() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
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

  const interiorProjects = projects.filter(
    (project) => project.category === "interior"
  );

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-light tracking-wider text-black">Interior</h1>
        <div className="w-16 h-px bg-black"></div>
        <p className="text-lg text-gray-600 font-light max-w-2xl">
          Our interior design projects create thoughtful, functional spaces that enhance 
          daily life through careful attention to materials, light, and spatial flow.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interiorProjects.length > 0 ? interiorProjects.map((project) => {
          console.log('Interior project:', project.title, 'Image:', project.coverImage);
          return (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
              <div className="relative">
                <a href={`/projects/${project.category}/${project.subcategory}/${project.slug}`} className="block">
                  <div className="w-full h-64 lg:h-72 bg-gray-200">
                    <img
                      src={project.coverImage || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('✅ Interior image loaded:', project.title)}
                      onError={(e) => {
                        console.log('❌ Interior image failed:', project.title);
                        e.target.src = 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
                      }}
                    />
                  </div>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowInfo(project.id);
                    setCurrentImageIndex(0);
                  }}
                  className="absolute top-3 right-3 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Info size={18} className="text-gray-700" />
                </button>
              </div>
              <a href={`/projects/${project.category}/${project.subcategory}/${project.slug}`} className="block p-6">
                <h3 className="text-xl font-light tracking-wide text-black mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </a>
            </div>
          );
        }) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No interior projects found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showInfo && (() => {
        const project = interiorProjects.find(p => p.id === showInfo);
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
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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