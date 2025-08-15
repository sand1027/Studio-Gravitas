"use client";

import { useState } from "react";
import { Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import SimpleImage from "./SimpleImage";

export default function ProjectCard({ title, description, image, href, projectInfo, galleryImages = [] }) {
  const [showInfo, setShowInfo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [image, ...galleryImages].filter(Boolean);
  const displayImage = image || 'https://tse2.mm.bing.net/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain&o=7&rm=3';
  
  console.log('ProjectCard render - Title:', title, 'Image:', image, 'Display Image:', displayImage);

  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInfo(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="group relative bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
        <a href={href} className="block">
          <div className="relative overflow-hidden bg-gray-100">
            <div className="w-full h-64 lg:h-72 bg-gray-200 overflow-hidden">
              <SimpleImage
                src={displayImage}
                alt={title || 'Project image'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-light tracking-wide text-black mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </a>
        
        {/* View Details Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleInfoClick}
            className="bg-white text-black px-3 py-1 text-xs font-medium hover:bg-gray-100 transition-colors shadow-md border border-gray-200"
          >
            VIEW DETAILS
          </button>
        </div>
      </div>

      {/* Project Info Modal with Image Slider */}
      {showInfo && projectInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Slider Section */}
              <div className="lg:w-2/3 relative bg-gray-100">
                <div className="relative h-96 lg:h-[500px] flex items-center justify-center p-4">
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white hover:bg-opacity-90 rounded-full p-2 z-20 transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white hover:bg-opacity-90 rounded-full p-2 z-20 transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  
                  <img
                    src={allImages[currentImageIndex] || 'https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=No+Image'}
                    alt={`${title} ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=Image+Not+Found';
                    }}
                  />
                  
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Info Section */}
              <div className="lg:w-1/3 p-6 overflow-y-auto h-96 lg:h-[500px]">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-light tracking-wide pr-4">{title}</h3>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div><span className="font-medium text-black">Location:</span> {projectInfo.location}</div>
                  <div><span className="font-medium text-black">Year:</span> {projectInfo.year}</div>
                  {projectInfo.area && <div><span className="font-medium text-black">Area:</span> {projectInfo.area}</div>}
                  {projectInfo.status && <div><span className="font-medium text-black">Status:</span> {projectInfo.status}</div>}
                  {projectInfo.client && <div><span className="font-medium text-black">Client:</span> {projectInfo.client}</div>}
                  {projectInfo.team && <div><span className="font-medium text-black">Team:</span> {projectInfo.team}</div>}
                  {projectInfo.budget && <div><span className="font-medium text-black">Budget:</span> {projectInfo.budget}</div>}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="font-medium text-black mb-2">Description:</div>
                    <p className="leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
