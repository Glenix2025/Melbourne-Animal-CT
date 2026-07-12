/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { faqs } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'owners' | 'vets'>('all');
  const [openFAQId, setOpenFAQId] = useState<string | null>('faq-1'); // Default first item open

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory === 'owners') return faq.category === 'owners' || faq.category === 'general';
    if (activeCategory === 'vets') return faq.category === 'vets' || faq.category === 'general';
    return true;
  });

  const toggleFAQ = (id: string) => {
    if (openFAQId === id) {
      setOpenFAQId(null);
    } else {
      setOpenFAQId(id);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-cream-medium/30 relative" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-500/10 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Answers to your questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Frequently Asked <span className="text-terracotta-500">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal-500 mt-3 font-medium">
            Clear, transparent details about our diagnostic imaging procedures, sedation standards, and medical referral workflows.
          </p>
        </div>

        {/* Category Toggles (Subtle button bar) */}
        <div className="flex justify-center gap-1.5 bg-cream-medium p-1 rounded-xl max-w-md mx-auto mb-10 border border-cream-dark/50">
          <button
            onClick={() => {
              setActiveCategory('all');
              setOpenFAQId(null);
            }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setActiveCategory('owners');
              setOpenFAQId('faq-2');
            }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === 'owners'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            For Pet Owners
          </button>
          <button
            onClick={() => {
              setActiveCategory('vets');
              setOpenFAQId('faq-5');
            }}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === 'vets'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            For Veterinarians
          </button>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordions">
          {filteredFaqs.map((faq) => {
            const isOpen = openFAQId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-cream-dark/50 shadow-sm overflow-hidden transition-all duration-300"
              >
                
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-cream-light/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-terracotta-500' : 'text-charcoal-500 group-hover:text-terracotta-500'} transition-colors`} />
                    <span className="font-bold text-charcoal-900 text-sm sm:text-base leading-tight group-hover:text-terracotta-500 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className="h-7 w-7 rounded-full bg-cream-medium/50 flex items-center justify-center text-charcoal-500 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Answer Panels */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-cream-light animate-fadeIn">
                    <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-medium pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
