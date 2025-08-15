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

  const featuredProjects = projects.filter((p) => p.id <= 3);
  const recentProjects = projects.slice(-2);

  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-5xl lg:text-6xl font-light tracking-wider text-black">
          MORQ
        </h1>
        <div className="w-16 h-px bg-black"></div>
      </div>

      <div className="w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg bg-gray-200">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Architecture Hero"
          className="w-full h-full object-cover"
          onLoad={() => console.log('✅ Hero image loaded')}
          onError={(e) => {
            console.log('❌ Hero image failed');
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-light tracking-wide">About MORQ</h2>
          <p className="text-lg leading-relaxed text-gray-700 font-light">
            MORQ is an architecture studio based in Italy and Australia,
            dedicated to creating meaningful spaces within thoughtful, essential
            buildings. Our work engages with existing conditions to produce
            architecture that stimulates the senses and contributes positively
            to the built environment.
          </p>
          <p className="text-base leading-relaxed text-gray-600 font-light">
            Founded on the principles of contextual design and material honesty,
            we approach each project as a unique opportunity to enhance the
            relationship between people and place.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-light tracking-wide">Our Approach</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Contextual design that responds to site and climate
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Sustainable materials and construction methods
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Collaborative process with clients and communities
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Integration of interior and exterior spaces
            </li>
          </ul>
        </div>
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-light tracking-wide text-black mb-2">
            Featured Projects
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
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
                    <h3 className="text-xl font-light tracking-wide text-black mb-3">{proj.title}</h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-2">
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

      <section className="bg-white p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-light text-black mb-2">50+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-3xl font-light text-black mb-2">2</h3>
            <p className="text-gray-600">Countries</p>
          </div>
          <div>
            <h3 className="text-3xl font-light text-black mb-2">15+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-light tracking-wide text-black mb-2">
            Recent Work
          </h2>
          <div className="w-12 h-px bg-gray-300"></div>
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
                  <h3 className="text-xl font-light tracking-wide text-black mb-3">{proj.title}</h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
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

      {/* Modal */}
      {showInfo && (() => {
        const project = projects.find(p => p.id === showInfo);
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