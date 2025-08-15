"use client";

import AppSidebar from "@/components/AppSidebar";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 lg:p-12 bg-gray-50 min-h-screen pt-20 lg:pt-12 lg:ml-72">
        {children}
      </main>
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