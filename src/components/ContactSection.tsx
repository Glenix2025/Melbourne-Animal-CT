/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Navigation, Send, Calendar } from 'lucide-react';
import { LeadCapture } from '../types';

interface ContactSectionProps {
  onOpenBooking: (type?: 'owner' | 'vet') => void;
}

export default function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'owner',
    petName: '',
    clinicName: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new lead
    const newLead: LeadCapture = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      contactType: formData.type as 'owner' | 'vet',
      email: formData.email,
      phone: formData.phone,
      petName: formData.type === 'owner' ? formData.petName : undefined,
      clinicName: formData.type === 'vet' ? formData.clinicName : undefined,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    const existingLeads = JSON.parse(localStorage.getItem('melbourne_animal_ct_leads') || '[]');
    localStorage.setItem('melbourne_animal_ct_leads', JSON.stringify([newLead, ...existingLeads]));

    // Dispatch storage event to keep chatbot counts updated
    window.dispatchEvent(new Event('storage'));

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'owner',
      petName: '',
      clinicName: '',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section className="py-16 md:py-24 bg-cream-light relative" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Connect With Our <span className="text-terracotta-500">Brunswick Clinic</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 mt-4 font-medium">
            Reach out directly for rapid CT scanning, diagnostic referrals, or booking inquiries.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Contact cards */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-cream-dark/60 shadow-sm flex items-start gap-4">
                <div className="h-10 w-10 bg-terracotta-500/10 text-terracotta-500 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm sm:text-base">Clinic Location</h4>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-1 font-semibold leading-relaxed">
                    590 Sydney Road, Brunswick VIC 3056
                  </p>
                  <p className="text-[11px] text-charcoal-500 mt-1">
                    Convenient off-street drop-off available for sedated patients.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-cream-dark/60 shadow-sm flex items-start gap-4">
                <div className="h-10 w-10 bg-terracotta-500/10 text-terracotta-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm sm:text-base">Clinic Numbers</h4>
                  <p className="text-xs sm:text-sm text-charcoal-800 font-bold mt-1">
                    Hotline: <a href="tel:0392562896" className="text-terracotta-500 hover:underline">03 9256 2896</a>
                  </p>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">
                    For emergency booking queries, call directly. We welcome referrals.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-cream-dark/60 shadow-sm flex items-start gap-4">
                <div className="h-10 w-10 bg-terracotta-500/10 text-terracotta-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm sm:text-base">Clinic Email</h4>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-1 font-semibold">
                    <a href="mailto:info@melbourneanimalct.com.au" className="hover:text-terracotta-500 hover:underline">info@melbourneanimalct.com.au</a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-cream-dark/60 shadow-sm flex items-start gap-4">
                <div className="h-10 w-10 bg-sage-500/10 text-sage-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 text-sm sm:text-base">Clinic Hours</h4>
                  <div className="text-xs sm:text-sm text-charcoal-500 mt-1 space-y-1 font-semibold">
                    <div className="flex justify-between gap-10">
                      <span>Mon - Fri:</span>
                      <span className="text-charcoal-800">8:30 AM – 5:30 PM</span>
                    </div>
                    <div className="flex justify-between gap-10 text-sage-600">
                      <span>Saturday:</span>
                      <span>By Appointment Only (Urgent)</span>
                    </div>
                    <div className="flex justify-between gap-10">
                      <span>Sunday:</span>
                      <span className="text-charcoal-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom SVG Map - highly responsive, matches Vet on Crown color language */}
            <div className="relative rounded-3xl overflow-hidden bg-cream-medium/70 p-4 border border-cream-dark shadow-inner min-h-[160px] flex flex-col justify-between">
              <div className="text-xs font-bold text-charcoal-800 flex items-center gap-1">
                <Navigation className="h-3.5 w-3.5 text-terracotta-500" />
                <span>Brunswick Map Directory</span>
              </div>
              
              {/* Schematic SVG Map */}
              <div className="w-full h-28 my-2 relative bg-white/60 rounded-2xl border border-cream-dark overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 400 150" className="w-full h-full text-charcoal-500 select-none">
                  {/* Grid Lines */}
                  <line x1="100" y1="0" x2="100" y2="150" stroke="#EFE6DD" strokeWidth="2" />
                  <line x1="300" y1="0" x2="300" y2="150" stroke="#EFE6DD" strokeWidth="2" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="#EFE6DD" strokeWidth="2" />
                  
                  {/* Main Road */}
                  <rect x="180" y="0" width="40" height="150" fill="#FAF8F5" />
                  <line x1="200" y1="0" x2="200" y2="150" stroke="#D27D65" strokeWidth="1.5" strokeDasharray="4 4" />
                  
                  {/* Road Labels */}
                  <text x="185" y="15" transform="rotate(90 185 15)" className="font-mono text-[8px] font-bold fill-charcoal-500 uppercase tracking-widest">Sydney Road</text>
                  <text x="20" y="70" className="font-sans text-[7px] font-bold fill-charcoal-500 uppercase tracking-widest">Albert St</text>
                  <text x="310" y="70" className="font-sans text-[7px] font-bold fill-charcoal-500 uppercase tracking-widest">Hope St</text>

                  {/* Surrounding blocks */}
                  <rect x="30" y="15" width="100" height="40" rx="4" fill="#EFE6DD" opacity="0.4" />
                  <rect x="30" y="95" width="100" height="40" rx="4" fill="#EFE6DD" opacity="0.4" />
                  <rect x="270" y="15" width="100" height="40" rx="4" fill="#EFE6DD" opacity="0.4" />
                  <rect x="270" y="95" width="100" height="40" rx="4" fill="#EFE6DD" opacity="0.4" />

                  {/* Clinic Point */}
                  <circle cx="200" cy="75" r="14" fill="#D27D65" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="200" cy="75" r="7" fill="#D27D65" stroke="#FFFFFF" strokeWidth="1.5" />
                  
                  {/* Label Clinic */}
                  <rect x="215" y="60" width="85" height="30" rx="6" fill="#2D2A26" />
                  <text x="220" y="73" className="font-display text-[8px] font-bold fill-white">Melbourne Animal CT</text>
                  <text x="220" y="83" className="font-sans text-[7px] fill-cream-medium">590 Sydney Road</text>
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] text-charcoal-500">
                <span>Opposite Brunswick tram stops</span>
                <a 
                  href="https://maps.google.com/?q=590+Sydney+Road,+Brunswick+VIC+3056" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold text-terracotta-500 hover:underline flex items-center gap-0.5"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Submission Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[40px] border border-cream-dark/60 shadow-md flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="h-16 w-16 bg-sage-500/10 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-charcoal-900">Inquiry Sent Successfully!</h3>
                <p className="text-sm text-charcoal-500 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-charcoal-900">{formData.name}</span>. We've logged your request in our Brunswick database. An imaging nurse will contact you on <span className="font-semibold text-charcoal-900">{formData.phone}</span> within the next business hour.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-terracotta-500 text-white font-bold rounded-full hover:bg-terracotta-600 transition-all cursor-pointer text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-charcoal-900">Request Callback or Referral</h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Fill in your details, and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid bg-cream-medium/80 p-1 rounded-xl grid-cols-2 text-xs font-semibold">
                  <button
                    type="button"
                    className={`py-2 text-center rounded-lg ${formData.type === 'owner' ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-500'}`}
                    onClick={() => {
                      setFormData(p => ({ ...p, type: 'owner', clinicName: '' }));
                    }}
                  >
                    Pet Owner
                  </button>
                  <button
                    type="button"
                    className={`py-2 text-center rounded-lg ${formData.type === 'vet' ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-500'}`}
                    onClick={() => {
                      setFormData(p => ({ ...p, type: 'vet', petName: '' }));
                    }}
                  >
                    Referring Veterinarian
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emily Watson"
                      className="w-full text-sm rounded-xl border border-cream-dark px-3.5 py-2.5 text-charcoal-800 bg-cream-light/30 focus:bg-white focus:border-terracotta-500 focus:outline-none transition-colors"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0400 000 000"
                      className="w-full text-sm rounded-xl border border-cream-dark px-3.5 py-2.5 text-charcoal-800 bg-cream-light/30 focus:bg-white focus:border-terracotta-500 focus:outline-none transition-colors"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. emily@example.com"
                    className="w-full text-sm rounded-xl border border-cream-dark px-3.5 py-2.5 text-charcoal-800 bg-cream-light/30 focus:bg-white focus:border-terracotta-500 focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>

                {formData.type === 'owner' ? (
                  <div className="grid grid-cols-2 gap-4 bg-cream-medium/30 p-3 rounded-xl border border-cream-dark/40">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Pet's Name *</label>
                      <input
                        type="text"
                        required={formData.type === 'owner'}
                        placeholder="e.g. Rocky"
                        className="w-full text-sm rounded-lg border border-cream-dark px-3 py-2 text-charcoal-800 bg-white focus:border-terracotta-500 focus:outline-none"
                        value={formData.petName}
                        onChange={e => setFormData(p => ({ ...p, petName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Referring Clinic</label>
                      <input
                        type="text"
                        placeholder="e.g. Coburg Vet Clinic"
                        className="w-full text-sm rounded-lg border border-cream-dark px-3 py-2 text-charcoal-800 bg-white focus:border-terracotta-500 focus:outline-none"
                        value={formData.clinicName}
                        onChange={e => setFormData(p => ({ ...p, clinicName: e.target.value }))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-cream-medium/30 p-3 rounded-xl border border-cream-dark/40">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Your Clinic Name / Practice *</label>
                    <input
                      type="text"
                      required={formData.type === 'vet'}
                      placeholder="e.g. Fitzroy Vet Hospital"
                      className="w-full text-sm rounded-lg border border-cream-dark px-3 py-2 text-charcoal-800 bg-white focus:border-terracotta-500 focus:outline-none"
                      value={formData.clinicName}
                      onChange={e => setFormData(p => ({ ...p, clinicName: e.target.value }))}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-1">Clinical Signs / Massage *</label>
                  <textarea
                    required
                    placeholder="Specify symptoms, suspected diagnosis, or general questions..."
                    className="w-full text-sm rounded-xl border border-cream-dark px-3.5 py-2.5 text-charcoal-800 bg-cream-light/30 focus:bg-white focus:border-terracotta-500 focus:outline-none transition-colors min-h-[100px]"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Secure Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
