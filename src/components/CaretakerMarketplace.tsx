import React, { useState, useEffect } from 'react';
import { CaretakerProfile, CaretakerBooking, CaretakerMessage, AccessibilitySettings } from '../types';
import { api } from '../services/api';
import { soundEngine, speakText } from '../utils/audio';
import {
  Users,
  ShieldCheck,
  Star,
  Clock,
  Calendar,
  MapPin,
  MessageSquare,
  Send,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  X,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface CaretakerMarketplaceProps {
  settings: AccessibilitySettings;
}

export const CaretakerMarketplace: React.FC<CaretakerMarketplaceProps> = ({ settings }) => {
  const [caretakers, setCaretakers] = useState<CaretakerProfile[]>([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedCaretaker, setSelectedCaretaker] = useState<CaretakerProfile | null>(null);

  // Modals & Chat
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('Tomorrow, 10:00 AM');
  const [bookingHours, setBookingHours] = useState(2);
  const [pickupAddress, setPickupAddress] = useState('Rajiv Chowk Metro Station Gate 2, New Delhi');
  const [specialNeeds, setSpecialNeeds] = useState('Wheelchair transfer assistance and sighted guide to hospital OPD');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Chat State
  const [messages, setMessages] = useState<CaretakerMessage[]>([]);
  const [newChatText, setNewChatText] = useState('');

  // Caretaker Application State
  const [applyName, setApplyName] = useState('');
  const [applyCity, setApplyCity] = useState('New Delhi');
  const [applySpec, setApplySpec] = useState('Mobility & Wheelchair');
  const [applyYears, setApplyYears] = useState(3);
  const [applyRate, setApplyRate] = useState(350);
  const [applyBio, setApplyBio] = useState('');
  const [applyNotice, setApplyNotice] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const list = await api.getCaretakers(selectedCity, selectedSpec);
      setCaretakers(list);
      const msgs = await api.getMessages();
      setMessages(msgs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCity, selectedSpec]);

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaretaker) return;

    soundEngine.playBeep(850, 'sine', 0.2);
    try {
      const res = await api.bookCaretaker({
        caretakerId: selectedCaretaker.id,
        date: bookingDate,
        durationHours: bookingHours,
        pickupAddress,
        specialNeeds
      });
      if (res.success) {
        setBookingSuccess(`Booking confirmed with ${selectedCaretaker.fullName}! Ref: ${res.booking.id}`);
        speakText(`Booking confirmed with ${selectedCaretaker.fullName}.`);
        setIsBookingModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    soundEngine.playBeep(700, 'sine', 0.1);
    const sent = await api.sendMessage(newChatText.trim());
    setMessages(prev => [...prev, sent]);
    setNewChatText('');
  };

  const handleApplyCaretaker = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playBeep(800, 'sine', 0.2);
    try {
      const res = await api.applyCaretaker({
        fullName: applyName,
        city: applyCity,
        specialization: applySpec,
        experienceYears: applyYears,
        hourlyRateInr: applyRate,
        bio: applyBio
      });
      if (res.success) {
        setApplyNotice(res.notice);
        setIsApplyModalOpen(false);
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      role="region"
      aria-label="Caretaker & Mobility Escort Marketplace"
      className="space-y-6"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Caretaker & Escort Marketplace</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Certified mobility assistants, sighted guides, and sign language interpreters across India.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-open-chat-modal"
            type="button"
            onClick={() => {
              soundEngine.playBeep(600, 'sine', 0.1);
              setIsChatOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 shadow"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Caretaker Chat ({messages.length})</span>
          </button>

          <button
            id="btn-open-apply-caretaker"
            type="button"
            onClick={() => {
              soundEngine.playBeep(650, 'sine', 0.1);
              setIsApplyModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Join as Caretaker</span>
          </button>
        </div>
      </div>

      {/* Mandatory Regulatory / Operational Notice */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-start gap-3">
        <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-stone-100">
            Operational Verification Scaffold & Police Verification Notice
          </div>
          <p className="text-stone-400 leading-relaxed">
            As documented in <code>LIMITATIONS.md</code>, all real-world caretakers must undergo mandatory police background verification, identity check (Aadhaar), and first-aid/CPR certification before activation. Applications remain in <strong>PENDING</strong> review status until approved by administrators.
          </p>
        </div>
      </div>

      {bookingSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{bookingSuccess}</span>
          </div>
          <button onClick={() => setBookingSuccess(null)} className="text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {applyNotice && (
        <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500 text-xs text-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{applyNotice}</span>
          </div>
          <button onClick={() => setApplyNotice(null)} className="text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-400">Specialization:</span>
        {[
          'All',
          'Mobility & Wheelchair',
          'Visual Guide',
          'Sign Language (ISL)',
          'Elderly & Nursing Care'
        ].map(spec => (
          <button
            key={spec}
            type="button"
            onClick={() => {
              soundEngine.playBeep(550, 'sine', 0.08);
              setSelectedSpec(spec);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedSpec === spec
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Caretaker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caretakers.map(caretaker => (
          <div
            key={caretaker.id}
            className={`p-5 rounded-2xl border transition-all ${
              settings.highContrast
                ? 'bg-black border-2 border-yellow-400 text-yellow-300'
                : 'bg-stone-900 border-stone-800 text-stone-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={caretaker.avatar}
                alt={caretaker.fullName}
                className="w-16 h-16 rounded-2xl object-cover border border-stone-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold truncate">
                      {caretaker.fullName}
                    </h3>
                    <div className="text-xs text-emerald-400 font-bold mt-0.5">
                      {caretaker.specialization}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-stone-100">
                      ₹{caretaker.hourlyRateInr}
                    </span>
                    <span className="text-[10px] text-stone-400 block">/ hour</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-stone-300">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {caretaker.averageRating.toFixed(1)} ({caretaker.totalReviews})
                  </span>
                  <span>•</span>
                  <span>{caretaker.experienceYears} yrs experience</span>
                  <span>•</span>
                  <span>{caretaker.city}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-stone-300 mt-3 leading-relaxed">
              {caretaker.bio}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {caretaker.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-stone-950 text-stone-300 border border-stone-800 text-[10px] font-semibold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {b}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center gap-2">
              <button
                id={`btn-book-${caretaker.id}`}
                type="button"
                onClick={() => {
                  soundEngine.playBeep(700, 'sine', 0.1);
                  setSelectedCaretaker(caretaker);
                  setIsBookingModalOpen(true);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition"
              >
                Book Assistance
              </button>

              <button
                id={`btn-chat-${caretaker.id}`}
                type="button"
                onClick={() => {
                  soundEngine.playBeep(650, 'sine', 0.1);
                  setSelectedCaretaker(caretaker);
                  setIsChatOpen(true);
                }}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedCaretaker && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl relative ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black mb-1">
              Request Caretaker Booking
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Booking {selectedCaretaker.fullName} ({selectedCaretaker.specialization}) at ₹{selectedCaretaker.hourlyRateInr}/hr
            </p>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Preferred Date / Time</label>
                  <input
                    type="text"
                    required
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Duration (Hours)</label>
                  <select
                    value={bookingHours}
                    onChange={e => setBookingHours(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value={1}>1 Hour (₹{selectedCaretaker.hourlyRateInr * 1})</option>
                    <option value={2}>2 Hours (₹{selectedCaretaker.hourlyRateInr * 2})</option>
                    <option value={4}>4 Hours (Half Day - ₹{selectedCaretaker.hourlyRateInr * 4})</option>
                    <option value={8}>8 Hours (Full Day - ₹{selectedCaretaker.hourlyRateInr * 8})</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Pickup Location / Meeting Point *</label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={e => setPickupAddress(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Accessibility Needs & Specific Instructions</label>
                <textarea
                  rows={2}
                  value={specialNeeds}
                  onChange={e => setSpecialNeeds(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs flex justify-between items-center">
                <span className="text-stone-400">Total Booking Estimate:</span>
                <span className="text-base font-black text-emerald-400">
                  ₹{selectedCaretaker.hourlyRateInr * bookingHours}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-1/3 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow"
                >
                  Confirm Booking Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Messaging Modal */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-5 border shadow-2xl relative flex flex-col h-[520px] ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm">
                    {selectedCaretaker ? selectedCaretaker.fullName : 'Rajesh Verma (Caretaker)'}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Verified Support Assistant
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-full bg-stone-800 text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 my-2">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-stone-800 text-stone-200 rounded-bl-none border border-stone-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold block opacity-70 mb-0.5">
                      {m.senderName}
                    </span>
                    <p>{m.text}</p>
                  </div>
                  <span className="text-[9px] text-stone-500 mt-0.5 px-1 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Accessible Reply Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {[
                'I have arrived at the gate',
                'Please bring wheelchair ramp support',
                'I am near the accessible elevator',
                'Thank you for your assistance'
              ].map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    soundEngine.playBeep(600, 'sine', 0.08);
                    setNewChatText(chip);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-medium whitespace-nowrap border border-stone-700 shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-stone-800">
              <input
                type="text"
                value={newChatText}
                onChange={e => setNewChatText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Caretaker Onboarding Application Modal */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black mb-1">
              Apply as Caretaker / Mobility Guide
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Submit your credentials. Background verification is required before real bookings activate.
            </p>

            <form onSubmit={handleApplyCaretaker} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Full Legal Name (as per Aadhaar/ID) *</label>
                <input
                  type="text"
                  required
                  value={applyName}
                  onChange={e => setApplyName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra Sharma"
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">City *</label>
                  <select
                    value={applyCity}
                    onChange={e => setApplyCity(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value="New Delhi">New Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Specialization *</label>
                  <select
                    value={applySpec}
                    onChange={e => setApplySpec(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value="Mobility & Wheelchair">Mobility & Wheelchair</option>
                    <option value="Visual Guide">Visual Guide</option>
                    <option value="Sign Language (ISL)">Sign Language (ISL)</option>
                    <option value="Elderly & Nursing Care">Elderly & Nursing Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Years of Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={applyYears}
                    onChange={e => setApplyYears(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Hourly Rate (₹ INR)</label>
                  <input
                    type="number"
                    min="150"
                    max="2000"
                    value={applyRate}
                    onChange={e => setApplyRate(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Bio & Experience Overview</label>
                <textarea
                  rows={2}
                  value={applyBio}
                  onChange={e => setApplyBio(e.target.value)}
                  placeholder="Describe your training, certifications, and experience in assisting persons with disabilities..."
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="w-1/3 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow"
                >
                  Submit Application (Pending Review)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
