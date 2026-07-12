/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamMember, Review, FAQItem } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Catherine Vance',
    role: 'Specialist Veterinary Radiologist',
    qualifications: 'BVSc (Hons), FANZCVS (Veterinary Radiology), DACVR',
    bio: 'Dr. Catherine is a board-certified specialist with over 15 years of experience in advanced diagnostic imaging. She leads our interpretation service, ensuring every scan receives detailed, specialist-level review. Catherine lives in Brunswick with her senior rescue whippet, Pip.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    isPlaceholder: true,
  },
  {
    id: '2',
    name: 'Dr. Marcus Thorne',
    role: 'Lead Imaging & Sedation Veterinarian',
    qualifications: 'DVM, MVSc (Small Animal Practice)',
    bio: 'Dr. Marcus oversees patient care, sedation, and anesthesia planning. He is passionate about making CT scans stress-free and ultra-safe for geriatric and high-risk patients. He works closely with referring vets to coordinate scanning protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    isPlaceholder: true,
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Senior Veterinary Imaging Technologist',
    qualifications: 'RVN, DipAdvVN (Surgical & Diagnostic)',
    bio: 'Sarah is our chief CT scanner operator. She possesses expert training in positioning, scan optimization, and 3D reconstruction, ensuring we capture the highest definition images in the shortest possible scan times.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    isPlaceholder: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Elena Rostova',
    role: 'Pet Owner',
    location: 'Coburg',
    rating: 5,
    content: 'My cat Rusty had unexplained breathing difficulties, and our regular vet recommended a CT scan. The team at Melbourne Animal CT was incredible. They coordinated with my vet, scanned Rusty the same day, and we had the answers we needed by that afternoon. Best of all, there were no hidden consult fees!',
    date: '3 days ago',
    isPlaceholder: true,
  },
  {
    id: '2',
    author: 'Dr. James Mercer',
    role: 'Referring Veterinarian',
    location: 'Brunswick Veterinary Clinic',
    rating: 5,
    content: 'Having Melbourne Animal CT right on Sydney Road is an invaluable asset for our practice. For urgent respiratory or trauma cases, their same-day scanning and 4-hour urgent report turnaround are lifesavers. The diagnostic quality of their GE CT scanner is pristine, and Dr. Vance is always available to discuss complex cases.',
    date: '1 week ago',
    isPlaceholder: true,
  },
  {
    id: '3',
    author: 'Thomas G.',
    role: 'Pet Owner',
    location: 'Northcote',
    rating: 5,
    content: 'Very professional clinic. It is specialized only in CT scans, so they do not try to upsell you on other treatments or consults. I was referred for my dog\'s elbow dysplasia, and the 3D reconstructions they shared with us were mind-blowing. Highly recommend them if your pet needs advanced imaging.',
    date: '2 weeks ago',
    isPlaceholder: true,
  },
  {
    id: '4',
    author: 'Dr. Angela Lim',
    role: 'Referring Veterinarian',
    location: 'Fitzroy Vet Hospital',
    rating: 5,
    content: 'Our clinic has referred dozens of patients here. The zero-consult-fee policy means we can get our clients advanced diagnostics without double-charging them for physical exams. The referral portal is seamless, and reports arrive quickly with clear, actionable specialist findings.',
    date: '1 month ago',
    isPlaceholder: true,
  },
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a CT scan for my pet?',
    answer: 'Because a CT scan requires specialized sedation or light anesthesia and a veterinary referral, you must first obtain a referral from your primary vet. Once your vet submits the referral form on our website or contacts us, we will call you directly to schedule an appointment. For urgent, same-day cases, please have your vet call us directly.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Does my pet need to fast before the scan?',
    answer: 'Yes, because pets require sedation or general anesthesia to remain perfectly still during the CT scan, they must fast. We require no food after 10:00 PM the night before the scan. Water is allowed until you leave home for the clinic. Specific instructions will be texted to you prior to the appointment.',
    category: 'owners',
  },
  {
    id: 'faq-3',
    question: 'How much does a CT scan cost?',
    answer: 'Our base CT scans start at $950, which is fully inclusive of the sedation/anesthesia, the scanning procedure, and a detailed diagnostic report from our board-certified Specialist Veterinary Radiologist. Because we are a scanning-only clinic, we do NOT charge auxiliary consult fees or hospital fees, which saves you hundreds compared to emergency centers.',
    category: 'owners',
  },
  {
    id: 'faq-4',
    question: 'How long does the scan take, and when can I collect my pet?',
    answer: 'The scan itself takes less than 3 to 5 minutes, but the entire process (health assessment, sedation induction, scanning, and safe recovery) takes about 2 to 3 hours. Most patients are admitted in the morning and discharged by early afternoon. We will keep you updated via text and call you as soon as they are awake and ready for cuddles.',
    category: 'owners',
  },
  {
    id: 'faq-5',
    question: 'What is the turnaround time for the CT report?',
    answer: 'Our standard specialist radiologist report is delivered to your referring veterinarian within 24 hours of the scan. For critical or urgent cases, we offer a Priority Express service with full report delivery within 4 hours. Verbal emergency findings can also be phoned through immediately following the scan.',
    category: 'vets',
  },
  {
    id: 'faq-6',
    question: 'What information should be included in a vet referral?',
    answer: 'Please include the patient\'s full medical history, recent blood results (especially kidney markers if contrast is likely), clinical question/suspected pathology, and region of interest. You can easily drag and drop clinical notes and radiographs into our online referral portal.',
    category: 'vets',
  },
  {
    id: 'faq-7',
    question: 'Why choose a specialized CT clinic over a general vet with a CT scanner?',
    answer: 'At Melbourne Animal CT, diagnostic imaging is our sole focus. Our GE scanner is optimized specifically for veterinary imaging, and every single scan is interpreted by Dr. Catherine Vance, a board-certified Specialist Veterinary Radiologist. Furthermore, our scanning-only model has no clinical overheads, allowing us to pass significant savings to your clients with zero consult or holding fees.',
    category: 'general',
  },
];
