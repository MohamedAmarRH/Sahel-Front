import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, Package, Snowflake, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { getPhoneLinks } from '../services/api';

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const yaourtRef = useRef<HTMLDivElement>(null);
  const toukoudiRef = useRef<HTMLDivElement>(null);

  const phoneLinks = getPhoneLinks();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        yaourtRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        toukoudiRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const yaourtFlavors = [
    { name: 'Nature', description: 'Le goût authentique du yaourt traditionnel', image: '/yaourt-nature.jpg' },
    { name: 'Vanille', description: 'Une touche douce et parfumée', image: '/yaourt-vanille.jpg' },
    { name: 'Datte', description: 'Le goût sucré naturel de la datte', image: '/yaourt-datte.jpg' },
  ];

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Nos Produits
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-slate-800 mb-6">
            Découvrez nos produits frais
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tous nos produits sont préparés quotidiennement avec des ingrédients de qualité 
            et conservés au froid pour garantir fraîcheur et hygiène.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Yaourt Maison Card */}
            <div
              ref={yaourtRef}
              className="card-fresh overflow-hidden"
            >
              <div className="bg-gradient-to-br from-sky-400 to-sky-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white">Yaourt Maison</h2>
                    <p className="text-sky-100 text-sm">Notre spécialité</p>
                  </div>
                </div>
                <p className="text-sky-100">
                  Un yaourt onctueux et délicieux, préparé chaque jour avec amour et expertise.
                </p>
              </div>

              <div className="p-8">
                {/* Product Images */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {yaourtFlavors.map((flavor, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <img 
                        src={flavor.image} 
                        alt={`Yaourt ${flavor.name}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  Saveurs disponibles
                </h3>
                <div className="space-y-4 mb-6">
                  {yaourtFlavors.map((flavor, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-sky-600" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">{flavor.name}</span>
                        <p className="text-sm text-slate-500">{flavor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Package className="w-4 h-4" />
                      Sachet scellé 250ml
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Snowflake className="w-4 h-4" />
                      Conservé au froid
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={phoneLinks.phone1}
                      className="flex-1 btn-primary justify-center flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Appeler
                    </a>
                    <a
                      href={phoneLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-whatsapp justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Toukoudi Card */}
            <div
              ref={toukoudiRef}
              className="card-fresh overflow-hidden"
            >
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white">Toukoudi Traditionnel</h2>
                    <p className="text-emerald-100 text-sm">Boisson traditionnelle</p>
                  </div>
                </div>
                <p className="text-emerald-100">
                  La boisson traditionnelle nigérienne par excellence, parfaite pour les célébrations.
                </p>
              </div>

              <div className="p-8">
                {/* Product Image */}
                <div className="rounded-xl overflow-hidden mb-6">
                  <img 
                    src="/toukoudi.jpg" 
                    alt="Toukoudi Traditionnel"
                    className="w-full h-32 object-cover"
                  />
                </div>

                <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Caractéristiques
                </h3>
                <div className="space-y-4 mb-6">
                  {[
                    { 
                      title: 'Goût traditionnel authentique', 
                      description: 'La recette traditionnelle transmise de génération en génération' 
                    },
                    { 
                      title: 'Parfait pour les fêtes', 
                      description: 'Très demandé pour les mariages, baptêmes et célébrations' 
                    },
                    { 
                      title: 'Emballage hygiénique', 
                      description: 'Sachet scellé pour garantir la fraîcheur et l\'hygiène' 
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">{item.title}</span>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Package className="w-4 h-4" />
                      Sachet scellé
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Snowflake className="w-4 h-4" />
                      Conservé au froid
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={phoneLinks.phone1}
                      className="flex-1 btn-primary justify-center flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Phone className="w-4 h-4" />
                      Appeler
                    </a>
                    <a
                      href={phoneLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-whatsapp justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
                  <Snowflake className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-display text-lg text-slate-800 mb-2">
                  Frais du jour
                </h3>
                <p className="text-slate-600 text-sm">
                  Tous nos produits sont préparés chaque matin pour garantir une fraîcheur optimale.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-display text-lg text-slate-800 mb-2">
                  Emballage sécurisé
                </h3>
                <p className="text-slate-600 text-sm">
                  Sachets scellés de 250ml pour une hygiène parfaite et une conservation optimale.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-slate-800 mb-2">
                  Qualité garantie
                </h3>
                <p className="text-slate-600 text-sm">
                  Des ingrédients soigneusement sélectionnés pour un produit de qualité supérieure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
