"use client";

import { useState, useEffect, useRef } from "react";
import { Trash2, Menu, X } from "lucide-react";
import toast from 'react-hot-toast';

function ThoughtsSidebar({ menuOpen, setMenuOpen, containerRef }) {
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [menuOpen, setMenuOpen, containerRef]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50">
        <a href="/" className="font-thin tracking-wider whitespace-nowrap studio-title text-black" style={{fontWeight: '100', fontSize: '16px'}}>STUDIO GRAVITAS</a>
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
          <a href="/architecture" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="/arts" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Arts</a>
          <a href="/objects" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Objects</a>
          <a href="/thoughts" className="block py-1 text-sm font-normal transition-colors text-black no-underline" onClick={() => setMenuOpen(false)}>Thoughts</a>
          <div className="mt-4 space-y-3">
            <a href="/about" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" className="block py-1 text-sm font-normal transition-colors text-black hover:text-gray-600 no-underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 fixed h-screen z-50 pointer-events-none hidden lg:block">
        <div className="pt-8 pb-3 pl-6 pointer-events-auto">
          <a href="/" className="text-3xl font-thin tracking-wide text-white studio-title whitespace-nowrap hover:text-gray-300 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
        </div>
        
        <nav className="overflow-hidden pointer-events-auto">
          <a href="/architecture" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Architecture</a>
          <a href="/arts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Arts</a>
          <a href="/objects" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Objects</a>
          <a href="/thoughts" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-100 no-underline">Thoughts</a>
          <div className="mt-4 space-y-0">
            <a href="/about" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">About</a>
            <a href="/contact" className="block py-0 pl-6 text-sm font-normal transition-colors text-white opacity-60 hover:opacity-100 no-underline">Contact</a>
          </div>
        </nav>
      </aside>


    </>
  );
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const thoughtProjects = data.projects?.filter(p => p.category?.toLowerCase() === 'thoughts') || [];
        setThoughts(thoughtProjects);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };

    fetchThoughts();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (response.ok) {
        setIsAuthenticated(true);
        setShowAdmin(false);
      } else {
        toast.error('Invalid password');
      }
    } catch (err) {
      toast.error('Authentication failed');
    }
  };

  const deleteThought = async (thoughtId) => {
    if (confirm("Are you sure you want to delete this thought?")) {
      try {
        const response = await fetch(`/api/projects/${thoughtId}`, {
          method: "DELETE"
        });
        if (response.ok) {
          setThoughts(prev => prev.filter(p => p.id !== thoughtId));
          toast.success('Thought deleted successfully!');
        } else {
          toast.error('Delete failed');
        }
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative pt-16 lg:pt-0">
      <ThoughtsSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} containerRef={containerRef} />
      <div 
        ref={containerRef}
        className={`w-full h-screen overflow-y-auto snap-y snap-mandatory transition-all duration-300 ease-in-out lg:transform-none ${
        menuOpen ? 'mt-[275px] lg:mt-0' : 'mt-0'
      }`}>
        {thoughts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((thought) => (
          <div key={thought.id} className="w-full h-auto lg:h-screen snap-start relative mb-6 lg:mb-0">
            <img
              src={thought.coverImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
              alt={thought.title}
              className="w-[95%] mx-auto lg:w-full h-auto lg:h-full object-cover"
            />
            {/* {isAuthenticated && (
              <button
                onClick={() => deleteThought(thought.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors z-10"
              >
                <Trash2 size={16} />
              </button>
            )} */}
          </div>
        ))}
      </div>
      
      {/* {!isAuthenticated && (
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded text-sm hover:bg-opacity-30 transition-colors z-10"
        >
          Admin
        </button>
      )} */}
      
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Admin Access</h3>
            <form onSubmit={handleAuth}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white p-3 rounded-md hover:bg-gray-800"
                >
                  Access
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdmin(false)}
                  className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}