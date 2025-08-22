"use client";

import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";

export default function MainPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Get the first project or use House of Balance as default
  const mainProject = projects.find(p => p.title.toLowerCase().includes('house of balance')) || projects[0];

  return (
    <>
      <AppSidebar />
      {/* Responsive Layout */}
      <div className="min-h-screen bg-white lg:pt-0 pt-16">
        <main className="lg:ml-64 lg:h-screen lg:flex lg:items-center lg:justify-center p-4 lg:p-0 mt-8 lg:mt-0">
          {mainProject ? (
            <a 
              href={`/projects/${mainProject.category}/${mainProject.subcategory}/${mainProject.slug}`}
              className="block w-full lg:w-[96%] h-64 lg:h-[94%] cursor-pointer"
            >
              <img
                src={mainProject.coverImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                alt={mainProject.title}
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            <div className="flex items-center justify-center h-64 lg:h-full">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}