/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { reviews } from '../data';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'owner' | 'vet'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === 'owner') return review.role === 'Pet Owner';
    if (activeFilter === 'vet') return review.role === 'Referring Veterinarian';
    return true;
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredReviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const handleFilterChange = (filter: 'all' | 'owner' | 'vet') => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

  const currentReview = filteredReviews[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-cream-light relative" id="testimonials-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Trusted by Owners <span className="text-terracotta-500">& Veterinarians</span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-500 mt-3 font-medium">
            Read real feedback and referral reports from both Brunswick pet parents and local family veterinary clinics.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-charcoal-900 text-white shadow-sm'
                : 'bg-cream-medium text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Show All
          </button>
          <button
            onClick={() => handleFilterChange('owner')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeFilter === 'owner'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'bg-cream-medium text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Pet Owners
          </button>
          <button
            onClick={() => handleFilterChange('vet')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeFilter === 'vet'
                ? 'bg-sage-500 text-white shadow-sm'
                : 'bg-cream-medium text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Referring Vets
          </button>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative" id="reviews-carousel">
          {filteredReviews.length > 0 ? (
            <div className="bg-cream-medium border border-cream-dark border-dashed rounded-[40px] p-6 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              
              {/* Pitch Warning Icon */}
              {currentReview.isPlaceholder && (
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-charcoal-800/10 text-charcoal-500 text-[9px] font-extrabold uppercase tracking-wider select-none">
                  Pitch Placeholder Review
                </div>
              )}

              {/* Quotes Mark Decorator */}
              <div className="absolute right-6 top-6 text-cream-dark/50 pointer-events-none">
                <Quote className="h-24 w-24 transform rotate-180" />
              </div>

              {/* Star Ratings */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-terracotta-500 fill-terracotta-500" />
                ))}
              </div>

              {/* Content text */}
              <p className="text-base sm:text-lg text-charcoal-800 italic leading-relaxed font-medium mb-8 relative z-10">
                "{currentReview.content}"
              </p>

              {/* Author & Info */}
              <div className="flex items-center justify-between mt-auto border-t border-cream-dark/60 pt-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-charcoal-900 border border-cream-dark font-extrabold text-sm">
                    {currentReview.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm">{currentReview.author}</h4>
                    <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-0.5">
                      <span className={`h-2 w-2 rounded-full ${currentReview.role === 'Pet Owner' ? 'bg-terracotta-500' : 'bg-sage-500'}`} />
                      <span>{currentReview.role} • {currentReview.location}</span>
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-charcoal-500 font-mono">
                  {currentReview.date}
                </div>
              </div>

              {/* Slide Nav Buttons (Floating arrows on desktop, nested on mobile) */}
              {filteredReviews.length > 1 && (
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full border border-cream-dark bg-white text-charcoal-800 hover:text-terracotta-500 transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full border border-cream-dark bg-white text-charcoal-800 hover:text-terracotta-500 transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-charcoal-500">
              No reviews found matching the filter.
            </div>
          )}
        </div>

        {/* Local clinics reference links (adds a lot of realism!) */}
        <div className="mt-12 text-center text-xs text-charcoal-500 flex flex-wrap justify-center items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 text-sage-600" />
          <span>Proudly accepting imaging referrals from clinics across Coburg, Brunswick, Fitzroy, and Melbourne CBD.</span>
        </div>

      </div>
    </section>
  );
}
