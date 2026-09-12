import React, { useState, useRef, useEffect } from 'react';
import { AppLanguage } from '../types';
import { SUPPORTED_LANGUAGES, LanguageOption } from '../i18n';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LanguageSelectorProps {
  currentLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  highContrast: boolean;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  highContrast,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: AppLanguage) => {
    soundEngine.playBeep(640, 'sine', 0.1);
    onSelectLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="btn-language-selector"
        type="button"
        onClick={() => {
          soundEngine.playBeep(520, 'sine', 0.08);
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language switcher: current language is ${activeOption.nativeName}`}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition shadow-sm ${
          highContrast
            ? 'bg-black text-yellow-300 border-yellow-400 hover:bg-yellow-950'
            : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-750 hover:text-white'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="font-medium">{activeOption.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className={`absolute right-0 mt-2 w-52 rounded-2xl shadow-2xl border p-1.5 z-50 transition-all ${
            highContrast
              ? 'bg-black border-2 border-yellow-400 text-yellow-300'
              : 'bg-stone-900 border-stone-750 text-stone-100 shadow-stone-950/80'
          }`}
        >
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-stone-400 border-b border-stone-800 mb-1">
            Choose Language (5 Languages)
          </div>

          <div className="space-y-1">
            {SUPPORTED_LANGUAGES.map((item: LanguageOption) => {
              const isSelected = item.code === currentLanguage;
              return (
                <button
                  key={item.code}
                  id={`lang-option-${item.code}`}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black font-black'
                        : 'bg-emerald-600 text-white font-bold'
                      : highContrast
                      ? 'hover:bg-yellow-950/60 text-yellow-300'
                      : 'hover:bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col items-start leading-snug">
                    <span className="text-xs">{item.nativeName}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected
                          ? 'opacity-85'
                          : highContrast
                          ? 'text-yellow-400/80'
                          : 'text-stone-400'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
