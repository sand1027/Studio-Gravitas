"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-end justify-center pb-16">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="text-6xl font-light tracking-[0.3em] text-black animate-pulse">
            STUDIO GRAVITAS
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-px bg-black animate-pulse"></div>
        </div>
        
        {/* Subtitle */}
        <div className="text-sm text-gray-500 tracking-widest uppercase">
          Architecture Studio
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-px bg-gray-200 relative overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-2 font-mono">
            {progress}%
          </div>
        </div>
        
        {/* Animated Dots */}
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-xs text-gray-400 tracking-wide">
          Loading Portfolio...
        </div>
      </div>
    </div>
  );
}