import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, User, Send, ThumbsUp, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import type { Review } from '../services/api';

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Load reviews from API
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const response = await api.getReviews();
      if (response.success) {
        setReviews(response.data);
        setAverageRating(response.meta.averageRating);
        setTotalReviews(response.meta.total);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('Impossible de charger les avis. Veuillez réessayer.');
      // Fallback to localStorage
      const savedReviews = localStorage.getItem('yaourt_reviews');
      if (savedReviews) {
        const localReviews = JSON.parse(savedReviews);
        setReviews(localReviews);
        const avg = localReviews.length > 0
          ? localReviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / localReviews.length
          : 0;
        setAverageRating(avg);
        setTotalReviews(localReviews.length);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Animate on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.review-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.createReview({
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      if (response.success) {
        setReviews([response.data, ...reviews]);
        setNewReview({ name: '', rating: 5, comment: '' });
        setIsSubmitted(true);
        
        // Update stats
        setTotalReviews(prev => prev + 1);
        const newAvg = ((averageRating * totalReviews) + newReview.rating) / (totalReviews + 1);
        setAverageRating(newAvg);
        
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      
      // Fallback: save to localStorage
      const review: Review = {
        id: Date.now().toString(),
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        likes: 0,
        created_at: new Date().toISOString(),
      };
      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('yaourt_reviews', JSON.stringify(updatedReviews));
      setNewReview({ name: '', rating: 5, comment: '' });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await api.likeReview(id);
      setReviews(reviews.map(r => 
        r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r
      ));
    } catch (err) {
      console.error('Error liking review:', err);
      // Fallback: update locally
      setReviews(reviews.map(r => 
        r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r
      ));
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => setNewReview({ ...newReview, rating: star }) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (interactive && hoveredStar ? hoveredStar : rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div ref={sectionRef} className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
            Avis Clients
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-slate-800 mb-6">
            Ce que disent nos clients
          </h1>
          
          {/* Rating Summary */}
          {!isLoading && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-display text-slate-800">{averageRating.toFixed(1)}</span>
                <div className="flex flex-col items-start">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(averageRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">{totalReviews} avis</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Review Form */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="card-fresh p-6 md:p-8">
            <h2 className="font-display text-xl text-slate-800 mb-6">
              Laisser un avis
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium">Merci pour votre avis !</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                    className="input-fresh"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Note
                  </label>
                  {renderStars(newReview.rating, true)}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Votre commentaire
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                    rows={4}
                    className="input-fresh resize-none"
                    placeholder="Partagez votre expérience..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer mon avis
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl text-slate-800 mb-6">
            Tous les avis ({totalReviews})
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500 mx-auto" />
              <p className="text-slate-500 mt-4">Chargement des avis...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card card-fresh p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{review.name}</h3>
                        <p className="text-sm text-slate-500">{formatDate(review.created_at)}</p>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-slate-600 mb-4">{review.comment}</p>
                  
                  <button
                    onClick={() => review.id && handleLike(review.id)}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Utile ({review.likes || 0})
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && reviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">Soyez le premier à laisser un avis !</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
