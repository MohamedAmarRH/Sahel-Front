import { Milk, Heart, Phone, MessageCircle } from 'lucide-react';
import { getPhoneLinks, getPhoneDisplay } from '../services/api';

interface FooterProps {
  onPageChange: (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => void;
}

const Footer = ({ onPageChange }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const phoneLinks = getPhoneLinks();
  const phoneDisplay = getPhoneDisplay();

  const quickLinks = [
    { label: 'Accueil', page: 'home' as const },
    { label: 'Produits', page: 'products' as const },
    { label: 'Commande Événements', page: 'events' as const },
    { label: 'Avis Clients', page: 'reviews' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  const handleLinkClick = (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <button
                onClick={() => handleLinkClick('home')}
                className="flex items-center gap-3 mb-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Milk className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl">Yaourt du Sahel</span>
              </button>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Yaourt et Toukoudi faits maison à {phoneDisplay.location}. 
                Des produits frais, propres et hygiéniques pour votre plaisir quotidien.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={phoneLinks.phone1}
                  className="px-3 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Ligne 1
                </a>
                <a
                  href={phoneLinks.phone2}
                  className="px-3 py-2 rounded-full bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Ligne 2
                </a>
                <a
                  href={phoneLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-medium text-white mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.page)}
                      className="text-slate-400 hover:text-sky-400 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-medium text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={phoneLinks.phone1}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {phoneDisplay.phone1}
                  </a>
                </li>
                <li>
                  <a
                    href={phoneLinks.phone2}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {phoneDisplay.phone2}
                  </a>
                </li>
                <li>
                  <a
                    href={phoneLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${phoneDisplay.email}`}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {phoneDisplay.email}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{phoneDisplay.location}, Niger - Livraison disponible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              Yaourt du Sahel - Yaourt et Toukoudi faits maison au Niger
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> à {phoneDisplay.location} {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
