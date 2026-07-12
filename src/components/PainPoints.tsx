/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, Sparkles, Clock, XCircle, CheckCircle } from 'lucide-react';

export default function PainPoints() {
  const diagnosticFrustrations = [
    {
      id: 'frust-1',
      title: 'Weeks of Anxious Waiting',
      agitation: 'Waiting for diagnostics while your pet is in pain is agonizing. Many general hospitals require referrals that take 14+ days to book.',
      solution: 'Same-Day Scanning Availability',
      solutionDesc: 'We save crucial time. Call ahead for same-day priority scans. Reports are back in 24 hours (or 4 hours for urgent emergencies).',
      badge: 'Immediate Action'
    },
    {
      id: 'frust-2',
      title: 'Double-Charging & Hidden Fees',
      agitation: 'General specialty hospitals often bundle imaging with expensive mandatory physical consults, hospital-stay fees, and administration charges.',
      solution: 'Zero Auxiliary Consult Fees',
      solutionDesc: 'Since we focus solely on scanning, we charge a single flat CT scan fee. No auxiliary physical exam charges or hospital holding fees.',
      badge: 'Transparent Pricing'
    },
    {
      id: 'frust-3',
      title: 'Inconclusive Blurry Diagnostics',
      agitation: 'Standard 2D X-rays and basic ultrasounds are often inconclusive, showing flat overlays that miss deep tumor margins or intricate fractures.',
      solution: 'Absolute 3D Diagnostic Clarity',
      solutionDesc: 'Our advanced GE scanner captures sub-millimeter 3D slices. We render precise, color-coded, 3D anatomical models of complex issues.',
      badge: 'GE 3D Technology'
    },
    {
      id: 'frust-4',
      title: 'Guesswork in Scan Reports',
      agitation: 'Many standard clinics operate CT machines but do not have an on-staff specialist, leaving the scans to be interpreted by general practitioners.',
      solution: 'Board-Certified Specialist Interpretation',
      solutionDesc: 'Every scan is thoroughly analyzed by Dr. Catherine Vance, an accredited Specialist Veterinary Radiologist, with clinical-grade summaries.',
      badge: 'Accredited Specialist'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-cream-medium/30 relative overflow-hidden" id="pain-points-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-terracotta-500/10 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Rethinking Advanced Diagnostics
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Say Goodbye to <span className="text-terracotta-500 font-bold italic">Diagnostic Uncertainty</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 mt-4 font-medium">
            We understand that securing a CT scan for your pet is stressful. That's why we redesigned the clinical imaging experience around transparency, speed, and specialist accuracy.
          </p>
        </div>

        {/* Pain & Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {diagnosticFrustrations.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-dark/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              id={`pain-card-${index}`}
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 left-0 w-2 h-full bg-terracotta-500/20 group-hover:bg-terracotta-500 transition-colors" />

              <div className="space-y-5">
                
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold font-display text-charcoal-900">
                    {item.title}
                  </h3>
                  <span className="text-xs font-extrabold px-3 py-1 bg-cream-medium text-charcoal-500 rounded-full border border-cream-dark/30 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>

                {/* Agitation Row */}
                <div className="flex gap-3 bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-red-700 uppercase tracking-wider">The Frustration</div>
                    <p className="text-sm text-charcoal-500 mt-1 font-medium">{item.agitation}</p>
                  </div>
                </div>

                {/* Solution Row */}
                <div className="flex gap-3 bg-sage-500/10 p-4 rounded-2xl border border-sage-500/20">
                  <CheckCircle className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-sage-700 uppercase tracking-wider">{item.solution}</div>
                    <p className="text-sm text-charcoal-800 mt-1 font-medium">{item.solutionDesc}</p>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Trust Stats Footer */}
        <div className="mt-16 bg-cream-medium rounded-[40px] p-6 sm:p-10 border border-cream-dark border-dashed grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-terracotta-500">
              100%
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mt-1">
              CT Dedicated Focus
            </div>
            <p className="text-xs text-charcoal-500 mt-2 max-w-xs mx-auto">
              Scanning-only clinic. No general vet appointments or surgical up-selling.
            </p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-x border-cream-dark/80 pt-6 sm:pt-0">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-sage-600">
              4 Hours
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mt-1">
              Urgent Report Turnaround
            </div>
            <p className="text-xs text-charcoal-500 mt-2 max-w-xs mx-auto">
              Express radiologist reports delivered to referring hospitals for emergency triage.
            </p>
          </div>
          <div className="border-t sm:border-t-0 pt-6 sm:pt-0">
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
              $0
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mt-1">
              Admission / Consult Fees
            </div>
            <p className="text-xs text-charcoal-500 mt-2 max-w-xs mx-auto">
              Flat scanning rates. We never double-charge referring vet clients.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
