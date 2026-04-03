import { useEffect, useState } from 'react';
import './index.css';
import Navigation from './sections/Navigation';
import Home from './sections/Home';
import Products from './sections/Products';
import EventsOrder from './sections/EventsOrder';
import Contact from './sections/Contact';
import Reviews from './sections/Reviews';
import Footer from './sections/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'events' | 'contact' | 'reviews'>('home');

  x  useEffect(() => {
    // Changement de titre dynamique pour le SEO
    const titles = {
      home: 'Yaourt du Sahel - Yaourt Maison & Toukoudi à Zinder',
      products: 'Nos Yaourts & Toukoudi - Yaourt du Sahel',
      events: 'Commandes Événements (Mariages, Baptêmes) - Yaourt du Sahel',
      reviews: 'Avis Clients - Ce qu’ils pensent de nos Yaourts',
      contact: 'Contactez Yaourt du Sahel - Commande et Livraison'
    };

    document.title = titles[currentPage];
    
    // Configuration Viewport (déjà bonne)
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: 'home' | 'products' | 'events' | 'contact' | 'reviews') => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main>
        {currentPage === 'home' && <Home onPageChange={handlePageChange} />}
        {currentPage === 'products' && <Products />}
        {currentPage === 'events' && <EventsOrder />}
        {currentPage === 'reviews' && <Reviews />}
        {currentPage === 'contact' && <Contact />}
      </main>
      
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
