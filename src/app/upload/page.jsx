"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';

export default function Upload() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  useEffect(() => {
    const loadProjectData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const editId = urlParams.get('edit');
      if (editId) {
        setEditMode(true);
        setEditProjectId(parseInt(editId));
        // Load existing project data
        try {
          const res = await fetch('/api/projects');
          const { projects } = await res.json();
          const existingProject = projects.find(p => p.id === parseInt(editId));
          if (existingProject) {
            setFormData({
              title: existingProject.title,
              category: existingProject.category,
              subcategory: existingProject.subcategory,
              description: existingProject.description,
              detailedDescription: existingProject.detailedDescription || '',
              location: existingProject.metadata.location,
              year: existingProject.metadata.year,
              area: existingProject.metadata.area || '',
              status: existingProject.metadata.status,
              client: existingProject.metadata.client || '',
              team: existingProject.metadata.team || 'MORQ Studio',
              contractor: existingProject.metadata.contractor || '',
              budget: existingProject.metadata.budget || '',
              coverImage: existingProject.coverImage,
              galleryImages: existingProject.galleryImages || ['', ''],
              features: existingProject.features || ['', '', '', '', '']
            });
          }
        } catch (error) {
          console.error('Error loading project:', error);
          toast.error('Failed to load project data');
        }
      }
    };
    
    loadProjectData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "architecture",
    subcategory: "",
    description: "",
    detailedDescription: "",
    location: "",
    year: "",
    area: "",
    status: "Completed",
    client: "",
    team: "MORQ Studio",
    contractor: "",
    budget: "",
    coverImage: "",
    galleryImages: ["", ""],
    features: ["", "", "", "", ""]
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleFileUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      if (response.ok) {
        const { url } = await response.json();
        if (index !== null) {
          handleArrayChange(field, index, url);
        } else {
          setFormData(prev => ({ ...prev, [field]: url }));
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      alert('Image upload error');
    }
  };



  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      ...formData,
      slug: generateSlug(formData.title),
      galleryImages: formData.galleryImages.filter(img => img.trim()),
      features: formData.features.filter(feature => feature.trim()),
      metadata: {
        location: formData.location,
        year: formData.year,
        area: formData.area,
        status: formData.status,
        client: formData.client,
        team: formData.team,
        contractor: formData.contractor,
        budget: formData.budget
      }
    };

    try {
      const url = editMode ? `/api/projects/${editProjectId}` : "/api/projects";
      const method = editMode ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        if (editMode) {
          toast.success('Project updated successfully!');
          // Redirect to project page after update
          setTimeout(() => {
            window.location.href = `/projects/${formData.category}/${formData.subcategory}/${generateSlug(formData.title)}`;
          }, 1000);
        } else {
          toast.success('Project uploaded successfully!');
          // Redirect to project page after upload
          setTimeout(() => {
            window.location.href = `/projects/${formData.category}/${formData.subcategory}/${generateSlug(formData.title)}`;
          }, 1000);
        }
      } else {
        toast.error(editMode ? 'Update failed' : 'Upload failed');
      }
    } catch (err) {
      toast.error(editMode ? 'Update error' : 'Upload error');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-light mb-6">Admin Access</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl font-light tracking-wide">{editMode ? 'Edit Project' : 'Upload New Project'}</h1>
        <div className="w-16 h-px bg-black"></div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="architecture">Architecture</option>
              <option value="interior">Interior</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              placeholder="e.g., residential, urban, hospitality"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Detailed Description</label>
          <textarea
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <div className="space-y-2">
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <div className="text-center text-gray-500 text-sm">OR</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'coverImage')}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {formData.coverImage && (
              <img src={formData.coverImage} alt="Cover preview" className="w-32 h-24 object-cover rounded mt-2" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gallery Images</label>
          {formData.galleryImages.map((img, index) => (
            <div key={index} className="mb-4 space-y-2">
              <input
                type="url"
                value={img}
                onChange={(e) => handleArrayChange("galleryImages", index, e.target.value)}
                placeholder={`Gallery image ${index + 1} URL`}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <div className="text-center text-gray-500 text-sm">OR</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'galleryImages', index)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {img && (
                <img src={img} alt={`Gallery ${index + 1}`} className="w-32 h-24 object-cover rounded" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="e.g., 280 sqm"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., $850,000 AUD"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contractor</label>
            <input
              type="text"
              name="contractor"
              value={formData.contractor}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Features</label>
          {formData.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleArrayChange("features", index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
              className="w-full p-3 border border-gray-300 rounded-md mb-2"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded-md hover:bg-gray-800 disabled:opacity-50 font-light text-lg"
        >
          {loading ? (editMode ? "Updating..." : "Uploading...") : (editMode ? "Update Project" : "Upload Project")}
        </button>
      </form>
    </div>
  );
}