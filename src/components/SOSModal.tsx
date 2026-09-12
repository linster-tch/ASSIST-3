import React, { useState, useEffect } from 'react';
import { EmergencyContact, AccessibilitySettings } from '../types';
import { api } from '../services/api';
import { soundEngine, speakText } from '../utils/audio';
import {
  AlertTriangle,
  PhoneCall,
  MessageSquare,
  MapPin,
  X,
  Share2,
  CheckCircle2,
  Loader2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  settings: AccessibilitySettings;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  contacts,
  settings
}) => {
  const [countdown, setCountdown] = useState<number | null>(3);
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>({
    latitude: 28.6328,
    longitude: 77.2195 // Default New Delhi Connaught Place
  });
  const [locationAddress, setLocationAddress] = useState<string>('Detecting GPS location...');

  // Auto-fetch location on open
  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setIsDispatched(false);
      setDispatchResult(null);
      setLoadingLocation(true);

      // Audio cue
      soundEngine.playBeep(880, 'sawtooth', 0.25);
      speakText('Emergency SOS triggered. Countdown active. Tap Cancel to abort.');

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            setCoords({ latitude: lat, longitude: lng });
            setLocationAddress(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} (Live Device GPS)`);
            setLoadingLocation(false);
          },
          err => {
            console.warn('Geolocation unavailable, using city centroid:', err);
            setLocationAddress('Connaught Place, New Delhi (Default Location fallback)');
            setLoadingLocation(false);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        setLocationAddress('Connaught Place, New Delhi (Default Location fallback)');
        setLoadingLocation(false);
      }
    }
  }, [isOpen]);

  // Countdown timer to prevent accidental dispatch
  useEffect(() => {
    if (!isOpen || countdown === null || isDispatched) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        soundEngine.playBeep(550, 'square', 0.15);
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleTriggerDispatch();
    }
  }, [isOpen, countdown, isDispatched]);

  const handleTriggerDispatch = async () => {
    setCountdown(null);
    setIsDispatched(true);
    soundEngine.playBeep(980, 'sine', 0.4);

    try {
      const result = await api.triggerSOS({
        contacts,
        location: coords
      });
      setDispatchResult(result);
      speakText('Emergency notification prepared with your live coordinates.');
    } catch (e) {
      console.error(e);
    }
  };

  const cancelSOS = () => {
    soundEngine.playBeep(330, 'sine', 0.2);
    setCountdown(null);
    speakText('Emergency SOS cancelled.');
    onClose();
  };

  if (!isOpen) return null;

  const mapsUrl = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
  const primaryContact = contacts.find(c => c.isPrimary) || contacts[0];
  const emergencyMessage = `EMERGENCY: I need assistance. My location: ${mapsUrl} (Sent via Assist App)`;
  const nativeSmsUri = primaryContact
    ? `sms:${primaryContact.phone.replace(/[^0-9+]/g, '')}?body=${encodeURIComponent(emergencyMessage)}`
    : `sms:?body=${encodeURIComponent(emergencyMessage)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl relative transition-all ${
          settings.highContrast
            ? 'bg-black text-yellow-300 border-yellow-400'
            : 'bg-stone-900 text-stone-100 border-red-500/40'
        }`}
      >
        {/* Close / Cancel Button */}
        <button
          id="btn-close-sos"
          type="button"
          onClick={cancelSOS}
          aria-label="Cancel emergency SOS"
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h2 id="sos-modal-title" className="text-2xl font-black tracking-tight text-red-500">
              EMERGENCY SOS
            </h2>
            <p className="text-xs text-stone-400">
              Live location dispatch & emergency dialer
            </p>
          </div>
        </div>

        {/* Countdown Phase */}
        {countdown !== null && countdown > 0 && (
          <div className="text-center py-6 border-y border-stone-800 my-4">
            <p className="text-sm font-semibold text-stone-300 mb-2">
              Dispatching emergency alert in:
            </p>
            <div className="text-6xl font-black text-red-500 tracking-tighter my-2 animate-bounce">
              {countdown}
            </div>
            <p className="text-xs text-stone-400 mb-4">
              Tap cancel below if pressed by accident
            </p>
            <button
              id="btn-cancel-countdown"
              type="button"
              onClick={cancelSOS}
              className="w-full py-3 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm tracking-wide border border-stone-700"
            >
              CANCEL (False Alarm)
            </button>
          </div>
        )}

        {/* Dispatched / Action Phase */}
        {(countdown === 0 || countdown === null) && (
          <div className="space-y-4 my-2">
            {/* National Emergency 112 Section (Explicitly labeled) */}
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/60">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-red-200 text-sm">
                    National Emergency Helpline (112 India)
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    Tap below to launch your phone's native dialer to <strong>112</strong> (Police, Fire, Ambulance).
                    <em> Note: Assist triggers the native device dialer and does not claim direct backend dispatch into ERSS.</em>
                  </p>
                </div>
              </div>

              <a
                id="btn-modal-call-112"
                href="tel:112"
                onClick={() => soundEngine.playBeep(900, 'square', 0.2)}
                className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-lg transition transform active:scale-95"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call 112 (Native Dialer)</span>
              </a>
            </div>

            {/* Live GPS Coordinates Info */}
            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1 text-stone-200">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Live GPS Location
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  View on Map <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="font-mono text-stone-300 text-[11px] break-all">
                {locationAddress}
              </p>
            </div>

            {/* Registered Emergency Contacts Alert */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-300 flex items-center justify-between">
                <span>Emergency Contacts ({contacts.length}):</span>
                <span className="text-stone-400 text-[11px]">
                  {primaryContact ? `Primary: ${primaryContact.name}` : 'No primary set'}
                </span>
              </div>

              {contacts.length === 0 ? (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200">
                  No emergency contacts saved yet. Please add trusted contacts in Settings.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Native SMS Quick Trigger */}
                  <a
                    id="btn-send-native-sms"
                    href={nativeSmsUri}
                    onClick={() => soundEngine.playBeep(700, 'sine', 0.15)}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send SMS via Phone</span>
                  </a>

                  {/* Call Primary Contact */}
                  {primaryContact && (
                    <a
                      id="btn-call-primary-contact"
                      href={`tel:${primaryContact.phone}`}
                      onClick={() => soundEngine.playBeep(750, 'sine', 0.15)}
                      className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call {primaryContact.name}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Twilio / Backend Status Notification */}
              {dispatchResult && (
                <div className="mt-3 p-3 rounded-lg bg-stone-800 border border-stone-700 text-xs space-y-1">
                  <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Dispatch Status: {dispatchResult.mode}
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    {dispatchResult.message}
                  </p>
                </div>
              )}
            </div>

            {/* Dismiss */}
            <button
              id="btn-done-sos"
              type="button"
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
            >
              Close SOS Screen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
