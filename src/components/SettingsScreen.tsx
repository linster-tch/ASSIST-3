import React, { useState, useEffect } from 'react';
import { EmergencyContact, AccessibilitySettings, ConfigStatus, AppLanguage } from '../types';
import { api } from '../services/api';
import { soundEngine, speakText } from '../utils/audio';
import { getTranslation, SUPPORTED_LANGUAGES } from '../i18n';
import {
  Settings,
  PhoneCall,
  UserPlus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  ShieldCheck,
  Key,
  Smartphone,
  Eye,
  Type,
  ExternalLink,
  Volume2,
  Globe
} from 'lucide-react';

interface SettingsScreenProps {
  contacts: EmergencyContact[];
  setContacts: React.Dispatch<React.SetStateAction<EmergencyContact[]>>;
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  onOpenSOS: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  contacts,
  setContacts,
  settings,
  setSettings,
  onOpenSOS
}) => {
  const t = getTranslation(settings.language || 'en');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Family');
  const [isPrimary, setIsPrimary] = useState(false);
  const [configKeys, setConfigKeys] = useState<ConfigStatus | null>(null);

  useEffect(() => {
    api.getConfig().then(cfg => setConfigKeys(cfg));
  }, []);

  const handleLanguageChange = (lang: AppLanguage) => {
    soundEngine.playBeep(750, 'sine', 0.12);
    setSettings(s => ({ ...s, language: lang }));
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    soundEngine.playBeep(700, 'sine', 0.15);
    const newContact: EmergencyContact = {
      id: `contact-${Date.now()}`,
      name: newName,
      phone: newPhone,
      relation: newRelation,
      isPrimary: isPrimary || contacts.length === 0
    };

    let updated = [...contacts];
    if (newContact.isPrimary) {
      updated = updated.map(c => ({ ...c, isPrimary: false }));
    }
    updated.push(newContact);
    setContacts(updated);
    try {
      localStorage.setItem('assist_emergency_contacts', JSON.stringify(updated));
    } catch {}

    setNewName('');
    setNewPhone('');
    setIsPrimary(false);
    speakText(`Added emergency contact: ${newContact.name}`);
  };

  const handleRemoveContact = (id: string) => {
    soundEngine.playBeep(400, 'sine', 0.1);
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    try {
      localStorage.setItem('assist_emergency_contacts', JSON.stringify(updated));
    } catch {}
  };

  const handleSetPrimary = (id: string) => {
    soundEngine.playBeep(600, 'sine', 0.1);
    const updated = contacts.map(c => ({ ...c, isPrimary: c.id === id }));
    setContacts(updated);
    try {
      localStorage.setItem('assist_emergency_contacts', JSON.stringify(updated));
    } catch {}
  };

  return (
    <section
      role="region"
      aria-label="Application Settings and Emergency Contacts"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" />
            <span>Emergency Contacts & Accessibility Settings</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Configure trusted SOS recipients, dialer shortcuts, audio cues, and audit cloud API credentials.
          </p>
        </div>

        <button
          id="btn-test-sos-trigger"
          type="button"
          onClick={onOpenSOS}
          className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Test Emergency SOS Flow</span>
        </button>
      </div>

      {/* 1. National Emergency 112 Notice (Strict compliance with prompt) */}
      <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <div className="font-extrabold text-sm text-red-200">
            National Emergency Services Integration (112 India / ERSS)
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Per Indian regulatory compliance and as mandated in <code>LIMITATIONS.md</code>, the Assist app
            <strong> does NOT claim to contact police or dispatch emergency services directly via backend API</strong>.
            Formal automated dispatch requires a statutory partnership with the Indian Ministry of Home Affairs ERSS system.
            Instead, the app provides a direct shortcut that triggers your phone's native phone dialer to <strong>112</strong> immediately.
          </p>
          <a
            id="btn-settings-call-112"
            href="tel:112"
            onClick={() => soundEngine.playBeep(900, 'square', 0.2)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Launch Native Dialer to 112</span>
          </a>
        </div>
      </div>

      {/* 2. Trusted Emergency Contacts Manager */}
      <div
        className={`p-5 rounded-2xl border ${
          settings.highContrast
            ? 'bg-black border-2 border-yellow-400 text-yellow-300'
            : 'bg-stone-900 border-stone-800 text-stone-100'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
          <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Trusted Emergency Contacts ({contacts.length})</span>
          </h3>
          <span className="text-xs text-stone-400">
            SMS with live GPS is sent to these contacts during SOS
          </span>
        </div>

        {/* Existing Contacts List */}
        <div className="space-y-2.5 mb-6">
          {contacts.length === 0 ? (
            <p className="text-xs text-stone-500 py-3 text-center">
              No emergency contacts added yet. Add at least one family member, doctor, or trusted ally below.
            </p>
          ) : (
            contacts.map(c => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      c.isPrimary ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-200">{c.name}</span>
                      {c.isPrimary && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                          Primary (Auto-Dial)
                        </span>
                      )}
                    </div>
                    <div className="text-stone-400 mt-0.5">
                      {c.phone} • <span className="text-stone-300">{c.relation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!c.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(c.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 font-medium"
                    >
                      Make Primary
                    </button>
                  )}
                  <a
                    href={`tel:${c.phone}`}
                    className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300"
                    title={`Dial ${c.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveContact(c.id)}
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                    title="Delete contact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add New Contact Form */}
        <form onSubmit={handleAddContact} className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-3">
          <div className="text-xs font-bold text-stone-300">Add New Trusted Contact:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Contact Name (e.g. Priya Sharma)"
              className="text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100"
            />
            <input
              type="tel"
              required
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              placeholder="Phone Number (+91 98765 43210)"
              className="text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100"
            />
            <select
              value={newRelation}
              onChange={e => setNewRelation(e.target.value)}
              className="text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100"
            >
              <option value="Family / Parent">Family / Parent</option>
              <option value="Spouse / Partner">Spouse / Partner</option>
              <option value="Sibling">Sibling</option>
              <option value="Doctor / Physician">Doctor / Physician</option>
              <option value="Caretaker / Guide">Caretaker / Guide</option>
              <option value="Friend / Ally">Friend / Ally</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrimary}
                onChange={e => setIsPrimary(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span>Set as Primary contact (prioritized in auto-dial)</span>
            </label>

            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <UserPlus className="w-4 h-4" />
              <span>Save Contact</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Accessibility UI & Language Preferences */}
      <div
        className={`p-5 rounded-2xl border ${
          settings.highContrast
            ? 'bg-black border-2 border-yellow-400 text-yellow-300'
            : 'bg-stone-900 border-stone-800 text-stone-100'
        }`}
      >
        <div className="pb-3 mb-4 border-b border-stone-800">
          <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{t.common.language}: Multi-Language Support (India)</span>
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Switch the complete application and voice synthesizer between the 5 supported Indian languages.
          </p>
        </div>

        {/* 5-Language Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
          {SUPPORTED_LANGUAGES.map(lang => {
            const isSelected = (settings.language || 'en') === lang.code;
            return (
              <button
                key={lang.code}
                id={`settings-lang-${lang.code}`}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? settings.highContrast
                      ? 'bg-yellow-400 text-black border-2 border-yellow-300 shadow-md font-bold'
                      : 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
                    : settings.highContrast
                    ? 'bg-black text-yellow-300 border-yellow-800 hover:border-yellow-400'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider opacity-80">{lang.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="text-base font-black mt-1 font-sans">{lang.nativeName}</div>
              </button>
            );
          })}
        </div>

        <div className="pb-3 mb-4 border-b border-stone-800">
          <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Visual, Audio & Haptic Accessibility Settings</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* High Contrast Toggle */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-200 block">High Contrast Mode</span>
              <span className="text-[11px] text-stone-400">WCAG AAA vivid yellow-on-black color scheme</span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playBeep(600, 'sine', 0.1);
                setSettings(s => ({ ...s, highContrast: !s.highContrast }));
              }}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                settings.highContrast ? 'bg-yellow-400 text-black' : 'bg-stone-800 text-stone-300'
              }`}
            >
              {settings.highContrast ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Turn-by-Turn Speech Announcements */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-200 block">Spoken Turn-by-Turn Guidance</span>
              <span className="text-[11px] text-stone-400">Automatically announce accessible navigation steps</span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playBeep(600, 'sine', 0.1);
                setSettings(s => ({
                  ...s,
                  autoAnnounceTurnByTurn: !s.autoAnnounceTurnByTurn
                }));
              }}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                settings.autoAnnounceTurnByTurn ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-300'
              }`}
            >
              {settings.autoAnnounceTurnByTurn ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. External API Keys & Cloud Services Status Auditor */}
      <div
        className={`p-5 rounded-2xl border ${
          settings.highContrast
            ? 'bg-black border-2 border-yellow-400 text-yellow-300'
            : 'bg-stone-900 border-stone-800 text-stone-100'
        }`}
      >
        <div className="pb-3 mb-4 border-b border-stone-800 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Cloud Services & Graceful Fallback Status</span>
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">Configured via .env</span>
        </div>

        <div className="space-y-3">
          {[
            {
              name: 'Google Maps Platform (Places, Directions, SDK)',
              key: 'googleMaps',
              configured: configKeys?.googleMaps?.configured,
              desc: configKeys?.googleMaps?.message || 'Using interactive OpenStreetMap / vector map fallback.'
            },
            {
              name: 'Twilio Cloud SMS (Automated Emergency Dispatch)',
              key: 'twilio',
              configured: configKeys?.twilio?.configured,
              desc: configKeys?.twilio?.message || 'Twilio not set. Device-native SMS & 112 dialer fallback active.'
            },
            {
              name: 'Firebase (Auth & Cloud Storage for Photos)',
              key: 'firebase',
              configured: configKeys?.firebase?.configured,
              desc: configKeys?.firebase?.message || 'Using local in-memory & client storage fallback.'
            },
            {
              name: 'Google Cloud Vision & Gemini AI (Multimodal Analysis)',
              key: 'gemini',
              configured: configKeys?.gemini?.configured,
              desc: configKeys?.gemini?.message || 'Using on-device model and heuristics for obstacle classification.'
            }
          ].map(svc => (
            <div
              key={svc.key}
              className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-200">{svc.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      svc.configured
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {svc.configured ? 'Active (Cloud)' : 'Fallback Mode Active'}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px] mt-1 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
