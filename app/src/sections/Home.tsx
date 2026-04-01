import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Snowflake, ShieldCheck, Truck, ArrowRight, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { getPhoneLinks, getPhoneDisplay } from '../services/api';

interface HomeProps {
  onPageChange: (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => void;
}

const Home = ({ onPageChange }: HomeProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);

  const phoneLinks = getPhoneLinks();
  const phoneDisplay = getPhoneDisplay();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(
        advantagesRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15, delay: 0.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const advantages = [
    {
      icon: Snowflake,
      title: 'Frais du jour',
      description: 'Préparé chaque matin pour une fraîcheur optimale',
      color: 'blue',
    },
    {
      icon: ShieldCheck,
      title: 'Hygiène garantie',
      description: 'Produit propre en sachet scellé, conservé au froid',
      color: 'green',
    },
    {
      icon: Truck,
      title: 'Livraison disponible',
      description: 'Livraison rapide à Zinder et environs',
      color: 'blue',
    },
  ];

  return (
    <div ref={heroRef} className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Yaourt du Sahel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Disponible maintenant à Zinder
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 leading-tight mb-6"
          >
            Yaourt maison frais
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
              du jour à Zinder
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8"
          >
            Produit propre, frais, en sachet scellé, conservé au froid.
            <br className="hidden sm:block" />
            Découvrez le goût authentique du yaourt fait maison.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col items-center gap-4">
            {/* WhatsApp Principal */}
            <a
              href={phoneLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4"
            >
              <MessageCircle className="w-5 h-5" />
              Commander sur WhatsApp
            </a>
            
            {/* Numéros de téléphone */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-slate-500 text-sm">Ou appelez-nous :</span>
              <div className="flex gap-2">
                <a
                  href={phoneLinks.phone1}
                  className="px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {phoneDisplay.phone1}
                </a>
                <a
                  href={phoneLinks.phone2}
                  className="px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {phoneDisplay.phone2}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-fresh bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-slate-800 mb-4">
              Pourquoi choisir Yaourt du Sahel ?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir des produits de qualité, frais et hygiéniques
            </p>
          </div>

          <div
            ref={advantagesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="card-fresh p-8 text-center group"
              >
                <div
                  className={`icon-circle mx-auto mb-6 ${
                    advantage.color === 'blue' ? 'icon-circle-blue' : 'icon-circle-green'
                  } group-hover:scale-110 transition-transform`}
                >
                  <advantage.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl text-slate-800 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-slate-600">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="section-fresh">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Nos Produits
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-slate-800 mb-6">
                Yaourt Maison & Toukoudi Traditionnel
              </h2>
              <p className="text-slate-600 mb-6">
                Découvrez notre sélection de produits frais faits maison. Du yaourt nature 
                au toukoudi traditionnel, nous avons ce qu'il vous faut pour rafraîchir 
                vos journées.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Yaourt nature, vanille et datte',
                  'Toukoudi traditionnel pour les fêtes',
                  'Sachets scellés de 250ml',
                  'Conservation au froid garantie',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onPageChange('products')}
                className="btn-primary flex items-center gap-2"
              >
                Découvrir nos produits
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Product Images Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-fresh overflow-hidden">
                <img 
                  src="/yaourt-nature.jpg" 
                  alt="Yaourt Nature" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-lg text-slate-800">Yaourt Nature</h3>
                </div>
              </div>
              <div className="card-fresh overflow-hidden mt-8">
                <img 
                  src="/toukoudi.jpg" 
                  alt="Toukoudi" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-lg text-slate-800">Toukoudi</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events CTA Section */}
      <section className="section-fresh bg-gradient-to-br from-sky-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Commande pour vos événements
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Mariages, baptêmes, fêtes... Commandez en avance pour vos célébrations. 
            Le toukoudi traditionnel est très demandé pour les occasions spéciales.
          </p>
          <button
            onClick={() => onPageChange('events')}
            className="bg-white text-sky-600 px-8 py-4 rounded-full font-medium hover:bg-sky-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 mx-auto"
          >
            Commander pour un événement
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
