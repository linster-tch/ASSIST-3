import React, { useState, useEffect } from 'react';
import { ObstacleReport, AccessibilitySettings } from '../types';
import { api } from '../services/api';
import { soundEngine, speakText } from '../utils/audio';
import {
  AlertTriangle,
  Camera,
  PlusCircle,
  ThumbsUp,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Filter,
  X,
  UploadCloud,
  Layers
} from 'lucide-react';

interface ObstacleReportingProps {
  settings: AccessibilitySettings;
  isOpenModalDirectly?: boolean;
  onCloseModalDirectly?: () => void;
  prefilledLocation?: string;
}

export const ObstacleReporting: React.FC<ObstacleReportingProps> = ({
  settings,
  isOpenModalDirectly = false,
  onCloseModalDirectly,
  prefilledLocation = ''
}) => {
  const [obstacles, setObstacles] = useState<ObstacleReport[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('New Delhi');
  const [isModalOpen, setIsModalOpen] = useState(isOpenModalDirectly);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // New report form state
  const [locationName, setLocationName] = useState(prefilledLocation || '');
  const [obstacleType, setObstacleType] = useState<ObstacleReport['obstacleType']>('BROKEN_SIDEWALK');
  const [severity, setSeverity] = useState<ObstacleReport['severity']>('TOTAL_BLOCK');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpenModalDirectly) {
      setIsModalOpen(true);
      if (prefilledLocation) setLocationName(prefilledLocation);
    }
  }, [isOpenModalDirectly, prefilledLocation]);

  const loadObstacles = async () => {
    try {
      const data = await api.getObstacles(selectedCity);
      setObstacles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadObstacles();
  }, [selectedCity]);

  const handleUpvote = async (id: string) => {
    soundEngine.playBeep(750, 'sine', 0.1);
    const newCount = await api.upvoteObstacle(id);
    setObstacles(prev =>
      prev.map(o => (o.id === id ? { ...o, upvotesCount: newCount } : o))
    );
    speakText(`Obstacle confirmed. Total ${newCount} citizen reports.`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName) return;

    soundEngine.playBeep(850, 'sine', 0.2);
    setIsSubmitting(true);

    try {
      const result = await api.submitObstacle({
        locationName,
        city: selectedCity,
        obstacleType,
        severity,
        description,
        photoUrl: photoPreview || undefined,
        latitude: selectedCity === 'Mumbai' ? 18.99 : selectedCity === 'Bengaluru' ? 12.97 : 28.63,
        longitude: selectedCity === 'Mumbai' ? 72.82 : selectedCity === 'Bengaluru' ? 77.59 : 77.21
      });

      if (result.success) {
        setObstacles(prev => [result.obstacle, ...prev]);
        setSuccessBanner(
          result.rerouteImpactNotice ||
            'Obstacle logged! When 2+ reports exist, the routing engine avoids this sidewalk.'
        );
        speakText('Obstacle reported successfully. Community route alerts updated.');
        setIsModalOpen(false);
        if (onCloseModalDirectly) onCloseModalDirectly();

        // Reset
        setLocationName('');
        setDescription('');
        setPhotoPreview(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const OBSTACLE_TYPE_LABELS: Record<ObstacleReport['obstacleType'], string> = {
    BROKEN_SIDEWALK: 'Broken Sidewalk / Missing Pavers',
    STAIRS_NO_ELEVATOR: 'Stairs (No Working Ramp/Elevator)',
    HIGH_CURB_NO_RAMP: 'High Divider Curb (No Drop Ramp)',
    CONSTRUCTION_BARRIER: 'Construction Encroachment',
    WATERLOGGING_MUD: 'Monsoon Waterlogging / Mud',
    STEEP_INCLINE: 'Steep Incline (>1:10 Slope)'
  };

  return (
    <section
      role="region"
      aria-label="Obstacle Reporting and Sidewalk Hazard Log"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>Crowdsourced Obstacle Reporting</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Report inaccessible sidewalks, broken curbs, or steep stairs. 2+ reports trigger automated detour rerouting.
          </p>
        </div>

        <button
          id="btn-open-report-modal"
          type="button"
          onClick={() => {
            soundEngine.playBeep(700, 'sine', 0.1);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow transition"
        >
          <Camera className="w-4 h-4" />
          <span>Report New Sidewalk Obstacle</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessBanner(null)}
            className="text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* City Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['New Delhi', 'Mumbai', 'Bengaluru', 'All'].map(city => (
          <button
            key={city}
            type="button"
            onClick={() => {
              soundEngine.playBeep(520, 'sine', 0.08);
              setSelectedCity(city);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              selectedCity === city
                ? settings.highContrast
                  ? 'bg-yellow-400 text-black border-2 border-yellow-300'
                  : 'bg-stone-100 text-stone-900 font-black shadow'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {city === 'All' ? 'All Active Hazards' : `${city} Hazards`}
          </button>
        ))}
      </div>

      {/* Obstacles List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {obstacles.map(obs => {
          const isBlocking = obs.severity === 'TOTAL_BLOCK' || obs.upvotesCount >= 2;
          return (
            <div
              key={obs.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                settings.highContrast
                  ? 'bg-black border-2 border-yellow-400 text-yellow-300'
                  : isBlocking
                  ? 'bg-stone-900/95 border-red-500/40 text-stone-100'
                  : 'bg-stone-900 border-stone-800 text-stone-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        obs.severity === 'TOTAL_BLOCK'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {obs.severity.replace(/_/g, ' ')}
                    </span>
                    {isBlocking && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Excluded in Router
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base mt-1.5 leading-snug">
                    {obs.locationName}
                  </h3>
                </div>

                <button
                  id={`btn-upvote-obs-${obs.id}`}
                  type="button"
                  onClick={() => handleUpvote(obs.id)}
                  title="Confirm this obstacle is still present"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-emerald-400 transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{obs.upvotesCount} reports</span>
                </button>
              </div>

              {/* Type Badge & Description */}
              <div className="my-2.5">
                <span className="inline-block text-xs font-semibold text-stone-300 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800 mb-2">
                  {OBSTACLE_TYPE_LABELS[obs.obstacleType] || obs.obstacleType}
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {obs.description}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  {obs.city}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-500" />
                  {new Date(obs.reportedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Obstacle Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-obstacle-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-stone-900 text-stone-100 border-red-500/30'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                if (onCloseModalDirectly) onCloseModalDirectly();
              }}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-1">
              <Camera className="w-5 h-5 text-red-500" />
              <h3 id="report-obstacle-title" className="text-xl font-black">
                Report Sidewalk Obstacle
              </h3>
            </div>
            <p className="text-xs text-stone-400 mb-4">
              Flag stairs without ramp, deep trench, or broken curb. Helps update accessible routes for everyone.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Sidewalk / Street Location *</label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  placeholder="e.g. Outer Circle Road near Gate 4, New Delhi"
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Obstacle Type *</label>
                  <select
                    value={obstacleType}
                    onChange={e => setObstacleType(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value="BROKEN_SIDEWALK">Broken Sidewalk / Missing Pavers</option>
                    <option value="STAIRS_NO_ELEVATOR">Stairs (No Working Ramp)</option>
                    <option value="HIGH_CURB_NO_RAMP">High Curb (No Drop Ramp)</option>
                    <option value="CONSTRUCTION_BARRIER">Construction Barrier</option>
                    <option value="WATERLOGGING_MUD">Monsoon Waterlogging / Mud</option>
                    <option value="STEEP_INCLINE">Steep Incline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Severity Level *</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value="TOTAL_BLOCK">Total Block (Wheelchair impossible)</option>
                    <option value="MODERATE_DIFFICULTY">Moderate Difficulty</option>
                    <option value="MINOR_INCONVENIENCE">Minor Inconvenience</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload / Camera simulation */}
              <div>
                <label className="block text-xs font-bold mb-1.5">Obstacle Photo Proof (Optional)</label>
                <div className="border-2 border-dashed border-stone-700 rounded-xl p-4 text-center hover:border-stone-500 transition bg-stone-950">
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img
                        src={photoPreview}
                        alt="Obstacle preview"
                        className="max-h-36 mx-auto rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="text-xs text-red-400 underline"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block space-y-2">
                      <UploadCloud className="w-6 h-6 mx-auto text-stone-400" />
                      <div className="text-xs text-stone-300 font-semibold">
                        Tap to capture or upload photo
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Supports camera snapshot or file upload
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Detailed Hazard Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. 10 inch high drop curb without ramp, loose gravel prevents manual wheelchair grip..."
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onCloseModalDirectly) onCloseModalDirectly();
                  }}
                  className="w-1/3 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Obstacle Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
