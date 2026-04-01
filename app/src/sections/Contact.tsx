import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, Mail, MapPin, Clock, Truck, MessageCircle } from 'lucide-react';
import { getPhoneLinks, getPhoneDisplay } from '../services/api';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const phoneLinks = getPhoneLinks();
  const phoneDisplay = getPhoneDisplay();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Ligne 1',
      description: 'Appelez-nous directement',
      value: phoneDisplay.phone1,
      action: 'Appeler',
      href: phoneLinks.phone1,
      color: 'blue',
    },
    {
      icon: Phone,
      title: 'Ligne 2',
      description: 'Deuxième numéro',
      value: phoneDisplay.phone2,
      action: 'Appeler',
      href: phoneLinks.phone2,
      color: 'sky',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Commandez par message',
      value: phoneDisplay.whatsapp,
      action: 'WhatsApp',
      href: phoneLinks.whatsapp,
      color: 'green',
      isExternal: true,
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Pour toute question',
      value: phoneDisplay.email,
      action: 'Envoyer un email',
      href: `mailto:${phoneDisplay.email}`,
      color: 'amber',
    },
  ];

  const infoCards = [
    {
      icon: Truck,
      title: 'Livraison disponible',
      description: `Livraison disponible à ${phoneDisplay.location} et environs. Contactez-nous pour connaître les zones desservies.`,
      color: 'sky',
    },
    {
      icon: Clock,
      title: 'Horaires',
      description: 'Disponible tous les jours de 7h à 20h. Commandes à passer avant 18h pour le lendemain.',
      color: 'emerald',
    },
    {
      icon: MapPin,
      title: 'Zone de livraison',
      description: `${phoneDisplay.location} et environs. Livraison gratuite selon la zone et la quantité commandée.`,
      color: 'amber',
    },
  ];

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            Contact
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-slate-800 mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg text-slate-600">
            Une question ? Une commande ? N'hésitez pas à nous contacter. 
            Nous sommes disponibles par appel ou WhatsApp pour répondre rapidement à vos demandes.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="card-fresh p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    method.color === 'green'
                      ? 'bg-emerald-100'
                      : method.color === 'blue'
                      ? 'bg-sky-100'
                      : method.color === 'sky'
                      ? 'bg-sky-50'
                      : 'bg-amber-100'
                  }`}
                >
                  <method.icon
                    className={`w-6 h-6 ${
                      method.color === 'green'
                        ? 'text-emerald-600'
                        : method.color === 'blue'
                        ? 'text-sky-600'
                        : method.color === 'sky'
                        ? 'text-sky-500'
                        : 'text-amber-600'
                    }`}
                  />
                </div>
                <h3 className="font-display text-lg text-slate-800 mb-1">
                  {method.title}
                </h3>
                <p className="text-slate-500 text-sm mb-3">{method.description}</p>
                <p className="font-medium text-slate-800 text-sm mb-4">{method.value}</p>
                <a
                  href={method.href}
                  target={method.isExternal ? '_blank' : undefined}
                  rel={method.isExternal ? 'noopener noreferrer' : undefined}
                  className={
                    method.color === 'green'
                      ? 'btn-whatsapp justify-center w-full text-sm py-2'
                      : method.color === 'blue' || method.color === 'sky'
                      ? 'btn-primary w-full justify-center flex text-sm py-2'
                      : 'btn-secondary w-full justify-center flex text-sm py-2'
                  }
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="bg-slate-50 rounded-3xl p-8">
            <h2 className="font-display text-2xl text-slate-800 text-center mb-8">
              Informations pratiques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {infoCards.map((card, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      card.color === 'sky'
                        ? 'bg-sky-100'
                        : card.color === 'emerald'
                        ? 'bg-emerald-100'
                        : 'bg-amber-100'
                    }`}
                  >
                    <card.icon
                      className={`w-6 h-6 ${
                        card.color === 'sky'
                          ? 'text-sky-600'
                          : card.color === 'emerald'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp & Call CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
              Commandez maintenant
            </h2>
            <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
              Choisissez le moyen qui vous convient le mieux. 
              Nous vous répondons dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={phoneLinks.phone1}
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-full font-medium hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                {phoneDisplay.phone1}
              </a>
              <a
                href={phoneLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
