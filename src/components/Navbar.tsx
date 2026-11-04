import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenLineModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLineModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '#advantages' },
    { name: '程度介紹', href: '#courses' },
    { name: '師資介紹', href: '#teachers' },
    { name: '學員好評', href: '#reviews' },
    { name: '榮譽榜', href: '#honors' },
    { name: '專欄', href: '#articles' },
    // { name: '活動集錦', href: '#activities' },
    { name: '上課規定', href: '#rules' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-3.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo matching Screenshot 1 */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 text-neutral-900 group"
          id="brand-logo-link"
        >
          {/* Brand Logo */}
          <img 
            src="logo.jpg" 
            alt="ComeDeutsch Logo" 
            className="w-7 h-7 object-contain shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform" 
          />
          <div className="flex items-baseline gap-1.5">
            <span className="font-normal text-lg sm:text-xl tracking-tight text-neutral-900 font-sans">
              康德德語
            </span>
            <span className="font-semibold text-sm sm:text-base text-neutral-600 tracking-normal font-sans">
              ComeDeutsch
            </span>
          </div>
        </a>

        {/* Desktop Navigation matching Screenshot 1 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Header Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-line-consult-btn"
            onClick={onOpenLineModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>我要諮詢</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-line-btn"
            onClick={onOpenLineModal}
            className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06C755] text-white text-xs font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            我要諮詢
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-950 rounded-lg focus:outline-hidden"
            aria-label="選單開關"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-white border-b border-neutral-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition"
            >
              {link.name}
            </a>
          ))}

          
        </div>
      )}
    </header>
  );
};
