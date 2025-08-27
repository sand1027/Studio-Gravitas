"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/architecture", label: "Architecture" },
    { href: "/arts", label: "Arts" },
    { href: "/objects", label: "Objects" },
    { href: "/thoughts", label: "Thoughts" },
    { href: "/about", label: "About", spaceBefore: true },
    { href: "/contact", label: "Contact" },
    { href: "/upload", label: "Upload", hideOnMobile: true },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50" suppressHydrationWarning={true}>
        <a href="/" className="text-lg font-thin tracking-wider whitespace-nowrap studio-title text-black" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
        <button 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-gray-50/50 rounded-md transition-colors z-50 text-black"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-16 left-0 right-0 z-40 transform ${
          open ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
        suppressHydrationWarning={true}
      >
        <nav className="p-6 space-y-4">
          {links.filter(link => !link.hideOnMobile).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block py-2 text-lg font-light text-black hover:text-gray-600 transition-colors cursor-pointer ${
                link.spaceBefore ? 'mt-4' : ''
              }`}
              style={{ pointerEvents: 'auto' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white/80 backdrop-blur-sm w-80 fixed h-screen overflow-hidden z-50">
        <div className="pt-8 pb-6 px-6">
          <a href="/" className="text-4xl font-thin tracking-wide text-black studio-title whitespace-nowrap hover:text-gray-700 transition-colors" style={{fontWeight: '100'}}>STUDIO GRAVITAS</a>
        </div>
        
        <nav className="overflow-hidden">
          {links.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block py-0 px-6 text-base font-normal transition-colors cursor-pointer relative z-10 ${
                  isActive 
                    ? 'text-black bg-white/50' 
                    : 'text-gray-700 hover:text-black hover:bg-white/30'
                } ${link.spaceBefore ? 'mt-4' : ''} no-underline`}
                style={{ textDecoration: 'none', pointerEvents: 'auto' }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

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