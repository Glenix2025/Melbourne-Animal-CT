/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Heart, Phone, Sparkles, FolderSync, Trash2, ShieldCheck } from 'lucide-react';
import { ChatMessage, LeadCapture } from '../types';
import Logo from './Logo';

interface ChatbotProps {
  onOpenBooking: (type?: 'owner' | 'vet') => void;
}

export default function Chatbot({ onOpenBooking }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [inputValue, setInputValue] = useState('');
  const [leadsCount, setLeadsCount] = useState(0);
  const [showLeadViewer, setShowLeadViewer] = useState(false);
  const [savedLeads, setSavedLeads] = useState<LeadCapture[]>([]);
  
  // Temporary variable to hold lead-capture details during multi-turn chat form
  const [tempLead, setTempLead] = useState<{
    name?: string;
    contact?: string;
    contactType?: 'owner' | 'vet';
    petNameOrClinic?: string;
  }>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-terracotta-500 hover:text-terracotta-600 break-all inline-flex items-center gap-0.5"
          >
            {part}
          </a>
        );
      }
      const subparts = part.split('\n');
      return subparts.map((sub, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {sub}
          {i < subparts.length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  // Update lead indicators from localStorage
  const refreshLeads = () => {
    const list = JSON.parse(localStorage.getItem('melbourne_animal_ct_leads') || '[]');
    setSavedLeads(list);
    setLeadsCount(list.length);
  };

  useEffect(() => {
    refreshLeads();
    // Listen for local lead additions
    window.addEventListener('storage', refreshLeads);
    return () => window.removeEventListener('storage', refreshLeads);
  }, []);

  // Scroll to bottom on message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initial welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerStep('welcome');
    }
  }, [isOpen]);

  const addMessage = (text: string, sender: 'bot' | 'user', options?: ChatMessage['options'], inputRequired: ChatMessage['inputRequired'] = 'none', placeholder = '') => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options,
      inputRequired,
      inputPlaceholder: placeholder,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const triggerStep = (stepId: string) => {
    setCurrentStep(stepId);

    switch (stepId) {
      case 'welcome':
        addMessage(
          "Hi there! 🐾 I'm Pawsy, Melbourne Animal CT's virtual diagnostic assistant. It's lovely to meet you!",
          'bot'
        );
        setTimeout(() => {
          addMessage(
            "To help me tailor our chat, are you a loving pet owner or a referring veterinarian?",
            'bot',
            [
              { label: 'How to Book/Schedule 📅', value: 'how_to_book', nextStepId: 'how_to_book' },
              { label: 'I am a Pet Owner 🐶', value: 'owner', nextStepId: 'owner_menu' },
              { label: 'I am a Referring Vet 🩺', value: 'vet', nextStepId: 'vet_menu' },
              { label: 'Browse FAQs 📋', value: 'faqs', nextStepId: 'chatbot_faq_categories' },
            ]
          );
        }, 500);
        break;

      case 'how_to_book':
        addMessage(
          "Booking or scheduling an outpatient CT scan with us is streamlined and simple! 📅\n\nTo check our real-time clinic availability and secure an appointment slot immediately, use our online scheduler:\n\n👉 **Book a 30-Minute Appointment Slot Here:** https://calendly.com/pawsy1432/30min\n\n*Important Notes:*\n• Fasting: Dogs and cats must fast from food for 12 hours prior to sedation/anesthesia.\n• Referral: Please ensure your regular veterinarian emails us the Imaging Request Form and blood work before your scheduled slot.",
          'bot',
          [
            { label: 'Request Callback 📞', value: 'callback', nextStepId: 'capture_name_owner' },
            { label: 'Browse FAQs 📋', value: 'faqs', nextStepId: 'chatbot_faq_categories' },
            { label: '⬅️ Back to Main Menu', value: 'back_main', nextStepId: 'welcome' }
          ]
        );
        break;

      // ================= PET OWNER PATH =================
      case 'owner_menu':
        addMessage(
          "Welcome pet owner! 🌸 How can I help you learn about CT-scanning for your pet today?",
          'bot',
          [
            { label: 'How to Book / Schedule 📅', value: 'how_to_book', nextStepId: 'how_to_book' },
            { label: 'Browse FAQs 📋', value: 'faqs', nextStepId: 'chatbot_faq_categories' },
            { label: 'What is a CT scan?', value: 'what_is_ct', nextStepId: 'owner_explain_ct' },
            { label: 'How much does it cost?', value: 'pricing', nextStepId: 'owner_explain_pricing' },
            { label: 'Do I need a referral?', value: 'referral', nextStepId: 'owner_explain_referral' },
            { label: 'What to expect on scan day?', value: 'expect', nextStepId: 'owner_explain_expect' },
            { label: 'Request Callback 📞', value: 'callback', nextStepId: 'capture_name_owner' },
          ]
        );
        break;

      case 'owner_explain_ct':
        addMessage(
          "A CT scan takes high-resolution 3D cross-sectional images of your pet's body, eliminating the overlaps seen in standard 2D X-rays. It's fast, non-invasive, and interpreted by Dr. Vance, our Board-Certified Specialist Radiologist. 🔬",
          'bot',
          [
            { label: 'How much does it cost?', value: 'pricing', nextStepId: 'owner_explain_pricing' },
            { label: 'Do I need a referral?', value: 'referral', nextStepId: 'owner_explain_referral' },
            { label: 'Back to Owners Menu', value: 'back', nextStepId: 'owner_menu' },
          ]
        );
        break;

      case 'owner_explain_pricing':
        addMessage(
          "Because we focus purely on CT scans, we do NOT charge auxiliary physical exam or holding fees, saving you hundreds. Base scans start around $950, fully inclusive of pre-scan health checks, sedation/anesthesia, the scan, and the specialist report! 💸",
          'bot',
          [
            { label: 'Do I need a referral?', value: 'referral', nextStepId: 'owner_explain_referral' },
            { label: 'Request Callback', value: 'callback', nextStepId: 'capture_name_owner' },
            { label: 'Back to Owners Menu', value: 'back', nextStepId: 'owner_menu' },
          ]
        );
        break;

      case 'owner_explain_referral':
        addMessage(
          "Yes! Because CT scans require specialized sedation and light anesthesia, we require a referral from your primary veterinarian. Don't worry — we can handle the logistics! Just request a callback and we can contact your vet for you. 🩺",
          'bot',
          [
            { label: 'How much does it cost?', value: 'pricing', nextStepId: 'owner_explain_pricing' },
            { label: 'Help me get a referral', value: 'help', nextStepId: 'capture_name_owner' },
            { label: 'Back to Owners Menu', value: 'back', nextStepId: 'owner_menu' },
          ]
        );
        break;

      case 'owner_explain_expect':
        addMessage(
          "On scan day, your pet is admitted in the morning (strictly fasted from food since 10 PM the night before). Dr. Thorne performs a physical health check. The scan takes under 5 minutes. Most pets are awake and ready to be collected by early afternoon! ☀️",
          'bot',
          [
            { label: 'How long for results?', value: 'results', nextStepId: 'owner_explain_results' },
            { label: 'Back to Owners Menu', value: 'back', nextStepId: 'owner_menu' },
          ]
        );
        break;

      case 'owner_explain_results':
        addMessage(
          "Standard CT scan reports are analyzed by Dr. Catherine Vance (Specialist Radiologist) and sent directly to your primary vet within 24 hours. For urgent emergencies, we deliver priority reports within 4 hours. ⏱️",
          'bot',
          [
            { label: 'Request Callback', value: 'callback', nextStepId: 'capture_name_owner' },
            { label: 'Back to Owners Menu', value: 'back', nextStepId: 'owner_menu' },
          ]
        );
        break;

      // ================= REFERRING VET PATH =================
      case 'vet_menu':
        addMessage(
          "Welcome doctor! 🩺 How can we assist you with referral imaging or diagnostic turnaround today?",
          'bot',
          [
            { label: 'How to Book/Schedule Patients 📅', value: 'how_to_book', nextStepId: 'how_to_book' },
            { label: 'Browse FAQs 📋', value: 'faqs', nextStepId: 'chatbot_faq_categories' },
            { label: 'How to refer a patient?', value: 'how_to', nextStepId: 'vet_explain_how_to' },
            { label: 'Turnaround times?', value: 'turnaround', nextStepId: 'vet_explain_turnaround' },
            { label: 'Information to include?', value: 'info', nextStepId: 'vet_explain_info' },
            { label: 'Contact our radiologist?', value: 'contact', nextStepId: 'vet_explain_contact' },
            { label: 'Submit referral callback', value: 'refer', nextStepId: 'capture_name_vet' },
          ]
        );
        break;

      case 'vet_explain_how_to':
        addMessage(
          "Referring is simple. You can submit files directly through our Contact/Referral form, email us, or call our team. For urgent emergency scans, please call us directly on 03 9256 2896 so we can fast-track booking. 📑",
          'bot',
          [
            { label: 'Turnaround times?', value: 'turnaround', nextStepId: 'vet_explain_turnaround' },
            { label: 'Contact Radiologist', value: 'contact', nextStepId: 'vet_explain_contact' },
            { label: 'Back to Vet Menu', value: 'back', nextStepId: 'vet_menu' },
          ]
        );
        break;

      case 'vet_explain_turnaround':
        addMessage(
          "Standard specialist radiologist written reports are delivered to your clinic within 24 hours. Urgent priority scans are analyzed and reported within 4 hours. Immediate verbal findings can also be phoned through following recovery. ⏱️",
          'bot',
          [
            { label: 'Information to include?', value: 'info', nextStepId: 'vet_explain_info' },
            { label: 'Back to Vet Menu', value: 'back', nextStepId: 'vet_menu' },
          ]
        );
        break;

      case 'vet_explain_info':
        addMessage(
          "Please include patient clinical history, specific diagnostic goals/questions, region of interest, relevant blood panels (creatinine for contrast safety), and whether contrast studies are requested. 📄",
          'bot',
          [
            { label: 'Contact Radiologist', value: 'contact', nextStepId: 'vet_explain_contact' },
            { label: 'Refer a patient callback', value: 'refer', nextStepId: 'capture_name_vet' },
            { label: 'Back to Vet Menu', value: 'back', nextStepId: 'vet_menu' },
          ]
        );
        break;

      case 'vet_explain_contact':
        addMessage(
          "For pre-scan advice on positioning/protocols or post-scan case discussions, you can reach Dr. Catherine Vance (Specialist Radiologist) directly on 03 9256 2896. Or request a priority vet callback here. 📞",
          'bot',
          [
            { label: 'Request Vet Callback', value: 'refer', nextStepId: 'capture_name_vet' },
            { label: 'Back to Vet Menu', value: 'back', nextStepId: 'vet_menu' },
          ]
        );
        break;

      // ================= LEAD CAPTURE SYSTEM (PET OWNER) =================
      case 'capture_name_owner':
        setTempLead({ contactType: 'owner' });
        addMessage(
          "I can arrange a priority callback from our Brunswick imaging team. To start, what is your name?",
          'bot',
          undefined,
          'text',
          'Type your name...'
        );
        break;

      case 'capture_contact_owner':
        addMessage(
          `Thanks, ${tempLead.name}! What is your phone number or email so we can reach you?`,
          'bot',
          undefined,
          'text',
          'Type phone or email...'
        );
        break;

      case 'capture_pet_owner':
        addMessage(
          "Got it. Finally, what is your pet's name and species (e.g., Bella - Whoodle)?",
          'bot',
          undefined,
          'text',
          'Type pet name and breed...'
        );
        break;

      // ================= LEAD CAPTURE SYSTEM (VET) =================
      case 'capture_name_vet':
        setTempLead({ contactType: 'vet' });
        addMessage(
          "I'll arrange a dedicated professional callback. May I have your full name and title?",
          'bot',
          undefined,
          'text',
          'Type name and title...'
        );
        break;

      case 'capture_contact_vet':
        addMessage(
          `Thank you, Doctor. What is your preferred contact number or direct email?`,
          'bot',
          undefined,
          'text',
          'Type phone or email...'
        );
        break;

      case 'capture_clinic_vet':
        addMessage(
          "Perfect. What is your clinic or hospital name (e.g. Brunswick Veterinary Clinic)?",
          'bot',
          undefined,
          'text',
          'Type clinic name...'
        );
        break;

      // ================= FINALIZE LEAD =================
      case 'finalize_lead':
        // Save the lead
        const finalLead: LeadCapture = {
          id: Math.random().toString(36).substring(2, 9),
          name: tempLead.name || 'Anonymous',
          contactType: tempLead.contactType || 'owner',
          email: tempLead.contact?.includes('@') ? tempLead.contact : '',
          phone: !tempLead.contact?.includes('@') ? tempLead.contact || '' : '',
          petName: tempLead.contactType === 'owner' ? tempLead.petNameOrClinic : undefined,
          clinicName: tempLead.contactType === 'vet' ? tempLead.petNameOrClinic : undefined,
          timestamp: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('melbourne_animal_ct_leads') || '[]');
        localStorage.setItem('melbourne_animal_ct_leads', JSON.stringify([finalLead, ...existing]));
        
        // Dispatch event
        window.dispatchEvent(new Event('storage'));
        refreshLeads();

        addMessage(
          `Perfect! Your request has been logged. A member of our Brunswick team will contact you shortly regarding ${
            tempLead.contactType === 'owner' ? tempLead.petNameOrClinic || 'your pet' : tempLead.petNameOrClinic || 'your clinic'
          }. 🐾`,
          'bot'
        );

        setTimeout(() => {
          addMessage(
            "If this is an urgent clinical inquiry, please call our Brunswick hotline immediately at 03 9256 2896. Have a wonderful day!",
            'bot',
            [
              { label: 'Start New Chat 🔄', value: 'restart', nextStepId: 'welcome' }
            ]
          );
        }, 1000);
        break;

      // ================= FAQ BROWSING PORTAL =================
      case 'chatbot_faq_categories':
        addMessage(
          "Welcome to our interactive FAQ directory! 📋 Select a category below to explore our answers:",
          'bot',
          [
            { label: 'Booking & Scheduling 📅', value: 'booking', nextStepId: 'faq_cat_booking' },
            { label: 'Preparation Guidelines 🥣', value: 'preparation', nextStepId: 'faq_cat_preparation' },
            { label: 'Clinic Visit & Expectation 🏥', value: 'clinic', nextStepId: 'faq_cat_clinic' },
            { label: 'Results & Financials 🩺', value: 'results', nextStepId: 'faq_cat_results' },
            { label: '⬅️ Back to Main Menu', value: 'back_main', nextStepId: 'welcome' }
          ]
        );
        break;

      case 'faq_cat_booking':
        addMessage(
          "Select a Booking or Scheduling question to read our comprehensive answer:",
          'bot',
          [
            { label: '1. How do I book a CT scan?', value: 'q1', nextStepId: 'faq_q1' },
            { label: '2. Do I need a vet referral?', value: 'q2', nextStepId: 'faq_q2' },
            { label: '3. Can I get a same-day/urgent appointment?', value: 'q3', nextStepId: 'faq_q3' },
            { label: '4. How to reschedule/cancel?', value: 'q4', nextStepId: 'faq_q4' },
            { label: '5. How long does it take?', value: 'q5', nextStepId: 'faq_q5' },
            { label: '⬅️ Back to FAQ Categories', value: 'back_categories', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_cat_preparation':
        addMessage(
          "Select a Preparation question to read our comprehensive answer:",
          'bot',
          [
            { label: '6. Does my pet need to fast?', value: 'q6', nextStepId: 'faq_q6' },
            { label: '7. Do you scan exotic pets?', value: 'q7', nextStepId: 'faq_q7' },
            { label: '8. What should I bring to the appointment?', value: 'q8', nextStepId: 'faq_q8' },
            { label: '⬅️ Back to FAQ Categories', value: 'back_categories', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_cat_clinic':
        addMessage(
          "Select a Clinic Visit question to read our comprehensive answer:",
          'bot',
          [
            { label: '9. Where is parking & clinic located?', value: 'q9', nextStepId: 'faq_q9' },
            { label: '10. What if my pet is large or immobile?', value: 'q10', nextStepId: 'faq_q10' },
            { label: '11. Will my pet be awake?', value: 'q11', nextStepId: 'faq_q11' },
            { label: '⬅️ Back to FAQ Categories', value: 'back_categories', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_cat_results':
        addMessage(
          "Select a Results or Financials question to read our comprehensive answer:",
          'bot',
          [
            { label: '12. When will my vet get results?', value: 'q12', nextStepId: 'faq_q12' },
            { label: '13. Do you accept pet insurance?', value: 'q13', nextStepId: 'faq_q13' },
            { label: '14. Are there stay or consult fees?', value: 'q14', nextStepId: 'faq_q14' },
            { label: '15. What is post-scan care like?', value: 'q15', nextStepId: 'faq_q15' },
            { label: '⬅️ Back to FAQ Categories', value: 'back_categories', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      // ================= INDIVIDUAL FAQ ANSWERS =================
      case 'faq_q1':
        addMessage(
          "To schedule a CT scan, you can check our real-time availability and select a convenient time slot directly through our online scheduler:\n\n👉 Book a 30-Minute Appointment Slot Here: https://calendly.com/pawsy1432/30min\n\nPlease note: You will also need a referral form from your regular veterinarian before the scan can take place.",
          'bot',
          [
            { label: '⬅️ Back to Booking FAQ List', value: 'back', nextStepId: 'faq_cat_booking' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q2':
        addMessage(
          "Yes. Melbourne Animal CT operates as a dedicated outpatient imaging service. While you can secure your appointment time using our Online Booking Link, your primary veterinarian must fill out our \"Imaging Request Form\" and provide your pet's recent blood test results prior to your arrival.",
          'bot',
          [
            { label: '⬅️ Back to Booking FAQ List', value: 'back', nextStepId: 'faq_cat_booking' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q3':
        addMessage(
          "We do accommodate same-day emergency scans when possible. If your case is urgent and you cannot find an immediate opening on our Calendly Booking Page, please call our Brunswick clinic directly at 03 9256 2896 so we can fast-track your booking.",
          'bot',
          [
            { label: '⬅️ Back to Booking FAQ List', value: 'back', nextStepId: 'faq_cat_booking' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q4':
        addMessage(
          "We understand that plans change. You can easily modify or cancel your booking through the confirmation email you received from our booking system, or by visiting our Scheduling Portal. If your appointment is less than 24 hours away, please call us directly to let us know.",
          'bot',
          [
            { label: '⬅️ Back to Booking FAQ List', value: 'back', nextStepId: 'faq_cat_booking' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q5':
        addMessage(
          "The actual CT scan is incredibly fast, but because your pet will receive mild sedation or general anesthesia to keep them perfectly still, they will stay with us for a few hours. When you book via our Appointment Link, plan for a drop-off window where our team will assess your pet, perform the scan, and monitor their recovery safely.",
          'bot',
          [
            { label: '⬅️ Back to Booking FAQ List', value: 'back', nextStepId: 'faq_cat_booking' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q6':
        addMessage(
          "Yes. Because most scans require sedation or general anesthesia, adult dogs and cats must not eat any food for 12 hours prior to their appointment. For young puppies or kittens, the fasting window is shorter (typically 4–6 hours). Please keep water available as normal unless otherwise instructed.",
          'bot',
          [
            { label: '⬅️ Back to Prep FAQ List', value: 'back', nextStepId: 'faq_cat_preparation' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q7':
        addMessage(
          "Yes! We provide advanced imaging for exotic companions, including rabbits, guinea pigs, ferrets, birds, and reptiles. Fasting rules vary significantly for these species, so after securing your time slot via Calendly, please contact our staff for specific fasting guidelines.",
          'bot',
          [
            { label: '⬅️ Back to Prep FAQ List', value: 'back', nextStepId: 'faq_cat_preparation' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q8':
        addMessage(
          "Please ensure your vet has emailed us the \"Imaging Request Form\" and recent blood work. When you arrive for your scheduled time, just bring yourself, your pet on a secure leash or in a carrier, and any daily medications they are currently taking.",
          'bot',
          [
            { label: '⬅️ Back to Prep FAQ List', value: 'back', nextStepId: 'faq_cat_preparation' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q9':
        addMessage(
          "Our clinic is located at 590 Sydney Road, Brunswick, VIC 3056. There is generally ample on-street parking right in front of our centre.",
          'bot',
          [
            { label: '⬅️ Back to Clinic FAQ List', value: 'back', nextStepId: 'faq_cat_clinic' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q10':
        addMessage(
          "If your pet needs physical assistance getting inside, please let us know when you book or call us upon arrival. We can arrange special access to the rear of the building, and our experienced nursing staff will safely assist in moving your pet into the clinic.",
          'bot',
          [
            { label: '⬅️ Back to Clinic FAQ List', value: 'back', nextStepId: 'faq_cat_clinic' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q11':
        addMessage(
          "To achieve high-detail 3D imagery, pets must remain perfectly still. Therefore, your pet will receive a tailored sedation or general anesthesia protocol. Our expert veterinary team monitors them continuously using advanced hospital-grade equipment throughout the short procedure.",
          'bot',
          [
            { label: '⬅️ Back to Clinic FAQ List', value: 'back', nextStepId: 'faq_cat_clinic' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q12':
        addMessage(
          "Immediately after the scan, the images are sent to a highly qualified specialist radiologist. Depending on the urgency level selected during your referral, detailed diagnostic reports are delivered to your primary vet within 4 hours (for urgent cases) to 2–4 days.",
          'bot',
          [
            { label: '⬅️ Back to Results FAQ List', value: 'back', nextStepId: 'faq_cat_results' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q13':
        addMessage(
          "Yes, we work with major pet insurance providers. In many cases, we can process gap-only payments where you only pay the difference between our invoice and your eligible policy benefit at checkout.",
          'bot',
          [
            { label: '⬅️ Back to Results FAQ List', value: 'back', nextStepId: 'faq_cat_results' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q14':
        addMessage(
          "No. To keep advanced diagnostics accessible, Melbourne Animal CT is a streamlined outpatient service. We do not charge additional standard consultation or overnight hospital fees on top of your pet's diagnostic imaging protocol.",
          'bot',
          [
            { label: '⬅️ Back to Results FAQ List', value: 'back', nextStepId: 'faq_cat_results' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      case 'faq_q15':
        addMessage(
          "While the CT scan has no side effects, your pet may remain slightly sleepy or clumsy for up to 24 hours as the sedation wears off. We recommend keeping them safe indoors in a warm, quiet environment, and offering a smaller meal than usual for their first feed.",
          'bot',
          [
            { label: '⬅️ Back to Results FAQ List', value: 'back', nextStepId: 'faq_cat_results' },
            { label: '📋 Main FAQ Menu', value: 'main_faqs', nextStepId: 'chatbot_faq_categories' }
          ]
        );
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (option: ChatMessage['options'][0]) => {
    addMessage(option.label, 'user');
    setTimeout(() => {
      triggerStep(option.nextStepId);
    }, 400);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    addMessage(userText, 'user');
    setInputValue('');

    // Branching logic based on active state of lead capture
    setTimeout(() => {
      if (currentStep === 'capture_name_owner') {
        setTempLead(p => ({ ...p, name: userText }));
        triggerStep('capture_contact_owner');
      } else if (currentStep === 'capture_contact_owner') {
        setTempLead(p => ({ ...p, contact: userText }));
        triggerStep('capture_pet_owner');
      } else if (currentStep === 'capture_pet_owner') {
        setTempLead(p => {
          const finalObj = { ...p, petNameOrClinic: userText };
          // Need to set timeout so state updates before finalization
          setTimeout(() => {
            setTempLead(finalObj);
            triggerStep('finalize_lead');
          }, 50);
          return finalObj;
        });
      } else if (currentStep === 'capture_name_vet') {
        setTempLead(p => ({ ...p, name: userText }));
        triggerStep('capture_contact_vet');
      } else if (currentStep === 'capture_contact_vet') {
        setTempLead(p => ({ ...p, contact: userText }));
        triggerStep('capture_clinic_vet');
      } else if (currentStep === 'capture_clinic_vet') {
        setTempLead(p => {
          const finalObj = { ...p, petNameOrClinic: userText };
          setTimeout(() => {
            setTempLead(finalObj);
            triggerStep('finalize_lead');
          }, 50);
          return finalObj;
        });
      }
    }, 400);
  };

  const clearLeads = () => {
    if (confirm("Clear all captured leads in this demo?")) {
      localStorage.removeItem('melbourne_animal_ct_leads');
      window.dispatchEvent(new Event('storage'));
      refreshLeads();
    }
  };

  const activeMessage = messages[messages.length - 1];
  const inputRequired = activeMessage?.inputRequired && activeMessage.inputRequired !== 'none';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" id="chatbot-container">
      
      {/* Lead capture notification counter (extremely neat demo sales tool!) */}
      {leadsCount > 0 && !isOpen && (
        <button
          onClick={() => {
            setShowLeadViewer(true);
            setIsOpen(true);
          }}
          className="bg-sage-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-sage-700 flex items-center gap-1.5 hover:bg-sage-700 transition-all scale-95"
        >
          <Sparkles className="h-3 w-3 text-white animate-pulse" />
          <span>View {leadsCount} Demo Leads Captured</span>
        </button>
      )}

      {/* Floating Chat Bubble Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowLeadViewer(false);
          }}
          className="h-14 w-14 rounded-full bg-white shadow-xl hover:shadow-2xl hover:border-sage-500/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer relative group border-2 border-cream-dark"
          aria-label="Open chat with Pawsy"
        >
          <Logo size={36} />
          <span className="absolute -top-1 -right-1 bg-sage-500 text-[10px] font-extrabold h-5 w-5 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
            🐾
          </span>
          
          {/* Tooltip hint */}
          <div className="absolute right-16 top-3 py-1 px-3 rounded-lg bg-charcoal-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Ask Pawsy 🐾
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[385px] h-[500px] bg-cream-light rounded-3xl border border-cream-dark shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-cream-medium px-4 py-3.5 border-b border-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <div>
                <h4 className="font-display font-extrabold text-sm text-charcoal-900 flex items-center gap-1">
                  Pawsy AI
                  <span className="h-2 w-2 rounded-full bg-sage-500 inline-block animate-ping" />
                </h4>
                <p className="text-[10px] text-charcoal-500 font-semibold uppercase tracking-wider">Diagnostic Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Sales Demo Lead Viewer Toggle */}
              <button
                onClick={() => setShowLeadViewer(!showLeadViewer)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  showLeadViewer 
                    ? 'bg-sage-600 text-white shadow-sm' 
                    : 'bg-cream-dark/60 text-charcoal-500 hover:bg-cream-dark'
                }`}
                title="Secret Sales Demo Lead Viewer"
              >
                <FolderSync className="h-3.5 w-3.5" />
                <span>{leadsCount} Leads</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-charcoal-500 hover:bg-cream-dark"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
            
            {showLeadViewer ? (
              /* SECRETE SALES PITCH LEAD VIEWER */
              <div className="space-y-3 py-1 animate-fadeIn text-left">
                <div className="flex items-center justify-between border-b border-cream-dark pb-2">
                  <h5 className="font-display font-extrabold text-xs text-charcoal-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-sage-600" />
                    Demo Lead Captures ({savedLeads.length})
                  </h5>
                  {savedLeads.length > 0 && (
                    <button 
                      onClick={clearLeads}
                      className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-0.5"
                    >
                      <Trash2 className="h-3 w-3" /> Clear
                    </button>
                  )}
                </div>

                <p className="text-[10px] text-charcoal-500 leading-normal">
                  🚀 <span className="font-bold">Sales Pitch Benefit:</span> This is a real lead capture database stored locally. In the final build, these form submissions are emailed directly to Melbourne Animal CT or synced to Vetport / RXWorks!
                </p>

                {savedLeads.length === 0 ? (
                  <div className="text-center py-12 text-[11px] text-charcoal-500">
                    No leads collected yet. Interact with the chatbot or callback forms to capture a lead!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {savedLeads.map((lead) => (
                      <div key={lead.id} className="p-3 bg-cream-medium rounded-xl border border-cream-dark text-[10.5px] space-y-1">
                        <div className="flex justify-between font-bold text-charcoal-900">
                          <span>{lead.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider ${lead.contactType === 'vet' ? 'bg-sage-600 text-white' : 'bg-terracotta-500 text-white'}`}>
                            {lead.contactType === 'vet' ? 'Veterinary' : 'Owner'}
                          </span>
                        </div>
                        <div className="text-charcoal-500">
                          {lead.phone && <div>📞 {lead.phone}</div>}
                          {lead.email && <div>✉️ {lead.email}</div>}
                          {lead.petName && <div>🐶 Pet: {lead.petName}</div>}
                          {lead.clinicName && <div>🩺 Clinic: {lead.clinicName}</div>}
                        </div>
                        <div className="text-[8px] text-charcoal-500 text-right font-mono mt-1 pt-1 border-t border-cream-dark/50">
                          {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => setShowLeadViewer(false)}
                  className="w-full py-2 bg-charcoal-900 text-white font-bold rounded-xl text-xs"
                >
                  Return to Chat Dialog
                </button>
              </div>
            ) : (
              /* STANDARD RULE-BASED CHAT DIALOG */
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* Speech Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs font-medium leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-terracotta-500 text-white rounded-br-none'
                          : 'bg-cream-medium text-charcoal-900 rounded-bl-none'
                      }`}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                    
                    {/* Timestamp */}
                    <span className="text-[9px] text-charcoal-500 mt-1 px-1 font-mono">{msg.timestamp}</span>

                    {/* Quick options buttons list */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-col gap-1.5 mt-3 w-full max-w-[85%] text-left" id={`options-${msg.id}`}>
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(opt)}
                            className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold border border-cream-dark bg-white hover:border-terracotta-500 hover:text-terracotta-500 shadow-sm transition-all text-charcoal-800 cursor-pointer"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            )}

          </div>

          {/* Form Input Bar */}
          {!showLeadViewer && (
            <div className="p-3 bg-cream-medium border-t border-cream-dark">
              {inputRequired ? (
                <form onSubmit={handleInputSubmit} className="flex gap-2">
                  <input
                    type="text"
                    required
                    className="flex-1 bg-white rounded-xl border border-cream-dark px-3 py-2 text-xs focus:outline-none focus:border-terracotta-500 text-charcoal-800"
                    placeholder={activeMessage.inputPlaceholder || 'Type here...'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="h-8 w-8 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-1 text-[10px] text-charcoal-500 font-semibold uppercase tracking-wider flex items-center justify-center gap-1 select-none">
                  <span>Pawsy Diagnostic Flow Active</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-500 animate-ping" />
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
