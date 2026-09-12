// Speech Synthesis & Audio Feedback Helpers
// Seamless multi-language TTS supporting English, Hindi, Kannada, Marathi, and Telugu

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play tactile confirmation chime
  playBeep(freq = 440, type: OscillatorType = 'sine', duration = 0.15) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Proximity sonar sound for obstacle detection: frequency increases as distance decreases
  playProximityAlert(distanceMeters: number) {
    const clampedDist = Math.max(0.3, Math.min(5, distanceMeters));
    const freq = Math.round(900 - (clampedDist / 5) * 650);
    this.playBeep(freq, 'triangle', 0.12);
  }
}

export const soundEngine = new SoundEngine();

let currentAudioElement: HTMLAudioElement | null = null;

export function stopSpeaking() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement = null;
    } catch {
      // Audio stop error handling
    }
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancellation error
    }
  }
}

export function isSpeaking(): boolean {
  if (currentAudioElement && !currentAudioElement.paused) return true;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  voiceName?: string;
  lang?: string;
  preferOnline?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Map app language code to ISO code for speech engines
export function normalizeLanguageCode(lang = 'en'): string {
  const l = lang.toLowerCase().trim();
  if (l.startsWith('hi')) return 'hi';
  if (l.startsWith('kn')) return 'kn';
  if (l.startsWith('mr')) return 'mr';
  if (l.startsWith('te')) return 'te';
  return 'en';
}

function speakViaWebSpeech(text: string, options: SpeakOptions): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options.onError?.(new Error('Speech synthesis not supported'));
    return false;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 1.0;
  utterance.pitch = options.pitch ?? 1.0;

  const targetLang = normalizeLanguageCode(options.lang || 'en');
  const langTagMap: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    kn: 'kn-IN',
    mr: 'mr-IN',
    te: 'te-IN'
  };
  utterance.lang = langTagMap[targetLang] || 'en-IN';

  const voices = window.speechSynthesis.getVoices();
  if (options.voiceName) {
    const matched = voices.find(v => v.name === options.voiceName);
    if (matched) utterance.voice = matched;
  } else {
    // Attempt to match by language prefix
    const matchedVoice = voices.find(v =>
      v.lang.toLowerCase().startsWith(targetLang) ||
      v.lang.toLowerCase() === langTagMap[targetLang]?.toLowerCase()
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else {
      // Fallback to Indian English or Hindi
      const indianVoice = voices.find(
        v => v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.toLowerCase().includes('india')
      );
      if (indianVoice) utterance.voice = indianVoice;
    }
  }

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function speakText(text: string, options: SpeakOptions = {}): boolean {
  const cleanText = text.trim();
  if (!cleanText) return false;

  // Always stop previous speech before starting new speech
  stopSpeaking();

  const lang = normalizeLanguageCode(options.lang || 'en');

  // If online speech is preferred or if language is regional (Kannada, Marathi, Telugu, Hindi)
  // which are often missing from desktop browser synthetic voice lists:
  const shouldTryOnline = options.preferOnline !== false;

  if (shouldTryOnline && typeof window !== 'undefined') {
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(lang)}`;
      const audio = new Audio(audioUrl);
      currentAudioElement = audio;

      if (options.rate) {
        audio.playbackRate = Math.max(0.5, Math.min(2.0, options.rate));
      }

      audio.onplay = () => {
        options.onStart?.();
      };

      audio.onended = () => {
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        options.onEnd?.();
      };

      audio.onerror = (err) => {
        console.warn('TTS streaming endpoint failed, falling back to Web Speech API:', err);
        if (currentAudioElement === audio) {
          currentAudioElement = null;
        }
        speakViaWebSpeech(cleanText, options);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((playErr) => {
          console.warn('Audio play rejected by browser policy or network, falling back to Web Speech API:', playErr);
          if (currentAudioElement === audio) {
            currentAudioElement = null;
          }
          speakViaWebSpeech(cleanText, options);
        });
      }
      return true;
    } catch (err) {
      console.warn('Online audio initialization failed, using Web Speech API:', err);
    }
  }

  return speakViaWebSpeech(cleanText, options);
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

// Sample test phrases for each language
export const LANGUAGE_SAMPLE_PHRASES: Record<string, { label: string; text: string }> = {
  en: {
    label: 'English',
    text: 'Assist is ready to help you navigate all states independently with high accessibility.'
  },
  hi: {
    label: 'हिन्दी (Hindi)',
    text: 'असिस्ट आपको भारत के सभी राज्यों में स्वतंत्र रूप से यात्रा करने में मदद करता है।'
  },
  kn: {
    label: 'ಕನ್ನಡ (Kannada)',
    text: 'ಅಸಿಸ್ಟ್ ಭಾರತದ ಎಲ್ಲಾ ರಾಜ್ಯಗಳಲ್ಲಿ ಸ್ವತಂತ್ರವಾಗಿ ಸಂಚರಿಸಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.'
  },
  mr: {
    label: 'मराठी (Marathi)',
    text: 'असिस्ट तुम्हाला सर्व राज्यांमध्ये सुरक्षितपणे आणि स्वतंत्रपणे प्रवास करण्यास मदत करतो.'
  },
  te: {
    label: 'తెలుగు (Telugu)',
    text: 'అసిస్ట్ మీకు అన్ని రాష్ట్రాలలో స్వతంత్రంగా ప్రయాణించడానికి సహాయపడుతుంది.'
  }
};

