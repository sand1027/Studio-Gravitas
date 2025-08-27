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
  const isArtsPage = pathname === '/arts';
  const isObjectsPage = pathname === '/objects';
  const isProjectPage = pathname?.startsWith('/projects/');
  
  if (isRootPage || isLandingPage || isThoughtsPage || isArtPage || isArtsPage || isObjectsPage || isProjectPage) {
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
    <div className="min-h-screen">
      <AppSidebar />
      <main className="p-6 lg:p-0 bg-white min-h-screen pt-20 lg:pt-0">
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