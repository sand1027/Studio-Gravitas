"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AppSidebar from "@/components/AppSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const isLandingPage = pathname === '/landing';
  const isThoughtsPage = pathname === '/thoughts';
  const isArtsPage = pathname === '/arts';
  const isObjectsPage = pathname === '/objects';
  const isProjectPage = pathname?.startsWith('/projects/');
  
  // Pages that have their own custom navigation
  if (isRootPage || isLandingPage || isThoughtsPage || isArtsPage || isObjectsPage || isProjectPage) {
    return (
      <div className="w-full">
        {children}
        <ScrollToTop />
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
      </div>
    );
  }

  // All other pages use AppSidebar for consistent navigation
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className={`lg:p-0 bg-white min-h-screen transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'mt-[220px] lg:mt-0' : 'mt-0'
      }`}>
        {children}
      </main>
      <ScrollToTop />
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
    </div>
  );
}