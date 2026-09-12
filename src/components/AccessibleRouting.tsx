import React, { useState, useEffect } from 'react';
import { RouteResult, AccessibilitySettings } from '../types';
import { api } from '../services/api';
import { soundEngine, speakText } from '../utils/audio';
import {
  Navigation,
  AlertTriangle,
  CheckCircle2,
  CornerDownRight,
  ShieldCheck,
  Compass,
  ArrowRight,
  Layers,
  Camera,
  AlertCircle,
  Footprints,
  Clock,
  Sparkles
} from 'lucide-react';

interface AccessibleRoutingProps {
  settings: AccessibilitySettings;
  prefilledDestination?: string;
  onOpenReportObstacle: (locationName?: string) => void;
}

export const AccessibleRouting: React.FC<AccessibleRoutingProps> = ({
  settings,
  prefilledDestination = '',
  onOpenReportObstacle
}) => {
  const [origin, setOrigin] = useState('Rajiv Chowk Metro Gate 2 (Accessible Lift)');
  const [destination, setDestination] = useState(
    prefilledDestination || 'Palika Bazaar Accessible Corridor'
  );
  const [city, setCity] = useState('New Delhi');
  const [routeData, setRouteData] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeRouteType, setActiveRouteType] = useState<'accessible' | 'standard'>('accessible');

  // If prefilled destination changes
  useEffect(() => {
    if (prefilledDestination) {
      setDestination(prefilledDestination);
    }
  }, [prefilledDestination]);

  const handleComputeRoute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!origin || !destination) return;

    soundEngine.playBeep(660, 'sine', 0.1);
    setIsCalculating(true);

    try {
      const result = await api.calculateRoute(origin, destination, city);
      setRouteData(result);
      soundEngine.playBeep(880, 'sine', 0.2);

      if (settings.autoAnnounceTurnByTurn) {
        speakText(
          `Accessible route computed. Distance is ${result.accessibleRoute.totalDistanceMeters} meters. Avoided ${result.accessibleRoute.avoidedObstaclesCount} flagged obstacles.`
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    handleComputeRoute();
  }, []);

  return (
    <section
      role="region"
      aria-label="Accessible Route Navigation"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Navigation className="w-6 h-6 text-emerald-400" />
            <span>Accessible Route-Finding & Detour Engine</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Automated diversion algorithm: cross-references citizen obstacle reports (broken sidewalks, stairs) and routes via ramped pathways.
          </p>
        </div>

        <button
          id="btn-trigger-report-obstacle"
          type="button"
          onClick={() => {
            soundEngine.playBeep(700, 'sine', 0.1);
            onOpenReportObstacle(origin);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold shadow transition"
        >
          <Camera className="w-4 h-4" />
          <span>Report Obstacle on Route</span>
        </button>
      </div>

      {/* Input Route Form */}
      <form
        onSubmit={handleComputeRoute}
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          settings.highContrast
            ? 'bg-black border-2 border-yellow-400 text-yellow-300'
            : 'bg-stone-900 border-stone-800 text-stone-100'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              Starting Location (Origin)
            </label>
            <input
              id="input-route-origin"
              type="text"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-emerald-500 font-medium"
              placeholder="e.g. Rajiv Chowk Metro Gate 2"
            />
          </div>

          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
              Destination (Target)
            </label>
            <input
              id="input-route-destination"
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-emerald-500 font-medium"
              placeholder="e.g. Palika Bazaar Accessible Lift"
            />
          </div>

          <div className="md:col-span-2 pt-4 md:pt-5">
            <button
              id="btn-calculate-route"
              type="submit"
              disabled={isCalculating}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black tracking-wide shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Navigation className="w-4 h-4" />
              <span>{isCalculating ? 'Routing...' : 'Find Route'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Route Results Comparison */}
      {routeData && (
        <div className="space-y-4">
          {/* Active Backend Exclusion Rule Badge */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">
                Dynamic Rerouting Active: Segments with 2+ citizen reports are automatically bypassed.
              </span>
            </div>
            <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded font-mono text-emerald-300">
              Rule: N ≥ 2 Reports
            </span>
          </div>

          {/* Route Comparison Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Accessible Detour (Recommended) */}
            <button
              id="tab-accessible-route"
              type="button"
              onClick={() => {
                soundEngine.playBeep(650, 'sine', 0.1);
                setActiveRouteType('accessible');
              }}
              className={`p-4 rounded-2xl border text-left transition transform active:scale-99 ${
                activeRouteType === 'accessible'
                  ? settings.highContrast
                    ? 'bg-yellow-400 text-black border-2 border-yellow-300 font-bold shadow-lg'
                    : 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-100 shadow-lg'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended Accessible
                </span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {routeData.accessibleRoute.estimatedMinutes} mins
                </span>
              </div>
              <div className="text-sm font-black mb-1">
                {routeData.accessibleRoute.name}
              </div>
              <div className="text-xs text-stone-300 flex items-center gap-3 mt-2">
                <span>Distance: {routeData.accessibleRoute.totalDistanceMeters}m</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">100% Step-Free Ramped</span>
              </div>
            </button>

            {/* 2. Direct Unchecked Route (Has Obstacles) */}
            <button
              id="tab-standard-route"
              type="button"
              onClick={() => {
                soundEngine.playBeep(500, 'sine', 0.1);
                setActiveRouteType('standard');
              }}
              className={`p-4 rounded-2xl border text-left transition transform active:scale-99 ${
                activeRouteType === 'standard'
                  ? settings.highContrast
                    ? 'bg-yellow-400 text-black border-2 border-yellow-300 font-bold shadow-lg'
                    : 'bg-red-950/70 border-2 border-red-400 text-red-100 shadow-lg'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Standard Route (Flagged)
                </span>
                <span className="text-xs font-bold flex items-center gap-1 text-stone-300">
                  <Clock className="w-3.5 h-3.5" />
                  {routeData.standardRoute.estimatedMinutes} mins
                </span>
              </div>
              <div className="text-sm font-black mb-1">
                {routeData.standardRoute.name}
              </div>
              <div className="text-xs text-red-400 font-semibold flex items-center gap-3 mt-2">
                <span>Distance: {routeData.standardRoute.totalDistanceMeters}m</span>
                <span>•</span>
                <span>Contains broken sidewalk / stairs</span>
              </div>
            </button>
          </div>

          {/* Detailed Step-by-Step Directions */}
          <div
            className={`p-5 rounded-2xl border ${
              settings.highContrast
                ? 'bg-black border-yellow-400 text-yellow-300'
                : 'bg-stone-900 border-stone-800 text-stone-100'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-400" />
                <span>
                  {activeRouteType === 'accessible'
                    ? 'Accessible Turn-by-Turn Guidance'
                    : 'Standard Route Steps & Hazard Warnings'}
                </span>
              </h3>
              <span className="text-xs font-mono text-stone-400">
                Max Incline: {routeData.accessibleRoute.elevationGradeMax}
              </span>
            </div>

            {/* If Accessible Route: list avoided reasons */}
            {activeRouteType === 'accessible' && routeData.accessibleRoute.rerouteReasons.length > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-emerald-300 space-y-1">
                <span className="font-bold block text-stone-200">Obstacles Bypassed by Detour:</span>
                {routeData.accessibleRoute.rerouteReasons.map((reason, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Steps List */}
            <div className="space-y-3">
              {(activeRouteType === 'accessible'
                ? routeData.accessibleRoute.steps
                : routeData.standardRoute.steps
              ).map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                    step.hazard
                      ? 'bg-red-950/40 border-red-500/50 text-red-200'
                      : 'bg-stone-950/60 border-stone-800 text-stone-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 ${
                        step.hazard ? 'bg-red-600 text-white' : 'bg-emerald-700 text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm leading-snug">{step.text}</p>
                      <div className="flex items-center gap-2 mt-1 text-stone-400 text-[11px]">
                        <span>Surface: <strong className="text-stone-300">{step.surface}</strong></span>
                        <span>•</span>
                        <span>Distance: <strong className="text-stone-300">{step.distance}</strong></span>
                      </div>
                    </div>
                  </div>

                  {step.hazard && (
                    <span className="px-2 py-1 rounded bg-red-600 text-white font-bold text-[10px] shrink-0">
                      BLOCKING HAZARD
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Spoken Guidance Button */}
            <button
              id="btn-speak-guidance"
              type="button"
              onClick={() => {
                const currentSteps =
                  activeRouteType === 'accessible'
                    ? routeData.accessibleRoute.steps
                    : routeData.standardRoute.steps;
                const fullSpoken = currentSteps.map((s, i) => `Step ${i + 1}: ${s.text}`).join('. ');
                speakText(fullSpoken, { rate: settings.speechRate, pitch: settings.speechPitch });
              }}
              className="mt-4 w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <span>🔊 Read Full Turn-by-Turn Guidance Aloud</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
