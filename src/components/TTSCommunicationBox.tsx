import React, { useState, useEffect } from 'react';
import { AccessibilitySettings, TTSHistoryItem, AppLanguage } from '../types';
import { speakText, stopSpeaking, isSpeaking as checkIsSpeaking, getAvailableVoices, soundEngine, LANGUAGE_SAMPLE_PHRASES } from '../utils/audio';
import { getTranslation, SUPPORTED_LANGUAGES } from '../i18n';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  History,
  Trash2,
  Sparkles,
  Play,
  Copy,
  Check,
  Languages,
  Radio
} from 'lucide-react';

interface TTSCommunicationBoxProps {
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  prefilledText?: string;
  onClearPrefilledText?: () => void;
}

export const TTSCommunicationBox: React.FC<TTSCommunicationBoxProps> = ({
  settings,
  setSettings,
  prefilledText,
  onClearPrefilledText
}) => {
  const t = getTranslation(settings.language || 'en');
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTestLang, setActiveTestLang] = useState<string | null>(null);
  const [history, setHistory] = useState<TTSHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('assist_tts_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'h-1', text: 'Where is the wheelchair ramp?', timestamp: 'Just now', category: 'Mobility' },
      { id: 'h-2', text: 'Thank you for your assistance.', timestamp: 'Earlier', category: 'Polite' }
    ];
  });

  // Handle prefilled text piped from Camera Sign Language interpreter
  useEffect(() => {
    if (prefilledText && prefilledText.trim()) {
      setInputText(prefilledText);
      if (onClearPrefilledText) {
        onClearPrefilledText();
      }
    }
  }, [prefilledText, onClearPrefilledText]);

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem('assist_tts_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  // Load available voices
  useEffect(() => {
    const updateVoices = () => {
      const v = getAvailableVoices();
      setVoices(v);
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleSpeak = (textToSpeak = inputText, overrideLang?: string) => {
    const text = textToSpeak.trim();
    if (!text) return;

    soundEngine.playBeep(660, 'sine', 0.1);
    setIsSpeaking(true);

    const targetLang = overrideLang || settings.language || 'en';

    const success = speakText(text, {
      rate: settings.speechRate,
      pitch: settings.speechPitch,
      voiceName: settings.preferredVoice,
      lang: targetLang,
      preferOnline: true,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setActiveTestLang(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setActiveTestLang(null);
      }
    });

    if (success) {
      if (!history.some(h => h.text.toLowerCase() === text.toLowerCase())) {
        const newItem: TTSHistoryItem = {
          id: `tts-${Date.now()}`,
          text,
          timestamp: 'Just now'
        };
        setHistory(prev => [newItem, ...prev.slice(0, 19)]);
      }
    } else {
      setIsSpeaking(false);
      setActiveTestLang(null);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setActiveTestLang(null);
  };

  const handleTestLanguage = (langCode: AppLanguage) => {
    const sample = LANGUAGE_SAMPLE_PHRASES[langCode];
    if (!sample) return;

    soundEngine.playBeep(700, 'sine', 0.08);
    setActiveTestLang(langCode);
    setInputText(sample.text);
    if (settings.language !== langCode) {
      setSettings(prev => ({ ...prev, language: langCode }));
    }
    handleSpeak(sample.text, langCode);
  };

  const clearHistory = () => {
    soundEngine.playBeep(300, 'sine', 0.1);
    setHistory([]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Font scale class
  const fontClass =
    settings.fontScale === 'extralarge'
      ? 'text-2xl sm:text-3xl'
      : settings.fontScale === 'large'
      ? 'text-xl sm:text-2xl'
      : 'text-lg sm:text-xl';

  const presetPhrases = t.tts.presetPhrases;

  return (
    <section
      role="region"
      aria-label="Text to Speech Communication Box"
      className="space-y-6"
    >
      {/* Box Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Volume2 className="w-6 h-6" />
            </div>
            <span>{t.tts.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.tts.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-tts-settings"
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              showSettings
                ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                : 'bg-[#131926] hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
            aria-expanded={showSettings}
          >
            <Sliders className="w-4 h-4" />
            <span>{t.tts.controls} ({settings.speechRate}x)</span>
          </button>
        </div>
      </div>

      {/* Language Quick Switcher Pills */}
      <div className="p-3.5 rounded-2xl bg-[#0E131F] border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300">
            Speaking Language (5 Regional Languages):
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {SUPPORTED_LANGUAGES.map(lang => {
            const isSelected = settings.language === lang.code;
            return (
              <button
                id={`tts-lang-select-${lang.code}`}
                key={lang.code}
                type="button"
                onClick={() => {
                  soundEngine.playBeep(550, 'sine', 0.08);
                  setSettings(prev => ({ ...prev, language: lang.code }));
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? settings.highContrast
                      ? 'bg-yellow-400 text-black border-2 border-yellow-300 font-black'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'bg-[#131926] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className="text-[10px] opacity-70">({lang.name})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5-Language Instant Speech Tester */}
      <div className="p-4 rounded-2xl bg-[#0E131F] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
            <h3 className="text-xs font-bold tracking-wide uppercase text-slate-200">
              {t.tts.testVoices}
            </h3>
          </div>
          <span className="text-[11px] text-blue-400 font-medium">
            English • हिन्दी • ಕನ್ನಡ • मराठी • తెలుగు
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {SUPPORTED_LANGUAGES.map(lang => {
            const sample = LANGUAGE_SAMPLE_PHRASES[lang.code];
            const isTesting = activeTestLang === lang.code && isSpeaking;
            return (
              <button
                id={`btn-test-voice-${lang.code}`}
                key={lang.code}
                type="button"
                onClick={() => handleTestLanguage(lang.code)}
                className={`p-3 rounded-xl text-left border transition relative flex flex-col justify-between ${
                  isTesting
                    ? 'bg-blue-950/80 border-2 border-blue-400 text-blue-100 shadow-md'
                    : 'bg-[#131926] text-slate-200 border-slate-800 hover:border-blue-500/50 hover:bg-[#182132]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-xs text-white">
                    {lang.nativeName}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                    {lang.code.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 italic mb-2">
                  "{sample?.text.slice(0, 30)}..."
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
                  <Play className="w-3 h-3 fill-blue-400" />
                  <span>{isTesting ? 'Speaking...' : `Test ${lang.name}`}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Controls Drawer */}
      {showSettings && (
        <div
          className={`p-4 rounded-2xl border transition-all ${
            settings.highContrast
              ? 'bg-black text-yellow-300 border-yellow-400'
              : 'bg-[#131926] border-slate-700 text-slate-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Speed Rate Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>{t.tts.speedRate}</span>
                <span className="font-mono text-blue-400">{settings.speechRate.toFixed(1)}x</span>
              </div>
              <input
                id="slider-tts-rate"
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={settings.speechRate}
                onChange={e =>
                  setSettings(s => ({ ...s, speechRate: parseFloat(e.target.value) }))
                }
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0.5x Slow</span>
                <span>1.0x Normal</span>
                <span>2.0x Fast</span>
              </div>
            </div>

            {/* Pitch Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>{t.tts.pitch}</span>
                <span className="font-mono text-blue-400">{settings.speechPitch.toFixed(1)}</span>
              </div>
              <input
                id="slider-tts-pitch"
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.speechPitch}
                onChange={e =>
                  setSettings(s => ({ ...s, speechPitch: parseFloat(e.target.value) }))
                }
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Low</span>
                <span>Standard</span>
                <span>High</span>
              </div>
            </div>

            {/* Voice Selection */}
            <div>
              <label htmlFor="select-tts-voice" className="block text-xs font-bold mb-1.5">
                {t.tts.voiceSelect}
              </label>
              <select
                id="select-tts-voice"
                value={settings.preferredVoice}
                onChange={e =>
                  setSettings(s => ({ ...s, preferredVoice: e.target.value }))
                }
                className="w-full text-xs p-2 rounded-lg bg-[#0E131F] border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="">{t.tts.voiceDefault}</option>
                {voices.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Input Textarea */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          settings.highContrast
            ? 'bg-black border-2 border-yellow-400'
            : 'bg-[#0E131F] border-slate-800 shadow-xl'
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="tts-text-input" className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
            <span>{t.tts.composeLabel}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
              Current: {SUPPORTED_LANGUAGES.find(l => l.code === settings.language)?.nativeName} ({settings.language.toUpperCase()})
            </span>
          </label>
          {inputText && (
            <button
              id="btn-clear-tts-input"
              type="button"
              onClick={() => setInputText('')}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              {t.tts.clear}
            </button>
          )}
        </div>

        <textarea
          id="tts-text-input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={t.tts.placeholder}
          rows={4}
          aria-label="Enter text for the speech synthesizer to read aloud in any of the 5 languages"
          className={`w-full p-4 rounded-xl resize-none font-medium leading-relaxed border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${fontClass} ${
            settings.highContrast
              ? 'bg-black text-yellow-300 border-yellow-500 placeholder-yellow-800'
              : 'bg-[#070A12] text-slate-100 border-slate-750 border-slate-700/80 placeholder-slate-500'
          }`}
        />

        {/* Action Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            id="btn-speak-now"
            type="button"
            onClick={() => handleSpeak()}
            disabled={!inputText.trim()}
            className={`flex-1 min-w-[200px] py-4 px-6 rounded-xl font-black tracking-wide text-base flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed ${
              settings.highContrast
                ? 'bg-yellow-400 text-black border-2 border-yellow-300 hover:bg-yellow-300'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
            }`}
          >
            <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>{isSpeaking ? t.tts.readingAloud : t.tts.speakNow}</span>
          </button>

          {isSpeaking && (
            <button
              id="btn-stop-speak"
              type="button"
              onClick={handleStop}
              className="py-4 px-6 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition"
            >
              <VolumeX className="w-5 h-5" />
              <span>{t.tts.stop}</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Phrases */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.tts.quickPhrases}</span>
          </h3>
          <span className="text-xs text-slate-400">{t.tts.quickPhrasesSub}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presetPhrases.map((phrase, idx) => (
            <button
              id={`btn-preset-phrase-${idx}`}
              key={idx}
              type="button"
              onClick={() => {
                setInputText(phrase.text);
                handleSpeak(phrase.text);
              }}
              className={`p-3.5 rounded-xl text-left border text-xs font-semibold transition hover:-translate-y-0.5 active:translate-y-0 ${
                settings.highContrast
                  ? 'bg-black text-yellow-300 border-yellow-400 hover:bg-yellow-950'
                  : 'bg-[#0E131F] text-slate-200 border-slate-800 hover:border-blue-500/50 hover:bg-[#131926]'
              }`}
            >
              <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">
                {phrase.category}
              </div>
              <div className="line-clamp-2 leading-snug">{phrase.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Phrase History */}
      <div
        className={`p-4 rounded-2xl border ${
          settings.highContrast
            ? 'bg-black border-yellow-400'
            : 'bg-[#0E131F] border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t.tts.recentPhrases} ({history.length})
            </h3>
          </div>
          {history.length > 0 && (
            <button
              id="btn-clear-history"
              type="button"
              onClick={clearHistory}
              className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.tts.clearHistory}</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">
            {t.tts.noHistory}
          </p>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {history.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#070A12] border border-slate-800/80 gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setInputText(item.text);
                    handleSpeak(item.text);
                  }}
                  className="flex-1 text-left text-xs font-medium text-slate-200 hover:text-blue-400 transition"
                >
                  "{item.text}"
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    title={t.tts.speakAgain}
                    onClick={() => handleSpeak(item.text)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Copy text"
                    onClick={() => copyToClipboard(item.text, item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
