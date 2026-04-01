import { useState, useEffect } from 'react';
import { Menu, X, Milk, Phone, MessageCircle } from 'lucide-react';
import { getPhoneLinks, getPhoneDisplay } from '../services/api';

interface NavigationProps {
  currentPage: 'home' | 'products' | 'events' | 'contact' | 'reviews';
  onPageChange: (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPhones, setShowPhones] = useState(false);

  const phoneLinks = getPhoneLinks();
  const phoneDisplay = getPhoneDisplay();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as const, label: 'Accueil' },
    { id: 'products' as const, label: 'Produits' },
    { id: 'events' as const, label: 'Commande Événements' },
    { id: 'reviews' as const, label: 'Avis Clients' },
    { id: 'contact' as const, label: 'Contact' },
  ];

  const handleNavClick = (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Milk className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-display text-lg text-slate-800 leading-tight">
                  Yaourt du Sahel
                </span>
                <span className="text-xs text-slate-500 hidden sm:block">
                  Zinder - {phoneDisplay.phone1}
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-sky-50 text-sky-600'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {/* Dropdown pour les numéros */}
              <div className="relative">
                <button
                  onClick={() => setShowPhones(!showPhones)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </button>
                
                {showPhones && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <a
                      href={phoneLinks.phone1}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowPhones(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Ligne 1</p>
                        <p className="text-xs text-slate-500">{phoneDisplay.phone1}</p>
                      </div>
                    </a>
                    <a
                      href={phoneLinks.phone2}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowPhones(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Ligne 2</p>
                        <p className="text-xs text-slate-500">{phoneDisplay.phone2}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                href={phoneLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-100 my-2" />
            
            {/* Mobile Phone Buttons */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 px-4">Nous appeler</p>
              <a
                href={phoneLinks.phone1}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 text-sky-600"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">{phoneDisplay.phone1}</span>
              </a>
              <a
                href={phoneLinks.phone2}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 text-sky-600"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">{phoneDisplay.phone2}</span>
              </a>
            </div>
            
            <a
              href={phoneLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white font-medium mt-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
