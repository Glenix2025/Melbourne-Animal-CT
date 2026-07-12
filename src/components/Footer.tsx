/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Facebook, Instagram, Linkedin, HeartHandshake } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  
  const handleNavClick = (value: Page) => {
    onPageChange(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-medium text-charcoal-800 py-12 border-t border-cream-dark" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <Logo size={42} className="transform group-hover:scale-105 transition-transform duration-300" />
              <div>
                <div className="font-display font-extrabold text-lg leading-tight text-charcoal-900 group-hover:text-sage-700 transition-colors">
                  Melbourne <span className="text-sage-700">Animal CT</span>
                </div>
                <div className="font-sans text-[9px] font-bold tracking-widest text-charcoal-500/80 uppercase leading-none mt-1">
                  Diagnostic Excellence • Brunswick
                </div>
              </div>
            </div>
            
            <p className="text-xs text-charcoal-500 max-w-sm font-medium leading-relaxed">
              We are Melbourne's dedicated pet CT-scanning experts. Focusing solely on advanced computed tomography allows us to offer transparent pricing, rapid turns, and board-certified radiologist analysis.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="h-8 w-8 rounded-full bg-cream-dark hover:bg-terracotta-500 hover:text-white transition-all flex items-center justify-center text-charcoal-800">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-cream-dark hover:bg-terracotta-500 hover:text-white transition-all flex items-center justify-center text-charcoal-800">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-cream-dark hover:bg-terracotta-500 hover:text-white transition-all flex items-center justify-center text-charcoal-800">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-charcoal-900 uppercase tracking-wider">Quick Directory</h4>
            <ul className="space-y-2 text-xs text-charcoal-500 font-medium">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-terracotta-500 transition-colors cursor-pointer text-left">
                  Homepage
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-terracotta-500 transition-colors cursor-pointer text-left">
                  Diagnostic Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-terracotta-500 transition-colors cursor-pointer text-left">
                  Our Radiologists
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-terracotta-500 transition-colors cursor-pointer text-left">
                  FAQ Accordion
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-terracotta-500 transition-colors cursor-pointer text-left">
                  Contact & Referrals
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Details Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-charcoal-900 uppercase tracking-wider">Brunswick Contact</h4>
            <ul className="space-y-2 text-xs text-charcoal-500 font-medium">
              <li>
                <span className="font-bold text-charcoal-900">Clinic:</span> 590 Sydney Road, Brunswick VIC 3056
              </li>
              <li>
                <span className="font-bold text-charcoal-900">Tel:</span> <a href="tel:0392562896" className="hover:text-terracotta-500">03 9256 2896</a>
              </li>
              <li>
                <span className="font-bold text-charcoal-900">Email:</span> <a href="mailto:info@melbourneanimalct.com.au" className="hover:text-terracotta-500">info@melbourneanimalct.com.au</a>
              </li>
              <li>
                <span className="font-bold text-charcoal-900">Hours:</span> Mon - Fri 8:30am - 5:30pm
              </li>
            </ul>
          </div>

        </div>

        {/* Demo Pitch Disclaimer - adds a massive layer of professionalism */}
        <div className="border-t border-cream-dark pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-cream-dark p-3 rounded-2xl max-w-xl">
            <HeartHandshake className="h-5 w-5 text-terracotta-500 shrink-0" />
            <p className="text-[10px] text-charcoal-500 leading-normal font-medium">
              <span className="font-bold text-charcoal-900 uppercase tracking-wider block mb-0.5">Interactive Sales Pitch Pitch-Deck Demo</span>
              This custom sales demo is designed specifically for Melbourne Animal CT. All logos, images, pricing structures, staff bios, and review content are fully customizable during onboarding.
            </p>
          </div>

          <div className="text-right text-[10px] text-charcoal-500">
            <div>© {currentYear} Melbourne Animal CT Demo. All Rights Reserved.</div>
            <div className="mt-1">Designed with Pawsy Chatbot Core</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
