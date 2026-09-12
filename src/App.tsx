import React, { useState, useEffect } from 'react';
import { ActiveTab, AccessibilitySettings, EmergencyContact } from './types';
import { Header } from './components/Header';
import { FloatingSOSButton } from './components/FloatingSOSButton';
import { SOSModal } from './components/SOSModal';
import { TTSCommunicationBox } from './components/TTSCommunicationBox';
import { AccessiblePlacesMap } from './components/AccessiblePlacesMap';
import { AccessibleRouting } from './components/AccessibleRouting';
import { ObstacleReporting } from './components/ObstacleReporting';
import { CameraAssistant } from './components/CameraAssistant';
import { CaretakerMarketplace } from './components/CaretakerMarketplace';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tts');
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [prefilledRouteDest, setPrefilledRouteDest] = useState<string>('');
  const [prefilledObstacleLoc, setPrefilledObstacleLoc] = useState<string>('');
  const [prefilledTTSText, setPrefilledTTSText] = useState<string>('');

  // Accessibility Settings State
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('assist_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          language: parsed.language || 'en',
          highContrast: parsed.highContrast ?? false,
          fontScale: parsed.fontScale || 'normal',
          speechRate: parsed.speechRate ?? 1.0,
          speechPitch: parsed.speechPitch ?? 1.0,
          preferredVoice: parsed.preferredVoice || '',
          autoAnnounceTurnByTurn: parsed.autoAnnounceTurnByTurn ?? true,
          hapticBeeps: parsed.hapticBeeps ?? true
        };
      }
    } catch {}
    return {
      language: 'en',
      highContrast: false,
      fontScale: 'normal',
      speechRate: 1.0,
      speechPitch: 1.0,
      preferredVoice: '',
      autoAnnounceTurnByTurn: true,
      hapticBeeps: true
    };
  });

  // Emergency Contacts State
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    try {
      const saved = localStorage.getItem('assist_emergency_contacts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'c-1',
        name: 'Sunita Sharma (Sister)',
        phone: '+919876543210',
        relation: 'Family',
        isPrimary: true
      },
      {
        id: 'c-2',
        name: 'Dr. Anand Rao (Physician)',
        phone: '+919811223344',
        relation: 'Doctor',
        isPrimary: false
      }
    ];
  });

  // Sync settings
  useEffect(() => {
    try {
      localStorage.setItem('assist_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Handlers for cross-tab bridges
  const handleSelectPlaceForRouting = (placeName: string) => {
    setPrefilledRouteDest(placeName);
    setActiveTab('map');
  };

  const handleSendSignToTTS = (text: string) => {
    setPrefilledTTSText(text);
    setActiveTab('tts');
  };

  const handleOpenReportObstacle = (locName?: string) => {
    setPrefilledObstacleLoc(locName || '');
    setActiveTab('obstacles');
  };

  // Font scale class
  const rootScaleClass =
    settings.fontScale === 'extralarge'
      ? 'text-lg'
      : settings.fontScale === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${rootScaleClass} ${
        settings.highContrast
          ? 'bg-black text-yellow-300'
          : 'bg-[#0B0F17] text-slate-100'
      }`}
    >
      {/* Accessible Header with New Logo & Controls */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        setSettings={setSettings}
        onOpenSOS={() => setIsSOSModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main
        id="main-content"
        role="main"
        className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-28"
      >
        {activeTab === 'tts' && (
          <TTSCommunicationBox
            settings={settings}
            setSettings={setSettings}
            prefilledText={prefilledTTSText}
            onClearPrefilledText={() => setPrefilledTTSText('')}
          />
        )}

        {activeTab === 'map' && (
          <div className="space-y-10">
            {/* Accessible Places Map with All States Support */}
            <AccessiblePlacesMap
              settings={settings}
              onSelectPlaceForRouting={handleSelectPlaceForRouting}
            />

            {/* Accessible Route-Finding */}
            <div className="pt-6 border-t border-slate-800">
              <AccessibleRouting
                settings={settings}
                prefilledDestination={prefilledRouteDest}
                onOpenReportObstacle={handleOpenReportObstacle}
              />
            </div>
          </div>
        )}

        {activeTab === 'obstacles' && (
          <ObstacleReporting
            settings={settings}
            prefilledLocation={prefilledObstacleLoc}
          />
        )}

        {activeTab === 'camera' && (
          <CameraAssistant
            settings={settings}
            onSendSignToTTS={handleSendSignToTTS}
          />
        )}

        {activeTab === 'caretakers' && (
          <CaretakerMarketplace
            settings={settings}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            contacts={contacts}
            setContacts={setContacts}
            settings={settings}
            setSettings={setSettings}
            onOpenSOS={() => setIsSOSModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Floating SOS Button on all screens */}
      <FloatingSOSButton
        highContrast={settings.highContrast}
        language={settings.language}
        onClick={() => setIsSOSModalOpen(true)}
      />

      {/* Emergency SOS Modal */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        contacts={contacts}
        settings={settings}
      />
    </div>
  );
}
