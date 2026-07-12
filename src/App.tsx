/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Page, ServiceSubTab } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import BookingModal from './components/BookingModal';
import { Sparkles, Phone, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [servicesSubTab, setServicesSubTab] = useState<ServiceSubTab>('what-is-ct');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'owner' | 'vet'>('owner');

  const handleOpenBooking = (type: 'owner' | 'vet' = 'owner') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const handleSelectServicesTab = (tab: ServiceSubTab) => {
    setServicesSubTab(tab);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col justify-between relative">
      
      {/* Clinic Emergency Alert Banner */}
      <div className="bg-charcoal-900 text-cream-light py-2 px-4 text-center text-xs border-b border-white/5 relative z-50 flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-terracotta-500 text-white text-[9px] font-extrabold uppercase tracking-wider animate-pulse">
          🚨 Same-Day Availability
        </span>
        <span className="font-medium text-cream-dark/80">Need urgent CT diagnostics for respiratory distress or spinal trauma?</span>
        <a href="tel:0392562896" className="font-extrabold text-white hover:text-terracotta-500 hover:underline inline-flex items-center gap-0.5">
          <span>Call 03 9256 2896</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {/* Navigation Header */}
      <Header 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Page Rendering Router */}
      <main className="flex-1" id="main-content-flow">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Pathway Banner */}
            <Hero 
              onPageChange={setCurrentPage}
              onOpenBooking={handleOpenBooking}
              onSelectServicesTab={handleSelectServicesTab}
            />
            {/* Say Goodbye to [pain points] Section */}
            <PainPoints />
            {/* Customer Reviews Carousel */}
            <Testimonials />
            {/* FAQ Accordion Summary */}
            <FAQSection />
            {/* Quick Contact & SVG Map section */}
            <ContactSection onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {currentPage === 'services' && (
          <div className="animate-fadeIn pt-16">
            <ServicesSection 
              activeTab={servicesSubTab}
              onTabChange={setServicesSubTab}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-fadeIn pt-16">
            <AboutSection />
          </div>
        )}

        {currentPage === 'faq' && (
          <div className="animate-fadeIn pt-16">
            <FAQSection />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="animate-fadeIn pt-16">
            <ContactSection onOpenBooking={handleOpenBooking} />
          </div>
        )}
      </main>

      {/* Business Footer */}
      <Footer onPageChange={setCurrentPage} />

      {/* Embedded Pawsy Chatbot widget */}
      <Chatbot onOpenBooking={handleOpenBooking} />

      {/* Callback/Referrals Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
      />

    </div>
  );
}
