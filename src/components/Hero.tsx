/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Stethoscope, ChevronRight, Heart, Shield, Award, Sparkles } from 'lucide-react';
import { Page } from '../types';
// @ts-ignore
import ctScanImage from '../assets/images/ge_optima_ct_scan_1783827552748.jpg';

interface HeroProps {
  onPageChange: (page: Page) => void;
  onOpenBooking: (type?: 'owner' | 'vet') => void;
  onSelectServicesTab: (tab: 'what-is-ct' | 'pet-owners' | 'referring-vets') => void;
}

export default function Hero({ onPageChange, onOpenBooking, onSelectServicesTab }: HeroProps) {
  
  const handleAudienceClick = (tab: 'pet-owners' | 'referring-vets') => {
    onSelectServicesTab(tab);
    onPageChange('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-cream-medium/40 via-cream-light to-cream-light" id="hero-section">
      
      {/* Decorative Orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-terracotta-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-sage-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sage-500/10 text-sage-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-sage-600 animate-pulse" />
              Veterinary CT-Scanning Specialists • Brunswick
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-charcoal-900 leading-[1.15]">
              Absolute clarity &amp; specialist insight for your <span className="italic font-normal text-terracotta-500">beloved</span> pets.
            </h1>
            
            <p className="text-base sm:text-lg text-charcoal-500 max-w-2xl mx-auto lg:mx-0 font-medium">
              We are Brunswick's dedicated veterinary CT-scanning clinic. By focusing solely on high-resolution 3D diagnostics, we provide same-day answers with zero clinical consult fees, working alongside your regular vet.
            </p>

            {/* Differentiator Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <div className="h-5 w-5 bg-terracotta-500/10 text-terracotta-500 rounded-full flex items-center justify-center font-bold">✓</div>
                <span>Same-day Scan & Report</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <div className="h-5 w-5 bg-terracotta-500/10 text-terracotta-500 rounded-full flex items-center justify-center font-bold">✓</div>
                <span>No Auxiliary Consult Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 col-span-2 sm:col-span-1">
                <div className="h-5 w-5 bg-terracotta-500/10 text-terracotta-500 rounded-full flex items-center justify-center font-bold">✓</div>
                <span>Specialist Interpretation</span>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => onOpenBooking('owner')}
                className="px-8 py-4 bg-terracotta-500 text-white font-bold rounded-full shadow-lg hover:bg-terracotta-600 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Calendar className="h-5 w-5" />
                <span>Book CT Scan Callback</span>
              </button>
              
              <a
                href="tel:0392562896"
                className="px-8 py-4 bg-white border border-cream-dark text-charcoal-800 font-bold rounded-full shadow-sm hover:border-terracotta-500 hover:text-terracotta-500 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>Call Urgent Line: 03 9256 2896</span>
              </a>
            </div>

          </div>

          {/* Hero Right Media (Rounded organically like Vets on Crown) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Organic rounded picture framing */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-[60px] rounded-tl-[120px] rounded-br-[120px] border-[12px] border-cream-medium overflow-hidden shadow-2xl bg-cream-dark group">
              <img 
                src={ctScanImage} 
                alt="State-of-the-Art GE Optima CT Scanner at Melbourne Animal CT"
                className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>

            {/* Overlapping Badge: Diagnostic specialist */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white p-4 rounded-2xl shadow-xl border border-cream-medium flex items-center gap-3 animate-fadeIn">
              <div className="h-10 w-10 bg-sage-500/15 text-sage-600 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Board-Certified</div>
                <div className="text-sm font-extrabold text-charcoal-900">Veterinary Radiologist</div>
              </div>
            </div>

            {/* Overlapping Badge 2: Scanner detail */}
            <div className="absolute top-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-cream-medium flex items-center gap-3 animate-fadeIn">
              <div className="h-10 w-10 bg-terracotta-500/15 text-terracotta-500 rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Equipment</div>
                <div className="text-sm font-extrabold text-charcoal-900">State-of-the-Art GE CT</div>
              </div>
            </div>

          </div>

        </div>

        {/* Dual Audience Paths Cards (Replicating dedicated pathways) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 md:mt-24">
          
          {/* Path 1: Pet Owners */}
          <div 
            onClick={() => handleAudienceClick('pet-owners')}
            className="group relative bg-cream-medium/70 hover:bg-cream-medium border border-cream-dark/60 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 bg-terracotta-500/10 text-terracotta-500 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-terracotta-500 group-hover:text-white transition-colors">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 group-hover:text-terracotta-500 transition-colors">
                Info For Pet Owners
              </h3>
              <p className="text-sm text-charcoal-500 mt-3 font-medium">
                Has your vet recommended a CT scan for your beloved pet? Learn how CT scans work, view transparent pricing, understand fasting guidelines, and request a booking callback.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-extrabold text-terracotta-500 mt-6 group-hover:translate-x-1.5 transition-transform">
              <span>View Pet Owner Guide</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Path 2: Referring Vets */}
          <div 
            onClick={() => handleAudienceClick('referring-vets')}
            className="group relative bg-sage-500/5 hover:bg-sage-500/10 border border-sage-500/20 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 bg-sage-500/10 text-sage-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-sage-500 group-hover:text-white transition-colors">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-charcoal-900 group-hover:text-sage-600 transition-colors">
                Info For Referring Vets
              </h3>
              <p className="text-sm text-charcoal-500 mt-3 font-medium">
                Refer patients seamlessly. Explore our high-speed imaging workflow, rapid 4-hour turnaround for urgent cases, direct specialist radiologist reports, and technical imaging specs.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-extrabold text-sage-600 mt-6 group-hover:translate-x-1.5 transition-transform">
              <span>Refer a Patient Now</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
