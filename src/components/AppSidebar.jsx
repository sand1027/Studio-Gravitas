"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/home", label: "Home" },
    { href: "/architecture", label: "Architecture" },
    { href: "/art", label: "Art" },
    { href: "/objects", label: "Objects" },
    { href: "/thoughts", label: "Thoughts" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
    { href: "/upload", label: "Upload", hideOnMobile: true },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="text-lg font-light tracking-wider whitespace-nowrap">STUDIO GRAVITAS</div>
        <button 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-gray-50 rounded-md transition-colors z-50"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-b border-gray-100 fixed top-16 left-0 right-0 z-40 transform ${
          open ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <nav className="p-6 space-y-4">
          {links.filter(link => !link.hideOnMobile).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-lg font-light text-gray-800 hover:text-black transition-colors cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white w-64 fixed h-screen overflow-hidden">
        <div className="pt-8 pb-6 px-6">
          <h1 className="text-sm font-normal tracking-wide text-black">STUDIO GRAVITAS</h1>
        </div>
        
        <nav className="overflow-hidden space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block py-2 px-6 text-xs font-normal transition-colors cursor-pointer relative z-10 ${
                  isActive 
                    ? 'text-black bg-gray-50' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                } no-underline`}
                style={{ textDecoration: 'none', pointerEvents: 'auto' }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-xs text-gray-400 space-y-1">
            <p>Architecture Studio</p>
            <p>India International</p>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}