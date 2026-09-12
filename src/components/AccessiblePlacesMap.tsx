import React, { useState, useEffect } from 'react';
import { AccessiblePlace, AccessibilitySettings, PlaceAccessibilityTags } from '../types';
import { api } from '../services/api';
import { soundEngine } from '../utils/audio';
import { getTranslation } from '../i18n';
import { INDIA_STATES, INDIA_REGIONS, IndiaStateInfo } from '../data/indiaStates';
import {
  MapPin,
  Search,
  Filter,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Compass,
  Building2,
  Accessibility,
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
  X,
  Navigation,
  Globe2
} from 'lucide-react';

interface AccessiblePlacesMapProps {
  settings: AccessibilitySettings;
  onSelectPlaceForRouting?: (placeName: string) => void;
}

const POPULAR_STATES = [
  'All',
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'West Bengal',
  'Gujarat',
  'Uttar Pradesh',
  'Kerala',
  'Rajasthan'
];

export const AccessiblePlacesMap: React.FC<AccessiblePlacesMapProps> = ({
  settings,
  onSelectPlaceForRouting
}) => {
  const t = getTranslation(settings.language || 'en');
  const [places, setPlaces] = useState<AccessiblePlace[]>([]);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<AccessiblePlace | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // New place submission form state
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceCategory, setNewPlaceCategory] = useState<AccessiblePlace['category']>('transit');
  const [newPlaceState, setNewPlaceState] = useState<string>('Delhi');
  const [newPlaceCity, setNewPlaceCity] = useState<string>('New Delhi');
  const [newPlaceAddress, setNewPlaceAddress] = useState('');
  const [newPlaceNotes, setNewPlaceNotes] = useState('');
  const [newPlaceTags, setNewPlaceTags] = useState<PlaceAccessibilityTags>({
    wheelchairRamp: true,
    noStairsAccess: true,
    accessibleToilet: false,
    tactilePaving: false,
    brailleSignage: false,
    audioAssist: false,
    spaciousElevator: false,
    disabledParking: false
  });

  // Dynamic city list based on selected state
  const currentStateInfo = INDIA_STATES.find(s => s.name.toLowerCase() === selectedState.toLowerCase());
  const availableCities: string[] = selectedState === 'All'
    ? ['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi']
    : ['All', ...(currentStateInfo ? currentStateInfo.majorCities : [])];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const config = await api.getConfig();
      if (!config.googleMaps.configured) {
        setApiKeyStatus('Running in interactive vector map mode across all 36 States & UTs.');
      }
      const data = await api.getPlaces(selectedState, selectedCity, selectedTag, searchQuery);
      setPlaces(data);
      if (data.length > 0) {
        // Keep selected place if it still exists in results, otherwise pick first
        const found = data.find(p => p.id === selectedPlace?.id);
        setSelectedPlace(found || data[0]);
      } else {
        setSelectedPlace(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedState, selectedCity, selectedTag]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleCreatePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceName || !newPlaceAddress) return;

    soundEngine.playBeep(800, 'sine', 0.2);
    const stateObj = INDIA_STATES.find(s => s.name === newPlaceState);
    const result = await api.submitPlace({
      name: newPlaceName,
      category: newPlaceCategory,
      state: newPlaceState,
      city: newPlaceCity || 'Capital City',
      address: newPlaceAddress,
      tags: newPlaceTags,
      notes: newPlaceNotes,
      latitude: stateObj ? stateObj.latitude + (Math.random() - 0.5) * 0.05 : 28.6139,
      longitude: stateObj ? stateObj.longitude + (Math.random() - 0.5) * 0.05 : 77.2090
    });

    if (result.success) {
      setPlaces(prev => [result.place, ...prev]);
      setSelectedPlace(result.place);
      setIsSubmitModalOpen(false);
      setNewPlaceName('');
      setNewPlaceAddress('');
      setNewPlaceNotes('');
    }
  };

  const TAG_DEFINITIONS: Array<{ key: keyof PlaceAccessibilityTags; label: string; icon: string }> = [
    { key: 'wheelchairRamp', label: t.places.tags.wheelchairRamp, icon: '♿' },
    { key: 'noStairsAccess', label: t.places.tags.noStairsAccess, icon: '🚶' },
    { key: 'accessibleToilet', label: t.places.tags.accessibleToilet, icon: '🚻' },
    { key: 'tactilePaving', label: t.places.tags.tactilePaving, icon: '🦯' },
    { key: 'brailleSignage', label: t.places.tags.brailleSignage, icon: '⠃' },
    { key: 'audioAssist', label: t.places.tags.audioAssist, icon: '🔊' },
    { key: 'spaciousElevator', label: t.places.tags.spaciousElevator, icon: '🛗' },
    { key: 'disabledParking', label: t.places.tags.disabledParking, icon: '🅿️' }
  ];

  return (
    <section
      role="region"
      aria-label="Accessible Places Map"
      className="space-y-6"
    >
      {/* Top Header & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-400" />
            <span>{t.places.title}</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {t.places.subtitle}
          </p>
        </div>

        <button
          id="btn-open-submit-place"
          type="button"
          onClick={() => {
            soundEngine.playBeep(600, 'sine', 0.1);
            setIsSubmitModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.places.submitPlace}</span>
        </button>
      </div>

      {/* State & UT Selector Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-stone-200">
              {t.places.stateLabel} (36 States & UTs):
            </span>
          </div>

          {/* Full State & UT Select Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="state-select-dropdown" className="text-[11px] text-stone-400 font-medium">
              {t.places.selectState}:
            </label>
            <select
              id="state-select-dropdown"
              value={selectedState}
              onChange={e => {
                soundEngine.playBeep(520, 'sine', 0.08);
                setSelectedState(e.target.value);
                setSelectedCity('All');
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="All">{t.places.allStates}</option>
              <optgroup label="States (28)">
                {INDIA_STATES.filter(s => s.type === 'State').map(state => (
                  <option key={state.code} value={state.name}>
                    {state.name} ({state.region} India)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories (8)">
                {INDIA_STATES.filter(s => s.type === 'Union Territory').map(ut => (
                  <option key={ut.code} value={ut.name}>
                    {ut.name} (UT)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Popular States Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {POPULAR_STATES.map(stateName => {
            const isSelected = selectedState === stateName;
            return (
              <button
                id={`filter-state-${stateName.replace(/\s+/g, '-').toLowerCase()}`}
                key={stateName}
                type="button"
                onClick={() => {
                  soundEngine.playBeep(520, 'sine', 0.08);
                  setSelectedState(stateName);
                  setSelectedCity('All');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? settings.highContrast
                      ? 'bg-yellow-400 text-black border-2 border-yellow-300'
                      : 'bg-emerald-600 text-white shadow'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {stateName === 'All' ? t.places.allStates : stateName}
              </button>
            );
          })}
        </div>
      </div>

      {/* City Tabs & Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* City Filter Pills */}
        <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-stone-400 text-[11px] font-semibold shrink-0">
            City:
          </span>
          {availableCities.slice(0, 6).map(city => (
            <button
              id={`filter-city-${city.replace(/\s+/g, '-').toLowerCase()}`}
              key={city}
              type="button"
              onClick={() => {
                soundEngine.playBeep(520, 'sine', 0.08);
                setSelectedCity(city);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCity === city
                  ? settings.highContrast
                    ? 'bg-yellow-400 text-black border-2 border-yellow-300'
                    : 'bg-emerald-700 text-white shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {city === 'All' ? t.places.allCities : city}
            </button>
          ))}
          {availableCities.length > 6 && (
            <select
              value={selectedCity}
              onChange={e => {
                soundEngine.playBeep(520, 'sine', 0.08);
                setSelectedCity(e.target.value);
              }}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300"
            >
              <option value="All">More cities...</option>
              {availableCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {/* Keyword Search */}
        <form onSubmit={handleSearchSubmit} className="md:col-span-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              id="input-place-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.places.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            id="btn-search-places"
            type="submit"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700"
          >
            {t.places.filter}
          </button>
        </form>
      </div>

      {/* Accessibility Tag Quick Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-stone-400 text-[11px] font-semibold flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> {t.places.filter}:
        </span>
        <button
          type="button"
          onClick={() => setSelectedTag('')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            selectedTag === ''
              ? 'bg-stone-700 text-white'
              : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
          }`}
        >
          {t.places.allTags}
        </button>
        {TAG_DEFINITIONS.map(tag => (
          <button
            key={tag.key}
            type="button"
            onClick={() => {
              soundEngine.playBeep(600, 'sine', 0.08);
              setSelectedTag(selectedTag === tag.key ? '' : tag.key);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
              selectedTag === tag.key
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Map & Places Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Simulator / Explorer (Left / Top 7 cols) */}
        <div
          className={`lg:col-span-7 rounded-2xl border overflow-hidden relative min-h-[420px] flex flex-col ${
            settings.highContrast
              ? 'bg-black border-2 border-yellow-400'
              : 'bg-stone-900 border-stone-800'
          }`}
        >
          {/* Map Top Bar */}
          <div className="p-3 border-b border-stone-800/80 bg-stone-950/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-stone-300">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>
                Accessibility Map: {selectedState !== 'All' ? selectedState : 'All India'}
                {selectedCity !== 'All' ? ` • ${selectedCity}` : ''}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">
              {places.length} audited locations
            </span>
          </div>

          {/* Map Canvas Simulation */}
          <div className="flex-1 relative bg-stone-950 p-4 flex flex-col justify-between overflow-hidden min-h-[340px]">
            {/* Background Grid Pattern simulating transit routes */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-700" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated transit lines */}
                <path d="M 20 280 Q 180 140 380 180 T 600 60" fill="none" stroke="#059669" strokeWidth="4" strokeDasharray="6,6" />
                <path d="M 80 40 Q 220 180 340 320" fill="none" stroke="#3b82f6" strokeWidth="3" />
              </svg>
            </div>

            {/* City Landmark Pins in Canvas View */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto max-h-[460px] overflow-y-auto pr-1">
              {places.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <button
                    id={`map-pin-${place.id}`}
                    key={place.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playBeep(650, 'sine', 0.1);
                      setSelectedPlace(place);
                    }}
                    className={`p-3 rounded-xl text-left border transition transform active:scale-98 ${
                      isSelected
                        ? settings.highContrast
                          ? 'bg-yellow-400 text-black border-2 border-yellow-300 font-bold shadow-lg scale-102'
                          : 'bg-emerald-950/90 text-emerald-100 border-2 border-emerald-400 shadow-lg scale-102'
                        : 'bg-stone-900/90 text-stone-200 border-stone-700 hover:border-stone-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-xs line-clamp-1 flex items-center gap-1.5">
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-stone-400'}`} />
                        {place.name}
                      </span>
                      {place.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-semibold">
                        {place.city}
                      </span>
                      {place.state && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-semibold">
                          {place.state}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px] mt-2">
                      {place.tags.wheelchairRamp && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-800 text-emerald-300">♿ Ramp</span>
                      )}
                      {place.tags.noStairsAccess && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-800 text-blue-300">🚶 Step-free</span>
                      )}
                      {place.tags.spaciousElevator && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-800 text-purple-300">🛗 Lift</span>
                      )}
                    </div>
                  </button>
                );
              })}
              {places.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12 text-stone-400 text-xs">
                  No places found for the selected state and filters. Click "Submit Accessible Place" to add one!
                </div>
              )}
            </div>

            {/* Bottom Overlay Info */}
            <div className="relative z-10 mt-3 p-2.5 rounded-xl bg-stone-900/95 border border-stone-800 text-[11px] text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Coverage: All 36 States & Union Territories of India
              </span>
              <span className="text-stone-400 font-mono">India GeoDatum WGS84</span>
            </div>
          </div>
        </div>

        {/* Selected Place Detail Card (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedPlace ? (
            <div
              className={`p-5 rounded-2xl border transition-all ${
                settings.highContrast
                  ? 'bg-black text-yellow-300 border-2 border-yellow-400'
                  : 'bg-stone-900 border-stone-800 text-stone-100'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      {selectedPlace.category}
                    </span>
                    {selectedPlace.state && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                        {selectedPlace.state}
                      </span>
                    )}
                    {selectedPlace.verified && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                        Verified Audit
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black mt-1.5 leading-tight">
                    {selectedPlace.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-500" />
                    {selectedPlace.address}, {selectedPlace.city}, {selectedPlace.state || ''}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-stone-800 px-2.5 py-1 rounded-lg shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedPlace.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Accessibility Tags Breakdown */}
              <div className="my-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                  Accessibility Checklist Audit:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {TAG_DEFINITIONS.map(tag => {
                    const isAvailable = (selectedPlace.tags as any)[tag.key];
                    return (
                      <div
                        key={tag.key}
                        className={`p-2 rounded-lg border flex items-center gap-2 ${
                          isAvailable
                            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                            : 'bg-stone-950/40 border-stone-800 text-stone-500 opacity-60'
                        }`}
                      >
                        <span className="text-sm">{tag.icon}</span>
                        <span className="font-semibold text-[11px]">{tag.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Notes */}
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-stone-300 mb-4 leading-relaxed">
                <span className="font-bold text-stone-200 block mb-1">Accessibility Notes:</span>
                {selectedPlace.notes}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {onSelectPlaceForRouting && (
                  <button
                    id="btn-navigate-to-place"
                    type="button"
                    onClick={() => onSelectPlaceForRouting(selectedPlace.name)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Find Accessible Route to Here</span>
                  </button>
                )}

                <a
                  id="btn-open-google-maps"
                  href={`https://maps.google.com/?q=${selectedPlace.latitude},${selectedPlace.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 border border-stone-700 text-center"
                >
                  <span>Open in Google Maps / Navigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-stone-800 bg-stone-900 text-center text-xs text-stone-400">
              Select any place on the map to inspect its verified accessibility tags.
            </div>
          )}
        </div>
      </div>

      {/* Crowdsourced Submission Modal */}
      {isSubmitModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-place-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              settings.highContrast
                ? 'bg-black text-yellow-300 border-yellow-400'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              aria-label="Close submit form"
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 id="submit-place-title" className="text-xl font-black mb-1">
              Submit Accessible Location
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Help build India's crowdsourced accessibility directory across all 36 States and Union Territories.
            </p>

            <form onSubmit={handleCreatePlace} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Place / Facility Name *</label>
                <input
                  type="text"
                  required
                  value={newPlaceName}
                  onChange={e => setNewPlaceName(e.target.value)}
                  placeholder="e.g. AIIMS Metro Station Gate 3"
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">State / Union Territory *</label>
                  <select
                    value={newPlaceState}
                    onChange={e => {
                      const st = e.target.value;
                      setNewPlaceState(st);
                      const stObj = INDIA_STATES.find(s => s.name === st);
                      if (stObj && stObj.majorCities.length > 0) {
                        setNewPlaceCity(stObj.majorCities[0]);
                      }
                    }}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    {INDIA_STATES.map(st => (
                      <option key={st.code} value={st.name}>
                        {st.name} ({st.type === 'Union Territory' ? 'UT' : st.region})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newPlaceCity}
                    onChange={e => setNewPlaceCity(e.target.value)}
                    placeholder="e.g. New Delhi, Bengaluru"
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold mb-1">Category *</label>
                  <select
                    value={newPlaceCategory}
                    onChange={e => setNewPlaceCategory(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                  >
                    <option value="transit">Transit / Metro / Station / Airport</option>
                    <option value="hospital">Hospital / Healthcare / Clinic</option>
                    <option value="mall">Mall / Market / Commercial Complex</option>
                    <option value="government">Government Office / Public Service</option>
                    <option value="park">Park / Heritage Site / Public Space</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Full Address / Landmark *</label>
                <input
                  type="text"
                  required
                  value={newPlaceAddress}
                  onChange={e => setNewPlaceAddress(e.target.value)}
                  placeholder="e.g. Outer Ring Road, Near Gate 1"
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100"
                />
              </div>

              {/* Tag Checklist */}
              <div>
                <label className="block text-xs font-bold mb-2">Verified Accessibility Features:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {TAG_DEFINITIONS.map(tag => (
                    <label
                      key={tag.key}
                      className="flex items-center gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean((newPlaceTags as any)[tag.key])}
                        onChange={e =>
                          setNewPlaceTags(prev => ({ ...prev, [tag.key]: e.target.checked }))
                        }
                        className="accent-emerald-500 w-4 h-4 rounded"
                      />
                      <span className="text-[11px] font-medium">{tag.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Detailed Accessibility Notes</label>
                <textarea
                  rows={2}
                  value={newPlaceNotes}
                  onChange={e => setNewPlaceNotes(e.target.value)}
                  placeholder="Mention ramp slope, elevator availability, lift operating hours, or porter assistance details..."
                  className="w-full text-xs p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="w-1/3 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow"
                >
                  Submit Audit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

