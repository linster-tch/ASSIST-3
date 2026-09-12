import React from 'react';
import { AlertCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { AppLanguage } from '../types';
import { getTranslation } from '../i18n';

interface FloatingSOSButtonProps {
  onClick: () => void;
  highContrast: boolean;
  language?: AppLanguage;
}

export const FloatingSOSButton: React.FC<FloatingSOSButtonProps> = ({
  onClick,
  highContrast,
  language = 'en'
}) => {
  const t = getTranslation((language || 'en') as AppLanguage);

  return (
    <button
      id="floating-sos-trigger"
      type="button"
      onClick={() => {
        soundEngine.playBeep(880, 'square', 0.2);
        onClick();
      }}
      title="Trigger Emergency SOS with live GPS and Emergency Contacts"
      aria-label="Trigger Emergency SOS. Tapping opens emergency dispatch screen."
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${
        highContrast
          ? 'bg-yellow-400 text-black border-4 border-black focus:ring-yellow-300 font-black text-base'
          : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 font-extrabold text-sm border-2 border-red-400 shadow-red-950/50'
      }`}
    >
      <span className="relative flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
      </span>
      <span className="tracking-wider uppercase">{t.sos.floatingBtn}</span>
    </button>
  );
};
