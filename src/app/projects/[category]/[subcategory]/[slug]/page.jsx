"use client";

import { useState, useEffect, useRef } from "react";
import { Edit, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import toast from 'react-hot-toast';

// Custom sidebar for project pages
function ProjectSidebar() {
  return (
    <aside className="hidden lg:block w-64 fixed h-screen z-50 pointer-events-none">
      <div className="pt-8 pb-3 pl-6 pointer-events-auto">
        <h1 className="text-base font-normal tracking-wide text-white">STUDIO GRAVITAS</h1>
      </div>
      
      <nav className="overflow-hidden pointer-events-auto">
        <a href="/home" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Home</a>
        <a href="/architecture" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-100 no-underline">Architecture</a>
        <a href="/art" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Art</a>
        <a href="/objects" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
        <a href="/thoughts" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Thoughts</a>
        <a href="/about" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About us</a>
        <a href="/contact" className="block py-1 pl-6 text-xs font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
      </nav>
      

    </aside>
  );
}

export default function ProjectDetail({ params }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [project, setProject] = useState(null);
  const [paramsResolved, setParamsResolved] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const resolveParams = async () => {
      const awaitedParams = await params;
      console.log('URL Params:', awaitedParams);
      
      try {
        const res = await fetch('/api/projects');
        const { projects } = await res.json();
        console.log('All projects:', projects.map(p => ({ title: p.title, category: p.category, subcategory: p.subcategory, slug: p.slug })));
        
        const foundProject = projects.find(
          (p) => p.category === awaitedParams.category && 
                 p.subcategory === decodeURIComponent(awaitedParams.subcategory) && 
                 p.slug === awaitedParams.slug
        );
        console.log('Found project:', foundProject ? foundProject.title : 'Not found');
        setProject(foundProject);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
      setParamsResolved(true);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !project) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const imageHeight = windowHeight;
      
      // Show scroll-to-top button after scrolling past first image
      setShowScrollTop(scrollTop > windowHeight * 0.5);
      
      const newIndex = Math.floor(scrollTop / imageHeight);
      if (newIndex !== currentImageIndex && newIndex < project.galleryImages.length) {
        setCurrentImageIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentImageIndex, project]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError("Invalid password");
        toast.error('Invalid password');
      }
    } catch (err) {
      setError("Authentication failed");
      toast.error('Authentication failed');
    }
    setLoading(false);
  };

  const handleDeleteProject = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          toast.success('Project deleted successfully!');
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          toast.error('Delete failed');
        }
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  if (!paramsResolved) {
    return <div className="flex items-center justify-center min-h-screen bg-white">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-gray-800">Project Not Found</h1>
          <p className="text-gray-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page relative w-full h-screen bg-black">
      <ProjectSidebar />
      
      {/* Desktop View */}
      <div className="hidden lg:block w-full h-screen">
        <div 
          ref={containerRef}
          className="w-full h-screen overflow-y-auto snap-y snap-mandatory project-scroll"
        >
          {project.galleryImages.map((img, idx) => (
            <div key={idx} className="w-full h-screen snap-start relative">
              <img
                src={img}
                alt={`${project.title} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <div className="absolute top-8 left-72 right-8 z-10 text-white">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-light tracking-wide mb-2">{project.title}</h1>
                    <div className="text-base opacity-90">
                      {project.metadata.location} • {project.metadata.year}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Individual image content with dynamic positioning */}
              {project.imageContents && project.imageContents[idx] && (
                <div className={`absolute bottom-16 z-10 text-white max-w-xs ${
                  project.imageLayouts && project.imageLayouts[idx] === 'right' 
                    ? 'right-6' 
                    : 'left-6'
                }`}>
                  {/* Project Title */}
                  {project.imageTitles && project.imageTitles[idx] && (
                    <h3 className="text-lg font-medium mb-1">
                      {project.imageTitles[idx]}
                    </h3>
                  )}
                  
                  {/* Progress */}
                  {project.imageProgress && project.imageProgress[idx] && (
                    <div className="text-xs opacity-90 mb-1">
                      {project.imageProgress[idx]}
                    </div>
                  )}
                  
                  {/* Subheading */}
                  {project.imageSubheadings && project.imageSubheadings[idx] && (
                    <div className="text-sm font-light opacity-80 mb-3">
                      {project.imageSubheadings[idx]}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="text-xs font-light leading-tight opacity-80">
                    <div dangerouslySetInnerHTML={{ __html: project.imageContents[idx].replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              )}
              

            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setShowDetails(true)}
          className="fixed bottom-8 right-8 z-20 bg-black bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide hover:bg-opacity-30 transition-all"
        >
          PROJECT DETAILS
        </button>
        
        <button
          onClick={handleEditClick}
          className="hidden xl:flex fixed top-8 right-8 z-20 bg-black bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide hover:bg-opacity-30 transition-all items-center space-x-2"
        >
          <Edit size={16} />
          <span>EDIT PROJECT</span>
        </button>
        
        {/* Custom Scroll to Top for Desktop */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="text-lg font-light tracking-wider">STUDIO GRAVITAS</div>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="bg-white border-t border-gray-100">
              <nav className="p-4 space-y-3">
                <a 
                  href="/home" 
                  className="block py-2 text-base font-light text-gray-800 hover:text-black transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </a>
                <a 
                  href="/architecture" 
                  className="block py-2 text-base font-light text-gray-800 hover:text-black transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Architecture
                </a>
                <a 
                  href="/art" 
                  className="block py-2 text-base font-light text-gray-800 hover:text-black transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Arts
                </a>
                <a 
                  href="/objects" 
                  className="block py-2 text-base font-light text-gray-800 hover:text-black transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Objects
                </a>
                <a 
                  href="/thoughts" 
                  className="block py-2 text-base font-light text-gray-800 hover:text-black transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Thoughts
                </a>
              </nav>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Project Header */}
          <div className="p-6 bg-gray-50">
            <h1 className="text-2xl font-light tracking-wide mb-3">{project.title}</h1>
            <div className="text-sm text-gray-600 mb-4">
              {project.metadata.location} • {project.metadata.year}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>
          
          {/* Project Details */}
          <div className="px-6">
            <h3 className="text-lg font-light mb-4">Project Details</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-medium text-black mb-1">Area</div>
                <div className="text-gray-600">{project.metadata.area}</div>
              </div>
              <div>
                <div className="font-medium text-black mb-1">Status</div>
                <div className="text-gray-600">{project.metadata.status}</div>
              </div>
              {project.metadata.client && (
                <div>
                  <div className="font-medium text-black mb-1">Client</div>
                  <div className="text-gray-600">{project.metadata.client}</div>
                </div>
              )}
              {project.metadata.team && (
                <div>
                  <div className="font-medium text-black mb-1">Team</div>
                  <div className="text-gray-600">{project.metadata.team}</div>
                </div>
              )}
              {project.metadata.contractor && (
                <div>
                  <div className="font-medium text-black mb-1">Contractor</div>
                  <div className="text-gray-600">{project.metadata.contractor}</div>
                </div>
              )}
              {project.metadata.budget && (
                <div>
                  <div className="font-medium text-black mb-1">Budget</div>
                  <div className="text-gray-600">{project.metadata.budget}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Key Features */}
          {project.features && (
            <div className="px-6">
              <h3 className="text-lg font-light mb-4">Key Features</h3>
              <div className="space-y-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Gallery */}
          <div className="space-y-1">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="w-full">
                <img
                  src={img}
                  alt={`${project.title} ${idx + 1}`}
                  className="w-full h-auto object-cover"
                />
                
                {/* Individual Image Content for Mobile */}
                {project.imageContents && project.imageContents[idx] && (
                  <div className="p-6 bg-gray-50">
                    {project.imageTitles && project.imageTitles[idx] && (
                      <h4 className="text-base font-medium mb-2">
                        {project.imageTitles[idx]}
                      </h4>
                    )}
                    
                    {project.imageProgress && project.imageProgress[idx] && (
                      <div className="text-xs text-gray-600 mb-1">
                        {project.imageProgress[idx]}
                      </div>
                    )}
                    
                    {project.imageSubheadings && project.imageSubheadings[idx] && (
                      <div className="text-sm font-light text-gray-600 mb-3">
                        {project.imageSubheadings[idx]}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: project.imageContents[idx].replace(/\n/g, '<br />') }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-lg max-w-md w-full p-6 text-white">
            <h2 className="text-xl font-light mb-4">Project Details</h2>
            <div className="space-y-4">
              {project.features && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Features</h4>
                  <ul className="space-y-1 text-sm">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1 h-1 bg-white rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Area:</span> {project.metadata.area}</div>
                <div><span className="font-medium">Status:</span> {project.metadata.status}</div>
                {project.metadata.client && <div><span className="font-medium">Client:</span> {project.metadata.client}</div>}
                {project.metadata.team && <div><span className="font-medium">Team:</span> {project.metadata.team}</div>}
                {project.metadata.contractor && <div><span className="font-medium">Contractor:</span> {project.metadata.contractor}</div>}
                {project.metadata.budget && <div><span className="font-medium">Budget:</span> {project.metadata.budget}</div>}
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="mt-6 w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {!isAuthenticated ? (
              <div className="p-6">
                <h2 className="text-xl font-light mb-4">Admin Access Required</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full p-3 border border-gray-300 rounded-md pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                      {loading ? "Authenticating..." : "Access"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-xl font-light mb-4">Project Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      window.location.href = `/upload?edit=${project.id}`;
                    }}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <Edit size={16} />
                    <span>Edit Project Details</span>
                  </button>
                  <button
                    onClick={handleDeleteProject}
                    className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 flex items-center justify-center space-x-2"
                  >
                    <Trash2 size={16} />
                    <span>Delete Project</span>
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      

    </div>
  );
}