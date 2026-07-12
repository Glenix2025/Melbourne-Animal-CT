# Melbourne Animal CT – Sales Demo & Chatbot

This is a highly polished, interactive **Sales Demo Website & Embedded Rule-Based Chatbot** designed as a prospective pitch package for **Melbourne Animal CT** (located in Brunswick, Melbourne). 

By specializing strictly in high-definition computed tomography (CT) and operating on a referral-only model, this demo presents a compelling pitch for why they should invest in a dedicated, high-converting digital storefront and Pawsy AI assistant.

---

## 📸 Key Features Built

1. **Warm, Friendly Branding & Aesthetic**: Replicates the cozy, organic feel of elite practices like *Vets on Crown* (using soft ivory/cream backdrops `#FAF8F5`, rustic terracotta `#D27D65` for calls to action, and calming sage greens `#839B84`).
2. **Sticky Header with Dual Actions**: A fixed navigation header displaying a direct-dial Brunswick telephone trigger and a high-converting **"Book Scan"** CTA.
3. **Say Goodbye to [Pain Points] Section**: An agitation-and-solution section explaining typical diagnostic delays, hidden double-charges, and blurry flat X-rays, directly contrasting them with Melbourne Animal CT's immediate availability and specialist reporting.
4. **Interactive Tab-Based Information Architecture**: Supports a strict split-audience navigation:
   - **What is a CT Scan?** (Technical, 3D vs. 2D science)
   - **Info for Pet Owners** (Fasting guidelines, care timeline, same-day expectations, and transparent starting prices).
   - **Info for Referring Veterinarians** (Workflow protocols, DICOM output, specialist reporting, no patient-poaching guarantees, and hardware scanner specs).
5. **Interactive Reviews Filter**: A testimonial carousel allowing prospects to toggle between feedback written by Pet Owners and local Referring Doctors.
6. **Custom Vector Location Map**: A highly responsive, brand-matched, hand-crafted SVG map representing their location on Sydney Road, Brunswick, avoiding external iframe failures or tracking limits.
7. **Rule-Based "Pawsy AI" Chatbot Widget**: A floating interactive assistant with branching dialogue pathways:
   - Diagnoses details, fasting guidelines, and booking instructions.
   - Fully fledged **Lead Capture form** (capturing Name, Email, Phone, Pet Name, or Clinic Name).
8. **Live Demo Lead Capture Database (Persisting Local Storage)**: To make your pitch unforgettable, **we built a Live Lead Viewer inside the chatbot!** Clicking the "Leads" button in the chatbot header reveals a database of contacts captured right in your browser during the live demo.

---

## 🛠️ Content Audit: What is Real vs. Placeholder

To ensure a smooth sales pitch, here is a breakdown of all clinical claims, pricing models, and portraits used in the demo so you know what is confirmed vs. mock:

### ✅ Real Seeding (Accurate Facts Used)
- **Address**: 590 Sydney Road, Brunswick VIC 3056.
- **Phone**: `03 9256 2896`.
- **Specialization**: Dedicated scanning-only clinic (no general medicine or surgery).
- **Core Differentiators**: Same-day CT scans, no auxiliary consult/admission fees, Board-Certified specialist radiologist interpretation, and urgent 4-hour reports.

### ⚠️ Placeholder Content (What to customize before pitching)
Before you pitch to the clinic, review and replace these items to fit their exact specifications:

| Area | Page/Component | Placeholder Used in Demo | What to Ask / Sourced File |
| :--- | :--- | :--- | :--- |
| **Pricing** | `ServicesSection.tsx` | Starting from **$950 AUD** flat-rate (all-inclusive sedation, scanning, and written specialist report). | Confirm if they use flat multi-tier rates or estimate ranges. (*Location: `/src/data.ts` - `faqs`*) |
| **Staff & Radiologists** | `AboutSection.tsx` | **Dr. Catherine Vance** (Specialist Radiologist), **Dr. Marcus Thorne** (Imaging Vet), and **Sarah Jenkins** (Technologist) with professional headshots. | Obtain actual bios and photo headshots of their radiologists and technicians. (*Location: `/src/src/data.ts` - `teamMembers`*) |
| **Testimonials** | `Testimonials.tsx` | Reviews from Elena Rostova (Coburg pet owner), Dr. James Mercer (Brunswick Vet Clinic), and others. | Ask for actual reviews or referring letters they've received. (*Location: `/src/data.ts` - `reviews`*) |
| **Scanner Specs** | `ServicesSection.tsx` | State-of-the-art **GE CT Scanner** with sub-millimeter slices (0.625mm). | Confirm their exact GE model (e.g. GE BrightSpeed, GE Revolution). (*Location: `/src/components/ServicesSection.tsx`*) |
| **Photos** | Various | High-resolution Unsplash veterinarian and happy pet images. | Swap in actual images of the Brunswick clinic interior and their scanner. |

---

## 🚀 Technical Implementation

- **Framework**: React 19 + TypeScript.
- **Style Compilation**: Tailwind CSS v4.
- **Animations**: Lucide React + custom responsive layout state switches.
- **Routing**: Zero-backend state-based routing. Builds cleanly to standard static files in `dist/` and is fully deployable to **GitHub Pages** (same as your other Pawsy builds) without requiring Node or Docker at runtime.
