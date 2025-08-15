"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';

export default function ProjectDetail({ params }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [project, setProject] = useState(null);
  const [paramsResolved, setParamsResolved] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const awaitedParams = await params;
      
      try {
        const res = await fetch('/api/projects');
        const { projects } = await res.json();
        const foundProject = projects.find(
          (p) => p.category === awaitedParams.category && 
                 p.subcategory === awaitedParams.subcategory && 
                 p.slug === awaitedParams.slug
        );
        setProject(foundProject);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
      setParamsResolved(true);
    };
    resolveParams();
  }, [params]);

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
    return <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-gray-800">Project Not Found</h1>
          <p className="text-gray-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl lg:text-5xl font-light tracking-wider text-black">{project.title}</h1>
            <button
              onClick={handleEditClick}
              className="hidden md:flex bg-black text-white px-4 py-2 text-sm font-light tracking-wide hover:bg-gray-800 transition-colors items-center space-x-2"
            >
              <Edit size={16} />
              <span>EDIT PROJECT</span>
            </button>
          </div>
          <div className="w-20 h-px bg-black"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1">
              <div className="font-medium text-black">Location</div>
              <div className="text-gray-600">{project.metadata.location}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-black">Year</div>
              <div className="text-gray-600">{project.metadata.year}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-black">Area</div>
              <div className="text-gray-600">{project.metadata.area}</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-black">Status</div>
              <div className="text-gray-600">{project.metadata.status}</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="w-full">
                <img
                  src={img}
                  alt={`${project.title} ${idx + 1}`}
                  className="w-full h-auto object-cover shadow-sm"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-2xl font-light mb-6 tracking-wide">About the Project</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {project.detailedDescription || project.description}
              </p>
            </div>
            
            {project.features && (
              <div>
                <h3 className="text-xl font-light mb-6 tracking-wide">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light mb-6 tracking-wide">Project Information</h3>
              <div className="space-y-4 text-sm">
                {project.metadata.client && (
                  <div className="space-y-1">
                    <div className="font-medium text-black">Client</div>
                    <div className="text-gray-600">{project.metadata.client}</div>
                  </div>
                )}
                {project.metadata.team && (
                  <div className="space-y-1">
                    <div className="font-medium text-black">Design Team</div>
                    <div className="text-gray-600">{project.metadata.team}</div>
                  </div>
                )}
                {project.metadata.contractor && (
                  <div className="space-y-1">
                    <div className="font-medium text-black">Contractor</div>
                    <div className="text-gray-600">{project.metadata.contractor}</div>
                  </div>
                )}
                {project.metadata.budget && (
                  <div className="space-y-1">
                    <div className="font-medium text-black">Budget</div>
                    <div className="text-gray-600">{project.metadata.budget}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
}