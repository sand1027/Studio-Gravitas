"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';

// Smart compression function - maintains original dimensions, dynamically adjusts quality to target 10MB
const compressImage = (file, targetSizeMB = 9.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = async () => {
      // Keep exact original dimensions
      const originalWidth = img.naturalWidth || img.width;
      const originalHeight = img.naturalHeight || img.height;
      
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      ctx.drawImage(img, 0, 0, originalWidth, originalHeight);
      
      const targetSizeBytes = targetSizeMB * 1024 * 1024;
      let quality = 0.9; // Start with high quality
      let compressedBlob;
      
      // Binary search for optimal quality
      let minQuality = 0.1;
      let maxQuality = 0.9;
      
      for (let i = 0; i < 8; i++) { // Max 8 iterations
        quality = (minQuality + maxQuality) / 2;
        
        compressedBlob = await new Promise(res => {
          canvas.toBlob(res, 'image/jpeg', quality);
        });
        
        if (compressedBlob.size > targetSizeBytes) {
          maxQuality = quality;
        } else {
          minQuality = quality;
        }
        
        // If we're close enough, break
        if (Math.abs(compressedBlob.size - targetSizeBytes) < 0.1 * 1024 * 1024) {
          break;
        }
      }
      
      resolve(compressedBlob);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Simple upload component for thoughts, art, objects
function SimpleUpload({ type, onBack }) {
  const [images, setImages] = useState(['']);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Compress image if it's too large
    let fileToUpload = file;
    if (file.size > 10 * 1024 * 1024) { // If larger than 10MB
      toast.loading('Optimizing image size...', { id: 'compress' });
      fileToUpload = await compressImage(file, 9.8);
      toast.dismiss('compress');
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', fileToUpload);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      if (response.ok) {
        const { url } = await response.json();
        const newImages = [...images];
        newImages[index] = url;
        setImages(newImages);
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      alert('Image upload error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredImages = images.filter(img => img.trim());
    const projectData = {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${Date.now()}`,
      category: type,
      subcategory: type,
      description: `${type} upload`,
      location: 'Studio',
      year: new Date().getFullYear().toString(),
      status: 'Completed',
      team: 'Studio Gravitas',
      coverImage: filteredImages[0],
      galleryImages: filteredImages.slice(1),
      slug: `${type}-${Date.now()}`,
      metadata: {
        location: 'Studio',
        year: new Date().getFullYear().toString(),
        status: 'Completed',
        team: 'Studio Gravitas'
      }
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        toast.success(`${type} uploaded successfully!`);
        setTimeout(() => {
          window.location.href = `/${type}`;
        }, 1000);
      } else {
        toast.error('Upload failed');
      }
    } catch (err) {
      toast.error('Upload error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-4 mb-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack} 
              className="text-gray-600 hover:text-black transition-colors p-2 -ml-2"
            >
              ← Back
            </button>
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-black">
              Upload {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
          </div>
          <div className="w-16 h-px bg-black ml-12"></div>
        </div>

        <div className="bg-gray-50 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-light text-black mb-6">Images</label>
              <div className="space-y-6">
                {images.map((img, index) => (
                  <div key={index} className="bg-white p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-black">Image {index + 1}</span>
                      {images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                          className="text-red-500 text-sm hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, index)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      
                      {img && (
                        <div className="mt-4">
                          <img 
                            src={img} 
                            alt={`${type} ${index + 1}`} 
                            className="w-full max-w-xs h-48 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => setImages([...images, ''])}
                  className="w-full p-6 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-black hover:text-black transition-all bg-white"
                >
                  + Add Another Image
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !images[0]}
              className="w-full bg-black text-white p-4 rounded-md hover:bg-gray-800 disabled:opacity-50 font-light text-lg transition-colors"
            >
              {loading ? 'Uploading...' : `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
              team: existingProject.metadata.team || 'Studio Gravitas',
              contractor: existingProject.metadata.contractor || '',
              budget: existingProject.metadata.budget || '',
              coverImage: existingProject.coverImage,
              galleryImages: existingProject.galleryImages || ['', ''],
              additionalContent: existingProject.additionalContent || '',
              imageContents: existingProject.imageContents || ['', ''],
              imageLayouts: existingProject.imageLayouts || ['left', 'left'],
              imageTitles: existingProject.imageTitles || ['', ''],
              imageProgress: existingProject.imageProgress || ['', ''],
              imageSubheadings: existingProject.imageSubheadings || ['', ''],
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
    team: "Studio Gravitas",
    contractor: "",
    budget: "",
    coverImage: "",
    galleryImages: ["", ""],
    additionalContent: "",
    imageContents: ["", ""],
    imageLayouts: ["left", "left"],
    imageTitles: ["", ""],
    imageProgress: ["", ""],
    imageSubheadings: ["", ""],
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

    // Compress image if it's too large
    let fileToUpload = file;
    if (file.size > 10 * 1024 * 1024) { // If larger than 10MB
      toast.loading('Optimizing image size...', { id: 'compress' });
      fileToUpload = await compressImage(file, 9.8);
      toast.dismiss('compress');
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', fileToUpload);

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
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      ...formData,
      slug: generateSlug(formData.title),
      galleryImages: formData.galleryImages.filter(img => img.trim()),
      imageContents: formData.imageContents || [],
      imageLayouts: formData.imageLayouts || [],
      imageTitles: formData.imageTitles || [],
      imageProgress: formData.imageProgress || [],
      imageSubheadings: formData.imageSubheadings || [],
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
          setTimeout(() => {
            window.location.href = `/projects/${formData.category}/${encodeURIComponent(formData.subcategory)}/${generateSlug(formData.title)}`;
          }, 1000);
        } else {
          toast.success('Project uploaded successfully!');
          setTimeout(() => {
            window.location.href = `/projects/${formData.category}/${encodeURIComponent(formData.subcategory)}/${generateSlug(formData.title)}`;
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

  const [uploadType, setUploadType] = useState(null);

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

  if (!uploadType) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="space-y-4 mb-16 text-center">
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-black">Upload Content</h1>
            <div className="w-16 h-px bg-black mx-auto"></div>
            <p className="text-gray-600 mt-6">Choose the type of content you'd like to upload</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => setUploadType('projects')}
              className="group p-8 border border-gray-200 hover:border-black transition-all text-left bg-white hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-black transition-colors flex items-center justify-center">
                  <span className="text-gray-600 group-hover:text-white text-xl">🏗️</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-black mb-3">Projects</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Upload architecture and interior projects with comprehensive details, metadata, and project information</p>
            </button>
            
            <button
              onClick={() => setUploadType('thoughts')}
              className="group p-8 border border-gray-200 hover:border-black transition-all text-left bg-white hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-black transition-colors flex items-center justify-center">
                  <span className="text-gray-600 group-hover:text-white text-xl">💭</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-black mb-3">Thoughts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Share visual thoughts and reflections through curated image collections</p>
            </button>
            
            <button
              onClick={() => setUploadType('art')}
              className="group p-8 border border-gray-200 hover:border-black transition-all text-left bg-white hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-black transition-colors flex items-center justify-center">
                  <span className="text-gray-600 group-hover:text-white text-xl">🎨</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-black mb-3">Art</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Showcase artistic works and creative expressions</p>
            </button>
            
            <button
              onClick={() => setUploadType('objects')}
              className="group p-8 border border-gray-200 hover:border-black transition-all text-left bg-white hover:shadow-lg"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-black transition-colors flex items-center justify-center">
                  <span className="text-gray-600 group-hover:text-white text-xl">🏺</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-black mb-3">Objects</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Display design objects, furniture, and material studies</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (uploadType !== 'projects') {
    return <SimpleUpload type={uploadType} onBack={() => setUploadType(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto lg:ml-80">
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
              <option value="thoughts">Thoughts</option>
              <option value="art">Art</option>
              <option value="objects">Objects</option>
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
          <label className="block text-sm font-medium mb-2">Additional Content</label>
          <textarea
            name="additionalContent"
            value={formData.additionalContent}
            onChange={handleInputChange}
            rows="8"
            placeholder="Enter additional project content (e.g., House of Balance&#10;&#10;In works&#10;Studio Gravitas + Parallax Architects&#10;&#10;Detailed project description...)"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gallery Images</label>
          {formData.galleryImages.map((img, index) => (
            <div key={index} className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Image {index + 1}</span>
                {formData.galleryImages.length > 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.galleryImages.filter((_, i) => i !== index);
                      const newContents = formData.imageContents.filter((_, i) => i !== index);
                      const newLayouts = formData.imageLayouts.filter((_, i) => i !== index);
                      const newTitles = formData.imageTitles.filter((_, i) => i !== index);
                      const newProgress = formData.imageProgress.filter((_, i) => i !== index);
                      const newSubheadings = formData.imageSubheadings.filter((_, i) => i !== index);
                      setFormData(prev => ({ 
                        ...prev, 
                        galleryImages: newImages,
                        imageContents: newContents,
                        imageLayouts: newLayouts,
                        imageTitles: newTitles,
                        imageProgress: newProgress,
                        imageSubheadings: newSubheadings
                      }));
                    }}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
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
              
              {index === 0 && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Layout Position</label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="left"
                          checked={formData.imageLayouts[index] === "left"}
                          onChange={() => handleArrayChange("imageLayouts", index, "left")}
                          className="mr-2"
                        />
                        Bottom Left
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="right"
                          checked={formData.imageLayouts[index] === "right"}
                          onChange={() => handleArrayChange("imageLayouts", index, "right")}
                          className="mr-2"
                        />
                        Bottom Right
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="left-2"
                          checked={formData.imageLayouts[index] === "left-2"}
                          onChange={() => handleArrayChange("imageLayouts", index, "left-2")}
                          className="mr-2"
                        />
                        Mid Left
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="right-2"
                          checked={formData.imageLayouts[index] === "right-2"}
                          onChange={() => handleArrayChange("imageLayouts", index, "right-2")}
                          className="mr-2"
                        />
                        Mid Right
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="left-3"
                          checked={formData.imageLayouts[index] === "left-3"}
                          onChange={() => handleArrayChange("imageLayouts", index, "left-3")}
                          className="mr-2"
                        />
                        Upper Left
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="right-3"
                          checked={formData.imageLayouts[index] === "right-3"}
                          onChange={() => handleArrayChange("imageLayouts", index, "right-3")}
                          className="mr-2"
                        />
                        Upper Right
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="left-4"
                          checked={formData.imageLayouts[index] === "left-4"}
                          onChange={() => handleArrayChange("imageLayouts", index, "left-4")}
                          className="mr-2"
                        />
                        Top Left
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`layout-${index}`}
                          value="right-4"
                          checked={formData.imageLayouts[index] === "right-4"}
                          onChange={() => handleArrayChange("imageLayouts", index, "right-4")}
                          className="mr-2"
                        />
                        Top Right
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.imageTitles[index] || ""}
                      onChange={(e) => handleArrayChange("imageTitles", index, e.target.value)}
                      placeholder="Enter title for this image..."
                      className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Progress</label>
                    <input
                      type="text"
                      value={formData.imageProgress[index] || ""}
                      onChange={(e) => handleArrayChange("imageProgress", index, e.target.value)}
                      placeholder="Enter progress status..."
                      className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subheading</label>
                    <input
                      type="text"
                      value={formData.imageSubheadings[index] || ""}
                      onChange={(e) => handleArrayChange("imageSubheadings", index, e.target.value)}
                      placeholder="Enter subheading..."
                      className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Content for this Image</label>
                    <textarea
                      value={formData.imageContents[index] || ""}
                      onChange={(e) => handleArrayChange("imageContents", index, e.target.value)}
                      placeholder="Enter content that will appear on this specific image..."
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                galleryImages: [...prev.galleryImages, ""],
                imageContents: [...prev.imageContents, ""],
                imageLayouts: [...prev.imageLayouts, "left"],
                imageTitles: [...prev.imageTitles, ""],
                imageProgress: [...prev.imageProgress, ""],
                imageSubheadings: [...prev.imageSubheadings, ""]
              }));
            }}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + Add Another Photo
          </button>
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