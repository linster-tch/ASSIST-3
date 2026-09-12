import React from 'react';
import { ActiveTab, AccessibilitySettings, AppLanguage } from '../types';
import { AssistLogo } from './AssistLogo';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation } from '../i18n';
import {
  Volume2,
  Compass,
  AlertTriangle,
  Eye,
  Users,
  Settings,
  Sun,
  Moon,
  Type,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  onOpenSOS: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  setSettings,
  onOpenSOS
}) => {
  const t = getTranslation(settings.language || 'en');

  const toggleContrast = () => {
    soundEngine.playBeep(600, 'sine', 0.1);
    setSettings(s => ({ ...s, highContrast: !s.highContrast }));
  };

  const cycleFontScale = () => {
    soundEngine.playBeep(700, 'sine', 0.1);
    setSettings(s => {
      const next: Record<AccessibilitySettings['fontScale'], AccessibilitySettings['fontScale']> = {
        normal: 'large',
        large: 'extralarge',
        extralarge: 'normal'
      };
      return { ...s, fontScale: next[s.fontScale] };
    });
  };

  const handleLanguageChange = (lang: AppLanguage) => {
    setSettings(s => ({ ...s, language: lang }));
  };

  const navTabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'tts', label: t.nav.tts, icon: <Volume2 className="w-4 h-4" /> },
    { id: 'map', label: t.nav.map, icon: <Compass className="w-4 h-4" /> },
    { id: 'obstacles', label: t.nav.obstacles, icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'camera', label: t.nav.camera, icon: <Eye className="w-4 h-4" /> },
    { id: 'caretakers', label: t.nav.caretakers, icon: <Users className="w-4 h-4" /> },
    { id: 'settings', label: t.nav.settings, icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header
      role="banner"
      className={`border-b sticky top-0 z-40 px-4 py-3 transition-colors backdrop-blur-xl ${
        settings.highContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-[#090D16]/95 text-slate-100 border-slate-800/80 shadow-lg shadow-black/20'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & New Official Logo */}
        <div className="flex items-center gap-3">
          <AssistLogo
            size="md"
            showText={true}
            showTagline={true}
            taglineText={t.common.tagline}
            highContrast={settings.highContrast}
          />
        </div>

        {/* Accessibility & Quick Utility Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 5-Language Selector with audio speech preview */}
          <LanguageSelector
            currentLanguage={settings.language || 'en'}
            onSelectLanguage={handleLanguageChange}
            highContrast={settings.highContrast}
          />

          {/* Direct 112 Native Dialer */}
          <a
            id="btn-call-112"
            href="tel:112"
            title="Dial National Emergency Helpline 112"
            aria-label="Call National Emergency 112 via native phone dialer"
            onClick={() => soundEngine.playBeep(880, 'square', 0.2)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs tracking-wide shadow-md shadow-red-950/40 transition-transform active:scale-95 border border-red-400/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.common.call112}</span>
          </a>

          {/* Text Size Cycler */}
          <button
            id="btn-font-scale"
            type="button"
            onClick={cycleFontScale}
            title={`Current text size: ${settings.fontScale}. Click to cycle.`}
            aria-label={`Current text scale: ${settings.fontScale}. Tap to change text size.`}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400 hover:bg-yellow-950'
                : 'bg-[#131926] text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="uppercase font-mono text-[11px]">{settings.fontScale}</span>
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            id="btn-contrast-toggle"
            type="button"
            onClick={toggleContrast}
            title="Toggle high contrast accessibility mode"
            aria-label={settings.highContrast ? 'Switch to standard dark mode' : 'Switch to high contrast yellow and black mode'}
            className={`p-2 rounded-xl border transition ${
              settings.highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300 shadow'
                : 'bg-[#131926] text-amber-400 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            {settings.highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav
        role="navigation"
        aria-label="Main features"
        className="max-w-7xl mx-auto mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs font-semibold"
      >
        {navTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              id={`nav-tab-${tab.id}`}
              key={tab.id}
              onClick={() => {
                soundEngine.playBeep(500, 'sine', 0.08);
                setActiveTab(tab.id);
              }}
              aria-selected={isActive}
              role="tab"
              className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                isActive
                  ? settings.highContrast
                    ? 'bg-yellow-400 text-black font-extrabold border-2 border-yellow-400 shadow-md scale-102'
                    : 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/40 border border-blue-400/40'
                  : settings.highContrast
                  ? 'text-yellow-300 hover:bg-yellow-950/60 border border-transparent'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent hover:border-slate-800'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
