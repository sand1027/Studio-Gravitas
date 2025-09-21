"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function AppSidebar({ open, setOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const pathname = usePathname();
  
  // Use props if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = setOpen !== undefined ? setOpen : setInternalOpen;

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, setIsOpen]);

  const links = [
    { href: "/architecture", label: "Architecture" },
    { href: "/thoughts", label: "Thoughts" },
    { href: "/objects", label: "Objects" },
    { href: "/arts", label: "Arts" },
    { href: "/about", label: "About", spaceBefore: true },
    { href: "/contact", label: "Contact" },
    { href: "/upload", label: "Upload", hideOnMobile: true },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50" suppressHydrationWarning={true}>
        <a href="/" className="block">
          <img src="/studioGravitas-logo.svg" alt="Studio Gravitas" className="h-8" />
        </a>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-gray-50/50 rounded-md transition-colors z-50 text-black"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white/90 backdrop-blur-sm border-b border-gray-100/50 fixed top-16 left-0 right-0 z-40 transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
        suppressHydrationWarning={true}
      >
        <nav className="p-6 space-y-3">
          {links.filter(link => !link.hideOnMobile).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block py-1 text-sm font-light text-gray-800 hover:text-gray-600 transition-colors cursor-pointer ${
                link.spaceBefore ? 'mt-3' : ''
              }`}
              style={{ pointerEvents: 'auto' }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white/80 backdrop-blur-sm w-80 fixed h-screen overflow-hidden z-50">
        <div className="pt-8 pb-6 px-6">
          <a href="/" className="block">
            <img src="/studioGravitas-logo.svg" alt="Studio Gravitas" className="h-12" />
          </a>
        </div>
        
        <nav className="overflow-hidden">
          {links.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block py-0 px-6 text-sm font-normal transition-colors cursor-pointer relative z-10 ${
                  isActive 
                    ? 'text-gray-800 bg-white/50' 
                    : 'text-gray-700 hover:text-gray-800 hover:bg-white/30'
                } ${link.spaceBefore ? 'mt-4' : ''} no-underline`}
                style={{ textDecoration: 'none', pointerEvents: 'auto' }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

      </aside>


    </>
  );
}