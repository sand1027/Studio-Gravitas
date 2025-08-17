"use client";

import { usePathname } from 'next/navigation';
import AppSidebar from "@/components/AppSidebar";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const isLandingPage = pathname === '/landing';
  const isThoughtsPage = pathname === '/thoughts';
  const isArtPage = pathname === '/art';
  const isObjectsPage = pathname === '/objects';
  const isProjectPage = pathname?.startsWith('/projects/');
  
  if (isRootPage || isLandingPage || isThoughtsPage || isArtPage || isObjectsPage || isProjectPage) {
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-0 bg-white min-h-screen pt-20 lg:pt-0 lg:ml-64">
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