/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'services' | 'about' | 'faq' | 'contact';

export type ServiceSubTab = 'what-is-ct' | 'pet-owners' | 'referring-vets';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  imageUrl: string;
  isPlaceholder?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: 'Pet Owner' | 'Referring Veterinarian';
  location: string;
  rating: number;
  content: string;
  date: string;
  isPlaceholder?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'owners' | 'vets' | 'imaging';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  options?: ChatOption[];
  inputRequired?: 'text' | 'email' | 'phone' | 'none';
  inputPlaceholder?: string;
  callbackAction?: string;
}

export interface ChatOption {
  label: string;
  value: string;
  nextStepId: string;
}

export interface LeadCapture {
  id: string;
  name: string;
  contactType: 'owner' | 'vet';
  email: string;
  phone: string;
  petName?: string;
  clinicName?: string;
  message?: string;
  timestamp: string;
}
