/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Heart, Stethoscope, ChevronRight, Activity, ShieldAlert, BadgeDollarSign, Sparkles, FileSpreadsheet, Download, Send } from 'lucide-react';
import { ServiceSubTab } from '../types';
// @ts-ignore
import ctScanImage from '../assets/images/ge_optima_ct_scan_1783827552748.jpg';

interface ServicesSectionProps {
  activeTab: ServiceSubTab;
  onTabChange: (tab: ServiceSubTab) => void;
  onOpenBooking: (type?: 'owner' | 'vet') => void;
}

export default function ServicesSection({ activeTab, onTabChange, onOpenBooking }: ServicesSectionProps) {
  
  const tabs: { value: ServiceSubTab; label: string; icon: React.ReactNode }[] = [
    { 
      value: 'what-is-ct', 
      label: 'What is a CT Scan?', 
      icon: <HelpCircle className="h-4 w-4" /> 
    },
    { 
      value: 'pet-owners', 
      label: 'Info for Pet Owners', 
      icon: <Heart className="h-4 w-4" /> 
    },
    { 
      value: 'referring-vets', 
      label: 'Info for Referring Vets', 
      icon: <Stethoscope className="h-4 w-4" /> 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream-light relative" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Advanced Diagnostic <span className="text-terracotta-500">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 mt-4 font-medium">
            Explore detailed guides and clinical referral info specifically written for pet owners and veterinary practitioners.
          </p>
        </div>

        {/* Tab Controls (Sleek pill layout) */}
        <div className="flex flex-wrap justify-center bg-cream-medium/80 p-1.5 rounded-2xl max-w-2xl mx-auto mb-12 border border-cream-dark/60 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === tab.value
                  ? 'bg-white text-charcoal-900 shadow-sm'
                  : 'text-charcoal-500 hover:text-charcoal-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-dark/50 shadow-md min-h-[400px]">
          
          {/* TAB 1: WHAT IS A CT SCAN */}
          {activeTab === 'what-is-ct' && (
            <div className="space-y-8 animate-fadeIn" id="tab-what-is-ct">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-terracotta-500">Diagnostic Science</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal-900">
                    Computed Tomography (CT) Explained
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal-500 leading-relaxed font-medium">
                    A Computed Tomography scan (commonly called a CT or CAT scan) is a state-of-the-art diagnostic imaging procedure that uses advanced X-ray technology paired with high-performance computers.
                  </p>
                  <p className="text-sm sm:text-base text-charcoal-500 leading-relaxed font-medium">
                    Instead of taking a single flat 2D image (like a standard clinic X-ray), our specialized CT scanner rotates rapidly around your pet's body, capturing hundreds of narrow beam cross-sections. The computer then stacks these detailed sections to create an absolute 3D model of your pet's internal organs, vascular networks, bones, and soft tissue.
                  </p>
                  
                  {/* Visual Comparison points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-cream-light p-4 rounded-2xl border border-cream-dark/50">
                      <div className="text-sm font-bold text-charcoal-900 flex items-center gap-2">
                        <span className="text-xs text-red-500">❌</span> Traditional 2D X-ray
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Anatomical structures overlay and overlap each other, often obscuring small lesions, internal nodules, or fine structural fractures.
                      </p>
                    </div>
                    <div className="bg-sage-500/10 p-4 rounded-2xl border border-sage-500/20">
                      <div className="text-sm font-bold text-sage-800 flex items-center gap-2">
                        <span className="text-xs text-sage-600">✓</span> High-Definition 3D CT
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Isolated cross-sections remove overlap entirely. Dr. Vance can isolate individual organs and rotate structures in full 3D space.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-cream-medium bg-cream-medium">
                    <img 
                      src={ctScanImage} 
                      alt="State-of-the-Art GE Optima CT Scanner at Melbourne Animal CT"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-cream-medium p-4 rounded-2xl shadow-md border border-cream-dark text-xs font-semibold text-charcoal-800 max-w-[200px]">
                    "Like slicing a loaf of bread, we can inspect every single layer without missing a millimeter."
                  </div>
                </div>
              </div>

              {/* Scan Utility Cases */}
              <div className="pt-8 border-t border-cream-dark/50">
                <h4 className="text-lg font-bold font-display text-charcoal-900 mb-6">
                  When is a CT scan crucial for my pet?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-charcoal-900 text-sm">Cancer & Oncology Mapping</h5>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Detect tumor locations, evaluate organ margins, inspect metastasis (spread) in lungs, and plan pristine surgical margins.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-charcoal-900 text-sm">Nasal & Respiratory Tract</h5>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Unmatched imaging for chronic nasal discharge, snorting, breathing difficulty, middle ear disease, and airway obstructions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-charcoal-900 text-sm">Complex Orthopedics</h5>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Examine bone development, complex joint diseases (like elbow dysplasia), skull deformities, and multi-fragment trauma fractures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INFO FOR PET OWNERS */}
          {activeTab === 'pet-owners' && (
            <div className="space-y-8 animate-fadeIn" id="tab-pet-owners">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Side: Owner Guides */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta-500">Care Guidelines</span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal-900 mt-1">
                      What to Expect: Your Pet's CT Journey
                    </h3>
                    <p className="text-sm text-charcoal-500 mt-2 font-medium">
                      We aim to make the CT process entirely transparent and stress-free for both you and your pet.
                    </p>
                  </div>

                  {/* Step list */}
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <div className="h-8 w-8 bg-terracotta-500 text-white font-extrabold rounded-full flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal-900 text-sm">Vet Referral & Scheduling</h4>
                        <p className="text-xs text-charcoal-500 mt-1">
                          A referral from your family vet is required before we scan. Once submitted, our team will call you to lock in an appointment time and text you pre-scan instructions.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <div className="h-8 w-8 bg-terracotta-500 text-white font-extrabold rounded-full flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal-900 text-sm">Fasting Prior to Scan</h4>
                        <p className="text-xs text-charcoal-500 mt-1">
                          Because pets require sedation or light anesthesia to stay perfectly still, they must fast. No food is allowed after 10:00 PM the night before, though water is allowed until you leave home.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <div className="h-8 w-8 bg-terracotta-500 text-white font-extrabold rounded-full flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal-900 text-sm">Clinic Check-in & Scan Day</h4>
                        <p className="text-xs text-charcoal-500 mt-1">
                          Most pets are admitted at 9:00 AM. Dr. Thorne conducts a pre-scan health check. Your pet is gently sedated, scanned in 5 minutes, and then recoveries in a warm, padded intensive-care kennel under active monitoring.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <div className="h-8 w-8 bg-terracotta-500 text-white font-extrabold rounded-full flex items-center justify-center shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal-900 text-sm">Discharge & Rapid Results</h4>
                        <p className="text-xs text-charcoal-500 mt-1">
                          Your pet is ready for cuddles and collection by early afternoon. A complete, detailed diagnostic report is sent straight to your referring vet within 24 hours (or 4 hours if urgent), who will discuss the treatment options with you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Pricing and Warnings */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Pricing Box */}
                  <div className="bg-cream-medium/70 border border-cream-dark/80 rounded-3xl p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2 text-terracotta-500">
                      <BadgeDollarSign className="h-6 w-6" />
                      <h4 className="text-lg font-bold font-display text-charcoal-900">Transparent Flat Pricing</h4>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">All-Inclusive CT Scan From</div>
                      <div className="text-4xl font-extrabold font-display text-charcoal-900 flex items-baseline">
                        $950 <span className="text-sm text-charcoal-500 font-medium ml-1">AUD</span>
                      </div>
                    </div>

                    <div className="border-t border-cream-dark/60 pt-4 space-y-2 text-xs text-charcoal-500">
                      <div className="flex items-center gap-2 text-charcoal-800 font-semibold">
                        <span className="text-sage-600 font-bold">✓</span> Full GE High-Resolution 3D scan
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-800 font-semibold">
                        <span className="text-sage-600 font-bold">✓</span> Dr. Thorne's pre-sedation physical health check
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-800 font-semibold">
                        <span className="text-sage-600 font-bold">✓</span> Safe sedation, anesthesia & nursing monitoring
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-800 font-semibold">
                        <span className="text-sage-600 font-bold">✓</span> Specialist Veterinary Radiologist written report
                      </div>
                      <div className="flex items-center gap-2 text-charcoal-800 font-semibold">
                        <span className="text-sage-600 font-bold">✓</span> Zero auxiliary clinical consult or holding fees
                      </div>
                    </div>

                    <p className="text-[11px] leading-relaxed text-charcoal-500">
                      * Most standard scans fall under our base flat rate. Multi-region scans or complex vascular/contrast studies may differ. We will always discuss pricing upfront.
                    </p>

                    <button
                      onClick={() => onOpenBooking('owner')}
                      className="w-full py-3 bg-terracotta-500 text-white font-bold rounded-xl shadow-md hover:bg-terracotta-600 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                      Request Callback & Book CT
                    </button>
                  </div>

                  {/* Warning Box */}
                  <div className="bg-sage-500/5 border border-sage-500/20 rounded-3xl p-6 flex gap-3 text-sm">
                    <ShieldAlert className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-sage-800">Fasting Notice</h5>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        Please strictly fast your pet the night before (no food after 10 PM). Fasting ensures that sedation is significantly safer for your pet's airway.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 3: INFO FOR REFERRING VETS */}
          {activeTab === 'referring-vets' && (
            <div className="space-y-8 animate-fadeIn" id="tab-referring-vets">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left side: Veterinary Workflow */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sage-600 font-bold">Clinic Collaboration</span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal-900 mt-1">
                      Streamlined Referral Process
                    </h3>
                    <p className="text-sm text-charcoal-500 mt-2 font-medium">
                      At Melbourne Animal CT, we act as an extension of your primary practice. We are scanning-only: we perform diagnostics, safe sedation, and Specialist written analysis, then transfer the patient back to you for ongoing clinical management.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <h4 className="font-bold text-charcoal-900 text-sm flex items-center gap-1.5">
                        <Send className="h-4 w-4 text-sage-500" />
                        1. Submit Referral
                      </h4>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        Click "Book Scan" or "Contact" to send patient histories, bloods, and clinical queries. You can also refer via phone or email directly.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <h4 className="font-bold text-charcoal-900 text-sm flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-sage-500" />
                        2. Rapid Scanning
                      </h4>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        We contact the owner, arrange check-in, check kidney profiles, induce light sedation, and scan. Same-day emergency scans are welcomed.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <h4 className="font-bold text-charcoal-900 text-sm flex items-center gap-1.5">
                        <FileSpreadsheet className="h-4 w-4 text-sage-500" />
                        3. Specialist Analysis
                      </h4>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        All scans undergo rigorous multi-plane reconstruction and evaluation by Dr. Catherine Vance (Board Certified Radiologist).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream-light border border-cream-dark/50">
                      <h4 className="font-bold text-charcoal-900 text-sm flex items-center gap-1.5">
                        <ChevronRight className="h-4 w-4 text-sage-500" />
                        4. 24h/4h Delivery
                      </h4>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        Full DICOM imaging files and the comprehensive PDF report are emailed directly to your clinic within 24 hours (or 4 hours for priority express).
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sage-500/5 border border-sage-500/20 flex gap-3 text-sm">
                    <ShieldAlert className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-sage-800">No Patient Poaching Guarantee</h5>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        Because we are dedicated CT specialists, we do NOT perform surgeries, prescribe long-term therapeutics, or offer primary clinical treatments. Your client remains strictly YOUR client.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side: technical scanner specifications */}
                <div className="lg:col-span-5 bg-cream-medium/70 rounded-3xl p-6 border border-cream-dark/80 space-y-5">
                  <div className="flex items-center gap-2 text-sage-600 font-bold">
                    <Stethoscope className="h-6 w-6" />
                    <h4 className="text-lg font-bold font-display text-charcoal-900">Technical Imaging Specs</h4>
                  </div>

                  {/* Tech specs table */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Scanner Model</span>
                      <span className="text-charcoal-900 font-bold">GE state-of-the-art CT Scanner</span>
                    </div>
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Slice Thickness</span>
                      <span className="text-charcoal-900 font-bold">Sub-millimeter (down to 0.625mm)</span>
                    </div>
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Sedation & Anesthesia</span>
                      <span className="text-charcoal-900 font-bold">Tailored light sedation / Isoflurane</span>
                    </div>
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Contrast Media</span>
                      <span className="text-charcoal-900 font-bold">Omnipaque (Non-ionic Iodinated)</span>
                    </div>
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Image Format</span>
                      <span className="text-charcoal-900 font-bold">Clinical DICOM, high-res JPEGs</span>
                    </div>
                    <div className="flex justify-between border-b border-cream-dark pb-1.5">
                      <span className="text-charcoal-500 font-medium">Urgent Turnaround</span>
                      <span className="text-charcoal-900 font-bold">Express reports under 4 hours</span>
                    </div>
                    <div className="flex justify-between pb-1.5">
                      <span className="text-charcoal-500 font-medium">Patient Size Limit</span>
                      <span className="text-charcoal-900 font-bold">Up to 110 kg</span>
                    </div>
                  </div>

                  <div className="border-t border-cream-dark pt-4">
                    <button
                      onClick={() => onOpenBooking('vet')}
                      className="w-full py-3 bg-sage-500 text-white font-bold rounded-xl shadow-md hover:bg-sage-600 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Clinical Referral</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
