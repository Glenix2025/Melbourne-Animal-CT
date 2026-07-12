/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Heart } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onOpenBooking: (type?: 'owner' | 'vet') => void;
}

export default function Header({ currentPage, onPageChange, onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Services & Guides', value: 'services' },
    { label: 'Our Specialists', value: 'about' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavClick = (value: Page) => {
    onPageChange(value);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-cream-light/95 backdrop-blur-md shadow-md border-b border-cream-dark/50 py-3' 
          : 'bg-cream-light/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="logo-container"
          >
            <Logo size={42} className="transform group-hover:scale-105 transition-transform duration-300" />
            <div>
              <div className="font-display text-lg font-extrabold leading-none tracking-tight text-charcoal-900 group-hover:text-sage-700 transition-colors flex items-center gap-1.5">
                Melbourne <span className="text-sage-700">Animal CT</span>
              </div>
              <div className="font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-charcoal-500/80 mt-1 leading-none">
                Diagnostic Excellence • Brunswick
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  currentPage === item.value
                    ? 'bg-sage-500 text-white shadow-sm border border-sage-600 font-semibold'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-cream-medium/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Details & Book CTA */}
          <div className="hidden lg:flex items-center gap-3" id="desktop-actions">
            {/* GO TO Melbourne Feline Thyroid Centre */}
            <a 
              href="https://melbournefelinethyroid.com.au" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-terracotta-500 text-white hover:bg-terracotta-600 transition-all rounded-full shadow-sm text-xs font-semibold select-none group"
            >
              <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-3 w-3 fill-terracotta-500">
                  <path d="M 50 20 C 53 20 57 24 57 28 C 57 32 55 35 52 38 C 49 41 49 44 49 47 C 49 50 47 52 45 54 M 50 20 L 46 14 L 43 18 M 45 54 L 42 61 M 42 61 L 45 68 C 45 68 40 68 37 64 C 34 60 35 55 37 51" />
                </svg>
              </div>
              <div className="text-[10px] leading-tight text-left">
                <span className="block text-[8px] font-normal opacity-90 uppercase">GO TO</span>
                <span className="font-bold">Feline Thyroid Centre</span>
              </div>
              <span className="ml-1 text-white/95 font-bold transform group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            <a 
              href="tel:0392562896"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream-dark bg-white hover:bg-cream-light text-charcoal-800 hover:text-sage-700 transition-all text-xs font-semibold"
            >
              <Phone className="h-3.5 w-3.5 text-sage-600 animate-pulse" />
              <span>03 9256 2896</span>
            </a>
            
            <button
              onClick={() => onOpenBooking('owner')}
              className="flex items-center gap-1.5 px-4.5 py-1.5 bg-sage-600 text-white text-xs font-bold rounded-full shadow-md hover:bg-sage-700 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Scan</span>
            </button>
          </div>

          {/* Mobile Menu Toggles */}
          <div className="flex items-center gap-2 md:hidden">
            <a 
              href="tel:0392562896"
              className="p-2 rounded-full border border-cream-dark/60 bg-white/80 text-terracotta-500 hover:bg-white"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-cream-medium text-charcoal-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream-light border-b border-cream-dark/80 shadow-xl py-4 px-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all ${
                  currentPage === item.value
                    ? 'bg-cream-medium text-terracotta-500 font-bold border-l-4 border-terracotta-500'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-cream-medium/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-cream-dark/60 flex flex-col gap-3">
            <a 
              href="tel:0392562896"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-cream-dark bg-white text-charcoal-800 text-base font-semibold"
            >
              <Phone className="h-5 w-5 text-terracotta-500" />
              <span>Call Brunswick: 03 9256 2896</span>
            </a>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking('owner');
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-terracotta-500 text-white text-base font-bold rounded-xl shadow-md"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Callback or Scan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
