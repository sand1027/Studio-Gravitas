"use client";

import { Toaster } from 'react-hot-toast';

export default function ProjectsLayout({ children }) {
  return (
    <>
      <div className="lg:fixed lg:inset-0 lg:z-50 min-h-screen">
        {children}
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}