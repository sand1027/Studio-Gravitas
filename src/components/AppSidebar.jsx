"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/architecture", label: "Architecture" },
    { href: "/interior", label: "Interior" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/upload", label: "Upload", hideOnMobile: true },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="text-2xl font-light tracking-wider">MORQ</div>
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
              className="block py-2 text-lg font-light text-gray-800 hover:text-black transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white border-r border-gray-100 w-72 p-8 fixed h-screen overflow-hidden">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wider text-black">MORQ</h1>
          <div className="w-8 h-px bg-black mt-2"></div>
        </div>
        
        <nav className="space-y-1 overflow-hidden">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-base font-light transition-all duration-200 border-l-3 ${
                  isActive 
                    ? 'text-black bg-gray-100 border-black' 
                    : 'text-gray-700 hover:text-black hover:bg-gray-50 border-transparent hover:border-gray-300'
                } no-underline`}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        
        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-xs text-gray-500 space-y-1">
            <p>Architecture Studio</p>
            <p>Italy • Australia</p>
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
