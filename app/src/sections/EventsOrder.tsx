import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, Users, MapPin, MessageSquare, Phone, User, Package, CheckCircle, Info, MessageCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import type { Order } from '../services/api';
import { getPhoneLinks, getPhoneDisplay } from '../services/api';

const EventsOrder = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    typeEvenement: '',
    date: '',
    quantite: '',
    adresse: '',
    message: '',
  });

  const phoneLinks = getPhoneLinks();
  const phoneDisplay = getPhoneDisplay();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const orderData: Order = {
        nom: formData.nom,
        telephone: formData.telephone,
        type_evenement: formData.typeEvenement,
        date_evenement: formData.date,
        quantite: formData.quantite,
        adresse: formData.adresse,
        message: formData.message,
      };

      const response = await api.createOrder(orderData);

      if (response.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting order:', err);
      setError('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
      
      // Fallback: save to localStorage
      const orders = JSON.parse(localStorage.getItem('yaourt_orders') || '[]');
      orders.push({
        ...formData,
        id: Date.now(),
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('yaourt_orders', JSON.stringify(orders));
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes = [
    { value: '', label: 'Sélectionnez le type d\'événement' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'bapteme', label: 'Baptême' },
    { value: 'anniversaire', label: 'Anniversaire' },
    { value: 'fete', label: 'Fête' },
    { value: 'autre', label: 'Autre' },
  ];

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-display text-3xl text-slate-800 mb-4">
            Merci pour votre commande !
          </h2>
          <p className="text-slate-600 mb-6">
            Votre demande a été enregistrée. Nous vous contacterons rapidement par WhatsApp 
            ou par appel pour confirmer votre commande.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={phoneLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={phoneLinks.phone1}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Appeler
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            Commande Événements
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-slate-800 mb-6">
            Commande pour mariages, baptêmes et fêtes
          </h1>
          <p className="text-lg text-slate-600">
            Planifiez vos événements en avance. Le toukoudi traditionnel est très demandé 
            pour les célébrations. Remplissez le formulaire ci-dessous et nous vous contacterons 
            rapidement.
          </p>
        </div>
      </section>

      {/* Info Box */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Comment ça marche ?</h3>
                <p className="text-sm text-amber-700">
                  1. Remplissez le formulaire ci-dessous<br/>
                  2. Votre demande est envoyée à notre serveur<br/>
                  3. Nous vous contactons par WhatsApp ou appel pour confirmer<br/>
                  4. Vous pouvez aussi nous contacter directement !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="card-fresh p-8 md:p-10"
          >
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="input-fresh"
                  placeholder="Votre nom complet"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="input-fresh"
                  placeholder={phoneDisplay.phone1}
                />
              </div>

              {/* Type d'événement et Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="typeEvenement" className="block text-sm font-medium text-slate-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Type d'événement
                  </label>
                  <select
                    id="typeEvenement"
                    name="typeEvenement"
                    value={formData.typeEvenement}
                    onChange={handleChange}
                    required
                    className="input-fresh"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date de l'événement
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="input-fresh"
                  />
                </div>
              </div>

              {/* Quantité */}
              <div>
                <label htmlFor="quantite" className="block text-sm font-medium text-slate-700 mb-2">
                  <Package className="w-4 h-4 inline mr-2" />
                  Quantité souhaitée
                </label>
                <input
                  type="text"
                  id="quantite"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}
                  required
                  className="input-fresh"
                  placeholder="Ex: 50 sachets de yaourt, 30 sachets de toukoudi"
                />
              </div>

              {/* Adresse */}
              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Adresse de livraison (Zinder)
                </label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  className="input-fresh"
                  placeholder="Votre adresse à Zinder"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-fresh resize-none"
                  placeholder="Précisez vos besoins spécifiques, préférences de saveurs, etc."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer la demande'
                )}
              </button>

              <p className="text-center text-sm text-slate-500">
                Nous vous contacterons rapidement par WhatsApp ou appel pour confirmer votre commande.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-slate-600 mb-4">Préférez contacter directement ?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={phoneLinks.phone1}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {phoneDisplay.phone1}
              </a>
              <a
                href={phoneLinks.phone2}
                className="btn-primary flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700"
              >
                <Phone className="w-5 h-5" />
                {phoneDisplay.phone2}
              </a>
              <a
                href={phoneLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Planifiez à l'avance</h3>
              <p className="text-sm text-slate-600">
                Commandez au moins 48h avant votre événement pour garantir la disponibilité.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Grandes quantités</h3>
              <p className="text-sm text-slate-600">
                Nous pouvons préparer des quantités importantes pour vos grands événements.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Contact rapide</h3>
              <p className="text-sm text-slate-600">
                Nous vous répondons sous 24h par WhatsApp ou appel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsOrder;
