/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { teamMembers } from '../data';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-cream-medium/40 relative" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-500/10 text-sage-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Specialized Care • Brunswick Clinic
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
              About Melbourne <span className="text-terracotta-500">Animal CT</span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-500 font-medium leading-relaxed">
              We are a dedicated diagnostic imaging service founded to bridge the gap between primary veterinary care and high-end diagnostics. Our clinic does not handle general check-ups, vaccines, or surgeries — meaning we can direct all our technology, training, and attention toward capturing perfect 3D CT scans.
            </p>
            <p className="text-sm sm:text-base text-charcoal-500 font-medium leading-relaxed">
              By working strictly on a referral basis, we keep patient care highly coordinated with your family veterinarian, ensuring they receive precise, specialist-interpreted diagnostics without duplicating consult fees.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-cream-dark shadow-sm space-y-4">
            <h4 className="font-display font-bold text-lg text-charcoal-900">Our Core Differentiators</h4>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal-900">Radiologist Led</h5>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Every single scan is reviewed and reported by Dr. Catherine Vance, a board-certified Specialist Veterinary Radiologist.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal-900">Sedation Safety First</h5>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Our lead sedation vet, Dr. Thorne, designs tailored, low-dose protocols specific to elderly or medically compromised patients.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 bg-terracotta-500/10 text-terracotta-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-charcoal-900">Brunswick Community Focus</h5>
                  <p className="text-xs text-charcoal-500 mt-0.5">
                    Centrally located on Sydney Road, offering urgent, same-day services to practices and pet owners across Melbourne.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section Title */}
        <div className="border-t border-cream-dark/60 pt-12 mb-10">
          <h3 className="text-2xl font-bold font-display text-charcoal-900 text-center">
            Meet Our <span className="text-terracotta-500">Specialist Diagnostic Team</span>
          </h3>
          <p className="text-xs text-center text-charcoal-500 mt-1 max-w-lg mx-auto">
            Our board-certified radiologists, anesthesiologists, and imaging techs are dedicated purely to advanced diagnostic imaging.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-cream-dark/50 shadow-sm hover:shadow-md transition-all flex flex-col group relative"
              id={`team-card-${member.id}`}
            >
              {/* Placeholder warning indicator (sales pitching note) */}
              {member.isPlaceholder && (
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-charcoal-900/60 text-white text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-sm select-none">
                  Pitch Placeholder
                </div>
              )}

              {/* Photo Frame (Organic curves) */}
              <div className="h-64 overflow-hidden relative bg-cream-medium rounded-2xl rounded-tr-[60px] m-2">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/25 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold font-display text-charcoal-900 leading-tight">
                    {member.name}
                  </h4>
                  <div className="text-xs font-bold text-terracotta-500 mt-0.5">
                    {member.role}
                  </div>
                  <div className="font-mono text-[10px] text-charcoal-500 mt-1.5 uppercase tracking-wide leading-tight">
                    {member.qualifications}
                  </div>
                  <p className="text-xs text-charcoal-500 mt-3 leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>

                {/* Micro CTA */}
                <div className="pt-4 border-t border-cream-light/80 mt-4 text-[10px] text-charcoal-500 font-semibold italic text-right">
                  "Caring for Melbourne pets since 2012"
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
