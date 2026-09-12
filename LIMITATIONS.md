# Assist Application — Architecture & Implementation Limitations

This document provides a transparent, production-readiness audit of the **Assist** application for users with disabilities in India. It outlines which capabilities are fully functional in code today, which use safe stubs/fallbacks, and the operational, legal, or dataset requirements needed for real-world nationwide deployment.

---

## 1. Text-to-Speech (TTS) Communication Box
- **Current State:** **100% Fully Functional.**
  - Uses the on-device Web Speech API (`window.speechSynthesis`) with speech rate (0.5x–2.0x), pitch adjustments, and locale detection (including English-India `en-IN` and Hindi `hi-IN`).
  - Saved phrases persist locally in browser storage / local SQLite or device cache with 1-tap re-speak and clear actions.
  - WCAG AA compliant UI with scalable font sizes, 48px+ touch targets, and high-contrast modes.
- **Production Roadmap:**
  - For offline environments where browser/device voice engines lack specific Indian regional language synthesizers (e.g., Marathi, Tamil, Bengali, Telugu), integrate on-device offline neural TTS models (e.g., Piper or Bhashini open-source models by AI4Bharat).

---

## 2. SOS & Emergency Contacts
- **Current State:** **Safe MVP Implementation.**
  - Emergency contact manager allows users to store trusted contacts (name, phone number, relationship).
  - One-touch persistent floating SOS button with a 3-second safety countdown to prevent false positives.
  - Live GPS coordinates are retrieved via HTML5 Geolocation API / device GPS and formatted into a Google Maps navigation link (`https://maps.google.com/?q=lat,lng`).
  - When Twilio credentials (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`) are supplied, the backend sends automated SMS alerts to all contacts.
  - If Twilio is unconfigured, the app falls back gracefully to opening the native device SMS interface (`sms:number?body=...`) or WhatsApp emergency share.
  - Includes a direct **"Call 112"** button that invokes the native phone dialer (`tel:112`).
- **Critical Safety & Legal Constraint:**
  - **The app DOES NOT claim to dispatch police or ERSS directly.**
  - Under Government of India Ministry of Home Affairs (MHA) regulations, automated integration with the National Emergency Response Support System (ERSS 112) requires statutory certification, government clearance, and strict API access controls. The app strictly triggers the phone's native dialer.

---

## 3. Accessible Places Map
- **Current State:** **Functional with Seed Data & Crowdsourcing.**
  - Seeded with comprehensive accessibility data for prominent transit hubs and landmarks in Indian cities:
    - New Delhi (Connaught Place, AIIMS, Rajiv Chowk Metro)
    - Mumbai (Bandra Station, Phoenix Palladium, BKC)
    - Bengaluru (MG Road Metro, Cubbon Park, Bangalore City Railway Station)
  - Places include granular accessibility tags: `wheelchair_entrance`, `ramp_available`, `accessible_restroom`, `tactile_paving`, `braille_signage`, `low_counter`, `elevator`.
  - Filter by accessibility tags.
  - Crowdsourced place submission form allows users and volunteers to submit new locations and tag audits.
  - Interactive map operates with OpenStreetMap / Leaflet tile fallback when `GOOGLE_MAPS_API_KEY` is not provided, and smoothly adopts Google Maps JavaScript API when key is configured.
- **Production Roadmap:**
  - Establish a community moderation and verification workflow before crowdsourced place additions become officially "Verified Accessible".
  - Partner with Indian urban local bodies (e.g., NDMC, BMC, BBMP) and organizations like Nipman Foundation / Svayam to import verified audit databases.

---

## 4. Accessible Route-Finding
- **Current State:** **Functional Rule-Based Routing.**
  - Computes pedestrian paths and checks each step against the local accessibility database.
  - Identifies hazards such as stairs without ramps, missing curb ramps, or reported construction.
  - Displays side-by-side comparison between the fastest route and the accessible ramped route.
  - Flags steep slope alerts and surface condition details.
- **Limitations:**
  - Neither Google Directions API nor OpenStreetMap consistently provides wheelchair ramp or slope elevation data in India.
  - Current elevation warnings rely on user-reported steep segments and crowdsourced obstacle pins.

---

## 5. Obstacle Reporting & Dynamic Rerouting
- **Current State:** **Implemented Rule-Based Exclusion.**
  - Users can report an obstacle with photo upload/capture, obstacle type (broken footpath, steep stairs, deep monsoon waterlogging, construction block), severity, and GPS pin.
  - **Backend Rule:** When a segment accumulates $N \ge 2$ obstacle reports, the routing engine flags it as blocked and automatically routes pedestrians around the blocked segment.
  - Community members can vote ("Still blocking" vs "Cleared").
- **Production Roadmap:**
  - Layer an on-device/cloud vision model (e.g., Gemini or Cloud Vision) to pre-classify obstacle photos and estimate sidewalk passability automatically.

---

## 6. Blind Navigation Assistant (Camera-Based)
- **Current State:** **Experimental Prototype with Loud Safety Warnings.**
  - Connects to the device camera (`getUserMedia`) and performs object & distance detection (curbs, doorways, pedestrians, steps, obstacles).
  - Provides real-time spoken directions through TTS: *"Doorway ahead, 2 meters"*, *"Obstacle ahead, move right"*.
  - Proximity audio beeper modulates frequency as obstacles get closer.
  - **High-Visibility Safety Warning:** A persistent warning notifies users: *"Experimental aid: Under no circumstances should this replace a white cane or guide dog."*
- **Limitations:**
  - Single RGB phone cameras cannot provide millimeter-grade depth or distance measurements; ranges are classified into approximate buckets (*Near*, *A few steps*, *Far*).
  - True depth sensing requires hardware LiDAR or calibrated stereoscopic sensors (ARKit / ARCore).
  - Requires extensive clinical and real-world trials with visually impaired communities before being safe for independent navigation.

---

## 7. Indian Sign Language (ISL) Recognition
- **Current State:** **Focused Core Vocabulary Prototype.**
  - Implements hand tracking and sign recognition for a defined vocabulary:
    - ISL Alphabet (A, B, C, D...)
    - Essential emergency and daily signs: *"Help"*, *"Water"*, *"Doctor"*, *"Food"*, *"Yes"*, *"No"*, *"Thank you"*, *"Namaste"*.
  - Displays real-time confidence scores and landmark wireframes.
  - Includes a 1-tap "Speak Sign" bridge that pipes recognized words directly into the Phase 1 TTS Communication box.
- **Limitations:**
  - Continuous, full-grammar Indian Sign Language translation involves facial expressions, two-handed spatial grammar, and head posture, which remains an active open research field (e.g., AI4Bharat / IIT initiatives).

---

## 8. Caretaker Marketplace
- **Current State:** **Technical Scaffold & Simulation.**
  - Caretaker directory with filters for specialization (Mobility, Visual Guide, ISL Interpreter, Elderly Care).
  - Caretaker profile submission form (Aadhaar / photo ID upload, medical certifications, hourly rates in ₹ INR, availability).
  - Booking request workflow with date, time, and specific accessibility requirements.
  - In-app messaging interface between user and caretaker with accessible quick-reply chips.
- **Operational / Legal Limitation:**
  - Caretaker background checks (police verification, criminal background check, first-aid CPR certification) are non-code operational requirements that must be handled by administrative staff before a caretaker is granted "Verified" status.
