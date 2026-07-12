/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Phone, Mail, FileText, Activity, CheckCircle2 } from 'lucide-react';
import { LeadCapture } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'owner' | 'vet';
}

export default function BookingModal({ isOpen, onClose, initialType = 'owner' }: BookingModalProps) {
  const [activeTab, setActiveTab] = useState<'owner' | 'vet'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petSpecies: 'Dog',
    clinicName: '',
    message: '',
    isUrgent: false,
    callbackTime: 'Morning (9am - 12pm)',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lead to localStorage
    const newLead: LeadCapture = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      contactType: activeTab,
      email: formData.email,
      phone: formData.phone,
      petName: activeTab === 'owner' ? formData.petName : undefined,
      clinicName: activeTab === 'vet' ? formData.clinicName : undefined,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    const existingLeads: LeadCapture[] = JSON.parse(localStorage.getItem('melbourne_animal_ct_leads') || '[]');
    localStorage.setItem('melbourne_animal_ct_leads', JSON.stringify([newLead, ...existingLeads]));

    // Trigger local storage storage event to alert other components (like chatbot counter)
    window.dispatchEvent(new Event('storage'));

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      petName: '',
      petSpecies: 'Dog',
      clinicName: '',
      message: '',
      isUrgent: false,
      callbackTime: 'Morning (9am - 12pm)',
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream-light shadow-2xl transition-all border border-cream-dark flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative bg-cream-medium px-6 py-5 border-b border-cream-dark">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-charcoal-500 hover:bg-cream-dark transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h2 className="text-2xl font-bold font-display text-charcoal-900 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-terracotta-500" />
            Book / Request Callback
          </h2>
          <p className="text-sm text-charcoal-500 mt-1">
            Fill in the details below. Our Brunswick clinic will call you shortly.
          </p>

          {/* Audience Toggles */}
          {!submitted && (
            <div className="flex bg-cream-dark p-1 rounded-xl mt-4">
              <button
                type="button"
                className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'owner' 
                    ? 'bg-white text-charcoal-900 shadow-sm' 
                    : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
                onClick={() => {
                  setActiveTab('owner');
                  setFormData(prev => ({ ...prev, clinicName: '' }));
                }}
              >
                Pet Owner Callback
              </button>
              <button
                type="button"
                className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'vet' 
                    ? 'bg-white text-charcoal-900 shadow-sm' 
                    : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
                onClick={() => {
                  setActiveTab('vet');
                  setFormData(prev => ({ ...prev, petName: '' }));
                }}
              >
                Veterinary Referral / Callback
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="h-16 w-16 bg-sage-500/10 rounded-full flex items-center justify-center text-sage-600 mb-4 animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold font-display text-charcoal-900">Request Received!</h3>
              <p className="text-charcoal-500 mt-3 max-w-md">
                Thank you, <span className="font-semibold text-charcoal-900">{formData.name}</span>. We have registered your request and our Brunswick clinic team will give you a call during your preferred time: <span className="font-semibold text-charcoal-900">{formData.callbackTime}</span>.
              </p>
              
              <div className="bg-cream-medium rounded-2xl p-4 mt-6 text-left w-full text-sm border border-cream-dark">
                <div className="font-semibold text-charcoal-800 mb-1">What happens next?</div>
                <ul className="list-disc pl-4 space-y-1 text-charcoal-500">
                  {activeTab === 'owner' ? (
                    <>
                      <li>We will coordinate with your primary vet to retrieve medical logs.</li>
                      <li>Our sedation vet will review fasting and sedation instructions with you.</li>
                      <li>You will receive a confirmation SMS with scan directions and appointment lock.</li>
                    </>
                  ) : (
                    <>
                      <li>Our imaging coordinator will review patient medical histories.</li>
                      <li>Dr. Vance will prepare scanning protocols suited for the specific clinical questions.</li>
                      <li>We will reach out to you or the owner directly to arrange check-in.</li>
                    </>
                  )}
                </ul>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-8 px-6 py-2.5 bg-terracotta-500 text-white font-medium rounded-full hover:bg-terracotta-600 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-cream-dark bg-white py-2.5 pl-9 pr-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-charcoal-800"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                    <div className="absolute left-3 top-3 text-charcoal-500">
                      <Phone className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-xl border border-cream-dark bg-white py-2.5 px-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-charcoal-800"
                    placeholder="e.g. 0400 000 000"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-cream-dark bg-white py-2.5 pl-9 pr-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-charcoal-800"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                  <div className="absolute left-3 top-3.5 text-charcoal-500">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Conditional Fields: Pet Owner */}
              {activeTab === 'owner' && (
                <div className="grid grid-cols-2 gap-4 bg-cream-medium/50 p-3 rounded-xl border border-cream-dark/50">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                      Pet's Name *
                    </label>
                    <input
                      type="text"
                      required={activeTab === 'owner'}
                      className="w-full rounded-lg border border-cream-dark bg-white py-2 px-3 text-sm focus:border-terracotta-500 focus:outline-none text-charcoal-800"
                      placeholder="e.g. Bella"
                      value={formData.petName}
                      onChange={e => setFormData(p => ({ ...p, petName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                      Species
                    </label>
                    <select
                      className="w-full rounded-lg border border-cream-dark bg-white py-2 px-3 text-sm focus:border-terracotta-500 focus:outline-none text-charcoal-800"
                      value={formData.petSpecies}
                      onChange={e => setFormData(p => ({ ...p, petSpecies: e.target.value }))}
                    >
                      <option value="Dog">Dog 🐶</option>
                      <option value="Cat">Cat 🐱</option>
                      <option value="Exotic">Exotic / Pocket Pet 🐰</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Conditional Fields: Referring Vet */}
              {activeTab === 'vet' && (
                <div className="bg-cream-medium/50 p-3 rounded-xl border border-cream-dark/50">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                    Clinic Name / Practice *
                  </label>
                  <input
                    type="text"
                    required={activeTab === 'vet'}
                    className="w-full rounded-lg border border-cream-dark bg-white py-2 px-3 text-sm focus:border-terracotta-500 focus:outline-none text-charcoal-800"
                    placeholder="e.g. Brunswick Vet Clinic"
                    value={formData.clinicName}
                    onChange={e => setFormData(p => ({ ...p, clinicName: e.target.value }))}
                  />
                </div>
              )}

              {/* Preference Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                    Preferred Callback Time
                  </label>
                  <select
                    className="w-full rounded-xl border border-cream-dark bg-white py-2.5 px-3 text-sm focus:border-terracotta-500 focus:outline-none text-charcoal-800"
                    value={formData.callbackTime}
                    onChange={e => setFormData(p => ({ ...p, callbackTime: e.target.value }))}
                  >
                    <option>Morning (9am - 12pm)</option>
                    <option>Afternoon (12pm - 4pm)</option>
                    <option>Late Afternoon (4pm - 6pm)</option>
                    <option>As soon as possible 🚨</option>
                  </select>
                </div>
                
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-cream-dark text-terracotta-500 focus:ring-terracotta-500 cursor-pointer"
                      checked={formData.isUrgent}
                      onChange={e => setFormData(p => ({ ...p, isUrgent: e.target.checked }))}
                    />
                    <span className="text-sm font-semibold text-terracotta-600 flex items-center gap-1">
                      <Activity className="h-4 w-4 animate-pulse" />
                      This is an urgent clinical case
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                  Clinical History / Scan Requests / Message
                </label>
                <div className="relative">
                  <textarea
                    className="w-full rounded-xl border border-cream-dark bg-white py-2 pl-9 pr-3 text-sm focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-charcoal-800 min-h-[80px]"
                    placeholder={activeTab === 'owner' ? "Tell us about your pet's current symptoms or why your vet recommended a CT scan..." : "Specify diagnostic goals, suspected mass, fracture, contrast preferences, or special sedation guidelines..."}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                  <div className="absolute left-3 top-3 text-charcoal-500">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Direct Warning */}
              <div className="text-xs text-charcoal-500 bg-cream-medium/50 p-3 rounded-xl border border-cream-dark/50">
                🚨 <span className="font-bold">Need same-day imaging?</span> If your pet is experiencing respiratory distress, acute spinal pain, or major trauma, please call our direct hotline at <span className="font-bold text-charcoal-900">03 9256 2896</span> for an immediate booking.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-terracotta-500 text-white font-bold rounded-xl shadow-md hover:bg-terracotta-600 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                Submit Callback & Referral Inquiries
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
